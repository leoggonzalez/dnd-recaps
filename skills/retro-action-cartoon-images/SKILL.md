---
name: retro-action-cartoon-images
description: Apply a late-1980s and 1990s Saturday-morning action-cartoon art direction to D&D storyboards and image prompts, with fantasy, space-opera, and graphic-superhero variants. Use when the user asks for this retro cartoon look or invokes this skill.
metadata:
  short-description: Retro action-cartoon image style
---

# Retro Action-Cartoon Image Style

Use this as an optional art-direction layer with `dnd-session-images`, or when the user asks to give an image this look. It changes the visual treatment, not the story, character facts, scene plan, or approval steps in the session-image workflow.

For the research basis, distinctions between the style variants, and prompt recipes, read [the style research report](references/style-research-report.md).

## Apply the style

1. Choose the closest visual branch for the scene: mythic heroic fantasy, chrome-and-neon space opera, or graphic 1990s superhero adventure. Blend them only when useful to the scene.
2. Keep the established character identity, body type, clothing, equipment, and events. Translate those facts into clear, animation-friendly shapes; keep all character, costume, emblem, and prop designs original to the user's material.
3. Build the image around a readable silhouette, expressive pose, a decisive action beat, and a simple focal hierarchy. Favor broad shapes and designed negative space over surface detail.
4. Describe a hand-drawn 2D television-animation finish: confident contour lines, clean shape separation, cel-like color blocks, a small number of deliberate shadow shapes, saturated period-inspired color, and painted or graphic backgrounds. Add restrained analog texture only if it helps; do not make noise or aging effects the subject.
5. Match composition and palette to the scene. Use low angles, diagonals, strong foreground/background separation, graphic speed lines, rim light, or dramatic skies where they clarify the action. Keep the image legible and character-focused.
6. Add concise exclusions when image generation is likely to drift: photorealism, glossy 3D rendering, modern anime shorthand, excessive micro-detail, muddy color, illegible anatomy, lettering, brand marks, or UI. Include only exclusions relevant to the request.

For a multi-image sequence, preserve each character's silhouette, palette, costume landmarks, and rendering approach across prompts. When the user gives a reference image, use it for the intended visual information while retaining the user's requested content and any established project continuity.

## Prompt shape

Combine the scene's actual subject and action with a short art-direction line, for example:

> Original D&D scene, [characters and factual action], [setting and mood]. Late-1980s/1990s Saturday-morning action-cartoon illustration, hand-drawn 2D cel-animation feel, bold readable silhouettes, expressive heroic anatomy, clean ink contours, limited cel shadows, saturated [palette], [mythic fantasy / chrome space opera / graphic superhero] visual language, dramatic [composition or light cue], painterly graphic background, clear focal point. Preserve [important established character traits]. Keep designs original; no lettering, brand marks, or photorealistic/3D finish.

Treat the sample as a scaffold, not mandatory wording. Tailor it to each image generator and user request; don't append every style keyword mechanically.

## Project records and storage

Read the complete party/NPC records in `src/model/characters/` and `src/model/npcs/`, including each record’s `assets` array, before defining faces or costumes. Search existing imagery with `npm run assets:find -- <term>` from the repository root. Keep a retro variant distinct from the animated app’s parchment/ink treatment. Save images under `public/assets/` using the session-image workflow, then register each version in the relevant model entity; shared compositions should be mentioned in every depicted character/NPC’s asset list without pretending they are standalone poses. Session/storyboard sources are under `src/data/sessions/`.
