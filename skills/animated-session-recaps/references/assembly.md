# Runtime assembly and validation

## Prepare and register art

1. Save the selected source PNG under `public/assets/sources/<asset-id>-v1.png` and keep the original in that ignored local archive. Preserve previous variants by giving revisions distinct IDs. The checked-in assets are the selected WebPs in `public/assets/<category>/`. Source PNGs and experiments are kept outside Git.
2. Record the prompt, tool, source and archive path in the session’s `src/data/sessions/DD.MM.YYYY/art/generation-prompts.json`. Follow the [model guide](../../../src/model/README.md) for the catalog record, `src/model/index.json`, descriptions, anchors and provenance. Shared entries use the same ID, dimensions, path and hash and are tagged `shared-composition` where listed on participants.
3. For October assets, add a recipe to `src/data/art/production-recipes.json` and run `npm run assets:build -- --asset <asset-id>` with repeated flags for additional IDs. **The builder currently hardcodes October prompt provenance.** For another session, use the generic preparer and register its report with the correct provenance, or extend the builder before using it. Example:

   ```sh
   npm run prepare-asset -- public/assets/sources/example-v1.png assets/characters/example-v1.webp 640 800 cutout lossy
   ```

   The preparer writes the WebP and a report under `src/data/art/reports/`. Copy exact dimensions, byte size and SHA-256 into the relevant records. Choose a full matching frame for every pose. Check real transparent pixels, since a file having an alpha channel does not guarantee a transparent backdrop. Optimize to the hard limits of 750,000 bytes per background, 300,000 per cutout and 20,000,000 per session. Reduce dimensions consistently across poses if necessary.

## Runtime contract

The [runtime Zod schema](../../../src/lib/schema.ts) is authoritative. Do not use the separate model catalog schema as a session schema. IDs are unique within their collections, use lowercase letters/digits with hyphens, and form stable deep links.

| Record | Fields and constraints |
| --- | --- |
| Session | `schemaVersion: 1`, `id`, `title`, ISO `date`, `displayDate`, `inWorldDate`, `location`, `summary`, `status` (`draft` or `published`), `coverAssetId` (nullable for drafts), `assets`, `environments`, `scenes`. Published sessions require a cover, artwork and valid environments throughout. |
| Asset | `id`, `path` (runtime `assets/…webp`, no `public/`), positive integer `width`, `height`, `bytes`, lowercase hex `sha256`, `kind` (`background`, `cutout`, `prop`, `effect`, `cover`), normalized `anchor: {x,y}` between 0 and 1. Include all base and alternate pose assets. |
| Environment | `id`, `name`, `layers` in `far`, `middle`, `near` order, each with `slot`, `assetId`, and increasing integer `zIndex`. The middle may have `offsetY` in logical units. Set `overscan >= cameraLimit`; start with 48 and 32. |
| Scene | `id`, `title`, `environmentId`, `description` (accessible summary of the picture), positive `durationMs`, `narration`, optional `narrationAudio` (an MP3 path under `assets/audio/`), `artwork` (`planned`, `prototype`, `complete`), `actors`, `reducedMotion: "final"`. Use `planned` for a draft placeholder. |
| Actor | `id`, `assetId`, `position: {x,y}`, positive `width`, integer `zIndex`, `poses` (possibly empty). Optional `poseLoopMs`, `flipX`, `opacity`, `effect: "invisibility"`, and `motion`. Coordinates and width use the 1920 × 1080 logical stage. The position is the asset anchor, and height follows the asset aspect ratio. |
| Motion | `preset`: `translate`, `fade`, `recoil`, `lunge`, `rise`, or `projectile`. Provide `from` and `to` offset points, `delayMs`, `durationMs`, and `easing`: `linear`, `ease-in`, `ease-out`, or `ease-in-out`. End within scene duration. The projectile preset hides the actor before and after its travel. |
| Pose and narration | Pose `{assetId,startMs,fadeMs?}` cues are strictly increasing within duration. An optional crossfade starts at the cue and finishes before the next pose. Omit it for a hard switch. Set `poseLoopMs` on the actor for repeating local poses independent of narration time. Use at least one alternate pose strictly inside the loop. Keep the subject registered across frames and make the final pose readable in reduced motion. Frame dimensions and anchors must match the base. Narration entries use `{id,text,delayMs,durationMs}` and fit within scene duration. Begin the first line at zero and reveal later lines alongside their action cues. |

## Wire and preview

- Add the JSON in `src/data/sessions/YYYY-MM-DD.json`, and keep the source recap and storyboard beside it. Import the JSON and add `sessionSchema.parse(...)` to the exported array in [src/data/index.ts](../../../src/data/index.ts). The library and static session routes use this array.
- Edit the manifest directly for a new session. For October, change [the assembler](../../../scripts/assemble-prototype.ts) for any staging it owns, then run `npm run assets:assemble`. Running the October assembler after editing its generated fields directly can overwrite those edits.
- Use one environment per scene. Reserve alternate poses for local actors and props. Keep all planned background zones visible in the held composition.
- Start at depths 0/20/80 for the backgrounds. Fit actors between the middle and near layers, then order their contact and occlusion explicitly. Compare multiple poses at the same location before adding movement.
- The player preloads and verifies referenced illustration assets, deduplicating by hash. Optional MP3 narration loads when requested and is included in the static export. It includes alternate poses and the cover. Build compiles the pose CSS and prunes exported art to manifest paths. Keep the manifest limited to runtime assets and make sure previews use the same base path as the build.
- Artwork ink reveal, drift, actor motion and narration share scene time. Far, middle and near reveal in sequence, then props and actors. Mouse parallax begins after the entrance. Replay resets the scene, pause stops the clock, and reduced motion shows the final pose and readable narration. Keep the settled scene readable for as long as it stays open. Use existing pointer parallax for ongoing movement, or a supported subtle idle loop. Check that reduced motion shows the settled composition without continuous movement.

```sh
npm run validate
npm run lint
npm run typecheck
npm test
NEXT_PUBLIC_BASE_PATH=/dnd-recaps npm run build
npm run test:browser
```

For manual preview, run `node scripts/serve-export.mjs` and open `http://127.0.0.1:4000/dnd-recaps/`. To check a root build, explicitly set `NEXT_PUBLIC_BASE_PATH=''` for the build and preview/test commands. Use a deep link of the form `sessions/<session-id>/#scene=<scene-id>`. Look for 404s or hash mismatches, check that the scene is ready and the correct layers decode, then review key frames, touch layout and reduced motion. Refresh size and hash metadata after encoding, and regenerate pose CSS through the build after changing poses.

For authorized publishing, use the existing [Pages workflow](../../../.github/workflows/deploy-pages.yml). It exports under `/dnd-recaps`. Verify the hosted library, direct session URL, and required WebPs after the run. A Git push alone does not run the manual Pages workflow.

## Disposable working example

Run this snippet from an isolated copy of the project. It creates a valid draft with one three-layer scene, a moving actor and an alternate pose using registered October artwork. The copied bytes are already verified by the ordinary validators.

```sh
node --import tsx --input-type=commonjs <<'JS'
const { readFileSync, writeFileSync } = require("node:fs");
const { assetGraph, sessionSchema } = require("./src/lib/schema.ts");

const october = JSON.parse(readFileSync("src/data/sessions/2026-10-28.json", "utf8"));
const environment = october.environments.find(e => e.id === "caravan-camp-night");
const actor = {
  id: "fixture-balerias",
  assetId: "balerias-ready",
  position: { x: 960, y: 935 },
  width: 400,
  zIndex: 40,
  poses: [{ assetId: "balerias-offering", startMs: 1200 }],
  motion: { preset: "translate", from: { x: -30, y: 0 }, to: { x: 0, y: 0 },
    delayMs: 100, durationMs: 1000, easing: "ease-out" },
};
const ids = new Set([actor.assetId, ...actor.poses.map(p => p.assetId),
  ...environment.layers.map(l => l.assetId)]);
const fixture = sessionSchema.parse({
  schemaVersion: 1, id: "recap-skill-fixture", title: "Disposable skill check",
  date: october.date, displayDate: october.displayDate, inWorldDate: october.inWorldDate,
  location: october.location, summary: "Check layers and an alternate pose.",
  status: "draft", coverAssetId: environment.layers[0].assetId,
  assets: october.assets.filter(a => ids.has(a.id)), environments: [environment],
  scenes: [{ id: "fixture-beat", title: "Fixture beat", environmentId: environment.id,
    description: "A ranger moves into the camp and extends an offering.",
    durationMs: 2400, artwork: "prototype", reducedMotion: "final", actors: [actor],
    narration: [{ id: "fixture-line", text: "The ranger offers food.", delayMs: 0, durationMs: 450 }] }],
});
if (assetGraph(fixture).length !== 5 || !assetGraph(fixture).some(a => a.id === "balerias-offering"))
  throw new Error("Expected three backgrounds and both poses in the preload graph");
writeFileSync("src/data/sessions/recap-skill-fixture.json", JSON.stringify(fixture, null, 2));
writeFileSync("src/data/index.ts",
  'import fixture from "./sessions/recap-skill-fixture.json";\n' +
  'import { sessionSchema } from "../lib/schema";\n' +
  'export const sessions = [sessionSchema.parse(fixture)];\n');
JS
npm run validate
NEXT_PUBLIC_BASE_PATH=/dnd-recaps npm run build
```

Check `out/sessions/recap-skill-fixture/index.html` and all five WebPs in `out/assets/`. Open the fixture through the subpath preview and check both poses. Discard the isolated copy afterward.
