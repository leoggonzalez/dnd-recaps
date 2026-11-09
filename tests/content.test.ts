import assert from "node:assert/strict";
import { test } from "node:test";
import { sessions } from "../src/data";
import { sessionSchema, assetGraph } from "../src/lib/schema";
import { assetUrl } from "../src/lib/urls";
const draft = sessions[0];
const asset = (id: string, hash: string) => ({
  id,
  path: `assets/${id}.webp`,
  width: 100,
  height: 100,
  bytes: 20,
  sha256: hash.repeat(64),
  kind: "cutout",
  anchor: { x: 0, y: 1 },
});
test("complete narrative draft has nine distinct ordered scenes", () => {
  assert.equal(draft.scenes.length, 9);
  assert.equal(draft.scenes[0].id, "a-little-luck");
  assert.equal(draft.scenes.at(-1)?.id, "the-cocoons-secret");
});
test("schema rejects invalid references, poses, duplicate IDs, and timing", () => {
  const bad = structuredClone(draft);
  bad.scenes[1].id = bad.scenes[0].id;
  assert.equal(sessionSchema.safeParse(bad).success, false);
  const timing = structuredClone(draft);
  timing.scenes[0].narration[0].delayMs = 5000;
  assert.equal(sessionSchema.safeParse(timing).success, false);
  assert.equal(
    sessionSchema.safeParse({ ...draft, status: "published" }).success,
    false,
  );
  const pose = structuredClone(draft);
  pose.scenes[0].actors.push({
    id: "actor",
    assetId: "absent",
    position: { x: 0, y: 0 },
    width: 100,
    zIndex: 1,
    poses: [{ assetId: "also-absent", startMs: 5000 }],
  });
  assert.equal(sessionSchema.safeParse(pose).success, false);
});
test("asset graph includes alternate poses and deduplicates shared hashes", () => {
  const input = {
    ...draft,
    assets: [
      asset("standing", "a"),
      asset("shooting", "b"),
      asset("same-standing", "a"),
    ],
    scenes: structuredClone(draft.scenes),
    environments: [],
    coverAssetId: null,
  };
  input.scenes.forEach((scene) => {
    scene.actors = [];
  });
  input.scenes[0].actors = [
    {
      id: "actor",
      assetId: "standing",
      position: { x: 0, y: 0 },
      width: 100,
      zIndex: 30,
      poses: [{ assetId: "shooting", startMs: 2000 }],
    },
  ];
  input.scenes[1].actors = [
    {
      id: "actor",
      assetId: "same-standing",
      position: { x: 0, y: 0 },
      width: 100,
      zIndex: 30,
      poses: [],
    },
  ];
  assert.deepEqual(
    assetGraph(sessionSchema.parse(input)).map((a) => a.id),
    ["standing", "shooting"],
  );
});
test("asset resolver handles root/subpath and rejects external/traversal paths", () => {
  assert.equal(assetUrl("assets/camp.webp", ""), "/assets/camp.webp");
  assert.equal(
    assetUrl("assets/camp.webp", "/dnd-recaps"),
    "/dnd-recaps/assets/camp.webp",
  );
  for (const path of [
    "../private.webp",
    "assets/../private.webp",
    "https://example.com/a.webp",
    "assets/a.png",
  ])
    assert.throws(() => assetUrl(path));
});
