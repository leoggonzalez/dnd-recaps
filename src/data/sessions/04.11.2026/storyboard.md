# Draft storyboard — 04.11.2026

**In-world dates:** 7–9 Ches 1492 DR\
**Location:** Road from Baldur's Gate to Waterdeep\
**Source:** [Session transcript](../04.11.2026.md)

## Shared art direction

Use the established 16:9 parchment and ink style. Draw in sepia contours and crosshatching with restrained washes. Give each scene one persistent composition. Build far, middle, and near depth into that image, with separate character and effect layers for the ink entrance. Hold the focal gesture while narration continues. Use restrained idle motion or parallax, with a readable settled image in reduced motion. Use the current party and NPC records for appearance. Keep readable words and plot-critical markings in editable overlays.

All ten scenes are playable. The transcript establishes the event order and the three-day span. The rescue, interview and wager scenes incorporate the follow-up session notes.

## 1. The markings

- **Recap event:** In Lucien’s dream, a familiar robed figure speaks of someone sighted near a town. The sound of rushing water drowns out the news. Black liquid seeps through the polished tiles, and Lucien sees a bridge crowded with soldiers as arrows cross the sky. A warm reflection offers the first glimpse of a traveller in a woollen cap.
- **Illustrated cast:** Lucien, the robed figure, soldiers on the bridge, and the reflected traveller.
- **Composition:** Keep the chamber and crossing in one dream landscape. In the left foreground, Lucien stands on polished black tiles, his crimson-purple robes framing the view. The robed figure stands farther back in shadow. The tile seams feed into a dark river, which leads the eye toward the bridge, ranks of soldiers in smoky silhouette, and faint arrow trails. A patch of warm water hints at the traveller’s reflection.
- **Entrance and hold:** Ink in the chamber, bridge, and faint warm reflection as one background, then reveal the mist, water-edge framing, and Lucien. Hold the composition with layered parallax as the narration moves from the robed figure’s words to the crossing and then calls attention to the reflection. Give the full reveal of the markings to the next scene.

The app uses the [held dream composition](../../../model/environments/lucien-dream.json), a separate [Lucien cutout](../../../model/characters/lucien.json), and the existing transparent framing layers. The earlier timed views remain in the art catalog. The [generation prompts](art/generation-prompts.json) cover both versions.

## 2. The crossing lost

- **Recap event:** Wind lifts the reflected traveller’s cap, exposing intricate forehead markings. Lucien hears “The markings! Remember the markings!” Broken swords and forgotten graves follow. Voices whisper of a bridge, a crossing lost, and a river. “Dagger” comes through before black water swallows him.
- **Illustrated cast:** The reflected traveller and distant soldiers, seen from Lucien’s viewpoint.
- **Composition:** One low view from the riverbank. Place broken swords and grave markers close to the viewer. Across the water, let the bridge and its ranks of soldiers recede into haze. The broken weapons and graves give the crossing the feeling of a defeat. Set the traveller’s reflection in a narrow patch of warm sunlight in the foreground water, large enough to read the forehead markings at a glance. The lifted cap and warm light separate the face from the dark river.
- **Entrance and hold:** Reveal the graves and distant ranks, then lift the cap within the reflection. Let the markings hold in clear view while the voices speak of the lost crossing and “Dagger.” The fitted cap starts lifting at 1.05 seconds while the ink entrance is still finishing. It crossfades into the full cap over 320 ms and settles above the forehead. The riverbank, bridge, and reflection remain visible together with layered parallax. The bridge and its soldiers form a separate cutout that alternates two marching poses every 0.7 seconds and keeps cycling after narration finishes. Reduced motion holds the second pose. The black water swallowing Lucien and his awakening across from Arietta stay in narration.
- **Continuity:** The vision foreshadows Lucien finding Carlon. Echo the close framing of the forehead in the roadside scene, where Lucien thinks he recognizes the marking. Keep the dream’s intricate pattern distinct from Carlon’s circular oathbreaker rune. The traveller’s identity, the armies involved, and the meaning of the crossing remain open.

The [dream art catalog](../../../model/environments/lucien-dream.json) records the cleared riverbank, two aligned bridge cutouts, and two aligned cap cutouts. The scene reuses the transparent mist and water-edge layers from Scene 1.

## 3. A thread of light

- **Recap event:** Zelina’s first spell attempt pops. With Coppercoil’s help she finds the Weave, produces sparks, and tires. She privately shows him her sketch for Arietta’s nightglass perfume vial.
- **Cast:** Zelina, Coppercoil, Arietta beyond the lesson.
- **Composition:** Inside Coppercoil’s travelling workshop at hand height. His full workbench is fitted to the right wall and grounded on the wagon floor, with tools, gears, wire, gems, and an unfinished mechanism across its surface. A larger organizer follows the perspective of the left wall and is bolted into its timber rails. Zelina’s rust-red hood and dark braid frame her open palm, with Coppercoil leaning in at the same level. His face and her fingers catch the warm light from a few sparks. Set the nightglass sketch in the near plane beside her knee, partially turned toward Coppercoil. The wagon opening backlights Arietta farther away, occupied and out of their exchange.
- **Entrance and hold:** Reveal the wagon and faces, then let a thin thread of light trace toward Zelina’s palm and break into a few sparks. Hold her hand, Coppercoil’s reaction, and the visible corner of the sketch with a faint warm shimmer. Narration carries Zelina’s fatigue, the private explanation of the gift, and the uncertainty about her magic.

The [daylit wagon](../../../model/environments/daylight-wagon.json), [paired lesson pose](../../../model/groups/zelina-coppercoil-lesson.json), and [sketch foreground](../../../model/objects/nightglass-sketch.json) ink in at separate depths. A [short light trail and two spark poses](../../../model/objects/zelina-lesson-light.json) bring the palm to life. The spark shimmer keeps cycling as the image holds. The workbench and organizer are painted into the wagon layer so their mounting points, shadows, and perspective stay aligned through parallax. The [earlier separate props](../../../model/objects/coppercoil-wagon-workshop.json) remain in the art catalog.

## 4. The man in the road — Carlon Amoffel

- **Recap event:** The caravan finds Carlon Amoffel buried up to his neck. Coppercoil gives him water. Tyjit calls for a rescue, but Lord Aldor Urnpoleshurst, a pompous caravan client, objects to the delay and the trouble. Lucien volunteers to take responsibility. Aldrik casts Friends on Aldor to persuade him to agree to the rescue. Sulesdeg backs the caravan’s decision, and Copperbear helps dig Carlon free.
- **Illustrated cast:** Carlon, Coppercoil, Lucien, Aldrik, Tyjit, Aldor, Sulesdeg. Copperbear is part of the narration.
- **Composition:** Ground-level view down the halted caravan road. Carlon’s face and Coppercoil’s flask anchor the near plane. Set a complex circular oathbreaker rune on Carlon’s forehead as an editable overlay, distinct from the dream markings. In the middle, Aldor stands in tailored red with spectacles and ledger, angled toward Tyjit. Aldrik’s small casting gesture is readable just behind Aldor’s shoulder. Lucien kneels near Carlon, and Sulesdeg rises against a softer line of spectators and wagons.
- **Entrance and hold:** Reveal the stopped wagons and arguing group, then Coppercoil offering the flask and Aldrik casting Friends. Hold on the discovery and decision with layered parallax. During the ink entrance, a jade thread follows Aldrik’s casting hand toward Aldor. It settles into a softly looping halo around the lord’s head while the scene holds. Copperbear’s digging and the moment the rescuers catch Carlon are narrated from this held view.

The [halted caravan](../../../model/environments/caravan-road-rescue.json), [roadside argument](../../../model/groups/carlon-road-decision.json), and [water offering](../../../model/groups/carlon-road-rescue.json) ink in at separate depths. The [editable forehead rune](art/carlon-oathbreaker-rune.svg) travels with the near layer, and the [Friends cue](../../../model/objects/carlon-road-friends-cue.json) begins during the ink entrance and keeps shimmering as the narration continues.

## 5. Lucien’s first questions

- **Recap event:** Carlon is brought to Lucien’s wagon, where Lucien gives him shelter and questions him. Carlon says he broke off an engagement after discovering the woman’s family were bandits who expected him to join them. Lucien suspects he is holding something back. Green Imsa supplies clothes.
- **Cast:** Lucien, Carlon, and Green Imsa, with Arietta in the background.
- **Composition:** One tight view across the wagon Lucien shares with Coppercoil, Arietta, and Zelina. Use the same fitted workshop and parts rack from Scene 3. Carlon joins their wagon after the rescue. A bright opening behind Carlon picks out his tangled hair, tired profile, and arm tattoos. Lucien is closer in shadow, with light on the edge of his face as he listens. Green Imsa stands to one side with folded clothes, visible in the side light. Keep the parts rack and workbench visible around the foreground group.
- **Entrance and hold:** Reveal the shared wagon, Imsa with the folded clothes, then Lucien and Carlon. Hold the questioning posture with layered parallax and a few slow daylight motes. Carlon’s account and Lucien’s suspicion stay in narration, leaving the viewer time to study their expressions.

The [shared wagon](../../../model/environments/daylight-wagon.json) reuses the fitted workshop plate from Scene 3. The [interview pose](../../../model/groups/lucien-carlon-interview.json), [Imsa’s cutout](../../../model/npcs/green-imsa.json), and [daylight motes](../../../model/objects/lucien-wagon-dust.json) supply the new layers.

## 6. A wagon full of porcelain

- **Recap event:** Losvius invites Coppercoil into his wagon, which is packed with porcelain vases. Coppercoil climbs in carefully, and Aldrik’s spectral hand saves some of the porcelain.
- **Cast:** Coppercoil, Losvius, Aldrik.
- **Composition:** View from the inside of Losvius’s wagon toward the rain-bright entrance. Porcelain rims crowd the near edges, and a single tipping vase breaks the pattern in the middle. Coppercoil is caught mid-climb with one hand on the step. Losvius leans aside to give him room, and Aldrik remains beyond the entrance. A thin, cool trail draws the eye toward the spectral hand under the vase.
- **Entrance and hold:** Reveal the vases and the silhouette at the doorway, then the climbing Coppercoil and the spectral hand as it steadies the vase. Hold the awkward posture and near miss, with rain beyond the doorway and the faint trail settling out of view.

The [porcelain wagon](../../../model/environments/losvius-wagon.json), [climb pose](../../../model/groups/losvius-coppercoil-climb.json), and close packing crates ink in at separate depths. The [vase](../../../model/objects/losvius-wagon-porcelain.json) rocks on its base, then moves into [Aldrik’s spectral hand](../../../model/objects/aldrik-spectral-hand.json). The caught pose holds as [rain at the opening](../../../model/objects/losvius-wagon-rain.json) keeps cycling.

## 7. A wager on the cult wagons

- **Recap event:** Inside Losvius’s wagon, Coppercoil, Aldrik, and Losvius discuss what might be in the Cult of the Dragon’s wagons, including Aldrik’s suspicion that some are decoys. Losvius reports finding a seven-foot wooden crate surrounded by dark soil in Lasfelro’s wagon. Aldrik suspects a vampire. A bet persuades Losvius to investigate a cult wagon during the next substantial fight.
- **Cast:** Coppercoil, Aldrik, Losvius.
- **Composition:** Stay in Losvius’s wagon and reuse the porcelain layout. Frame the three close around a small clear space between the vases. Aldrik leans toward Losvius, Coppercoil watches the response, and Losvius holds the focal spot with one hand braced on a shelf of porcelain. A cool slit of rain light catches his profile and the nearest porcelain rims.
- **Entrance and hold:** Reveal the vases and figures, then settle on Losvius’s reaction as he takes the bet. Hold the conversation with soft rain or lantern light. Narrate the seven-foot crate and dark soil in Lasfelro’s separate wagon, Aldrik’s vampire suspicion, and the plan to investigate a cult wagon during the next substantial fight. The crate’s contents and the wager’s terms remain unknown.

The [porcelain wagon](../../../model/environments/losvius-wagon.json) carries over the shelves, foreground crates, and rain from Scene 6. Its cleared doorway frames the [new group pose](../../../model/groups/losvius-wagon-wager.json) as the three confer inside.

## 8. Nightglass

- **Recap event:** The downpour stops the caravan. Tyjit points Coppercoil toward Samardag, who explains that nightglass means obsidian in Amn. Coppercoil loses 20 gold gambling with Radecere, then buys the pendant for 250. Behind a blanket, he and Zelina make the vial and he gives her five gold for perfume.
- **Illustrated cast:** Coppercoil and Zelina. Samardag, Radecere, Lai and Tyjit are part of the narration.
- **Composition:** An overhead view of the workbench behind the blanket. The obsidian vial, copper wire, and Zelina’s sketch occupy the central pool of light. Coppercoil’s tools and Zelina’s hands frame the vial. Keep the five gold pieces on a clear patch beside her hand. Use the darker blanket edge and surrounding boards to frame the warm tabletop against the rain.
- **Entrance and hold:** Reveal the tabletop, hands, and materials, then let a subtle magical highlight move along the obsidian seam as the vial takes shape. Hold the finished vial, copper-bound stopper, and coins. The nightglass search and Radecere’s wager and sale stay in narration.

The [overhead workbench](../../../model/environments/nightglass-workbench.json) frames the [paired hands](../../../model/groups/nightglass-crafting-hands.json). A warm seam of light accompanies the change from [obsidian shards to the finished vial](../../../model/objects/nightglass-perfume-vial.json). The [five gold pieces](../../../model/objects/nightglass-perfume-coins.json) slide toward Zelina and stay visible with the vial.

## 9. The road cries out

- **Recap event:** At dawn after the storms, a hoof crushes a mushroom and it moans. Breaking caps release black dust and cries. Aldrik, Lucien, and Coppercoil recognize a shared shrieker mycelium, then retreat in overwhelming grief. Vladefix and the guards use earplugs and clear a passage over three hours.
- **Cast:** Aldrik, Lucien, Coppercoil, Vladefix, caravan guards.
- **Composition:** A low view up the wet road at dawn. In the near plane, broken mushroom caps and a lifted hoof frame the road. Along the middle, Aldrik, Lucien, and Coppercoil recoil toward the verge, leaving the center clear. Vladefix and the earplugged guards occupy the road farther back. Rows of shrieker silhouettes and wagon shapes fade into the dawn haze.
- **Entrance and hold:** Reveal the unbroken growth, then let a small plume of black dust rise where the hoof came down. Hold the recoiling figures and the guards at work, with only slight dust drift. The shared mycelium, the force of the grief, and the three-hour clearing are narrated over the same view.

The [dawn road](../../../model/environments/shrieker-road.json) holds the distant clearing party and [recoiling adventurers](../../../model/groups/shrieker-road-party.json) in one view. The [hoof](../../../model/creatures/shrieker-road-hoof.json) stamps once. The [cap collapses](../../../model/objects/shrieker-road-cap.json) on impact, then black dust drifts while the narration continues.

## 10. An overturned wagon

- **Recap event:** As the caravan moves again, Carlon takes the reins while Lucien talks about his dreams. Aldrik returns from scouting with word of hobgoblins attacking an overturned wagon. Tyjit halts the caravan and asks the party to clear the danger. Aldrik, Coppercoil, and Lucien plan their approach.
- **Cast:** Carlon, Lucien, Aldrik, Coppercoil, Tyjit, distant hobgoblins.
- **Composition:** Lucien and Coppercoil watch from the near rise as Aldrik rides down the road toward them. He looks over his shoulder and points back to the overturned wagon and hobgoblins at the bend. Tyjit stands by the halted caravan, with Carlon at the reins.
- **Entrance and hold:** Reveal the distant wreck and halted caravan, then bring Aldrik from the bend into the foreground. Alternate two registered horse poses during his ride so the legs trot while his pointing arm stays steady. Hold the arriving rider and his signal while dust drifts at the bend and the narration continues.

The [sunset road](../../../model/environments/sunset-road.json) holds the wreck in the distance. [Carlon and Tyjit](../../../model/groups/sunset-road-caravan.json) pause behind [Lucien and Coppercoil](../../../model/groups/sunset-road-lookout.json). [Aldrik](../../../model/characters/aldrik.json) grows in perspective as he rides toward them, with [dust](../../../model/objects/sunset-road-dust.json) drifting at the wreck.

## Continuity and references

- Reuse the established caravan silhouettes and the wagon interior as layout references. The October 28 interior has sleepers baked into a shared layer, so plan new character staging for Zelina practising.
- **Written visual reference:** [Lord Aldor Urnpoleshurst](../../../model/npcs/aldor-urnpoleshurst.json) is a well-dressed, lordly clerk in red, with spectacles, a moustache, a pointed goatee and a large ledger.
- **Supplied references:** [Carlon Amoffel](../../../model/npcs/carlon-amoffel.json) and [Losvius Longnose](../../../model/npcs/losvius-longnose.json). Use Carlon’s portrait for his features and arm tattoos. For the rescue, use the corrected circular oathbreaker rune as the forehead tattoo. Use Losvius’s curly hair, green vest and red neckerchief in both porcelain wagon scenes.
- **Additional supplied references:** [Green Imsa](../../../model/npcs/green-imsa.json), [Zelina Innevar](../../../model/npcs/zelina-innevar.json), [Samardag the Hoper](../../../model/npcs/samardag-the-hoper.json), [Radecere Perethun](../../../model/npcs/radecere-perethun.json), [Lasfelro the Silent](../../../model/npcs/lasfelro-the-silent.json), and [Lai Angesstun](../../../model/npcs/lai-angesstun.json). Lasfelro’s crate and Lai’s exchange stay in narration.
- Copperbear’s appearance remains provisional. Keep the robed figure and distant hobgoblins indistinct. Show the reflected traveller’s forehead markings clearly while leaving his identity unresolved.
- Preserve the distinction between the dream markings and Carlon’s inscription, and between Losvius’s report and Aldrik’s vampire theory.
