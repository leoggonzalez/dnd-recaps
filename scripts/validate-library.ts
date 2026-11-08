import { z } from "zod";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { libraryRecordSchema } from "../src/lib/asset-library-schema";
import { sessions } from "../src/data";
async function main() {
  const root = resolve(".");
  const index = z
    .object({
      schemaVersion: z.literal(1),
      records: z.array(
        z
          .string()
          .regex(
            /^src\/model\/(characters|npcs|creatures|objects|environments|groups|illustrations)\/[a-z0-9-]+\.json$/,
          ),
      ),
    })
    .strict()
    .parse(JSON.parse(readFileSync("src/model/index.json", "utf8")));
  const entities = new Set<string>();
  const assets = new Map<
    string,
    {
      path: string;
      sha256: string;
      width: number;
      height: number;
      bytes: number;
    }
  >();
  let mentions = 0;
  for (const path of index.records) {
    const entity = libraryRecordSchema.parse(
      JSON.parse(readFileSync(path, "utf8")),
    );
    if (
      path !== `src/model/${entity.category}/${entity.id}.json` ||
      entities.has(entity.id)
    )
      throw Error(`Invalid/duplicate entity: ${entity.id}`);
    entities.add(entity.id);
    if (new Set(entity.assets.map((a) => a.id)).size !== entity.assets.length)
      throw Error(`Repeated asset in ${entity.id}`);
    for (const ref of entity.references)
      if (ref.includes("..") || !existsSync(resolve(root, ref)))
        throw Error(`Missing reference: ${ref}`);
    for (const asset of entity.assets) {
      mentions++;
      if (asset.path.includes(".."))
        throw Error(`Invalid image path: ${asset.path}`);
      const identity = {
        path: asset.path,
        sha256: asset.sha256,
        width: asset.width,
        height: asset.height,
        bytes: asset.bytes,
      };
      const prior = assets.get(asset.id);
      if (prior) {
        if (JSON.stringify(prior) !== JSON.stringify(identity))
          throw Error(`Conflicting shared asset metadata: ${asset.id}`);
        continue;
      }
      assets.set(asset.id, identity);
      const bytes = readFileSync(asset.path),
        meta = await sharp(bytes).metadata();
      if (
        meta.format !== (asset.encoding === "original-png" ? "png" : "webp") ||
        meta.width !== asset.width ||
        meta.height !== asset.height ||
        bytes.length !== asset.bytes ||
        createHash("sha256").update(bytes).digest("hex") !== asset.sha256
      )
        throw Error(`Stale image metadata: ${asset.id}`);
      if (asset.hasAlpha && !meta.hasAlpha)
        throw Error(`Lost alpha: ${asset.id}`);
      if (asset.provenance) {
        const provenance = JSON.parse(
          readFileSync(asset.provenance, "utf8"),
        ) as { id: string; archive: string }[];
        if (
          !provenance.some(
            (p) => p.id === asset.id && p.archive === asset.sourcePath,
          )
        )
          throw Error(`Missing provenance: ${asset.id}`);
      }
    }
  }
  for (const session of sessions)
    for (const asset of session.assets) {
      const model = assets.get(asset.id);
      if (
        !model ||
        model.sha256 !== asset.sha256 ||
        model.path !== `public/${asset.path}`
      )
        throw Error(`Manifest/model mismatch: ${asset.id}`);
    }
  console.log(
    `Model catalog: ${entities.size} entities, ${assets.size} unique images, ${mentions} asset mentions`,
  );
}
void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
