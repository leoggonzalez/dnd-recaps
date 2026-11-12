# Art direction skill implementation plan

A scene planner should be able to start with a story beat, find a suitable composition technique, inspect an annotated image, and turn the technique into a layout and asset list for the parallax player.

The [art direction and drawing guide](../skills/animated-session-recaps/references/art-direction.md) is the shared source for the [storyboard skill](../skills/session-storyboard/SKILL.md) and the [animated recap skill](../skills/animated-session-recaps/SKILL.md). Build on its existing house style, drawing guidance, and worked techniques. The deliverables are the annotated reference library, the revised guide, and updated skill instructions.

## 1. Inventory and analyze the example images

- Start with `references/` at the repository root, where new example images will be added. Check its contents before looking at the examples already described in the art direction guide.
- Inventory the images with a stable name, file path, and source attribution where known. Record duplicate or near-duplicate images and flag missing or unreadable files.
- Inspect each distinct image at its original framing and at a reduced size. Trace where the eye lands first, where it moves next, and which features still read in a smaller view.
- Examine the focal gesture, camera angle, scale, foreground and background overlaps, value and color contrast, light direction, and how the image implies movement or offscreen space. Record details that matter to staging.

The inventory accounts for every source image and identifies the examples ready to annotate.

## 2. Write one description for each distinct image

Use a consistent entry in a linked example reference. Give each entry enough detail that a planner can judge its relevance before opening the image.

| Field | What to record |
| --- | --- |
| Image and source | Stable name, link to the image, and attribution where known |
| Visible composition | Subjects, camera angle, positions, overlaps, and what the frame crops |
| Visual hierarchy | Focal point, likely eye path, and the lighting, contrast, or gesture that creates it |
| Techniques | Links to the drawing and composition techniques the example demonstrates |
| Recap application | What to borrow, how to adapt it to the house style, and how it could map to the player |
| Limitations | Where the approach could obscure the action, break parallax, or depend on motion inferred from a still |

Separate visible evidence from interpretation and from proposed adaptation. For example, a still can show concentric figures around a lit subject. Counter-rotation is a possible animation based on that arrangement.

The annotated example reference includes a readable description and a working image link for every distinct usable image.

## 3. Identify and define reusable techniques

- Group the annotations by the storytelling problem they solve, such as making a small object readable, showing the scale of a crowd, or directing attention from a casting hand to its target.
- Compare how different images solve the same problem. Extend existing entries where the examples add evidence or show a variation. Create a new entry when it gives the planner a distinct choice.
- For each technique, document when to use it, which visual decisions make it work, and where it can fail. Translate it into staging choices for camera, focal action, light, and depth. Include layer assignments, occlusion, contact points, and optional motion where relevant.
- Link each technique to its annotated examples and, where available, a finished scene that demonstrates it. The November 4 *Nightglass* scene can show how an overhead reference becomes a playable scene around a focal surface.

Each named technique can be selected by intent and traced back to an example.

## 4. Update the art direction and drawing guide

- Add a compact index near the top that maps common storytelling needs to techniques. Each row should give the planner a reason to choose the technique and a link to the detailed guidance.
- Keep the house style and stage requirements in the shared guide. Put detailed image analyses in the linked example reference so they can be opened as needed.
- For each technique, explain how to use it in the persistent 16:9 composition and how to prepare the required artwork. Cover the far, middle, and near planes, any independent actor or effect layers, and what must stay legible once the entrance settles.
- Keep reference images out of the deployed media export. Reuse stable paths for existing repo images and link to durable sources where the image is kept elsewhere. Check links from a fresh checkout or document how to access any external source.

The guide connects a scene need to a technique, an example, and instructions for drawing and assembling the scene.

## 5. Update and validate the skills

- Update **Animated Session Recaps** to direct the agent to the index before choosing a layout. Once the layout is chosen, have it open the relevant technique and examples before writing asset briefs or generating missing layers.
- Update **Session Storyboard** to use the same index when staging scenes. Keep its guidance focused on the focal beat, composition, and proposed use of the technique. Keep detailed drawing and asset instructions in the shared guide.
- Preserve the current distinction between storyboard planning, playable scene production, and standalone artwork. Keep both skill entrypoints short and route detailed decisions to the relevant guide section.
- Run the skill validator and check image, file, and heading links. Try the revised instructions on two planning briefs with different needs, such as an overhead workbench scene and a busy roadside encounter. For each, verify that an agent can find a relevant example, explain its choice, and produce a feasible layer and asset plan from the documented guidance.

The work is complete when every source image is accounted for, each usable example links to a technique, and both skills guide an agent from a story beat to relevant references and a scene layout.

## Implementation status — 2026-11-12

Completed for the 47 images currently supplied in root `references/`:

- [Annotated library and inventory](../skills/animated-session-recaps/references/composition-examples.md): every JPEG decoded and reviewed at original framing and reduced size; 47 distinct usable entries, no exact duplicates, related framing variants recorded. Source attribution is limited to supplied filenames and visible signatures. The old storm/traveller/tower example could not be matched to this collection and is explicitly flagged in the guide.
- [Shared guide and technique index](../skills/animated-session-recaps/references/art-direction.md#technique-index): 13 selectable techniques, linked examples, layer/contact guidance and failure cases. Nightglass links to its implemented storyboard and prototype art records.
- [Session Storyboard](../skills/session-storyboard/SKILL.md) and [Animated Session Recaps](../skills/animated-session-recaps/SKILL.md): both route through the index and selected examples before staging or preparing assets.
- [Two manual planning walkthroughs](../skills/animated-session-recaps/references/planning-walkthroughs.md): overhead crafting and a busy roadside encounter, including reference choice, feasible asset layers and hold behavior. These are manual exercises, not independent agent evaluations or newly generated playable scenes.

Validation: both skills passed `quick_validate.py` using a temporary environment with PyYAML; 309 local file/image/heading links across the two skills and production references resolved; inventory coverage was 47/47. Repository validation, lint, typecheck, all 10 unit tests, root and `/dnd-recaps` static builds passed. Focused existing desktop Chromium and mobile browser checks passed (2/2) against the subpath build. Export inspection found no `division48` source images or root reference directory in `out/`; runtime pruning retained 124 selected media files. No new runtime artwork or player behavior was introduced.

The root `references/` directory is Git-ignored. The library documents where to put a local copy of the supplied originals to restore image links in a fresh checkout.
