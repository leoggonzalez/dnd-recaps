import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { libraryRecordSchema } from "../src/lib/asset-library-schema";
const root = resolve(".");
const index = JSON.parse(
  readFileSync(resolve(root, "src/model/index.json"), "utf8"),
) as { records: string[] };
const records = index.records.map((path) =>
  libraryRecordSchema.parse(
    JSON.parse(readFileSync(resolve(root, path), "utf8")),
  ),
);
const assets = records
  .flatMap((e) => e.assets)
  .filter((a) => a.status !== "retired" && a.encoding === "lossy-webp")
  .map((a) => ({
    id: a.id,
    path: a.path.replace("public/", ""),
    width: a.width,
    height: a.height,
    bytes: a.bytes,
    sha256: a.sha256,
    kind: a.kind,
    anchor: a.anchor,
  }));
const path = resolve("src/data/sessions/2026-10-28.json");
const session = JSON.parse(readFileSync(path, "utf8"));
const byId = new Map(assets.map((asset) => [asset.id, asset]));
session.coverAssetId = "camp-night-far";
session.environments = [
  {
    id: "caravan-camp-night",
    name: "Caravan resting for the night",
    layers: [
      { slot: "far", assetId: "camp-night-far", zIndex: 0 },
      { slot: "middle", assetId: "camp-night-middle", zIndex: 20 },
      { slot: "near", assetId: "camp-night-near", zIndex: 80 },
    ],
    overscan: 48,
    cameraLimit: 32,
  },
  {
    id: "caravan-camp",
    name: "Woodland caravan camp",
    layers: [
      { slot: "far", assetId: "camp-far", zIndex: 0 },
      { slot: "middle", assetId: "camp-middle", zIndex: 20 },
      { slot: "near", assetId: "camp-near", zIndex: 80 },
    ],
    overscan: 48,
    cameraLimit: 32,
  },
  {
    id: "tangled-forest",
    name: "Tangled woodland road",
    layers: [
      { slot: "far", assetId: "forest-far", zIndex: 0 },
      { slot: "middle", assetId: "forest-middle", zIndex: 20 },
      { slot: "near", assetId: "forest-near", zIndex: 80 },
    ],
    overscan: 48,
    cameraLimit: 32,
  },
];
const travel = (
  fromX: number,
  toX: number,
  delayMs: number,
  durationMs: number,
  fromY = 0,
  toY = 0,
) => ({
  preset: "translate",
  from: { x: fromX, y: fromY },
  to: { x: toX, y: toY },
  delayMs,
  durationMs,
  easing: "ease-out",
});
const actor = (
  id: string,
  assetId: string,
  x: number,
  y: number,
  width: number,
  zIndex: number,
  extra = {},
) => ({ id, assetId, position: { x, y }, width, zIndex, poses: [], ...extra });
session.scenes[0].artwork = "prototype";
session.scenes[0].environmentId = "caravan-camp-night";
session.scenes[0].description =
  "The caravan rests for the night. Twelve wagons stand parked in a long line behind five seated gamblers. Lucien and Arietta sit together; Balerias plays too. Sulesdeg and Tyjit keep watch.";
session.scenes[0].narration = [
  {
    id: "segment-1",
    text: "The long caravan had stopped for the night. Along the parked wagons, Samardag called a game of Three-Dragon Ante.",
    delayMs: 150,
    durationMs: 450,
  },
  {
    id: "segment-2",
    text: "Lucien and Arietta sat together at the cards, with Balerias playing too. Radecere brought a surprisingly substantial purse.",
    delayMs: 850,
    durationMs: 450,
  },
  {
    id: "segment-3",
    text: "Sulesdeg and Tyjit stood watch without joining.",
    delayMs: 1550,
    durationMs: 450,
  },
];
session.scenes[0].actors = [
  actor("night-guards", "camp-night-guards", 300, 790, 550, 35),
  actor("night-gamblers", "camp-night-gamblers", 1110, 1025, 1280, 50),
];
session.scenes[1].artwork = "prototype";
session.scenes[1].actors = [
  actor("walking-pair", "arietta-lucien", 960, 950, 610, 45, {
    motion: travel(70, -30, 100, 3500),
  }),
];
session.scenes[2].artwork = "prototype";
session.scenes[2].actors = [
  actor("oyn-watching", "oyn", 310, 825, 290, 30),
  actor("cage-rear", "cage-rear", 1290, 880, 860, 35),
  actor("captive-peryton", "peryton", 1315, 810, 610, 40, {
    motion: travel(55, -25, 1500, 1800),
  }),
  actor("cage-front", "cage-front", 1290, 880, 860, 45),
  actor("balerias-feeding", "balerias-ready", 850, 930, 400, 50, {
    poses: [{ assetId: "balerias-offering", startMs: 1200 }],
  }),
];
session.scenes[6].artwork = "prototype";
session.scenes[6].actors = [
  actor("horses-counterattack", "horses-counterattack", 1420, 590, 620, 30, {
    motion: { ...travel(-12, 0, 300, 700), preset: "recoil" },
  }),
  actor("lucien-rescuing", "lucien-casting", 390, 950, 500, 50, {
    motion: { ...travel(-10, 0, 1800, 450), preset: "lunge" },
  }),
  actor("silk-bound-horse", "webbed-horse", 1050, 900, 760, 40, {
    motion: travel(0, 55, 300, 1700),
  }),
  actor("horse-dragger", "ettercap-dragging", 1570, 910, 650, 45, {
    poses: [{ assetId: "ettercap-fallen", startMs: 2400 }],
  }),
];
const required = new Set<string>([session.coverAssetId]);
for (const environment of session.environments)
  for (const layer of environment.layers) required.add(layer.assetId);
for (const scene of session.scenes)
  for (const actor of scene.actors) {
    required.add(actor.assetId);
    for (const pose of actor.poses) required.add(pose.assetId);
  }
session.assets = [...required].map((id) => {
  const asset = byId.get(id);
  if (!asset) throw new Error(`Missing model asset: ${id}`);
  return asset;
});
writeFileSync(path, JSON.stringify(session, null, 2) + "\n");
console.log(
  `Assembled eight-scene manifest with ${session.assets.length} registered assets and four illustrated drafts`,
);
