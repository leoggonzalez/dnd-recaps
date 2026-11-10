export function assetUrl(
  path: string,
  basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "",
): string {
  if (!/^assets\/[a-zA-Z0-9_/-]+\.webp$/.test(path) || path.includes("..")) {
    throw new Error(`Invalid published asset path: ${path}`);
  }
  return `${basePath}/${path}`;
}

export const narrationAudioPath =
  /^assets\/audio\/(?:[a-zA-Z0-9_-]+\/)*[^/\\]+\.mp3$/u;

export function narrationAudioUrl(
  path: string,
  basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "",
): string {
  if (!narrationAudioPath.test(path)) {
    throw new Error(`Invalid narration audio path: ${path}`);
  }
  return `${basePath}/${path.split("/").map(encodeURIComponent).join("/")}`;
}
