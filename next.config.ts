import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
if (basePath && !/^\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*$/.test(basePath)) {
  throw new Error(
    "NEXT_PUBLIC_BASE_PATH must be empty or an absolute path without a trailing slash",
  );
}
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  turbopack: { root: fileURLToPath(new URL(".", import.meta.url)) },
};
export default config;
