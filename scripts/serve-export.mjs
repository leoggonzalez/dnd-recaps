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
  ".mp3": "audio/mpeg",
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
    const contentType = types[extname(file)] ?? "application/octet-stream";
    const headers = {
      "Content-Type": contentType,
      "Content-Length": body.length,
    };
    if (contentType === "audio/mpeg") {
      headers["Accept-Ranges"] = "bytes";
      const range = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range ?? "");
      if (range) {
        const start = Number(range[1]);
        const end = range[2]
          ? Math.min(Number(range[2]), body.length - 1)
          : body.length - 1;
        if (start > end) {
          res
            .writeHead(416, { "Content-Range": `bytes */${body.length}` })
            .end();
          return;
        }
        res
          .writeHead(206, {
            ...headers,
            "Content-Length": end - start + 1,
            "Content-Range": `bytes ${start}-${end}/${body.length}`,
          })
          .end(body.subarray(start, end + 1));
        return;
      }
    }
    res.writeHead(200, headers).end(body);
  } catch {
    const body = await readFile(resolve(root, "404.html"));
    res.writeHead(404, { "Content-Type": "text/html" }).end(body);
  }
}).listen(4000, "127.0.0.1");
