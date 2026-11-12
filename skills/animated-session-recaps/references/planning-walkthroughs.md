# Planning walkthroughs

These are two manual exercises of the shared [technique index](art-direction.md#technique-index), not generated scenes or independent agent evaluations. They demonstrate reference selection and feasible asset planning without changing any approved storyboard. Canonical appearances and available assets still need to be checked for the actual session before production.

## Overhead workbench

**Brief:** Two companions assemble a small black-glass vial at a screened workbench. Their hands, the finished vial and a few coins must remain readable after the entrance.

**Selection:** “Examine or assemble something together” leads to [overhead scenes](art-direction.md#overhead-scenes), then [example 76](composition-examples.md#example-76) and its source image. The image visibly isolates a warm map among darker shoulders; the proposed adaptation replaces the map with the crafting surface. [Example 4](composition-examples.md#example-4) would make a held vial readable, but its low camera would hide the shared work surface. A radial ring from example 66 adds no useful information to this non-radial task.

**Composition:** One persistent 16:9 view, steeply overhead, with the vial near the center and cropped hands entering from opposite sides. Keep tools subordinate and the lamp's warm spill fixed across the tabletop and hands. Use sepia contours and muted indigo shadows; give black glass a pale edge rather than making the whole object glow.

| Role | Asset brief | Registration and occlusion |
| --- | --- | --- |
| Far | Opaque workshop floor and bench support, complete beneath later layers | One overhead camera; no missing floor at edges |
| Middle | Tabletop with fixed tools, sketch and contact shadows | May be baked into the far master if separate parallax would break the supports |
| Actors | Paired hands derived from the same master pose | Same transform/depth as the table at resting contacts; fingers must leave the vial silhouette clear |
| Objects | Shards and finished vial in matching frames; coins as distinct instances if count matters | Shared surface coordinates, unchanged contact shadows and object anchor across the pose swap |
| Near | Cropped privacy-cloth fold at a corner | Painted overscan; clear the vial and coins at both extremes |
| Effect | Small alpha seam highlight | Attached to the vial seam; no full-frame flash required |

**Entrance and hold:** Reveal the opaque setting and framing, then hands/materials. A supported local pose change can replace shards with the finished vial; the light settles and the vial remains. Reduced motion shows the finished arrangement. Do not slide resting hands relative to the bench. Any coin motion uses the current supported actor timeline, with its resting position established first.

**Worked project link:** [Nightglass storyboard](../../../src/data/sessions/04.11.2026/storyboard.md#8-nightglass), [workbench](../../../src/model/environments/nightglass-workbench.json), [hands](../../../src/model/groups/nightglass-crafting-hands.json), [vial](../../../src/model/objects/nightglass-perfume-vial.json) and [coins](../../../src/model/objects/nightglass-perfume-coins.json). These records provide existing art and provenance; inspect before generating replacements. Their asset status is prototype, so this is an implemented scene reference rather than a claim of final art approval.

**Feasibility check:** The index yields a specific image and drawing guidance. The layer plan preserves the bench/hand contact, isolates the tiny object, and can hold without continuous animation. Before production acceptance, preview at a narrow stage size and ensure the black vial remains separate from the gloves and shadows. No orbit support is required.

## Busy roadside encounter

**Brief:** A mounted traveler meets a guard on a busy road. Wagons and bystanders should establish activity while the rider's approach and guard's response remain the main beat.

**Selection:** “Show an imminent encounter” leads to [opposing diagonals](art-direction.md#opposing-diagonals) and [example 45](composition-examples.md#example-45). Its leaning horse/rider and back-facing guard provide the focal opposition. For the supporting bustle, [crowds at multiple depths](art-direction.md#crowds-at-multiple-depths) and [example 26](composition-examples.md#example-26) explain graduated detail. Borrow that depth hierarchy, not its raised military leader or wings. [Example 33](composition-examples.md#example-33) is a quieter option if the brief changes to a conversation at a stall.

**Composition:** One 16:9 road view at roughly the guard's chest height. Put the rider left of center, the guard right, and reserve an open diagonal between the horse's head and the guard's reaction hand. Let the road recede behind them. Use muted earth/moss washes and one consistent daylight direction; no spell glow is needed.

| Role | Asset brief | Registration and occlusion |
| --- | --- | --- |
| Far | Opaque road, distant village, haze and faint far wagons | Continuous ground beneath the entire rider route |
| Middle | Readable wagon/bystander clusters beside the road | Leave the action corridor clear; preserve explicit headcounts if the actual recap supplies them |
| Main actor | Rider, horse, reins and saddle as one complete cutout | Hoof/ground anchor; joined contact stays fixed |
| Reaction actor | Guard with attached weapon | Stable feet; raised arm remains clear of horse face and reins |
| Near | Sparse roadside foliage or one cropped bystander | Do not obscure hooves or reaction hand at maximum pointer parallax |
| Optional effect | Small dust or feather accents | Separate from actors, lower contrast and clear of the focal gap |

**Entrance and hold:** Reveal road and crowd depth, then the principal actors. Hold the opposed poses as an implied approach with subtle dust. A short supported travel cue is optional only if the horse pose and available route make it credible; the still reference alone does not supply a gait, strike or collision. Reduced motion keeps both silhouettes visible and separated.

**Feasibility check:** The primary example establishes the encounter; a second technique handles bustle without competing for focus. The asset plan avoids tearing rider/saddle contact and does not require independently animated crowd members. Before acceptance, inspect the settled view at narrow size and both parallax extremes: horse head, rider gesture and guard reaction must remain identifiable. If they merge, remove near clutter or widen the focal gap before adding motion.
