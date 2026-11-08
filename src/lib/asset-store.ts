import type { Session } from "./schema";
import { assetGraph } from "./schema";
import { assetUrl } from "./urls";
export type Progress = { ready: number; total: number; failed: number };
type Asset = Session["assets"][number];
type Entry = { blob: Blob; url: string };
type Runtime = {
  fetch: typeof fetch;
  createURL: (blob: Blob) => string;
  revokeURL: (url: string) => void;
  decode: (url: string) => Promise<unknown>;
};
const browserRuntime: Runtime = {
  fetch: (...args) => fetch(...args),
  createURL: (blob) => URL.createObjectURL(blob),
  revokeURL: (url) => URL.revokeObjectURL(url),
  decode: async (url) => {
    const image = new Image();
    image.src = url;
    await image.decode();
    return image;
  },
};
export function sceneAssetIds(session: Session, index: number): string[] {
  const scene = session.scenes[index];
  const ids = new Set<string>();
  session.environments
    .find((e) => e.id === scene.environmentId)
    ?.layers.forEach((l) => ids.add(l.assetId));
  scene.actors.forEach((a) => {
    ids.add(a.assetId);
    a.poses.forEach((p) => ids.add(p.assetId));
  });
  return [...ids];
}
async function pool<T>(
  values: T[],
  worker: (value: T) => Promise<void>,
  concurrency = 4,
) {
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(concurrency, values.length) }, async () => {
      while (next < values.length) await worker(values[next++]);
    }),
  );
}
export class AssetStore {
  private entries = new Map<string, Entry>();
  private decoded = new Map<string, unknown>();
  private retainedHashes: Set<string> | null = null;
  private decoding = new Map<string, Promise<unknown>>();
  private failures = new Set<string>();
  private decodeSlots = 0;
  private decodeQueue: Array<() => void> = [];
  private controller = new AbortController();
  private disposed = false;
  private assets: Asset[];
  constructor(
    private session: Session,
    private runtime: Runtime = browserRuntime,
  ) {
    this.assets = assetGraph(session);
  }
  private asset(id: string) {
    const asset = this.session.assets.find((a) => a.id === id);
    if (!asset) throw new Error(`Unknown asset: ${id}`);
    return asset;
  }
  url(id: string) {
    const entry = this.entries.get(this.asset(id).sha256);
    if (!entry) throw new Error(`Asset not ready: ${id}`);
    return entry.url;
  }
  private active() {
    if (this.disposed) throw new DOMException("Recap closed", "AbortError");
  }
  private async decode(url: string) {
    if (this.decodeSlots < 4) this.decodeSlots += 1;
    else await new Promise<void>((resolve) => this.decodeQueue.push(resolve));
    try {
      this.active();
      return await this.runtime.decode(url);
    } finally {
      const next = this.decodeQueue.shift();
      if (next) next();
      else this.decodeSlots -= 1;
    }
  }
  async load(onProgress: (progress: Progress) => void) {
    this.active();
    this.failures.clear();
    const report = () => {
      if (!this.disposed)
        onProgress({
          ready: this.entries.size,
          total: this.assets.length,
          failed: this.failures.size,
        });
    };
    report();
    await pool(
      this.assets.filter((a) => !this.entries.has(a.sha256)),
      async (asset) => {
        for (let attempt = 0; attempt < 2; attempt++) {
          let url: string | undefined;
          try {
            this.active();
            const response = await this.runtime.fetch(assetUrl(asset.path), {
              signal: this.controller.signal,
              cache: "no-cache",
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const blob = await response.blob();
            if (!blob.type.startsWith("image/") || blob.size !== asset.bytes)
              throw new Error("Invalid image response");
            const bytes = await blob.arrayBuffer();
            const hash = Array.from(
              new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)),
              (b) => b.toString(16).padStart(2, "0"),
            ).join("");
            if (hash !== asset.sha256)
              throw new Error("Image content hash mismatch");
            this.active();
            url = this.runtime.createURL(blob);
            await this.decode(url);
            this.active();
            this.entries.set(asset.sha256, { blob, url });
            report();
            return;
          } catch (error) {
            if (url) this.runtime.revokeURL(url);
            if (
              this.disposed ||
              (error instanceof DOMException && error.name === "AbortError")
            )
              throw error;
            if (attempt === 1) {
              this.failures.add(asset.id);
              report();
            }
          }
        }
      },
    );
    this.active();
    if (this.failures.size)
      throw new Error(`${this.failures.size} images could not be loaded`);
  }
  async prepare(ids: string[]) {
    this.active();
    await pool(
      [...new Set(ids.map((id) => this.asset(id).sha256))],
      async (hash) => {
        if (this.decoded.has(hash)) return;
        let pending = this.decoding.get(hash);
        if (!pending) {
          const entry = this.entries.get(hash);
          if (!entry) throw new Error("Required image has not downloaded");
          pending = this.decode(entry.url).then((image) => {
            this.active();
            if (!this.retainedHashes || this.retainedHashes.has(hash))
              this.decoded.set(hash, image);
            return image;
          });
          this.decoding.set(hash, pending);
        }
        try {
          await pending;
        } finally {
          this.decoding.delete(hash);
        }
      },
    );
  }
  retainDecoded(ids: string[]) {
    const hashes = new Set(ids.map((id) => this.asset(id).sha256));
    this.retainedHashes = hashes;
    for (const hash of this.decoded.keys())
      if (!hashes.has(hash)) this.decoded.delete(hash);
  }
  dispose() {
    this.disposed = true;
    this.controller.abort();
    for (const entry of this.entries.values())
      this.runtime.revokeURL(entry.url);
    this.entries.clear();
    this.decoded.clear();
    this.decoding.clear();
  }
}
