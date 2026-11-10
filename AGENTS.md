# Project instructions

Run application commands from the repository root. The Next.js app is in `src/app/`, components in `src/components/`, runtime helpers in `src/lib/`, and session sources/manifests/storyboards in `src/data/sessions/`.

## Canonical entities and artwork reuse

`src/model/characters/` contains complete party records, and `src/model/npcs/` contains complete NPC records. Each JSON combines appearances, sheets, equipment, relationships, events and an `assets` array. Preserve all existing canonical fields when editing or preparing images; do not recreate a separate character database.

Before generating artwork, inspect `src/model/index.json` and relevant records, or run `npm run assets:find -- <term>`. Every asset includes a description and repository-relative image path. Reuse matching style, appearance, pose, lighting, frame and anchor. Shared compositions may appear in multiple entities’ arrays with the same ID/path/hash; label them as grouped artwork rather than isolated poses. Append new versions without overwriting prior images.

All project images live in `public/assets/`. Keep full-resolution generated originals in the ignored `public/assets/sources/` archive, prepare selected WebP files into category folders, and register them in the entity JSON. The postbuild script exports only session-manifest runtime images, excluding original/reference/unused images. See [the model guide](src/model/README.md).

## Illustration workflows

For turning a session recap into a playable scene plan, follow [Session Storyboard](skills/session-storyboard/SKILL.md). For playable scenes, parallax assets and recap staging, follow [Animated Session Recaps](skills/animated-session-recaps/SKILL.md). For standalone stills use [D&D One-Off Images](skills/dnd-one-off-images/SKILL.md). Apply [Retro Action-Cartoon One-Off Images](skills/retro-action-cartoon-one-off-images/SKILL.md) when the user requests that look for a still.

The October 28 [storyboard](src/data/sessions/28.10.2026/storyboard.md) documents the nine-scene worked example. For new sessions, use the scope established for that session.

## Checks

Run `npm run validate`, `npm run lint`, `npm run typecheck`, `npm test`, a static build and focused browser checks for relevant changes. Verify repository-subpath routing and export pruning after moving assets. Preserve local source archives.
