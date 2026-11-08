import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "/dnd-recaps";
const root = resolve("out");
const types = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".webp": "image/webp",
};
createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const path = decodeURIComponent(url.pathname);
  if (path !== base && !path.startsWith(`${base}/`)) {
    res.writeHead(404).end();
    return;
  }
  const relative = path.slice(base.length) || "/";
  const file = resolve(
    root,
    `.${relative}${relative.endsWith("/") ? "index.html" : ""}`,
  );
  if (!file.startsWith(root + sep)) {
    res.writeHead(403).end();
    return;
  }
  try {
    const body = await readFile(file);
    res
      .writeHead(200, {
        "Content-Type": types[extname(file)] ?? "application/octet-stream",
      })
      .end(body);
  } catch {
    const body = await readFile(resolve(root, "404.html"));
    res.writeHead(404, { "Content-Type": "text/html" }).end(body);
  }
}).listen(4173, "127.0.0.1");
