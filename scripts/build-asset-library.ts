import sharp from "sharp";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
async function main() {
  const root = resolve(".");
  const recipes = JSON.parse(
    await readFile(
      resolve(root, "src/data/art/production-recipes.json"),
      "utf8",
    ),
  ) as {
    schemaVersion: number;
    id: string;
    name: string;
    category: string;
    description: string;
    style: string;
    references: string[];
    tags: string[];
    reuseWhen: string;
    assets: {
      id: string;
      description: string;
      sourcePath: string;
      width: number;
      height: number;
      kind: string;
      anchor: { x: number; y: number };
      status?: "prototype" | "retired";
    }[];
  }[];
  const indexPath = resolve(root, "src/model/index.json");
  const previousIndex = JSON.parse(await readFile(indexPath, "utf8")) as {
    schemaVersion: number;
    records: string[];
  };
  const records = new Set(previousIndex.records);
  const requested = process.argv.indexOf("--entity");
  const requestedAssets = new Set(
    process.argv.flatMap((arg, index) =>
      arg === "--asset" ? [process.argv[index + 1]] : [],
    ),
  );
  const selected = recipes.filter(
    (entity) =>
      (requested < 0 || entity.id === process.argv[requested + 1]) &&
      (!requestedAssets.size ||
        entity.assets.some((asset) => requestedAssets.has(asset.id))),
  );
  if (!selected.length)
    throw new Error("No preparation recipe matched the requested entity");
  for (const entity of selected) {
    const assets = [];
    for (const recipe of entity.assets.filter(
      (asset) => !requestedAssets.size || requestedAssets.has(asset.id),
    )) {
      const original = await readFile(resolve(root, recipe.sourcePath));
      const input = await sharp(original).metadata();
      const pipeline = () =>
        sharp(original)
          .rotate()
          .resize(recipe.width, recipe.height, {
            fit: input.hasAlpha ? "contain" : "cover",
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          });
      const lossy = await pipeline()
        .webp({ quality: 84, alphaQuality: 100, effort: 6 })
        .toBuffer();
      const nearLossless = await pipeline()
        .webp({ nearLossless: true, quality: 84, effort: 6 })
        .toBuffer();
      const path = `public/assets/${entity.category}/${recipe.id}-v1.webp`;
      const metadata = await sharp(lossy).metadata();
      const stats = await sharp(lossy).stats();
      const alpha = metadata.hasAlpha
        ? (stats.channels.at(-1)?.min ?? 255) < 255
        : false;
      if (
        (recipe.kind === "background" && lossy.length > 750_000) ||
        (recipe.kind === "cutout" && lossy.length > 300_000)
      )
        throw Error(`Asset over hard budget: ${recipe.id}`);
      await mkdir(dirname(resolve(root, path)), { recursive: true });
      await writeFile(resolve(root, path), lossy);
      assets.push({
        ...recipe,
        path,
        width: metadata.width,
        height: metadata.height,
        bytes: lossy.length,
        sha256: createHash("sha256").update(lossy).digest("hex"),
        hasAlpha: alpha,
        encoding: "lossy-webp",
        version: 1,
        status: recipe.status ?? "prototype",
        alternatives: {
          lossyBytes: lossy.length,
          nearLosslessBytes: nearLossless.length,
        },
        provenance: "src/data/sessions/28.10.2026/art/generation-prompts.json",
      });
    }
    const recordPath = `src/model/${entity.category}/${entity.id}.json`;
    // Preparation updates asset metadata; canonical sheets and shared references survive.
    const previous = JSON.parse(
      await readFile(resolve(root, recordPath), "utf8").catch(() => "{}"),
    );
    const combined = new Map(
      (previous.assets ?? []).map((asset: { id: string }) => [asset.id, asset]),
    );
    for (const asset of assets) combined.set(asset.id, asset);
    const record = { ...entity, ...previous, assets: [...combined.values()] };
    await mkdir(dirname(resolve(root, recordPath)), { recursive: true });
    await writeFile(
      resolve(root, recordPath),
      JSON.stringify(record, null, 2) + "\n",
    );
    records.add(recordPath);
  }
  await writeFile(
    resolve(root, "src/model/index.json"),
    JSON.stringify({ schemaVersion: 1, records: [...records] }, null, 2) + "\n",
  );
  console.log(
    `Prepared ${selected.length} entities; preserved ${records.size} catalog records`,
  );
}
void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
