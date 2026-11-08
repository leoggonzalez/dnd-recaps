import sharp from "sharp";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
// npm run prepare-asset -- source.png assets/characters/example.webp 640 640 cutout
async function main() {
  const [
    source,
    path,
    widthArg,
    heightArg,
    kind = "cutout",
    mode = "lossy",
    reportDirectory = "src/data/art/reports",
  ] = process.argv.slice(2);
  const width = Number(widthArg),
    height = Number(heightArg);
  if (
    !source ||
    !/^assets\/[\w/-]+\.webp$/.test(path ?? "") ||
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width <= 0 ||
    height <= 0 ||
    !["background", "cutout", "prop", "effect", "cover"].includes(kind) ||
    !["lossy", "lossless", "near-lossless"].includes(mode)
  )
    throw new Error(
      "Usage: prepare-asset source assets/path.webp width height background|cutout|prop|effect|cover [lossy|lossless|near-lossless]",
    );
  const output = resolve("public", path);
  await mkdir(dirname(output), { recursive: true });
  // Resize to the authored frame without trimming; every alternate pose preserves its anchor.
  const pipeline = sharp(await readFile(source))
    .rotate()
    .resize(width, height, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    });
  const buffer = await pipeline
    .webp({
      quality: 84,
      alphaQuality: 100,
      effort: 6,
      lossless: mode === "lossless",
      nearLossless: mode === "near-lossless",
    })
    .toBuffer();
  const metadata = await sharp(buffer).metadata();
  const report = {
    path,
    width: metadata.width,
    height: metadata.height,
    bytes: buffer.length,
    sha256: createHash("sha256").update(buffer).digest("hex"),
    kind,
    hasAlpha: metadata.hasAlpha,
    mode,
  };
  if (
    (kind === "background" && buffer.length > 750_000) ||
    (kind === "cutout" && buffer.length > 300_000)
  )
    throw new Error(
      "Asset exceeds its hard size budget; reduce dimensions or encoding size before publishing",
    );
  await writeFile(output, buffer);
  await mkdir(reportDirectory, { recursive: true });
  await writeFile(
    resolve(reportDirectory, path.replaceAll("/", "--") + ".json"),
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(JSON.stringify(report, null, 2));
}
void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
