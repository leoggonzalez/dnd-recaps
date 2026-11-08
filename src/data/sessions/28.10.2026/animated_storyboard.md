# Animated storyboard — 28.10.2026

Status: eight-scene scope approved by the user. Layered artwork production is in progress.

Source: [session recap](../28.10.2026.md), plus Aldrik’s recorded mounted shot in [his character record](../../../model/characters/aldrik.json). The old [still storyboard](storyboard.md) informs framing only. Narration is stored in [the draft manifest](../2026-10-28.json) and reproduced below for review.

## Stage and art rules

1920 × 1080 logical stage, scaled uniformly to 16:9. Parchment #f2e6cc, ink #30261e, muted ink #75634d, burgundy #773e35, moss #697054. Sepia contours, crosshatching, restrained washes. System Georgia serif is the initial typography; a licensed bundled font remains a production task. Artwork never contains readable generated lettering.

Each environment has far (depth 0), middle (20), near (80) layers. Actors use explicit depths between them. Camp uses a shared horizon; cage rear depth 35, peryton 40, cage front 45, Balerias 50. Camera translation is capped at 32 logical units; produce at least 48 units of overscan per edge. Middle/near layers and cutouts require real alpha. Pose variants share a frame and foot anchor. Mounted Aldrik and the webbed horse are grouped assets. Final poses hold; reduced motion presents the final composition with all narration visible.

## Environment and production inventory

| Environment | Scenes | Layers and reuse |
| --- | --- | --- |
| caravan-camp-night | 01 | Night sky/ground; twelve stationary wagons in one long line; dark near foliage. Seated game and standing guards are separate cutouts. |
| caravan-camp | 02–03 | Earlier camp layers retained for these prototype scenes and future reuse. |
| sleeping-space | 04 | Dark sleeping area; belongings; close foreground cloth. No visible Lucien. |
| woodland-road | 05 | Distant road; exactly three cult wagons as separate props; foreground verge. |
| tangled-forest | 06–08 | Canopy; road and trunks; transparent branches/web edges. Reframe 08 before commissioning a fifth environment. |

Required shared cutouts and variants (not a generated-image quota):

- Lucien: neutral, casting/hurling; dark skin, closely cropped black hair, short trimmed beard and moustache, crimson-purple robes (current character record supersedes older prompts). Never visible in scene 04.
- Aldrik: mounted neutral and under-neck aiming group; youthful pale elf, short dark hair, no facial hair, dark leather, light crossbow.
- Balerias: neutral, food offering, crossbow aiming/fired, cocoon opening; gray hair/beard, mechanical eye, oversized crossbow.
- Coppercoil: neutral/casting, visibly tiny copper dragonborn with mechanical jaw and green core; Coppergoat neutral/ramming. No other constructs added.
- Arietta: seated/walking; auburn-brown hair, olive cloak, blue-gray scarf, established travel gear. Sulesdeg and Tyjit watch the game; Oyn stands back at the cage.
- Samardag and Radecere: distant silhouettes only pending references. Orvustia and Leda: small spear-bearing defenders pending appearance references. Zelina sleeps offscreen.
- Peryton: waiting/accepting grouped close interaction; cage rear/front; food; optional subtle eye glimmer. No reply to animal speech.
- Props: game crate/cards/purse, journal/pen/potion, three wagon instances, projectile, bolt, force darts, web overlays, cocoon cover, grouped hand/scroll, pin/coins.
- Horses: neutral, recoil, kick, grouped webbed/dragging; no invented colors. Strawberry Three and Mo Two retain separate instance IDs.
- Enemies: reusable ettercap neutral/dragging/defeated poses; spider descending/attack/defeated poses. Never clone a defeated instance back into an active one.

## Continuity and unresolved references

The recap explicitly introduces **three ettercaps**, but later describes Balerias bringing down one, Aldrik felling the next, Lucien killing the horse-dragger, and a final bolt at a remaining attacker. It does not unambiguously identify every target’s species or link the final target to prior individuals. Do not silently add a fourth ettercap or pretend this is a round-by-round reconstruction. Use E1–E3 only, keep unspecified hits/defeats offscreen, focus scene 07 on the horse-dragger, and show the final bolt leaving frame in 07. Resolve any literal target-to-kill mapping against further user notes before final battle art. Spiders S1 (Lucien), S2 (Coppergoat/Aldrik), S3 (horse-hoof sequence) are staging labels; the total spider count is unspecified. The mounted insert asserts no extra kill.

Samardag, Radecere, Orvustia, Leda, horse coats, and detailed peryton markings lack close-up references. Keep them indistinct in rough staging; resolve close-ups before final art. Arietta’s intentions, the decoy suspicion, the eye reflection, and the scroll’s contents stay unresolved. Rumble and Vladifix are absent. User clarifications about participation are recorded in the affected character/NPC events without changing their sheets.

## Scene specification — approved eight-scene scope

The user selected the eight scenes in [storyboard.md](storyboard.md). This replaces the earlier 15-scene proposal. Narration is in the app manifest. All movement is proposed presentation; the source storyboard’s 3:2 painterly prompts are retained as historical references, while new assets use this document’s layered 16:9 parchment/ink direction.

### 01 — A little luck (`a-little-luck`)

Environment: `caravan-camp-night`.

The long caravan had stopped for the night. Along the parked wagons, Samardag called a game of Three-Dragon Ante.

Lucien and Arietta sat together at the cards, with Balerias playing too. Radecere brought a surprisingly substantial purse.

Sulesdeg and Tyjit stood watch without joining.

Current staging: twelve stationary wagons form a long line behind five seated gamblers. Lucien and Arietta share a bench. Balerias holds cards. The two guards stand separately at depth 35; the game group is at depth 50. No walking or travelling motion is assigned to these cutouts. Background parallax and the existing ink reveal run concurrently. The night sky, wagon line, near foliage, game and guards are five new assets; earlier lighting variants remain registered for reuse. The caravan total is distinct from the three cult wagons in scene 05.

### 02 — A walk through camp (`a-walk-through-camp`)

Environment: `caravan-camp`.

By lanternlight, Arietta asked about Lucien’s past and the magic in his bloodline.

Lucien sensed she was concealing something. He could not yet say what.

Proposed staging: Two cutouts move together a short distance through the lantern-lit camp and settle.

### 03 — An offering for the peryton (`an-offering-for-the-peryton`)

Environment: `caravan-camp`.

Balerias extended food through the cage while Oyn kept a safer distance.

The peryton accepted and stayed close. Something glimmered strangely in its eyes.

Proposed staging: Balerias changes to offering pose; peryton approaches behind cage bars; subtle glimmer appears.

### 04 — A note in the dark (`a-note-in-the-dark`)

Environment: `sleeping-space`.

Invisible, Lucien searched the sisters’ belongings and found a healing potion and a journal.

Its entries concealed familiar names behind descriptions. On the final page, he disguised his handwriting:

“I know what you are doing.”

Proposed staging: Sleeping-space layers; journal and pen cutouts; pen moves over the page.

### 05 — Counting the wagons (`counting-the-wagons`)

Environment: `woodland-road`.

Aldrik rode past three cult wagons, studying their disciplined watches. The middle wagon carried an extra traveller.

Could one be a decoy? For now, it was only a suspicion.

Far from prying eyes, Aldrik and Balerias discussed the wagons.

They agreed that earning the cultists’ trust might help them follow if the wagons left the caravan.

Proposed staging: Exactly three guarded wagons recede behind Aldrik and Balerias as they discuss the unconfirmed decoy suspicion away from prying ears.

### 06 — Under the horse’s neck (`under-the-horses-neck`)

Environment: `tangled-forest`.

The road narrowed beneath tangled branches. Webbing caught the horses; three ettercaps and huge spiders emerged.

The caravan fought back. From horseback, Aldrik sighted beneath his horse’s neck with his light crossbow.

Proposed staging: Aldrik rides sideways and aims his light crossbow beneath his horse’s neck at a huge spider. Tangled forest and webs frame the attack; no additional kill is implied.

### 07 — The horses fight back (`the-horses-fight-back`)

Environment: `tangled-forest`.

The intended prey fought back. Strawberry Three kicked; Mo Two struck another attacker.

Pounding hooves helped bring down a great spider.

An ettercap wrapped a horse in silk and began hauling it toward the forest.

Lucien killed the creature before it could carry the horse away.

Proposed staging: Strawberry Three and Mo Two strike back at the spiders. Nearby, an ettercap drags a webbed horse; Lucien stops it before the horse can be taken away.

### 08 — The cocoon’s secret (`the-cocoons-secret`)

Environment: `tangled-forest`.

Balerias cut open a cocoon. A dead woman lay inside, clutching a scroll.

The company recovered it, a silver cloak pin, and seventy-six gold pieces.

What the scroll contained—and why she had held it so tightly—remained unknown.

Proposed staging: Web cover shifts away; hand and scroll become visible; final slow drift emphasizes the discovery.

## Existing image audit

All twelve existing `public/assets/illustrations/*.png` files are 1536 × 1024, RGB (PNG color type 2, no alpha), approximately 2–3.5 MB each; about 32 MB total. They are flattened 3:2 reference illustrations, including revisions and a separate retro-cartoon treatment. None meets the new three-layer 16:9 runtime contract. Preserve every original; use for reference only. Originals now live under `public/assets/illustrations/` and remain unchanged; export pruning excludes them from the published app. New layered assets now have WebP comparisons and metadata in the reusable register; the original still illustrations remain reference-only.

Audit dimensions and byte counts are recorded in [asset_audit.json](asset_audit.json); structural suitability is not approval of visual style. User-supplied parchment reference images from the planning chat are not in this checkout. Recover those before final style matching.

## Layered prototype assets and reuse

Selected assets are registered in [src/model/index.json](../../../model/index.json). Each categorized entity record has an `assets` array with descriptions and image paths. See [the register guide](../../../model/README.md) before creating another asset. Generated source PNGs are preserved in the ignored local `public/assets/sources/` archive; optimized WebP copies are in `public/assets/`. Exact prompts and source paths are in [art/generation-prompts.json](art/generation-prompts.json).

Scenes 01 and 02 share the camp environment and walking pair. Scene 03 uses Oyn, two aligned Balerias poses, a peryton, and matching rear/front cage planes at depths 35/45 around the creature at 40. Scene 07 uses the forest layers, Lucien’s hurling pose, an unnamed webbed horse, and one ettercap switching from dragging to defeated at 2400 ms. A smaller two-horse/spider group supports the counterattack beat behind the rescue. The spider is a distinct target; the grouped bitmap is not copied into additional enemies.

These are integrated prototype drafts. Remaining scene artwork and real-device visual/memory acceptance are still required before marking the recap complete.
