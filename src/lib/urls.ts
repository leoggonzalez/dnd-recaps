export function assetUrl(
  path: string,
  basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "",
): string {
  if (!/^assets\/[a-zA-Z0-9_/-]+\.webp$/.test(path) || path.includes("..")) {
    throw new Error(`Invalid published asset path: ${path}`);
  }
  return `${basePath}/${path}`;
}
