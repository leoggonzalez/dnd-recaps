import { readdir, rm, stat } from "node:fs/promises";
import { resolve, relative } from "node:path";
import { sessions } from "../src/data";
import { sessionAudioPaths } from "../src/lib/session-audio";
/** The static release contains selected runtime media only. */
async function main() {
  const root = resolve("out");
  const allowed = new Set(
    sessions.flatMap((session) => [
      ...session.assets.map((asset) => asset.path),
      ...sessionAudioPaths(session),
    ]),
  );
  let removed = 0;
  async function visit(directory: string) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(path);
        if ((await readdir(path)).length === 0)
          await rm(path, { recursive: true });
      } else if (!allowed.has(relative(root, path))) {
        await rm(path);
        removed++;
      }
    }
  }
  await visit(resolve(root, "assets"));
  for (const asset of allowed) await stat(resolve(root, asset));
  console.log(
    `Static export: ${allowed.size} selected media files; excluded ${removed} source/reference/unused files`,
  );
}
void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
