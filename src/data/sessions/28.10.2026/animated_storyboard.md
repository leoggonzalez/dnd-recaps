# Animated storyboard — 28.10.2026

Status: nine scenes following the split of the wagon watch and private conversation. Layered artwork production is in progress.

Source: [session recap](../28.10.2026.md), plus Aldrik’s recorded mounted shot in [his character record](../../../model/characters/aldrik.json). The old [still storyboard](storyboard.md) informs framing only. Narration is stored in [the draft manifest](../2026-10-28.json) and reproduced below for review.

## Stage and art rules

1920 × 1080 logical stage, scaled uniformly to 16:9. Parchment #f2e6cc, ink #30261e, muted ink #75634d, burgundy #773e35, moss #697054. Sepia contours, crosshatching, restrained washes. System Georgia serif is the initial typography; a licensed bundled font remains a production task. Artwork never contains readable generated lettering.

Each environment has far (depth 0), middle (20), near (80) layers. Actors use explicit depths between them. Camp uses a shared horizon; cage rear depth 35, peryton 40, cage front 45, Balerias 50. Camera translation is capped at 32 logical units; produce at least 48 units of overscan per edge. Middle/near layers and cutouts require real alpha. Pose variants share a frame and foot anchor. Mounted Aldrik and the webbed horse are grouped assets. Final poses hold; reduced motion presents the final composition with all narration visible.

## Environment and production inventory

| Environment | Scenes | Layers and reuse |
| --- | --- | --- |
| caravan-camp-night | 01–03 | Night sky and ground, a parked merchant wagon line with paired horses and varied goods, and dark foreground foliage. Scene 01 adds the game and guards. Scene 02 uses the walking pair. Scene 03 adds Balerias, Oyn and the caged peryton. |
| sleeping-space | 04 | Wagon shell and moonlit opening; sleeping sisters and lantern; close foreground cloth. Lucien appears as a translucent outline for the audience. |
| woodland-road | 05 | Morning road, roadside hedges and foreground foliage. Three guarded wagon teams travel past Aldrik. |
| private-trail | 06 | Secluded woodland path with matching daylight and reused verge layers. |
| tangled-forest | 07 | Canopy, forest road and trunks, with transparent branches and web edges. |
| deep-forest | 08–09 | Dense trunks and rising terrain, midground mossy roots and rocks, and close ferns and branches. |

Required shared cutouts and variants (not a generated-image quota):

- Lucien: neutral, casting/hurling; dark skin, closely cropped black hair, short trimmed beard and moustache, crimson-purple robes (current character record supersedes older prompts). Invisible to the other characters in scene 04, shown to the audience as a translucent monochrome outline.
- Aldrik: mounted neutral and under-neck aiming group; youthful pale elf, short dark hair, no facial hair, dark leather, light crossbow.
- Balerias: neutral, food offering, crossbow aiming/fired; gray hair/beard, mechanical eye, oversized crossbow.
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

## Scene specification

The original eight storyboard beats expand to nine scenes following the user’s split of the wagon watch and private conversation. Narration is in the app manifest. All movement is proposed presentation; the source storyboard’s 3:2 painterly prompts are retained as historical references, while new assets use this document’s layered 16:9 parchment/ink direction.

### 01 — A little luck (`a-little-luck`)

Environment: `caravan-camp-night`.

The long caravan had stopped for the night. Along the parked wagons, Samardag called a game of Three-Dragon Ante.

Lucien and Arietta sat together at the cards, with Balerias playing too. Radecere brought a surprisingly substantial purse.

Sulesdeg and Tyjit stood watch without joining.

Current staging: stationary merchant wagons form a long line behind five seated gamblers. Paired draft horses rest by the wagons, and merchants and guards gather near textiles, barrels, produce, pottery and other cargo. Lucien and Arietta share a bench. Balerias holds cards. The two guards stand separately at depth 35; the game group is at depth 50. No walking or travelling motion is assigned to these cutouts. Background parallax and the existing ink reveal run concurrently. The night sky, wagon line, near foliage, game and guards are five new assets; earlier lighting variants remain registered for reuse. The caravan total is distinct from the three cult wagons in scene 05.

### 02 — A walk through camp (`a-walk-through-camp`)

Environment: `caravan-camp-night`.

By lanternlight, Arietta asked about Lucien’s past and the magic in his bloodline.

Lucien sensed she was concealing something. He could not yet say what.

Current staging: Lucien and Arietta walk arm in arm past the lantern-lit wagons using their existing walking cutout and motion.

### 03 — An offering for the peryton (`an-offering-for-the-peryton`)

Environment: `caravan-camp-night`.

Balerias extended food through the cage while Oyn kept a safer distance.

The peryton accepted and stayed close. Something glimmered strangely in its eyes.

Current staging: Balerias changes to his offering pose and the peryton approaches behind the cage bars. Oyn stands beside Balerias, a step back from the cage, with the parked merchant wagons behind them.

### 04 — A note in the dark (`a-note-in-the-dark`)

Environment: `sleeping-space`.

Invisible, Lucien searched the sisters’ belongings and found a healing potion and a journal.

Its entries concealed familiar names behind descriptions. On the final page, he disguised his handwriting:

“I know what you are doing.”

Current staging: Inside the covered wagon, Arietta and Zelina sleep on bedrolls beside a lantern. A translucent blue silhouette with a clearer icy edge suggests Lucien crouching by their open satchel. The healing potion rests beside the journal while the Emerald Pen travels across its open page. The note is conveyed by narration.

### 05 — Counting the wagons (`counting-the-wagons`)

Environment: `woodland-road`.

The next morning, Aldrik rides past three Cult of the Dragon wagons with six guards each. The teams travel in silence. Aldrik keeps a separate line on the road and glances back as he rides by. The possibility of a decoy remains a suspicion.

### 06 — Out of earshot (`out-of-earshot`)

Environment: `private-trail`.

Aldrik and Balerias walk a secluded trail away from the caravan and talk over what Aldrik saw. They agree that earning the cultists’ trust might help them follow if the wagons leave the caravan.

### 07 — Under the horse’s neck (`under-the-horses-neck`)

Environment: `tangled-forest`.

The caravan comes down the forest road in a long line. Guards defend against two giant spiders farther back. Lucien and Coppercoil fight from the lead wagon.

An ettercap lunges at the lead wagon’s left draft horse while it is still in harness. Coppercoil summons Coppergoat and sends it charging left at the ettercap. On the right, Aldrik hangs sideways from his saddle and fires beneath his mount’s neck toward the same attacker. The caravan approaches along the forest road.

### 08 — The horses fight back (`the-horses-fight-back`)

Environment: `deep-forest`.

The intended prey fought back. Strawberry Three kicked; Mo Two struck another attacker.

Pounding hooves helped bring down a great spider.

An ettercap wrapped a horse in silk and dragged it over the roots, deeper into the trees.

Lucien killed the creature before it could carry the horse away.

Strawberry Three and Mo Two strike back in the distance. Off the road, the ettercap drags the webbed horse across the uneven forest floor toward the thick trees on the right. Lucien stops it.

### 09 — The cocoon’s secret (`the-cocoons-secret`)

Environment: `deep-forest`.

Lucien knelt beside the cocoon and cut it open with his knife. A dead woman lay inside, clutching a scroll.

The company recovered it, a silver cloak pin, and seventy-six gold pieces.

What the scroll contained—and why she had held it so tightly—remained unknown.

Current staging: Coppercoil, Balerias and Aldrik look on as Lucien kneels and cuts the silk. The closed cocoon switches to the opened view at the end of his knife motion. The woman’s grip on the rolled scroll, the silver pin and the spilled gold are visible.

## Existing image audit

All twelve existing `public/assets/illustrations/*.png` files are 1536 × 1024, RGB (PNG color type 2, no alpha), approximately 2–3.5 MB each; about 32 MB total. They are flattened 3:2 reference illustrations, including revisions and a separate retro-cartoon treatment. None meets the new three-layer 16:9 runtime contract. Preserve every original; use for reference only. Originals now live under `public/assets/illustrations/` and remain unchanged; export pruning excludes them from the published app. New layered assets now have WebP comparisons and metadata in the reusable register; the original still illustrations remain reference-only.

Audit dimensions and byte counts are recorded in [asset_audit.json](asset_audit.json); structural suitability is not approval of visual style. User-supplied parchment reference images from the planning chat are not in this checkout. Recover those before final style matching.

## Layered prototype assets and reuse

Selected assets are registered in [src/model/index.json](../../../model/index.json). Each categorized entity record has an `assets` array with descriptions and image paths. See [the register guide](../../../model/README.md) before creating another asset. Generated source PNGs are preserved in the ignored local `public/assets/sources/` archive; optimized WebP copies are in `public/assets/`. Exact prompts and source paths are in [art/generation-prompts.json](art/generation-prompts.json).

Scenes 01–03 share the night camp layers. The seated game appears in Scene 01 and the walking pair appears in Scene 02. Scene 03 uses Oyn, two aligned Balerias poses, a peryton, and matching rear/front cage planes at depths 35/45 around the creature at 40. Scene 08 uses its own deep-forest layers, Lucien’s hurling pose, an unnamed webbed horse, and one ettercap switching from dragging to defeated at 2400 ms. A smaller two-horse/spider group supports the counterattack beat behind the rescue. The spider is a distinct target; the grouped bitmap is not copied into additional enemies.

These are integrated prototype drafts. Remaining scene artwork and real-device visual/memory acceptance are still required before marking the recap complete.
