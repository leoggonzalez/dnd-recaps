---
name: dnd-one-off-images
description: Create standalone D&D illustrations from a recap, a character reference, or a requested story moment. Use for flattened still images or a set of stills. Use animated-session-recaps for scenes that play in the parallax app.
metadata:
  short-description: Create standalone D&D illustrations
---

# D&D One-Off Images

Produce a standalone image or a coherent set of stills. For one image, confirm the framing from the request and skip the multi-scene storyboard. For several related stills, use a short storyboard to settle the visual beats. Use [the animated recap skill](../animated-session-recaps/SKILL.md) for playable scenes and their assets.

## Workflow

1. **Find and read the recap.** Look in `src/data/sessions/` for the recap the user added or named. Read it in full. If several recaps could match, ask which one. Extract the major visual events in chronological order, keeping recap facts separate from interpretation. Record the in-world date and location when known; use the date supplied by the recap or user, never the computer's current date.
2. **Check character references and session events.** Identify party members and named NPCs who appear in those events. Read their complete records in `src/model/characters/` and `src/model/npcs/`. Appearance, sheet data, events and each entity’s `assets` array live together. Inspect referenced portraits or existing assets via their `public/assets/...` paths. Search with `npm run assets:find -- <name>` before generating anything. Use that merged character/NPC file as the visual continuity source; preserve its unrelated fields when updating events or images. Do not assume every party member is present in every scene. When maintaining character records for a recap, ensure each record has an `events` array. Append one short event object per relevant beat using `{ "date": "<in-world date>", "location": "<location>", "event": "<short factual phrase>" }`. Only include actions or involvement supported by the recap or user clarification; leave an uninvolved character's array empty. Do not infer a date or location when missing—mark it unknown or ask the user.
3. **Resolve new characters and visual gaps.** If an important figure has no character record or the recap leaves a needed visual detail unclear, ask the user for a description or reference image. Bundle questions by character. Continue planning scenes that do not depend on the missing information; mark dependent details provisional until resolved.
4. **Propose a session storyboard.** Select the scenes that best communicate the session's main events; combine closely related beats when that improves the sequence. For each scene, give a short title, the recap event, characters, setting, action, mood, framing, and continuity details. Add a generation-ready prompt for every selected scene, with a shared art direction for visual cohesion. Label any proposed visual interpretation. Keep it concise enough to review as a set. Use “storyboard,” not “screenplay,” for this planning document.
5. **Refine the scenes with the user.** Revise the storyboard from the user's feedback. Track which details are settled and preserve them across scenes. Do not generate the images until the user approves the scene plan or clearly asks to proceed after reviewing it.
6. **Generate the approved images.** Use the built-in image generation tool, normally one image per approved scene. Keep a consistent visual treatment across the set and preserve each character's established appearance and equipment. Avoid adding text, captions, or a game HUD unless requested. Do not invent consequential events or character actions absent from the recap or the approved storyboard.
7. **Save and present the result.** Store original generated PNGs in `public/assets/sources/` (local ignored archive) and selected still illustrations in `public/assets/illustrations/`. Append a described illustration or reference entry with its repository-relative path to the relevant entity in `src/model/`; keep canonical stats, appearance and events intact. Mention shared group images in each relevant character/NPC’s array, using the same asset ID/path/hash and identifying the full composition. Use clear scene-based filenames. Preserve earlier assets by using new filenames for revisions. Record final image paths in the storyboard, link the images, and briefly identify the scene each one depicts.

## Project references

- Session recaps: `src/data/sessions/`
- Party records: `src/model/characters/`
- NPC records: `src/model/npcs/`
- Model index/reuse guide: `src/model/index.json`, `src/model/README.md`
- Portraits: `public/assets/references/`, linked from each character’s `assets` array
- All images: `public/assets/`; prompt/recipe data: `src/data/`
- Root commands: `npm run validate:library`, `npm run validate`, `npm run build`

When a recap scene conflicts with an existing character record, preserve the recap's event while keeping the character's established visual traits. Point out the conflict for the user to resolve if it changes the character's identity or equipment.
