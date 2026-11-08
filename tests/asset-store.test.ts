import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { AssetStore } from "../src/lib/asset-store";
import { sessions } from "../src/data";
const bytes = new Uint8Array([82, 73, 70, 70, 0, 0, 0, 0, 87, 69, 66, 80]);
const hash = createHash("sha256").update(bytes).digest("hex");
const fixture = () => ({
  ...structuredClone(sessions[0]),
  coverAssetId: "one",
  assets: [
    {
      id: "one",
      path: "assets/one.webp",
      width: 1,
      height: 1,
      bytes: bytes.length,
      sha256: hash,
      kind: "cover" as const,
      anchor: { x: 0, y: 1 },
    },
  ],
  environments: [],
  scenes: [{ ...structuredClone(sessions[0].scenes[0]), actors: [] }],
});
test("failed requests retry once, manual retry preserves successful retained bytes and disposes URLs", async () => {
  let attempts = 0;
  let fail = true;
  const revoked: string[] = [];
  const store = new AssetStore(fixture(), {
    fetch: async () => {
      attempts++;
      return fail
        ? new Response("", { status: 503 })
        : new Response(bytes, { headers: { "Content-Type": "image/webp" } });
    },
    createURL: () => "blob:one",
    revokeURL: (u) => revoked.push(u),
    decode: async () => ({}),
  });
  await assert.rejects(store.load(() => {}));
  assert.equal(attempts, 2);
  fail = false;
  await store.load(() => {});
  assert.equal(store.url("one"), "blob:one");
  await store.load(() => {});
  assert.equal(attempts, 3);
  await store.prepare(["one"]);
  store.dispose();
  assert.deepEqual(revoked, ["blob:one"]);
  await assert.rejects(
    store.load(() => {}),
    { name: "AbortError" },
  );
});
test("decode failure revokes temporary URLs and never passes the load gate", async () => {
  const revoked: string[] = [];
  const store = new AssetStore(fixture(), {
    fetch: async () =>
      new Response(bytes, { headers: { "Content-Type": "image/webp" } }),
    createURL: () => "blob:bad",
    revokeURL: (u) => revoked.push(u),
    decode: async () => {
      throw Error("corrupt");
    },
  });
  await assert.rejects(store.load(() => {}));
  assert.equal(revoked.length, 2);
  assert.throws(() => store.url("one"));
});
test("cancellation aborts in-flight fetch and late completion cannot report readiness", async () => {
  let signal: AbortSignal | undefined;
  let finish: (response: Response) => void = () => {};
  let reports = 0;
  const store = new AssetStore(fixture(), {
    fetch: async (_url, init) => {
      signal = init?.signal ?? undefined;
      return new Promise<Response>((resolve) => {
        finish = resolve;
      });
    },
    createURL: () => {
      throw Error("must not create URL");
    },
    revokeURL: () => {},
    decode: async () => ({}),
  });
  const pending = store.load(() => {
    reports++;
  });
  store.dispose();
  assert.equal(signal?.aborted, true);
  finish(new Response(bytes, { headers: { "Content-Type": "image/webp" } }));
  await assert.rejects(pending, { name: "AbortError" });
  assert.equal(reports, 1);
});
test("content hash mismatch blocks readiness", async () => {
  const store = new AssetStore(fixture(), {
    fetch: async () =>
      new Response(new Uint8Array(12), {
        headers: { "Content-Type": "image/webp" },
      }),
    createURL: () => {
      throw Error("must not create URL");
    },
    revokeURL: () => {},
    decode: async () => ({}),
  });
  await assert.rejects(store.load(() => {}));
});
