---
name: session-storyboard
description: Turn a D&D session recap into a reviewable storyboard for the Whispers of Fire parallax player. Use for selecting, splitting, and staging scenes before making art or wiring playback.
---

# Session Storyboard

Work from the repository root. Run `npm run --silent session-storyboard -- DD.MM.YYYY` to load the dated recap and planning brief. Read any existing storyboard and the user's latest corrections. Use the recap for events, the canonical model for appearances, and the user's decisions for scope. Keep uncertainties and proposed visual choices explicit.

## Choose scenes

- Give every scene one persistent composition. Prefer one location and one focal action. Group beats that share a setting and work together in the settled image. Carry incidental action, dialogue, and offscreen details in the narration.
- Split a beat if a later location or time needs its own focal action. If multiple places belong in a single scene, design them as visible zones in one 16:9 background. A threshold, foreground and distance, or a reflection can connect them. For visions, a framed inset can work if it belongs to the composition and remains visible. Establish hierarchy, scale, boundaries, and each character's placement before planning layers. Sequential events can be visual echoes if the framing and narration make the chronology clear.
- Plan how elements animate in, where they settle, and what stays readable while the reader finishes the description. Use subtle idle motion or parallax in the hold, with a readable still for reduced motion. Leave background swaps, full-frame pose cuts, and wipes out of the plan. The far, middle, and near layers are depths of the same background.
- Before choosing a layout, consult the shared [technique index](../animated-session-recaps/references/art-direction.md#technique-index). Choose by focal story need, then read the selected technique and its linked annotations and open the relevant source images when available. In the composition prose, name the technique and example, explain what it contributes, and describe the camera, focal gesture, light, overlaps and readable hold. Treat inferred motion as a proposal. Keep drawing specifications and detailed asset preparation in the shared guide and production skill.
- Keep cast, mood, key objects, narration, and any missing references concrete. Identify the main image before assigning animation cues. When revising a storyboard, preserve settled choices outside the requested change.

## Write or revise the storyboard

For a new storyboard, author a JSON plan, then run `npm run --silent session-storyboard -- DD.MM.YYYY --plan path/to/plan.json`. The command validates the structure and prints Markdown. Review it before saving it to `src/data/sessions/DD.MM.YYYY/storyboard.md`. For a revision, edit the existing Markdown in place so prior decisions and references survive. The command prepares the brief and formats the authored plan. Scene selection and staging are editorial work.

The plan is an object with a `scenes` array and optional `openReferences` array of strings. Each scene needs:

- `title`, `recapEvent`, and `narration`
- `composition` with `layout` (`single-location` or `composite`), `background`, and `focus`. A composite also needs `zones` with at least two descriptions of their placement within the same background.
- `cast`, an array of strings that give each character or group and their placement
- `entrance` and `hold`, which describe the reveal and the persistent final image with any idle motion or parallax

Hand the reviewed storyboard to [Animated Session Recaps](../animated-session-recaps/SKILL.md) for assets and playback.
