# Implementation status

Updated 8 November 2026. Repository: https://github.com/leoggonzalez/dnd-recaps.

## Approved scope

The app uses **nine scenes from `src/data/sessions/28.10.2026/storyboard.md`** after splitting the daylight wagon watch and private conversation. The user authorized artwork from the implementation plan. The three-scene validation prototype is now 01/03/07; scene 02 reuses the camp/pair assets without commissioning another scene. Current character records take precedence over older prompt descriptions, including Lucien’s cropped hair and trimmed beard.

## Implemented

- **A — Content:** nine-scene animated storyboard and condensed narration, environment/pose inventory, explicit visual uncertainties and battle-count caveat; existing PNG references preserved and audited.
- **B — Foundation:** static Next.js app, session library/generated route, design tokens, typed content validation, asset URL resolver/graph, CI and manual deployment workflow.
- **C — Renderer/playback:** responsive 16:9 layered stage, numeric depth ordering, normalized anchors and shared pose frames, short CSS parallax/motion, build-time discrete pose keyframes, narration fades, coordinated scene readiness, pause/replay, keyboard controls, hash links/history, visibility pause and reduced-motion final compositions.
- **D — Loader/pipeline:** bounded full-recap fetch/decode validation, HTTP/MIME/size/hash checks, honest progress, one automatic retry then manual retry with successes retained, cancellation/stale-response guards, recap-scoped Blobs/object URLs and cleanup, destination preparation and adjacent-scene decoded retention. WebP preparation supports deterministic sizing and lossy/near-lossless comparisons, metadata hashes and size budgets.
- **E — Prototype drafts:** scene 01 card game; scene 03 separate rear cage/peryton/front bars and Balerias pose switch; scene 07 timed rescue/ettercap defeat with horses’ counterattack behind. Scene 02 reuses the walking pair. Generated images are integrated as actual WebP layers/cutouts, not flattened still illustrations.
- **Reusable register:** `src/model/` contains categorized entity JSON records. Each entity has an `assets` array, and every asset has an individual description and repository-relative image path. Records include canonical references, reuse conditions, tags, dimensions, hashes, alpha, anchors, source archive/provenance and variant status. `assets:find`, `assets:build` and `validate:library` support future reuse. Original generations are preserved locally in the ignored `public/assets/sources/` archive.

## Still missing

- **Remaining artwork/assembly:** scene 09 (cocoon discovery) still uses a labelled placeholder. Nine scenes have narration and eight have layered artwork drafts.
- **Prototype acceptance:** inspect all three focal prototype animations and pose alignment, alpha edges and small-screen legibility; real mobile memory/loading review remains outstanding. The local screenshots and mobile browser emulation are useful evidence, not a substitute for actual mobile hardware.
- **Hardening:** extend manual visual/performance review across browsers; test throttled/slow decodes and interruption on real devices; measure peak memory and cold-load time before scaling artwork. The decoded retention policy is implemented, but physical-device memory performance is not yet measured.
- **Release:** GitHub Pages and CI are configured and the initial draft deployed successfully. Verify each new hosted revision and complete the remaining release checklist. Publishing the draft does not complete the full-artwork or real-device release gates.
- **Final authoring skill:** create and verify only after the full nine-scene app and release checks work, as required by section 17 of the plan.

## Verification

Focused tests cover content/reference/timing validation, pose intervals, loading failures/retries, corrupt decodes, cancellation/late completion, URL revocation and hash mismatches. Browser checks cover root/subpath navigation, deep reloads, invalid links, history, boundaries, keyboard/rapid navigation, pause/replay/reduced motion, exported 404, retry without redownloading successful assets, and navigation through all nine drafts while offline after complete readiness. Responsive screenshots of prototype scenes are reviewed during this increment. Latest run: lint and typecheck pass, nine unit tests pass, and all 40 browser checks pass across Chromium, Firefox, WebKit and mobile emulation at each of root and `/dnd-recaps` (80 checks total). Both updated project skills and all local documentation links validate. Root and repository-subpath static builds are verified. Exact before/after pose-cue and ink-reveal checkpoints also pass.

The merged register now has 34 entities and 61 unique images, including portraits and legacy references; 40 selected active images total 6,261,996 bytes and pass per-image/recap budgets. Exact dimensions, bytes and hashes live in the register and session manifest. All images are stored locally under `public/assets/`, but postbuild pruning exports only selected runtime WebP images. Source PNGs, portraits, legacy stills, canonical sheets and model JSON are excluded from the static release.

## Repository state

`origin` targets `https://github.com/leoggonzalez/dnd-recaps`. The current draft is published through the manual GitHub Pages workflow when dispatched on `main`. Local Node is 23.9; use `.nvmrc` (Node 24) for supported ongoing development and CI. Existing user-created Yarn lockfiles were preserved; the application’s CI uses its npm lockfile. Next’s bundler root is the repository root; the app routes are in `src/app/`.

## Presentation update

The scene’s controls now float along the bottom of the artwork with parchment/ink styling. Desktop mouse users see them on scene hover; keyboard focus reveals them and touch users retain visible controls. Native buttons, the scene selector, boundaries and shortcuts are preserved. The toolbar remains mounted through replay/navigation so focus survives.

Each illustrated scene now opens with native CSS ink-bloom masks: far, middle, near, props, then character/creature cutouts. Parallax, actor motion and pose cues run on the original scene timeline during the ink reveal; the cutout reveals begin sooner so short actions remain visible. The first narration line starts with the artwork, and later lines keep their authored timing. Pause/replay/visibility coordinate the reveal with the story, and reduced motion skips the opening. Runtime image assets and the eight-scene scope are unchanged.

Presentation checks now run in Chromium, Firefox, WebKit and mobile emulation. They inspect hover/focus/touch states and bounds, exact staged-reveal checkpoints, interpolated mask growth, pose timing and simultaneous motion/mask progression, reduced motion, and replay focus/reset behavior. CI installs all three browser engines. Full app/release/artwork work listed above remains outstanding.

## Repository reorganization and deployment

The Next.js package/config/scripts now run from the repository root. Runtime code is under `src/app`, `src/components` and `src/lib`; session sources/manifests and recipes are under `src/data`; canonical entities are under `src/model`. Party sheets and asset arrays are merged into six complete character files, with the four existing complete NPC files and two provisional game-participant records directly under `src/model/npcs`. Shared and legacy images are mentioned in the relevant entities’ asset arrays. All prior character fields and all 54 image file hashes were preserved during the moves.

Images are consolidated in `public/assets/`, including supplied portraits, original scene stills and the ignored source archive. The postbuild script keeps only selected runtime manifest files in `out/assets`, and preparation preserves merged sheets and non-recipe assets. Documentation, project skills, imports, aliases, CI, validators and asset lookup paths are updated for the root layout. Earlier Yarn lockfiles were preserved under `docs/legacy/package-manager-locks/`; npm’s lockfile is the active app lockfile.

The user authorized a GitHub Pages deployment after these checks. Review URL: `https://leoggonzalez.github.io/dnd-recaps/`. GitHub Actions records the deployed commit and the result of each publish; the draft is still one artwork scene short of the full MVP.

## Scene 01 night rest correction

Five new night assets replace only the opening scene’s lighting and staging: far sky/ground, a line of twelve parked wagons, near foliage, five seated gamblers, and two standing guards. Lucien and Arietta sit together; Balerias plays with them, Samardag and Radecere. The foreground figures have no travelling animation. All earlier image hashes are preserved. Shared game/guard assets are mentioned in each participant’s record, and current source/storyboard/narration reflect the user clarification. This correction applied to the opening scene.
