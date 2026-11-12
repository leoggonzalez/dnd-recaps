# Animated session recap app — implementation plan

Status: implementation started 8 November 2026. See [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) for verified progress and outstanding phases. This document remains the implementation specification.

Planning date: 8 November 2026.

Project root: `/Users/leogonzalez/development/leoggonzalez/dnd`.

## 1. Objective and agreed decisions

Build a Next.js web app that presents previous D&D sessions as interactive, animated storybooks, deployable as static files to GitHub Pages. The complete MVP recap is session **28.10.2026**, set on **6 Ches 1492 DR**, on the road from Baldur's Gate to Waterdeep.

The viewer selects a session, waits for all of that recap's assets to load, then moves through illustrated scenes with explicit Previous and Next controls. Each scene plays a brief authored animation and holds its final composition until the viewer advances.

Confirmed requirements:

- Three independently composed background image layers per environment, creating parallax.
- Transparent character, NPC, animal, creature, prop, and effect images.
- Simple native CSS animations, primarily translation and opacity.
- Alternate illustrated poses for actions such as shooting, casting, and kicking.
- Written narration below the artwork, revealed one authored line or short segment at a time through staggered opacity fades.
- Hand-drawn storybook aesthetic: sepia ink, parchment, crosshatching, and restrained coordinated color.
- WebP for all newly published recap artwork, including transparent cutouts.
- Load every unique asset needed by the selected recap before displaying its first scene; provide a proper loading and retry state.
- Manual scene advancement; no audio required for the MVP.
- The final implementation task is to write a reusable skill documenting how to create future recaps in the completed app.

The three-scene prototype described below is an intermediate validation milestone. It does not replace the complete October 28 recap as the MVP deliverable.

## 2. Source material and adaptation rules

### Sources

- Narrative source: [src/data/sessions/28.10.2026.md](../src/data/sessions/28.10.2026.md).
- Visual and framing reference only: [src/data/sessions/28.10.2026/storyboard.md](../src/data/sessions/28.10.2026/storyboard.md).
- Character continuity: records and portraits in [src/model/characters/](../src/model/characters/).
- Standalone illustrations: [D&D One-Off Images](../skills/dnd-one-off-images/SKILL.md). Playable scenes: [Animated Session Recaps](../skills/animated-session-recaps/SKILL.md).
- Existing still illustrations: [public/assets/illustrations/](../public/assets/illustrations/).
- Current user direction: parchment and ink reference images supplied in the planning conversation.

The old storyboard was designed for finished still images. Follow its eight-scene selection. Do not inherit its 3:2 aspect ratio, painterly-realism prompts, or flattened compositions as application requirements. Its eight-scene selection is now the approved scope (user revision); adapt its staging for animation.

The recap establishes events and chronology. Character records establish appearance and equipment. The existing storyboard may preserve additional previously recorded visual context, such as Aldrik's mounted shot, which is also present in his character event record. Separate these facts from proposed camera framing, motion, and visual shorthand.

Do not resolve Arietta's intentions, the wagon-decoy suspicion, the peryton's strange eye reflection, or the scroll's contents. Preserve them as uncertainties. Do not introduce absent party members or assign unsupported kills, spells, injuries, or motives.

Create a new `src/data/sessions/28.10.2026/animated_storyboard.md` during implementation. Preserve the existing recap, storyboard, and original illustrations. Existing generated images require an asset audit; they are not automatically suitable as layered animation assets.

Missing appearances can remain indistinct in rough compositions. Resolve important close-up references before final art production. This planning work does not require changing character records.

## 3. MVP scope and exclusions

### Included

- Session library, initially containing one complete session.
- Responsive recap player with a fixed-aspect-ratio stage.
- Three-layer environments and independently placed cutouts.
- Reusable motion presets and timed pose changes.
- Line-by-line narration fades.
- Previous, Next, Pause/Resume, Replay, and scene selection.
- Keyboard and touch controls.
- Shareable session and scene URLs.
- Complete recap asset preload with progress, cancellation, and retry.
- Reduced-motion presentation and accessible text.
- Static build, content checks, browser checks, and GitHub Pages deployment configuration.
- Repeatable content and asset preparation scripts.
- Final recap-authoring skill based on the working implementation.

### Deferred

- Narration audio, generated music, sound effects, and audio synchronization.
- Automatic scene advancement, timeline scrubbing, and playback speed controls.
- Visual drag-and-drop scene editor or CMS.
- Accounts, database, server APIs, and cloud saves.
- Video rendering/export, skeletal animation, physics, and a game engine.
- Pointer-following parallax, elaborate page curls, and infinite idle animation.
- Offline installation and service-worker cache management.

## 4. Viewer flow and interaction contract

### Session library

Show a cover, session title, real-world date, in-world date, location, and a short description. Use the existing October 28 session as the only initial entry. Keep the data format suitable for additional sessions without building filtering or search yet.

### Loading

Selecting a recap opens a dedicated loading view before any animated scene appears. A direct link to a later scene uses the same complete-recap loading gate, then opens the requested scene.

Show the session title, a lightweight cover or CSS parchment treatment, a progress bar, and text such as `24 of 38 images ready`. Provide Return to sessions and actionable retry controls. Do not imply byte-level progress when only completed asset counts are known.

### Player

Layout order: session title and scene counter; illustration stage with a floating bottom toolbar; scene title and narration beneath. User revision: parchment/ink controls appear on scene hover on mouse devices; reveal them on keyboard focus and keep them available on touch devices. Maintain visible controls and stable narration space. The stage scales uniformly rather than cropping different areas on different screens.

| Input | Behavior |
| --- | --- |
| Next / Right arrow | Advance immediately, even while the current animation is running |
| Previous / Left arrow | Enter the previous scene from its initial animation state |
| Replay | Restart the current scene, including narration reveals |
| Pause / Resume | Pause or resume artwork and narration animations together |
| Space | Toggle pause when focus is not on an interactive control |
| Scene selector | Jump to a selected scene and replay it |
| Browser back/forward | Restore the scene represented by URL history |
| End of recap | Present replay-session and return-to-library actions |

Do not advance on arbitrary clicks on the artwork. Disable Previous on the first scene. Do not accidentally wrap from the last scene to the first. Ignore navigation shortcuts while users interact with controls or editable elements.

Pause when the document becomes hidden. Resume automatically only if playback was running before the visibility pause; preserve an intentional user pause. After normal completion, hold the final frame without looping or automatically advancing.

On mobile, keep a 16:9 stage and allow the surrounding page to scroll. Portrait remains functional; landscape provides a larger illustration. Respect safe areas and provide comfortably sized touch targets.

## 5. Approved October 28 scene sequence

Scope revision: the user approved **eight scenes from `src/data/sessions/28.10.2026/storyboard.md`**, replacing the earlier 15-scene adaptation. Keep the layered 16:9 parchment/ink treatment and the engineering requirements in this plan. Condense related beats into these scenes rather than adding scenes.

| # | Stable ID | Scene |
| --- | --- | --- |
| 01 | `a-little-luck` | A little luck |
| 02 | `a-walk-through-camp` | A walk through camp |
| 03 | `an-offering-for-the-peryton` | An offering for the peryton |
| 04 | `a-note-in-the-dark` | A note in the dark |
| 05 | `counting-the-wagons` | Counting the wagons |
| 06 | `under-the-horses-neck` | Under the horse’s neck |
| 07 | `the-horses-fight-back` | The horses fight back |
| 08 | `the-cocoons-secret` | The cocoon’s secret |

Scene 05 combines the wagon observations and private conversation. Scene 06 establishes the forest ambush and focuses on Aldrik’s mounted shot. Scene 07 combines the horses’ counterattack and Lucien’s rescue. Scene 08 concludes with the cocoon discovery. Preserve uncertainty, avoid extra enemy instances, and do not assert an additional mounted-shot kill.

The three-scene validation prototype is now **01, 03, and 07** (previously 01, 03, and 13); it remains an intermediate milestone toward all eight scenes.

## 6. Art direction and asset specification

### Shared visual language

Warm parchment; umber linework; hatching and hand-drawn contours; light washes of ochre, moss, dusty blue, and burgundy. Use subdued environment colors with selective character accents. Keep narration on a quiet, high-contrast surface rather than over busy artwork.

Create CSS design tokens for parchment, ink, muted text, accent colors, border treatments, spacing, and typography. Use a readable serif for narration and a restrained display serif for titles. Keep decorative lettering out of long passages. Prefer locally bundled fonts and include them in readiness checks.

Preserve Aldrik's youthful pale elven face, short dark hair, lack of facial hair, dark leather, and light crossbow; Lucien's dark skin, bald head, moustache, and crimson-purple robes; Balerias's gray hair and beard, mechanical eye, and oversized crossbow; Coppercoil's small copper dragonborn body, mechanical jaw, and green core. Consult the full NPC records before producing their art.

### Stage and layers

- Logical stage: 1920 × 1080, scaled as one composition.
- Each environment references exactly three layers: far, middle, and near.
- Far layer usually opaque; middle and near layers have genuine alpha transparency.
- Add overscan based on the maximum authored camera offset, with a safety margin.
- Reconstruct areas revealed by moving cutouts or background layers.
- Use shared horizons, lighting, perspective, and line weight.
- Assign explicit numeric depth to backgrounds and actor instances so actors can sit between environmental layers.
- Keep a stable scene-wide stacking context; avoid accidental nested contexts that defeat intended overlap.

Three opaque full-frame images will not produce the required composition. Foreground transparency and reconstructed hidden areas are essential.

### Cutouts and poses

All delivered recap artwork is WebP. Preserve true transparency; do not bake a rectangular parchment patch behind a character. Crop empty space and store anchor metadata. Pose variants must align to a shared logical frame or have explicit frame offsets; independently trimming poses must not move the feet or change apparent scale.

Use grouped artwork where anatomy and interaction are tightly coupled: mounted Aldrik, horse wrapped in webbing, or an offering hand close to a cage. Independent movement is optional when it would damage the drawing.

### Initial environment inventory

| Environment | Use |
| --- | --- |
| Caravan camp | Scenes 01–03; cage and game props are separate |
| Sleeping space | Scene 04 close-up |
| Woodland road | Scene 05 |
| Tangled forest | Scenes 06–08; camera framing and actors vary |
| Forest discovery | Scene 08; reuse forest layers if they support the close-up |

Start with four environments (12 background images), adding the discovery environment only if reuse compromises framing. Estimate 35–55 selected actor, prop, pose, and effect images for planning; measure the actual inventory after rough staging rather than treating this estimate as a quota.

## 7. WebP optimization and repository size policy

Keep original generations, layered editing files, failed attempts, and intermediate exports outside Git; the current local source archive is `public/assets/sources/`, excluded from Git and from the static export. Preserve them in a clearly documented local archive or external asset archive. The app's published asset directory contains selected optimized WebP files only.

Existing PNG references and originals are not automatically deleted, converted in place, or removed from history. Audit them first. The new policy applies to assets introduced for the app; any legacy cleanup is separate work.

Asset preparation must:

1. Accept a local source image and intended display dimensions.
2. Resize before encoding; avoid exporting every cutout at full-stage resolution.
3. Preserve alpha and verify edge quality on light and dark backgrounds.
4. Compare lossy and near-lossless/lossless WebP where linework requires it.
5. Strip unnecessary metadata.
6. Write a deterministic optimized output and a report of dimensions, bytes, and content hash.
7. Detect duplicate content and reuse asset IDs.
8. Check appearance at actual mobile and desktop display sizes.

Initial budgets to validate with the prototype:

| Item | Target | Initial hard check |
| --- | --- | --- |
| Background layer | 150–450 KB | Fail above 750 KB unless an explicit documented exception exists |
| Typical cutout or pose | 30–150 KB | Fail above 300 KB unless documented |
| Small prop/effect | 5–60 KB | Report outliers |
| Complete October 28 artwork set | At most 15 MB preferred | Fail above 20 MB until reduced or explicitly revised |

The current build allows up to 50 MB of images and audio per recap.

These are engineering starting points, not measured results. Do not destroy fine linework just to hit a target: reduce dimensions, redundant variants, and repeated backgrounds first. Publish a per-recap unique-byte report.

Do not automatically generate multiple responsive variants for the MVP; they enlarge storage and complicate the complete-recap preload contract. Reassess after measurements. Never preload multiple resolution variants when only one will be used.

Deleting a committed image does not remove its bytes from Git history. Optimize before committing and avoid committing repeated generated revisions. Keep source revision history outside Git; keep only active runtime assets in the app. A later move to external asset hosting can use the same asset registry, but is outside the MVP.

## 8. Application structure and data contracts

Recommended stack: Next.js App Router, TypeScript, CSS Modules, local JSON content, schema validation, and native CSS keyframes. Use React state for navigation and playback status. Do not add an animation library or global state library initially.

Current root-level layout (implemented reorganization):

```text
package.json
next.config.ts
src/
  app/                     # routes, CSS and generated pose keyframes
  components/
  lib/
  model/                   # canonical entities, each with assets[]
    characters/
    npcs/
    creatures/
    objects/
    environments/
    groups/
    illustrations/
  data/
    sessions/              # runtime manifests, Markdown recaps and storyboards
    art/                   # preparation recipes/reports
public/assets/             # selected WebP, reference PNG, local source archive
scripts/
tests/
skills/
docs/
```

Character sheets and image metadata are merged into one record per person; NPCs are direct children of `src/model/npcs/`, not nested in party characters. Original images remain under `public/assets/`; postbuild pruning limits `out/assets/` to runtime manifest images. Preparation must update asset metadata without replacing character sheets or other asset mentions.

Use ISO dates for route IDs while displaying `28.10.2026`. Keep real-world session date and in-world date separate. Preserve the established source directories and do not import entire character sheets into the client bundle.

### Content entities

| Entity | Required responsibilities |
| --- | --- |
| Session | Schema version, ID, title, dates, location, summary, cover, ordered scenes |
| Environment | Exactly three layer references, depth order, overscan and camera limits |
| Asset | Stable ID, relative WebP path, intrinsic dimensions, byte size, hash, anchor/frame metadata |
| Scene | Stable ID, title, environment, accessible description, narration segments, duration, actors, camera motion, reduced-motion composition |
| Actor instance | Unique scene ID, character/prop reference where useful, asset or pose set, position, scale/width, depth, motion and visibility intervals |
| Narration segment | Stable ID, text, reveal delay and fade duration |
| Motion | Preset, start/end offsets, delay, duration, easing |
| Pose cue | Pose asset ID and absolute start time within the scene |

Use milliseconds for time and logical stage units for movement. Distinguish an actor instance from the character identity so two different creatures using one asset are not confused with the same creature moving between scenes.

Illustrative scene fragment; finalize against the actual schema during implementation:

```json
{
  "id": "they-wanted-the-horses",
  "environmentId": "tangled-forest",
  "durationMs": 4800,
  "narration": [
    { "id": "webs", "text": "Webbing snapped from the trees.", "delayMs": 150, "durationMs": 450 },
    { "id": "horses", "text": "They wanted the horses.", "delayMs": 850, "durationMs": 450 }
  ],
  "actors": [
    {
      "id": "descending-spider",
      "assetId": "giant-spider-descending",
      "position": { "x": 1380, "y": 480 },
      "width": 420,
      "anchor": "bottom-center",
      "zIndex": 30,
      "motion": {
        "preset": "translate",
        "from": { "x": 0, "y": -260 },
        "to": { "x": 0, "y": 0 },
        "delayMs": 600,
        "durationMs": 1600,
        "easing": "ease-out"
      }
    }
  ]
}
```

Validate schema versions, unique IDs, references, finite coordinate values, positive dimensions, nonnegative timing, cue ordering, three-layer requirements, WebP metadata, and required files. No cue may extend past the declared scene duration. Reject arbitrary script or HTML in content. Render narration as text.

## 9. CSS animation architecture

Use CSS keyframes for translate, fade, recoil, lunge, short rise, camera drift, and discrete pose visibility. Parameters come from validated content through CSS custom properties. Keep layout positioning, parallax motion, actor motion, and pose imagery on separate wrappers so transforms do not overwrite each other.

Render the scene paused in its initial state. Once required images for that scene are decoded and the stage is mounted, switch the scene root to running in a coordinated frame. Apply the same play state to every animated descendant, including text and pseudo-elements.

Use `animation-fill-mode: both` where appropriate to hold pre-delay and final states. Pose visibility uses discrete keyframes or step timing; avoid crossfading limbs during sharp actions. Compile authored pose intervals into deterministic CSS at build time, with initial/final visibility explicitly defined. Do not chain attacks using independent JavaScript timeouts.

Replay increments a playback key and remounts the scene subtree. Navigation destroys the previous scene subtree and enters the new scene. The minimal React controller manages scene index, playback key, loading state, user pause, and visibility pause. It does not update React state every animation frame.

Use one scene-duration animation sentinel if completion state is needed for the UI; filter animation events by target and name. Completion must not depend on whichever child happens to finish last. Reduced-motion mode sets completion explicitly because animation-end events may not fire when animations are removed.

No runtime scrubbing is required. Audio synchronization or seeking may justify a timeline API later; keep content timing independent of the renderer to make that migration possible.

### CSS ink opening (implemented user revision)

Opening a scene draws its existing assets with feathered CSS gradient masks, ordered far/middle/near, then props and characters. Motion overlaps the drawing: camera movement, actor motion and pose cues use their original scene-relative times with no opening offset. Props/cutouts start revealing at 600 ms, after the three background reveals have begun. Only narration receives a 2400 ms opening delay (`src/lib/scene-entrance.ts`). Use separate reveal wrappers so masking never overrides actor anchors, pose visibility or camera transforms. Replay remounts the illustration and narration while preserving the floating controls and focus. All effects use the same CSS play state; reduced motion removes masks/animation and exposes the complete final scene immediately. No additional artwork or runtime animation framework is required.

### Narration reveal

Author 2–4 short narration segments per scene where practical. Each segment starts at opacity zero and fades to one with staggered timing; start around 450 ms fades and 700 ms stagger, then adjust after review. Reserve layout space from initial render to avoid jumping controls.

An authored “line” may wrap into multiple visual lines on narrow screens. Do not measure browser line wrapping or split text into words for animation. Keep all text present in the accessibility tree, avoid announcing every fade, and make reduced-motion mode reveal all segments immediately. Replay restarts narration; Pause pauses it with the artwork.

## 10. Complete-recap loading and memory management

### Loading contract

Before displaying any scene, enumerate the selected recap's full asset dependency graph: all environment layers, every actor pose, props, effects, shared textures, and cover assets that will be used. Deduplicate by stable resolved URL/hash. Load necessary local fonts as part of readiness.

Suggested state flow:

```text
idle -> loading -> preparing_requested_scene -> ready
             -> failed -> retrying -> preparing_requested_scene
             -> cancelled
```

Use bounded concurrency, initially four downloads. Check HTTP status, validate the image response, and test image decodability. Track successful and failed assets separately. Retry failed requests without discarding successful ones. Offer a bounded automatic retry for transient errors, followed by a visible manual retry; never spin forever.

Use an AbortController and a load-generation token so leaving a recap cancels requests and late responses cannot mark a different recap ready. Any required image failure keeps the recap behind the loading gate until resolved. Do not quietly start with missing battle poses.

### Retain downloaded bytes without retaining every decoded bitmap

Use a recap-scoped asset store holding fetched Blobs and object URLs, so navigation does not depend on browser HTTP cache retention or trigger new downloads. Revoke URLs and release references on recap exit. Do not put image bytes in React state or localStorage.

Validate images in a bounded queue, then release temporary decoder references. Retain decoded readiness primarily for the current and adjacent scenes. All compressed assets must be downloaded before entry; keeping every full-resolution image decoded simultaneously is not required and would risk excessive memory use.

Before swapping scenes, ensure the destination's images decode successfully; retain the current composed scene until then. Prepare neighboring scenes proactively. Direct jumps should use the retained bytes. Show a brief preparation indicator only if decoding is unexpectedly slow, never a blank stage. Guard rapid navigation so only the newest requested scene activates.

Compressed size is not decoded size: a 1920 × 1080 RGBA image is roughly 7.9 MiB before browser overhead. Measure peak memory on actual mobile hardware and avoid keeping invisible full-scene trees mounted for the entire recap.

Acceptance: after readiness, disconnect the network and navigate through every scene and pose successfully within the active recap. This verifies downloaded-asset retention, not persistent offline support across reloads.

## 11. Static export, routes, and deployment

- Configure Next.js `output: 'export'`.
- Generate all session routes at build time using the content inventory.
- Use trailing-slash directory routes for straightforward static hosting.
- Resolve GitHub Pages repository subpaths with build-time `basePath` configuration.
- Use one asset URL resolver for manifest paths and the preload system; test CSS textures and fonts too.
- Render preoptimized WebP with ordinary image elements, or explicitly disable server image optimization if choosing Next Image.
- Keep scene selection in a URL fragment such as `/sessions/2026-10-28/#scene=the-horse-in-the-web`.
- Validate unknown scene IDs and fall back to the first scene with a clear state; unknown sessions use the exported not-found page.
- Avoid runtime APIs, server actions, middleware, and server-dependent content.

Future CI workflow: install locked dependencies; validate content/assets; lint; typecheck; run focused tests; build static output; smoke-test the export. Pull requests validate without publishing. A configured main-branch workflow publishes the exported `out/` directory through GitHub Pages Actions with scoped Pages permissions and a deployment concurrency group.

Deploy only the app export, not original character sheets, unselected images, legacy media, or source archives. Check the actual repository name, default branch, Pages configuration, and desired hostname during implementation; do not assume the Git remote details from the local folder name.

Technical references used in planning:

- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports).
- [Next.js basePath](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath).
- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows).

Recheck the installed framework's documentation and current Actions versions when implementing, then pin the selected versions.

## 12. Accessibility, resilience, and visual QA

- Keyboard-operable native buttons with visible focus and accessible names.
- Respect `prefers-reduced-motion`: static authored poses, no parallax or staggered reveal.
- Provide a useful stage description and full narration; mark decorative cutout images as decorative to avoid repetitive announcements.
- Announce scene changes politely once, not individual actors or text fades.
- Keep focus predictable after navigation; preserve control focus unless a deliberate route transition calls for a heading focus.
- Maintain readable text contrast, flexible text sizing, and usable layout at 200% zoom.
- Avoid flashes, violent camera movement, and automatic audio.
- Handle failed loads, invalid links, interruption, and browser tab visibility explicitly.
- Verify scene composition at narrow portrait, landscape phone, tablet, laptop, and large desktop sizes.
- Check alpha halos, visible seams, exposed layer edges, feet sliding during pose swaps, incorrect overlap, and scaling inconsistencies.
- Keep narration and end-of-session actions usable even if an unexpected rendering error occurs.

## 13. Implementation phases and acceptance gates

### Phase A — Content and art specification

Tasks: create the animated storyboard; refine narration; map each scene to recap facts; list environments and poses; record unresolved visual references; define token palette and stage rules; audit existing images without changing them.

Done when: every recap beat has a place, repeated environments are identified, battle continuity is explicit, and the production asset inventory has no unexplained requirements.

### Phase B — Static application foundation

Tasks: scaffold the root Next.js app in `src/app/`; add session index and generated session route; establish design tokens; implement schema validation and asset URL resolution; configure static export and CI checks.

Done when: a placeholder session loads from a static server at both root and repository-subpath URLs, including direct reload and unknown-scene handling.

### Phase C — Layered renderer and playback

Tasks: implement scaled stage, depth ordering, actor anchors, CSS motion presets, pose visibility, narration fades, navigation, replay, pause, reduced-motion composition, and URL history handling.

Done when: placeholder scenes demonstrate correct alignment and deterministic replay; repeated rapid navigation and pause/resume cannot leak prior scene state.

### Phase D — Asset pipeline and full-recap loader

Tasks: implement WebP preparation/reporting, asset graph enumeration, bounded fetching, Blob store lifecycle, decoding preparation, loading UI, retry, cancellation, and size gates.

Done when: the full placeholder recap loads before entry; failures remain actionable; exiting releases resources; post-readiness network disconnection does not break any scene.

### Phase E — Three-scene art prototype

Use scenes 01, 03, and 07 to test a populated camp, cage occlusion and close interaction, and a battle rescue with timed poses. Produce new style-matched layered art and implement those scenes completely.

Done when: style, legibility, parallax, pose alignment, loading time, compressed size, and mobile memory have been reviewed. Revise asset dimensions and budgets before scaling production.

### Phase F — Complete October 28 recap

Tasks: produce remaining selected WebP assets; implement all proposed scenes, refining splits only where needed; preserve chronology and uncertainty; remove unused runtime assets; finalize scene descriptions and narration.

Done when: the entire October 28 story plays from the game in camp to the cocoon discovery, with all backgrounds and alternate poses included in the preload graph.

### Phase G — Release validation and deployment

Tasks: execute focused automated tests; review all scenes on target browsers/devices; test the static artifact under its real subpath; configure and verify Pages deployment; document developer commands and asset budgets.

Done when: the deployed recap meets the checklist below and all identified blocking issues are resolved.

The authoring skill in section 17 documents verified behavior in the implemented player. Hosted release checks are tracked separately.

## 14. Verification strategy and MVP definition of done

### Focused automated checks

- Schema validation: bad references, missing poses, duplicate IDs, invalid durations, unsupported format, and oversized assets.
- Asset dependency graph: includes every scene and alternate pose exactly once after deduplication.
- Loading lifecycle: retry, cancellation, stale responses, decode failure, and object-URL release.
- Navigation: first/last boundaries, direct scene links, browser history, replay, and fast repeated input.
- Playback: pause applies to text and artwork; pose swaps do not leave multiple active poses; reduced motion exposes a complete static result.
- Static artifact: all routes and assets resolve under a non-root base path without a Next.js server.

Use browser integration tests for behavior that depends on CSS animation or image decoding. Use stable animation checkpoints or paused captures for visual comparisons; avoid screenshots taken at arbitrary wall-clock times.

### Manual review

Review Chromium, Firefox, and WebKit, with at least one real mobile browser for memory and loading behavior. Test cold load, throttled connection, a missing asset, a failed retry, tab hide/show, keyboard-only use, reduced motion, zoom, and the complete session under network disconnection after preload.

### Release checklist

- [ ] Full October 28 recap is present; the prototype alone is not accepted as the MVP.
- [ ] All environments use three properly composed layers.
- [ ] All new runtime recap artwork is optimized WebP.
- [ ] Narration reveals through staggered opacity, with no layout shift.
- [ ] Every required recap asset is loaded before the requested first scene appears.
- [ ] Previous, Next, Replay, Pause, scene selection, and URL history are consistent.
- [ ] Alternate poses align and battle continuity is coherent.
- [ ] Reduced-motion and keyboard experiences are complete.
- [ ] No blank scene or missing image appears during normal navigation.
- [ ] Per-image and total recap budgets pass, with any exceptions recorded.
- [ ] Static export and deployed Pages subpath work on reload.
- [ ] Source archives and unrelated project material are absent from the published artifact.
- [x] The authoring skill is created and verified with the disposable example in section 17.

## 15. Risks and planned responses

| Risk | Response |
| --- | --- |
| Still illustrations cannot be separated cleanly | Use them as references; generate/reconstruct layers with hidden areas completed |
| Fine linework becomes muddy in small WebP files | Compare encodings visually; reduce unnecessary detail and dimensions before excessive compression |
| Complete preload becomes slow | Deduplicate environments and poses; enforce total size budget; display honest progress and retry |
| Decoded images exhaust mobile memory | Retain compressed Blobs, limit decoding concurrency, mount only necessary scene trees |
| CSS pose scheduling becomes too complex | Keep scenes short and presets finite; split a dense action into another manual scene |
| Pose changes jump in position | Shared frame dimensions or explicit trim offsets and anchors |
| Too many battle figures obscure the action | Show one focal beat; use secondary groups and narration for supporting actions |
| Existing art style conflicts with the reference | Establish the three-scene style prototype before bulk art production |
| Git grows through repeated revisions | Archive originals externally; optimize before commit; keep only selected active WebP assets |
| Storyboard interpretations become fictional facts | Trace events to recap/character records and label proposed framing in the new storyboard |

## 16. Future audio extension

Keep stable scene IDs, explicit animation timing, and a renderer-independent content schema. Later add optional narration-track references, music mood/track references, and audio settings without changing the basic session/environment/actor model.

Audio should begin after user interaction and support separate narration/music volume, ducking, pause/resume, navigation interruption, and optional advancement after narration. Preserve text as an equally complete experience. Generated tracks can remain static assets, with their own size budgets and a deliberate loading policy.

Do not add placeholder audio controls, generator integrations, or audio files to the MVP. Evaluate whether CSS remains sufficient for synchronization when implementing this extension.

## 17. Final implementation task — write and verify the recap-authoring skill

The user requested the [authoring skill](../skills/animated-session-recaps/SKILL.md) after all nine October scenes were illustrated. It documents the implemented workflow. Release validation remains a separate milestone.

The skill must describe the finished implementation accurately and enable a future assistant to create another recap without reverse-engineering the application.

Required contents:

1. **Purpose and activation:** when to use the skill for creating, adapting, validating, or updating a recap; distinguish this workflow from standalone still-image illustration.
2. **Source hierarchy:** session recap for events, character records/portraits for continuity, user direction for presentation choices, old storyboards as optional reference. Preserve unresolved facts and flag missing important appearances.
3. **App overview:** actual project paths, static Next.js architecture, logical stage coordinates, scene lifecycle, CSS playback rules, and complete-recap loading behavior.
4. **Content schema:** exact session/environment/asset/actor/narration/pose fields, supported values, timing units, depth rules, anchors, schema version, and executable valid examples.
5. **Narrative adaptation:** choose short visual beats, write concise line-reveal narration, maintain battle continuity, distinguish proposed framing from established events, and reuse environments where appropriate.
6. **Art production:** shared style reference, three-layer transparency/overscan requirements, clean cutouts, grouped poses, anchor alignment, character consistency, and the project's applicable image-generation workflow.
7. **Storage and optimization:** source archive location, selected WebP paths, naming, export commands, size budgets, alpha checks, deduplication, and the rule against committing generated intermediates.
8. **Assembly:** concrete steps for adding a new session, environments, actors, narration delays, pose cues, loading dependencies, and reduced-motion composition.
9. **Validation:** actual commands for schema checks, asset reports, lint/typecheck, tests, static build, preview under a subpath, and visual review. Include common errors and fixes.
10. **Publishing:** actual build/deployment workflow, how the library discovers new sessions, and how to verify all images and routes in the published output.
11. **Worked reference:** link to the completed October 28 recap and explain one ordinary scene and one multi-pose battle scene.
12. **Maintenance:** update the skill and examples whenever schema, commands, budgets, or supported animation behavior change.

Add small reusable templates or reference files beside the skill where they reduce repetition. Link the skill from the project README and, if appropriate, AGENTS.md so future recap requests discover it. Keep existing still-image instructions intact and explain which workflow applies to animated recaps.

Acceptance: follow the skill against a disposable small draft fixture, run the real validation/build commands, verify its assets are included in the preload graph, and confirm that a valid scene can be assembled without undocumented knowledge. Remove the fixture from published session content after verification. The final deliverable is the tested skill, its supporting templates, and the discovery links.
