import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { sessions } from "../src/data";
import { assetGraph } from "../src/lib/schema";
import { assetUrl } from "../src/lib/urls";
if (new Set(sessions.map((s) => s.id)).size !== sessions.length)
  throw new Error("Duplicate session ID");
for (const session of sessions) {
  let total = 0;
  const audioPaths = new Set(
    session.scenes.flatMap((scene) =>
      scene.narrationAudio ? [scene.narrationAudio] : [],
    ),
  );
  for (const path of audioPaths) {
    const bytes = readFileSync(resolve("public", path));
    if (!bytes.length) throw new Error(`Empty narration audio: ${path}`);
    total += bytes.length;
  }
  for (const asset of session.assets) {
    assetUrl(asset.path);
    const bytes = readFileSync(resolve("public", asset.path));
    if (
      bytes.toString("ascii", 0, 4) !== "RIFF" ||
      bytes.toString("ascii", 8, 12) !== "WEBP"
    )
      throw new Error(`Not WebP: ${asset.path}`);
    if (
      bytes.length !== asset.bytes ||
      createHash("sha256").update(bytes).digest("hex") !== asset.sha256
    )
      throw new Error(`Stale asset metadata: ${asset.id}`);
    if (asset.kind === "background" && bytes.length > 750_000)
      throw new Error(`Background over budget: ${asset.id}`);
    if (asset.kind === "cutout" && bytes.length > 300_000)
      throw new Error(`Cutout over budget: ${asset.id}`);
    total += bytes.length;
  }
  if (total > 20_000_000) throw new Error(`Session over 20 MB: ${session.id}`);
  console.log(
    `${session.id}: ${session.scenes.length} scenes, ${assetGraph(session).length + audioPaths.size} dependencies, ${total} bytes (${session.status})`,
  );
}
