# Art direction and drawing

## Technique index

Start with the story need, choose a technique, then read its linked annotations and open the source images when available before fixing the layout or writing asset briefs. Compare at least the relevant variation when the focal beat could be staged in different ways. Record the chosen technique and example in the storyboard's composition prose; distinguish recap facts from proposed staging.

| Story need | Choose this technique when… | Starting examples |
| --- | --- | --- |
| Read a small clue, grip or vial | [Isolated focal object](#isolated-focal-object): the object matters more than the room | [3](composition-examples.md#example-3), [4](composition-examples.md#example-4) |
| Give one character depth | [Depth within one character](#depth-within-one-character): a hand, weapon or cape can establish planes | [75](composition-examples.md#example-75), [4v3](composition-examples.md#example-4v3) |
| Show a large gathering | [Crowds at multiple depths](#crowds-at-multiple-depths): ranks or spectators support one focal actor | [26](composition-examples.md#example-26), [41](composition-examples.md#example-41) |
| Examine or assemble something together | [Overhead scenes](#overhead-scenes): object positions and shared attention carry the beat | [76](composition-examples.md#example-76) |
| Frame a ritual or magical mechanism | [Counter-rotating overhead layers](#counter-rotating-overhead-layers): a radial arrangement surrounds a fixed center | [66](composition-examples.md#example-66) |
| Connect magic to a reaction | [Elemental light and magic](#elemental-light-and-magic): local light connects source, hand and face | [96](composition-examples.md#example-96), [55](composition-examples.md#example-55) |
| Stage an interior exchange | [Backlit interiors](#backlit-interiors): an opening separates profiles and depth | [86](composition-examples.md#example-86), [31](composition-examples.md#example-31) |
| Make a spell's direction clear | [Directional motion trails](#directional-motion-trails): a release pose needs a path to its target | [71](composition-examples.md#example-71) |
| Show an imminent encounter or impact | [Opposing diagonals](#opposing-diagonals): two masses or gestures meet across a clear gap | [45](composition-examples.md#example-45), [46](composition-examples.md#example-46) |
| Keep a busy environment readable | [Framing and atmospheric depth](#framing-and-atmospheric-depth): edges and haze can isolate a middle action | [85](composition-examples.md#example-85), [33](composition-examples.md#example-33) |
| Establish destination, awe or threat | [Landmark and scale](#landmark-and-scale): a small witness makes a large setting meaningful | [6](composition-examples.md#example-6), [61](composition-examples.md#example-61), [106](composition-examples.md#example-106) |
| Show an agreement, restraint or reaction | [Paired gestures and contact](#paired-gestures-and-contact): relationships carry the scene | [43](composition-examples.md#example-43), [63](composition-examples.md#example-63) |
| Keep two related areas visible | [Framed secondary space](#framed-secondary-space): a mirror or threshold connects a subordinate beat | [34](composition-examples.md#example-34), [21](composition-examples.md#example-21) |

The [annotated library](composition-examples.md) accounts for every supplied image, including variants and source limitations. The [planning walkthroughs](planning-walkthroughs.md) demonstrate the route from a brief to layers. Reference images remain outside deployed media; retain their stable root `references/` paths. Existing finished artwork stays in `public/assets/` and its canonical records.

## House style

Use the `parchment-ink-v1` look. Draw antique fantasy storybook illustrations with fine sepia ink contours, crosshatching and muted watercolor washes. Favor readable silhouettes, layered depth and one focal action. Avoid photorealism, glossy 3D, lettering and UI in artwork. Use blue-gray and indigo shadows with amber lantern light for night scenes. Use soft natural daylight, warm earth and moss for travel and woodland scenes. Keep light direction consistent across independently generated pieces.

Give each reference a role. Use a canonical portrait for identity, a previous cutout for clothes and rendering, or a supplied image for pose. When editing, state what must stay aligned and what changes. Prefer the current character record if an older illustration disagrees. Keep Coppercoil markedly smaller than the adult party members and preserve his mechanical jaw and green core. Use the specific visual traits recorded for the cast rather than relying on names in prompts.

## Loading-screen composition references

Use the supplied loading-screen and narrative illustration examples as references for staging a held image. The collection includes several genres; see the [inventory and attribution notes](composition-examples.md#inventory-and-source-notes). Carry composition into the parchment-and-ink house style, using the canonical cast and setting.

- **Compose around a story moment.** Use a decisive gesture, an eyeline, or an implied collision to suggest what just happened and what might happen next. The [mounted rider and guard](composition-examples.md#example-45) read through opposing diagonals. The [fortress arrival](composition-examples.md#example-106) uses a small lit party beneath large walls to establish scale. The previously mentioned storm/traveller/tower image has no identifiable source in the current 47-file collection; do not treat it as an available example.
- **Separate depth with values.** Frame the view with bold near silhouettes such as branches, debris, or a figure seen from behind. Keep the main action crisp in the middle distance and soften distant figures and landmarks with haze or lighter values. Leave enough open space around the focal gesture for it to read on a narrow display.
- **Use a restrained palette with one accent.** Cold blue storm light, ember red, or a small magical glow can pull the eye toward a face, landmark, or hand. Keep nearby tones quiet so the accent has room to work.
- **Hold the action, animate the atmosphere.** Let fog, rain, embers, cloth, or water provide a small repeating motion after the reveal. Preserve readable silhouettes, a clear focal point, and the same composition throughout the hold.

Borrow the framing and depth cues while keeping the app’s 16:9 stage, canonical cast, and separate narration.

## Draw for the stage

For a composite scene, sketch the full background with all zones visible before generating separate layers. Use architecture, foreground and distance, or a framed reflection to connect the zones. Keep the secondary area subordinate to the main action, and mark where each actor stands and what occludes them. Give every layer the same zone boundaries so parallax keeps the composition coherent.

- **Far.** Draw a full opaque 16:9 scene including the ground beneath all future actors. Choose one camera angle, horizon, and light source. For movement, keep the intended route traversable and visible.
- **Middle.** Draw isolated scenery, wagon lines, bedding, or other midground details on actual alpha, in their final positions within the full 16:9 frame. Match the far layer’s horizon and scale.
- **Near.** Draw only framing silhouettes on actual alpha. Use corner foliage, branches or fabric and keep the action area clear. All three layers need enough art beyond the edges for camera drift and mouse parallax.
- **Actors and objects.** Draw complete silhouettes with clean alpha and room for hands, equipment, boots and hooves. Use a stable normalized anchor such as the feet or the pen nib. Use identical frames, dimensions and anchors for pose swaps. Check an alternate pose against the actual base pose.
- **Groups.** Keep inseparable contact in one cutout when it would otherwise drift or misalign. Examples include a rider hanging from a saddle, two people sharing a wagon bench, a harnessed horse under attack, and a cocoon with its contents. Separate anything that needs independent timing, including a moving pen, projectile or charging construct.
- **Counts and placement.** Use distinct scene instances when a precise count matters. The cult convoy uses three wagon teams, each with a driver and five escorts. A distant wagon or horse can read as a silhouette. Verify important foreground figures are actually distinguishable.
- **Effects.** Keep motion and entrances in the player. For invisibility, use a blue cutout and the runtime rim treatment so the scene shows through the body. For loot or text, draw readable objects and let narration carry exact quantities or wording. Keep unknown text concealed when the story calls for it.

## Depth within one character

Examples: [75: staff, grip and cape](composition-examples.md#example-75); compare [4v3: reaching hand](composition-examples.md#example-4v3) and [5 / 9: wide versus close command gesture](composition-examples.md#example-5).

For a character-led close-up, the subject can supply all three visible depth planes against a simple, persistent backdrop. The supplied staff-wielder reference puts the cape behind the silhouette, the head and torso in the middle, and the foreshortened gripping hand and weapon nearest the viewer. The weapon's diagonal leads the eye across the frame, and its bright tip supplies the accent.

- Draw one master pose and derive aligned layers from it. Match the camera, proportions, lighting, and canvas registration. Paint overlap behind the shoulder and wrist so movement does not expose gaps. Keep the grip and weapon on one cutout.
- Keep the body stable as the visual anchor. Give the foreground more travel than the body within a tight range, and let the loose cape edge move subtly around its fixed attachment. Test the extremes of parallax and the reduced-motion still for a continuous silhouette.
- Keep an opaque backdrop underneath the transparent character pieces. With the current player, a stationary rear cape can be part of the far art behind the middle body. Use a separate actor cutout for a cape that needs its own motion, and keep the hand and weapon in front of the body.

## Crowds at multiple depths

Examples: [26: ranks around a raised leader](composition-examples.md#example-26); compare [41: audience below a tribunal](composition-examples.md#example-41). Ranks imply magnitude; audience heads imply a shared viewpoint.

For an army, market, procession, or other large gathering, increase detail as the figures get closer. The supplied army reference uses repeating spear tips and helmet silhouettes to imply ranks beyond the frame, while the nearest soldiers have individually readable poses and armor.

- **Far:** Group small silhouettes into ranks or clusters. Use lower contrast, atmospheric haze, and recurring shapes such as banners, raised hands, or heads to suggest numbers.
- **Middle:** Use overlapping groups with readable poses and varied spacing. Leave gaps where the setting or the focal action needs to show through.
- **Near:** Detail a few people or recognizable props. Crop some at the frame edge to suggest the crowd continues beyond it. Give the main subject the clearest silhouette and strongest contrast.
- Keep perspective and scale consistent across layers. Reveal and hold the groups as one composition. A little dust, cloth movement, or parallax can give the crowd life. Preserve explicit headcounts when the recap specifies them. In 16:9, spread ranks laterally while leaving a clear opening around the focal actor; avoid equal contrast on every face or spear. Paint the ground beneath every group in the opaque far layer.

## Overhead scenes

Examples: [76: lit map](composition-examples.md#example-76). Implemented adaptation (art catalog status: prototype): [November 4 Nightglass storyboard](../../../src/data/sessions/04.11.2026/storyboard.md#8-nightglass), [workbench record](../../../src/model/environments/nightglass-workbench.json), and [hands record](../../../src/model/groups/nightglass-crafting-hands.json). The scene borrows attention around a focal surface, replacing map markers with obsidian, a vial and coins.

Use a straight or slightly angled overhead view when the story depends on where things are, what people are examining, or how they gather around an object. In the supplied example, a warm pool of light makes the map and markers the focal point. Cropped heads and shoulders frame the table, and a hand reaching inward connects the characters to the map.

- **Far:** Establish the floor and surroundings from a consistent overhead angle. Depth follows height above that surface, so the closest objects can enter from any edge of the frame.
- **Middle:** Anchor the table, map, or other focal surface and keep its key details readable. Register any resting hands, markers, and contact shadows to that surface.
- **Near:** Use cropped shoulders, heads, or a reaching arm to frame the action. Leave the point of interest clear at the widest parallax offset.
- Hold the overhead composition while narration continues. Keep contact points aligned and use restrained motion such as a small shift in light or a loose paper edge.

Keep the table and every resting contact at matching parallax depth even if the art is stored in separate files. A foreground head may move more only when it does not drag its attached hand across the table. Reframe a taller reference to 16:9 around the focal surface; do not squeeze the circle into an ellipse. Avoid this view when facial identity or standing height is the primary beat.

### Counter-rotating overhead layers

Examples: [66: radial slab chamber](composition-examples.md#example-66). The radial arrangement is visible; rotation is a proposed adaptation, not evidence of how the source was animated.

Use this for an overhead composition with a strong radial structure, such as a ritual, vision, or magical mechanism. In the supplied example, the illuminated figure and slab form a still center. Repeated wing shapes and the circular structure frame the figure at different depths.

- Keep the subject, floor, and principal light fixed. Put two circular groups on separate transparent layers around a shared pivot at the subject, even if the subject sits off-center in the frame. Keep stationary architecture and contact points on their own layers.
- After the ink entrance, let the middle ring drift slowly clockwise and the near ring counterclockwise. Vary the speed by depth. A shallow arc with a gentle return can preserve the framing, while a continuous orbit needs complete art beyond the visible crop.
- Give both layers enough room for their full travel. Check the crop and overlaps through the loop so the center stays readable. Pause should freeze both rings, and reduced motion should present a balanced still.

Treat orbiting as optional production work: inspect the current player and timeline schema before promising a pivoted loop. If a common pivot or ring loop is unsupported, retain the radial still with existing subtle parallax or propose a separately scoped runtime change. Never approximate a circular orbit with sliding contact geometry.

## Elemental light and magic

Examples: [96: torch and archer](composition-examples.md#example-96), [55: luminous raised hand](composition-examples.md#example-55), and [25: separated casting hands](composition-examples.md#example-25). Choose a shared light for group reactions or separated small accents for a casting gesture.

Use fire or a visible elemental effect as a local light source when it helps tell the story. In the supplied torch scene, the bright flame catches the nearest faces, bow, and armor while the surrounding figures recede into blue shadow. Place the source where its light leads the eye toward the main gesture or reaction.

- Give the source a clear silhouette and carry its color onto nearby surfaces. Fire can cast warm spill and rim light, lightning a sharp cool edge, and magical frost a pale glint along ice crystals. Poison can read as tinted vapor or droplets, with a local glow when the magic supports it.
- Separate the flame, arc, frost shimmer, or vapor from the painted spill when it needs its own reveal or idle motion. Align the spill and shadows with the source across layers, and keep faces, hands, and props readable.
- After the entrance, hold the composition. Use a low-amplitude flicker, drifting vapor, or a slow glint. Keep lightning cues brief and local, with a steady highlight in reduced motion.

For these effects, use an opaque far setting, middle actors/source with painted spill, a restrained near frame, and an independent alpha effect only when timing requires it. In 16:9 reserve space along the source-to-reaction line. The settled pose must read without a flash; excessive glow obscures the fingers that explain the magic.

## Backlit interiors

Examples: [86: lateral court exchange](composition-examples.md#example-86), [31: high-window figure](composition-examples.md#example-31), [116: symmetrical throne](composition-examples.md#example-116), and [16: wing-framed audience](composition-examples.md#example-16). The lateral arrangement favors dialogue; the centered arrangement favors authority.

Use a bright window or doorway behind the cast to separate depth planes in a shadowed room. In the supplied hall scene, figures near the window pick up warm, pale tones while the closest figures and carved ornaments sit in deeper shadow. Narrow highlights along faces, shoulders, and armor keep important shapes legible.

- **Far:** Place the opening and its window pattern in the background. Use pale reflected light and haze to soften the distant figures nearest the source.
- **Middle:** Stage the main exchange where a lit edge or a patch of reflected light can pick out a profile, hand, or gesture. Keep the brightest area clear enough to silhouette the focal figure.
- **Near:** Let darker figures, furniture, or drapery frame the scene. Carry a restrained rim light onto edges facing the window and keep the direction of light consistent across layers.
- Hold the contrast through the narration. A little drifting dust or a slight curtain movement can animate the light without changing the composition.

Keep the lit exchange inside the 16:9 safe area and reduce window detail behind faces. If the cast becomes anonymous silhouettes, add reflected face light or change the camera; stronger backlight alone will not solve it.

## Directional motion trails

Examples: [71: shooter and faint streaks](composition-examples.md#example-71). The visible gesture is stronger than the trails; not every streak demonstrably originates at the visible muzzle.

Use a few low-opacity, tapered strokes to suggest the path of a projectile or a directed spell. The supplied illustration uses faint streaks to carry the eye across the frame while the firing gesture remains dominant.

- Trace a clean line from the visible release gesture toward the intended destination. A nearly straight streak can suggest a quick bolt, while a soft curve can suggest a sweeping cast. Let the trailing end thin and fade into the artwork.
- Keep trails subordinate to hands, faces, and the projectile or spell itself. Use scene-colored ink or a muted echo of the spell's light, and mask strokes where foreground shapes occlude them.
- If animated, reveal the trail with the release, then let it fade to a faint trace or settle out of view. The held pose should still suggest direction. In reduced motion, use a static trace where it helps the composition read.

Use a full opaque far setting, middle caster/weapon and target, and near framing that supplies the occlusion mask. A trail is an independent effect only if it needs timing; keep its endpoints registered to the release and target. The 16:9 hold should still connect the two after the trail fades. A trail that crosses faces or implies the wrong target is worse than no trail.

## Isolated focal object

Examples: [3: sword grip](composition-examples.md#example-3), [4: raised vial](composition-examples.md#example-4), [11: cup and bottle](composition-examples.md#example-11). The grip example enlarges the object; the vial example isolates it against a light opening; the bottle example demonstrates how a near prop can compete with the face.

Use this when a clue, tool, exchange or commitment must read without relying on fine detail. Choose hand height or a close low angle; reserve a quiet value patch around the object. A gaze and forearm should lead toward it. In 16:9, leave lateral breathing room for the gesture rather than stretching the object.

- **Far:** Opaque room or landscape, with simplified detail behind the focal object.
- **Middle:** Main actor and held object as one contact group; a tabletop and resting objects share registration. If an object moves independently, define its held and released poses and anchors explicitly.
- **Near:** One subordinate edge prop or sleeve, cropped without covering the important grip. A near plane may be visually sparse.
- **Hold and failure:** Keep the object silhouette and its identifying feature visible after the entrance, including at narrow sizes. Use a tiny glint only if supported by the material. Competing color accents, unreadable inscriptions and disconnected fingers defeat the technique.

## Opposing diagonals

Examples: [45: rider and guard](composition-examples.md#example-45), [46: converging ships](composition-examples.md#example-46), [3v4: sword confrontation](composition-examples.md#example-3v4), [53: upright and falling figures](composition-examples.md#example-53), [94: standing and fallen warriors](composition-examples.md#example-94). Choose an open gap for anticipation or a stable contact group for the instant of impact; the still does not establish the event's outcome.

Use a low or eye-level camera when an approach, resistance or aftermath is the beat. Draw opposing body axes across the horizontal stage and leave the focal intersection free of background tangencies. A tilted camera is optional; ground and perspective still agree across every layer.

- **Far:** Opaque traversable ground or water and a quieter setting. Paint beneath both actors and any intended travel.
- **Middle:** Complete moving subject, grouping rider/horse or hull/rigging. Keep a reaction actor independent only when the blocking allows separate timing.
- **Near:** Opponent shoulder, shield, spray or sparse birds; their overlap must not hide the release, contact or reaction.
- **Hold and failure:** Settle on the decisive pose with restrained cloth or dust. Do not loop a strike or fall merely because the still implies motion. Check weapon direction, hooves, feet and waterlines; broad parallax can turn a near miss into an unintended collision.

## Framing and atmospheric depth

Examples: [1: ruined street](composition-examples.md#example-1), [7: throne silhouettes](composition-examples.md#example-7), [8: staff bearer](composition-examples.md#example-8), [33: counter conversation](composition-examples.md#example-33), [85: battlefield search](composition-examples.md#example-85). Environmental branches frame a location; cropped people imply a witness's viewpoint. Choose the frame that supports the story.

Use this for a busy roadside, market, forest or interior where one middle-distance action must remain clear. At eye level, arrange dark edge shapes as an incomplete aperture and lighten distant values. Reserve the sharpest ink contours for the focal hands or face. In 16:9 keep the aperture wide enough for the whole action, not just the head.

- **Far:** Opaque continuous setting with low-contrast distant figures and the ground beneath the action.
- **Middle:** Focal actor or contact group and a few setting anchors; keep the lighting on their gesture stronger than nearby clutter.
- **Near:** Separate corner silhouettes with painted overscan. Do not fill the center with decorative branches or faces.
- **Hold and failure:** Light haze or dust can move independently while grounded actors stay fixed. Test both parallax extremes: framing must never become a curtain over the clue. Haze that hides necessary cast and equally dark middle/near planes collapse the hierarchy.

## Landmark and scale

Examples: [6: bridge to castle](composition-examples.md#example-6), [61: witness below a vast form](composition-examples.md#example-61), [106: fortress arrival](composition-examples.md#example-106), [74: looking toward a city](composition-examples.md#example-74), [104: bear and fighter](composition-examples.md#example-104), [2: leader and horizon](composition-examples.md#example-2). A bridge or reflected light supplies a route; a tiny figure supplies scale. Use a closer camera when facial identity matters more than magnitude.

- **Far:** Opaque sky, distant terrain and continuous ground/water. Place a pale or lit landmark against a quiet silhouette; for a looming threat, reverse the values.
- **Middle:** Landmark or large creature and a clearly separated witness, with consistent perspective. A bridge, building and its landing must stay registered; bake a reflection into its supporting plane or constrain the reflected object to it.
- **Near:** Low ground edge, boat bow, foliage or the witness seen from behind. Spread these across the 16:9 width without swallowing the small group.
- **Hold and failure:** Keep both scale extremes readable throughout narration. Water glints and mist are optional; the landmark and its contact points remain stable. If the witness disappears at thumbnail size, enlarge it or simplify surrounding detail. An impressive landscape that conceals the focal event is the wrong choice.

## Paired gestures and contact

Examples: [43: handshake](composition-examples.md#example-43), [63: restraint](composition-examples.md#example-63), [23: encircled pair](composition-examples.md#example-23), [14: scroll carrier and watcher](composition-examples.md#example-14), [84: reaction cluster](composition-examples.md#example-84). Joined hands require a contact group; an eyeline exchange can use separate actors. Keep reactions grounded in the supplied story rather than inferring motives from a reference.

- **Far:** Opaque setting with quiet space between the paired faces. Eye-level camera usually makes the relationship clearest; a low angle can emphasize vulnerability or authority.
- **Middle:** Draw the relationship as one master composition. For a handshake or restraint, group the contacting bodies and props or lock their transforms together. For separate reactions, establish shared eyelines and foot placement.
- **Near:** One witness or framing edge; protect the space around joined hands and readable faces across the horizontal stage. Retain a restrained highlight on the actual contact.
- **Hold and failure:** The contact stays aligned after the reveal. Animate smoke or cloth instead of pulling bodies apart. Several equally weighted gestures obscure the primary relationship; simplify the subordinate poses and never rely solely on tiny facial detail.

## Framed secondary space

Examples: [34: mirror](composition-examples.md#example-34), [21: split stairway](composition-examples.md#example-21), [51: doorway](composition-examples.md#example-51), [24: riders and leaf arc](composition-examples.md#example-24). A physical boundary makes two areas legible within one held image; the leaf arc is a looser variation and does not establish a second location by itself.

Use when two connected areas genuinely belong to one beat. Pick one dominant area and a quieter secondary area. Draw the complete 16:9 layout first, including the connecting architecture, ground and light logic. A mirror or vision needs an explicit boundary so it is not mistaken for another person in the same room.

- **Far:** One opaque environment with both zones present. Fix their perspective and the aperture through which the secondary action is visible.
- **Middle:** Main actors and subordinate tableau; keep reflections registered to the mirror. A separately revealed vision stays inside the frame and remains visible afterward.
- **Near:** Observer, doorway trim or balustrade with deliberate occlusion. Keep the same zone boundaries in all art; masks belong to their associated frame.
- **Hold and failure:** Both areas remain present; no background swap is needed. Restrict parallax at frame edges to prevent reflections or effects leaking into the room. Two equally bright focal areas, mismatched horizons, or a later event presented as simultaneous are reasons to simplify or split the scene.

## Prompt scaffold

Describe the asset’s layer or role, intended aspect ratio, camera and ground reference, visible action, character identity, lighting, the house style, and alpha requirements. State what other layers will supply. Example:

> Transparent 16:9 middle layer for the supplied night clearing. Match its camera and horizon. A long line of parked wagons recedes toward screen right, each with paired draft horses and distinct merchandise. Small merchants and guards stand nearby. Amber lanterns and cool indigo shadows, fine sepia ink crosshatching and muted watercolor. Keep the bottom third and sky transparent for the foreground scene and far background.

Inspect the full composite after generation. Check true alpha, relative human scale, weapon direction, contact points, occlusion, and whether the story reads without narration. Refine only the asset or position that causes the problem.
