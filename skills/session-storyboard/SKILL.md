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
- For scene ideation, use the [loading-screen composition references](../animated-session-recaps/references/art-direction.md#loading-screen-composition-references). Pick one telling gesture or silhouette, then use eyelines, foreground framing, atmospheric distance, and a selective color accent to guide the eye through the held image.
- For a character-led close-up, consider [depth within one character](../animated-session-recaps/references/art-direction.md#depth-within-one-character). Stage the cape behind the body and a foreshortened hand with its prop in front. Plan the pose and overlaps as one image.
- For armies and busy gathering places, plan [crowds at multiple depths](../animated-session-recaps/references/art-direction.md#crowds-at-multiple-depths). Use distant silhouettes to convey scale, readable groups in the middle, and a few detailed foreground figures to frame the focal action.
- Consider an [overhead scene](../animated-session-recaps/references/art-direction.md#overhead-scenes) for planning around a map, examining an object, or showing where people are positioned. Choose one readable focal surface and arrange characters around it so their hands, silhouettes, and eyelines guide attention inward. If the scene has a radial layout, consider [counter-rotating overhead layers](../animated-session-recaps/references/art-direction.md#counter-rotating-overhead-layers) around a fixed subject.
- When fire or elemental magic carries the beat, plan [elemental light and magic](../animated-session-recaps/references/art-direction.md#elemental-light-and-magic). Decide what the effect illuminates and how that light draws attention to the focal action in the held composition.
- For [backlit interiors](../animated-session-recaps/references/art-direction.md#backlit-interiors), stage figures near a bright window in lighter tones and use darker foreground shapes to frame the exchange. Decide which profile or gesture catches the light.
- For projectile or spell beats, consider [directional motion trails](../animated-session-recaps/references/art-direction.md#directional-motion-trails). Use faint strokes to lead the eye from the release gesture toward its destination while keeping the pose readable.
- Keep cast, mood, key objects, narration, and any missing references concrete. Identify the main image before assigning animation cues. When revising a storyboard, preserve settled choices outside the requested change.

## Write or revise the storyboard

For a new storyboard, author a JSON plan, then run `npm run --silent session-storyboard -- DD.MM.YYYY --plan path/to/plan.json`. The command validates the structure and prints Markdown. Review it before saving it to `src/data/sessions/DD.MM.YYYY/storyboard.md`. For a revision, edit the existing Markdown in place so prior decisions and references survive. The command prepares the brief and formats the authored plan. Scene selection and staging are editorial work.

The plan is an object with a `scenes` array and optional `openReferences` array of strings. Each scene needs:

- `title`, `recapEvent`, and `narration`
- `composition` with `layout` (`single-location` or `composite`), `background`, and `focus`. A composite also needs `zones` with at least two descriptions of their placement within the same background.
- `cast`, an array of strings that give each character or group and their placement
- `entrance` and `hold`, which describe the reveal and the persistent final image with any idle motion or parallax

Hand the reviewed storyboard to [Animated Session Recaps](../animated-session-recaps/SKILL.md) for assets and playback.
