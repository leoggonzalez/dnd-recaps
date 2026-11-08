# The Caravan Chronicles

A static Next.js storybook for D&D session recaps, hosted on GitHub Pages. The app currently has eight scenes from the [October 28 storyboard](src/data/sessions/28.10.2026/storyboard.md), with layered artwork drafts for scenes 1–3 and 7. Scenes 4–6 and 8 still need artwork; see [implementation status](docs/IMPLEMENTATION_STATUS.md) and [the plan](docs/IMPLEMENTATION_PLAN.md).

## Project layout

```text
src/
  app/                 Next.js routes, global CSS and compiled pose styles
  components/          Library/player controls and layered stage
  lib/                 Schemas, loading, timeline and asset URL helpers
  model/               Canonical entities with embedded assets arrays
    characters/        Complete party sheets, appearances, events and images
    npcs/              Complete NPC records and their images
    creatures/         Animals and enemies
    objects/           Props and cage layers
    environments/      Far/middle/near background sets
    groups/            Shared compositions involving several entities
    illustrations/     Legacy full-scene references
  data/
    sessions/          Session manifests, recap sources and storyboards
    art/               Asset preparation recipes and reports
public/assets/         All project images; source originals are in sources/
scripts/               Validation, preparation, timeline compilation and export
tests/                Unit and browser checks
skills/                Project illustration workflows
docs/                  Implementation documents and media prompt references
```

Run commands from the repository root using Node 24 (`.nvmrc`):

```sh
npm ci
npm run dev
```

## Characters and reusable images

Each character and NPC has **one complete JSON record** in `src/model/characters/` or `src/model/npcs/`. Appearance, equipment, stats, relationships, events and the `assets` array live together. For example, [Balerias](src/model/characters/balerias.json) includes his sheet and offering poses; [Arietta](src/model/npcs/arietta-innevar.json) includes her appearance and shared walking composition.

Every asset has a description and a repository-relative path such as `public/assets/characters/balerias-ready-v1.webp`. Shared compositions can be mentioned in several entity records using the same asset ID/path/hash; this does not duplicate an image or make a standalone pose. Legacy stills and portrait references are labelled `reference`. Character records take precedence over older artwork when appearances conflict.

Consult the [model register guide](src/model/README.md) before creating artwork:

```sh
npm run assets:find -- arietta
npm run assets:find -- horse
npm run validate:library
```

New preparation settings live in `src/data/art/production-recipes.json`. `npm run assets:build -- --entity lucien` rebuilds that entity’s prepared images while preserving its canonical sheet and other asset references. Full source PNGs are kept locally in the ignored `public/assets/sources/` archive. Preserve/back up that archive separately when moving machines. Normal application builds need only the committed selected WebP files and reference images.

## Validate and preview

```sh
npm run lint
npm run typecheck
npm test
npm run build
NEXT_PUBLIC_BASE_PATH='' node scripts/serve-export.mjs
```

The preview serves the root export at [localhost:4173](http://127.0.0.1:4173/). For the repository URL:

```sh
NEXT_PUBLIC_BASE_PATH=/dnd-recaps npm run build
npx playwright install chromium firefox webkit
npm run test:browser
```

Browser checks start their own static server at `/dnd-recaps/`. Set `NEXT_PUBLIC_BASE_PATH=''` on the browser command when checking a root export. Base paths are compiled into the build, so rebuild after changing them.

Session manifests are discovered through `src/data/index.ts`. App asset paths omit the `public/` prefix and use `src/lib/urls.ts` to include the deployment subpath. The prototype assembler (`npm run assets:assemble`) rebuilds the current prototype staging; edit manifests directly when authoring a new composition.

All images live in `public/assets/`, including legacy stills, portraits and local original generations. **The postbuild step keeps only images listed in the runtime session manifests in `out/assets/`**. Source archives, unused variants, reference portraits and legacy PNGs stay in the project and are excluded from the static release. Canonical sheets/model JSON are not imported into the player bundle.

## Playback and publishing

The parchment/ink toolbar floats at the bottom of the scene: mouse hover or keyboard focus reveals it, while touch controls remain visible. Opening ink masks reveal far/middle/near layers, then props and characters. Camera movement, actor motion and pose cues overlap the reveal on their original scene clock; narration has a separate 2400 ms delay. Pause, replay, tab visibility and reduced motion coordinate all effects.

The effect uses native CSS gradient masks and a registered custom property ([Chrome technique reference](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/interactive-content-reveal)); no animation framework or extra reveal artwork is needed.

CI validates root and `/dnd-recaps` exports. The manual Pages workflow builds/tests and deploys only `out/`. Configure Pages with GitHub Actions as its build source, then run **Deploy recap app to Pages** on `main`. The current draft may be published for review; it is not the completed recap MVP.

The opening scene now depicts the caravan resting for the night, with twelve parked wagons and Lucien, Arietta and Balerias seated at the game. Five new night assets are registered alongside all preserved earlier versions.
