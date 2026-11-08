# Canonical entity and image register

Each entity has one JSON file with its description and an `assets` array. For people, this is also the canonical record: the full character sheet, appearance, equipment, relationships and events live **in that same file**.

- `characters/`: complete party records.
- `npcs/`: complete NPC records, directly alongside the other model categories.
- `creatures/`: peryton, unnamed horses and enemy pose sets.
- `objects/`: props such as matching cage rear/front assemblies.
- `environments/`: matching far/middle/near layer sets.
- `groups/`: tightly coupled compositions with several people/creatures/props.
- `illustrations/`: preserved original full-scene/party illustrations.
- `index.json`: catalog of record paths. `schema.json`: editor schema, generated from `src/lib/asset-library-schema.ts`.

All stored paths are relative to the repository root. Assets use this shape alongside their dimensions, bytes, hash, alpha, anchor, encoding and provenance:

```json
{
  "id": "balerias-ready",
  "description": "Patient crouched stance, food held near his chest.",
  "path": "public/assets/characters/balerias-ready-v1.webp"
}
```

A character can list a shared group image that also appears in another entity’s array. The ID, path, size and hash must agree everywhere. `usage: "shared-composition"` means the file contains several figures; it cannot be treated as an independent pose. Existing legacy illustrations and supplied portraits are marked `reference`; use current canonical appearances rather than copying conflicting old artwork.

Search and validate from the repository root:

```sh
npm run assets:find -- arietta
npm run validate:library
```

To use an image in the app, strip `public/` and pass `assets/...webp` through `src/lib/urls.ts`. Runtime session manifests accept optimized WebP only. Do not import full character sheets into the client bundle; `src/data/sessions/2026-10-28.json` carries the small runtime metadata subset.

Generated source PNGs live in the ignored local `public/assets/sources/` archive, original stills in `public/assets/illustrations/`, and supplied portraits in `public/assets/references/`. Selected runtime WebP files are organized in sibling image categories (including `public/assets/npcs/`). The app’s postbuild step removes every unlisted image from the **export**, preserving all originals in the project. Source PNGs are not required on a fresh checkout for validation/build, but must be separately backed up if they are needed for future preparation.

Preparation recipes live in `src/data/art/production-recipes.json`. `npm run assets:build -- --entity lucien` regenerates only that entity’s prepared variants, preserving all character fields and assets outside the recipe. The full command rebuilds every recipe. Add new pose versions to the same entity’s array; add a new catalog path in `index.json` for a new entity. Prompt provenance lives in `src/data/sessions/28.10.2026/art/generation-prompts.json`.

`prototype` assets are integrated drafts; `retired` marks an earlier variant kept for reference. Preserve shared frame sizes/normalized anchors between poses, cage rear/creature/front depth order, and background horizons. Reusing a creature image never introduces an extra narrative creature or resurrects a defeated enemy.

Use `npm run assets:build -- --asset camp-night-far --asset camp-night-middle` to prepare only selected asset IDs without regenerating earlier variants. The `caravan-camp` record retains both lighting sets; the runtime `caravan-camp-night` environment uses the three matching night layers. Keep parked wagons stationary during this rest scene. Night game and guard compositions are shared across their participants’ asset arrays.
