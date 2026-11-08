import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { libraryRecordSchema } from "../src/lib/asset-library-schema";
const root = resolve(".");
const query = process.argv.slice(2).join(" ").toLowerCase();
const index = JSON.parse(
  readFileSync(resolve(root, "src/model/index.json"), "utf8"),
) as { records: string[] };
for (const path of index.records) {
  const entity = libraryRecordSchema.parse(
    JSON.parse(readFileSync(resolve(root, path), "utf8")),
  );
  const haystack = [
    entity.id,
    entity.name,
    entity.description,
    ...entity.tags,
    entity.reuseWhen,
    ...entity.assets.map((a) => a.description),
  ]
    .join(" ")
    .toLowerCase();
  if (!haystack.includes(query)) continue;
  console.log(
    `\n${entity.name} (${entity.category}) — ${path}\n${entity.description}\nReuse: ${entity.reuseWhen}`,
  );
  for (const asset of entity.assets)
    console.log(`  ${asset.id}: ${asset.description}\n  ${asset.path}`);
}
