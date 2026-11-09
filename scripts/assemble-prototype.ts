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
      { slot: "middle", assetId: "camp-night-merchant-line", zIndex: 20 },
      { slot: "near", assetId: "camp-night-near", zIndex: 80 },
    ],
    overscan: 48,
    cameraLimit: 32,
  },
  {
    id: "sleeping-space",
    name: "Inside the sleeping wagon",
    layers: [
      { slot: "far", assetId: "wagon-interior-far", zIndex: 0 },
      {
        slot: "middle",
        assetId: "wagon-interior-middle",
        zIndex: 20,
        offsetY: 110,
      },
      { slot: "near", assetId: "wagon-interior-near", zIndex: 80 },
    ],
    overscan: 48,
    cameraLimit: 32,
  },
  {
    id: "woodland-road",
    name: "Caravan road in morning light",
    layers: [
      { slot: "far", assetId: "day-road-far", zIndex: 0 },
      { slot: "middle", assetId: "day-road-middle", zIndex: 20 },
      { slot: "near", assetId: "day-road-near", zIndex: 80 },
    ],
    overscan: 48,
    cameraLimit: 32,
  },
  {
    id: "private-trail",
    name: "Secluded woodland trail",
    layers: [
      { slot: "far", assetId: "day-private-trail", zIndex: 0 },
      { slot: "middle", assetId: "day-road-middle", zIndex: 20 },
      { slot: "near", assetId: "day-road-near", zIndex: 80 },
    ],
    overscan: 48,
    cameraLimit: 32,
  },
  {
    id: "deep-forest",
    name: "Root-tangled woodland interior",
    layers: [
      { slot: "far", assetId: "deep-forest-far", zIndex: 0 },
      { slot: "middle", assetId: "deep-forest-middle", zIndex: 20 },
      { slot: "near", assetId: "deep-forest-near", zIndex: 80 },
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
  "The caravan rests for the night. Merchant wagons with paired draft horses stand in a long line behind five seated gamblers. Lucien and Arietta sit together; Balerias plays too. Sulesdeg and Tyjit keep watch.";
session.scenes[0].narration = [
  {
    id: "segment-1",
    text: "The long caravan had stopped for the night. Along the parked wagons, Samardag called a game of Three-Dragon Ante.",
    delayMs: 0,
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
session.scenes[1].environmentId = "caravan-camp-night";
session.scenes[1].description =
  "Lucien and Arietta walk arm in arm past the lantern-lit wagons while the caravan rests for the night.";
session.scenes[1].actors = [
  actor("walking-pair", "arietta-lucien", 960, 950, 610, 45, {
    motion: travel(70, -30, 100, 3500),
  }),
];
session.scenes[2].artwork = "prototype";
session.scenes[2].environmentId = "caravan-camp-night";
session.scenes[2].description =
  "Balerias offers food to the caged peryton by lanternlight. Oyn watches from nearby, a step back from the bars. The merchant wagons are parked behind them.";
session.scenes[2].actors = [
  actor("oyn-watching", "oyn", 550, 850, 290, 30),
  actor("cage-rear", "cage-rear", 1290, 880, 860, 35),
  actor("captive-peryton", "peryton", 1315, 810, 610, 40, {
    motion: travel(55, -25, 1500, 1800),
  }),
  actor("cage-front", "cage-front", 1290, 880, 860, 45),
  actor("balerias-feeding", "balerias-ready", 850, 930, 400, 50, {
    poses: [{ assetId: "balerias-offering", startMs: 1200 }],
  }),
];
session.scenes[3].artwork = "prototype";
session.scenes[3].description =
  "Inside the wagon at night, Arietta and Zelina sleep behind an open journal and a healing potion. A translucent blue outline suggests the invisible Lucien as the Emerald Pen writes.";
session.scenes[3].actors = [
  actor("lucien-unseen", "lucien-invisible-blue", 1110, 945, 870, 48, {
    effect: "invisibility",
    flipX: true,
  }),
  actor("open-journal", "journal-and-potion", 505, 1050, 730, 45),
  actor("writing-pen", "emerald-pen", 690, 884, 125, 50, {
    motion: travel(-20, 0, 1150, 1950, -8, 0),
  }),
];
session.scenes[4].artwork = "prototype";
const cultTeams = [
  { x: 360, y: 560, width: 365 },
  { x: 775, y: 650, width: 445 },
  { x: 1270, y: 748, width: 525 },
];
session.scenes[4].actors = [
  ...cultTeams.flatMap(({ x, y, width }, index) => {
    const id = `cult-team-${index + 1}`;
    const depth = 25 + index * 5;
    const motion = travel(-65, 0, 0, 3900);
    return [
      actor(id, "cult-wagon-team", x, y, width, depth, { motion }),
      actor(
        `${id}-driver`,
        "cult-guard-driver",
        x - width * 0.066,
        y - width * 0.155,
        width * 0.22,
        depth + 1,
        { motion },
      ),
      ...[-0.47, -0.34, -0.21, -0.08, 0.08].map((offset, guardIndex) =>
        actor(
          `${id}-escort-${guardIndex + 1}`,
          "cult-escort",
          x + width * offset,
          y + (guardIndex % 2 ? 35 : 14),
          width * 0.16,
          depth + 2,
          { motion, flipX: guardIndex === 0 || guardIndex === 2 },
        ),
      ),
    ];
  }),
  actor("aldrik-observing", "aldrik-riding-watch", 1630, 1010, 470, 58, {
    motion: travel(-130, 0, 0, 4200),
  }),
];
session.scenes[5].artwork = "prototype";
session.scenes[5].actors = [
  actor("private-walk", "aldrik-balerias-private-walk", 985, 1010, 690, 45, {
    motion: travel(-72, 0, 100, 3700),
  }),
];
const mountedShot = session.scenes[6];
mountedShot.artwork = "prototype";
mountedShot.description =
  "Giant spiders attack the caravan and guards fight them farther back. Lucien and Coppercoil defend the lead wagon as an ettercap lunges at its left draft horse. Coppercoil summons Coppergoat to charge the attacker. Aldrik hangs sideways from his saddle on the right and fires beneath his horse’s neck.";
mountedShot.narration = [
  {
    id: "segment-1",
    text: "Giant spiders rushed the caravan and the guards braced their spears. An ettercap lunged at the lead wagon’s left horse.",
    delayMs: 0,
    durationMs: 450,
  },
  {
    id: "segment-2",
    text: "Lucien fought from the bench while Coppercoil summoned Coppergoat and sent it charging at the ettercap.",
    delayMs: 700,
    durationMs: 450,
  },
  {
    id: "segment-3",
    text: "Riding on the right, Aldrik hooked a leg over his saddle, dropped sideways and fired his light crossbow beneath his horse’s neck at the ettercap.",
    delayMs: 1500,
    durationMs: 450,
  },
];
const convoy = [
  [595, 995, 980],
  [1110, 745, 340],
  [1240, 619, 254],
  [1315, 530, 188],
  [1350, 469, 138],
  [1370, 429, 104],
  [1382, 399, 78],
  [1390, 375, 57],
  [1396, 358, 42],
  [1401, 345, 31],
];
mountedShot.actors = [
  ...convoy.map(([x, y, width], index) =>
    actor(
      `forest-wagon-${index + 1}`,
      index === 0 ? "lead-wagon-under-attack" : "forest-convoy-wagon",
      x,
      y,
      width,
      index === 0 ? 46 : 39 - index,
      {
        motion:
          index === 0
            ? { ...travel(18, 0, 1000, 700), preset: "recoil" }
            : travel(width * 0.08, 0, 0, 4300, -width * 0.065, 0),
      },
    ),
  ),
  actor("guards-versus-spiders", "forest-spider-defense", 345, 570, 540, 28, {
    motion: { ...travel(-14, 0, 550, 900), preset: "recoil" },
  }),
  actor("coppergoat-charging", "coppergoat-charge", 348, 1004, 220, 51, {
    motion: { ...travel(425, 0, 1250, 1050, -85, 0), preset: "fade" },
  }),
  actor("aldrik-hanging-shot", "aldrik-sideways-shot", 1560, 1000, 675, 54, {
    motion: travel(43, 0, 0, 1800),
  }),
  actor("aldrik-crossbow-bolt", "forest-crossbow-bolt", 395, 685, 72, 56, {
    motion: {
      ...travel(880, 0, 2000, 420, 45, 0),
      preset: "projectile",
      easing: "linear",
    },
  }),
];
session.scenes[7].artwork = "prototype";
session.scenes[7].environmentId = "deep-forest";
session.scenes[7].description =
  "Off the caravan road, an ettercap drags a silk-bound horse across uneven, root-covered ground toward denser trees. Lucien stops it while Strawberry Three and Mo Two fight back farther behind.";
session.scenes[7].narration[2].text =
  "An ettercap wrapped a horse in silk and dragged it over the roots, deeper into the trees.";
session.scenes[7].actors = [
  actor("horses-counterattack", "horses-counterattack", 1420, 590, 620, 30, {
    motion: { ...travel(-12, 0, 300, 700), preset: "recoil" },
  }),
  actor("lucien-rescuing", "lucien-casting", 390, 950, 500, 50, {
    motion: { ...travel(-10, 0, 1800, 450), preset: "lunge" },
  }),
  actor("silk-bound-horse", "webbed-horse", 1050, 900, 760, 40, {
    motion: travel(0, 55, 300, 1700, 24, 0),
  }),
  actor("horse-dragger", "ettercap-dragging", 1570, 910, 650, 45, {
    poses: [{ assetId: "ettercap-fallen", startMs: 2400 }],
  }),
];
const cocoonScene = session.scenes[8];
cocoonScene.artwork = "prototype";
cocoonScene.environmentId = "deep-forest";
cocoonScene.description =
  "On the same forest floor, Lucien kneels and cuts open a cocoon with a knife while Coppercoil, Balerias and Aldrik watch. Inside, a dead woman clutches a rolled scroll beside a silver cloak pin and scattered gold.";
cocoonScene.narration = [
  {
    id: "segment-1",
    text: "After the fight, Lucien knelt beside a silk cocoon. Coppercoil, Balerias and Aldrik gathered around.",
    delayMs: 0,
    durationMs: 450,
  },
  {
    id: "segment-2",
    text: "Lucien cut the silk with his knife. A dead woman lay inside, clutching a scroll.",
    delayMs: 1450,
    durationMs: 450,
  },
  {
    id: "segment-3",
    text: "The company recovered it, a silver cloak pin, and seventy-six gold pieces.",
    delayMs: 2200,
    durationMs: 450,
  },
  {
    id: "segment-4",
    text: "What the scroll contained—and why she had held it so tightly—remained unknown.",
    delayMs: 3000,
    durationMs: 450,
  },
];
cocoonScene.actors = [
  actor("cocoon-onlookers", "cocoon-party-observers", 720, 820, 705, 34),
  actor("opened-cocoon", "cocoon-closed", 1155, 1000, 685, 44, {
    poses: [{ assetId: "cocoon-open-loot", startMs: 1450 }],
  }),
  actor("lucien-cutting", "lucien-cutting-cocoon", 738, 996, 545, 49, {
    motion: { ...travel(-23, 0, 850, 600, -10, 0), preset: "lunge" },
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
  `Assembled ${session.scenes.length}-scene manifest with ${session.assets.length} registered assets and ${session.scenes.filter((scene: { artwork: string }) => scene.artwork === "prototype").length} illustrated drafts`,
);
