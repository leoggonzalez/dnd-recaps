---
name: animated-session-recaps
description: Plan, draw, assemble and verify playable Whispers of Fire session recaps in the D&D parallax player. Use for new scenes, scene revisions, layered environments, character cutouts, timed poses, narration and runtime asset integration. Standalone stills use the one-off image skills.
metadata:
  short-description: Author playable D&D parallax recaps
---

# Animated Session Recaps

Work from the repository root. The deliverable is a scene that plays in the existing player with separated art, timed action and narration. Use [D&D One-Off Images](../dnd-one-off-images/SKILL.md) for standalone stills and [Retro Action-Cartoon One-Off Images](../retro-action-cartoon-one-off-images/SKILL.md) for explicitly requested retro stills.

## Playback contract

Use one persistent 16:9 background composition per scene. Prefer a single location. If several places share a beat, stage them as visible zones of one image with a clear focus and deliberate character placement. Far, middle, and near layers provide depth within that composition. Keep the composition intact after the entrance and hold it while the reader finishes reading or listening. Use subtle repeating idle motion or parallax in the hold. Local poses and effects may animate within the stage. A change of background requires a separate scene or a visual echo within the same image.

1. **Establish the beat.** Use the [Session Storyboard](../session-storyboard/SKILL.md) workflow when the recap still needs scene planning. Read the session recap and the latest user corrections. Use those for events and staging, canonical character and NPC records for appearances and equipment, and previous illustrations for framing or lighting. Preserve unknowns. Use the session’s actual dates and location. Before choosing a layout, consult the shared [technique index](references/art-direction.md#technique-index). Read the chosen technique and its linked annotations, and open the relevant source images when available. Record why the technique fits the beat. Confirm the setting, focal action, actor placement, layer depth, narration, entrance and readable hold before drawing.
2. **Inventory before generating.** Run `npm run assets:find -- <term>` and read relevant records in `src/model/`. Reuse artwork that matches lighting, perspective, pose and continuity. Reuse the environment across scenes in the same place when it fits. Inspect actual references. Flag important gaps and distinguish provisional visual choices from recap facts.
3. **Produce the layers.** Use the house style and stage requirements in [Art direction and drawing](references/art-direction.md). Revisit the selected technique and examples before writing asset briefs or generating missing layers; specify plane assignments, occlusions, contact groups and the settled still. Verify runtime support before promising optional reference-inspired motion. Generate only missing assets using the built-in imagegen workflow. Give each environment an opaque far layer and transparent middle and near layers. Generate actors and props separately unless they must remain visually joined. Preserve matching frames across pose changes.
4. **Prepare, register and assemble.** Follow [Runtime assembly and validation](references/assembly.md). Archive source PNGs locally, prepare optimized WebPs, and register the asset with provenance. Add or update the target session manifest and keep its source storyboard aligned. The October assembler is session-specific, so use it only for that session. Register a new session in `src/data/index.ts`.
5. **Watch it play.** Validate data, run relevant checks and build the static preview. Check the entrance, focal action, settled image after the narration cues, and reduced-motion view. Check loading, depth, alpha edges, scale, continuity and legibility on desktop and narrow screens. Report what was verified and any remaining limitations. Publish through the existing Pages workflow when authorized.

Use the [nine October scenes](references/october-scenes.md) as worked examples. Keep this skill current when the schema, asset pipeline or player behavior changes.
