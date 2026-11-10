# Art direction and drawing

## House style

Use the `parchment-ink-v1` look. Draw antique fantasy storybook illustrations with fine sepia ink contours, crosshatching and muted watercolor washes. Favor readable silhouettes, layered depth and one focal action. Avoid photorealism, glossy 3D, lettering and UI in artwork. Use blue-gray and indigo shadows with amber lantern light for night scenes. Use soft natural daylight, warm earth and moss for travel and woodland scenes. Keep light direction consistent across independently generated pieces.

Give each reference a role. Use a canonical portrait for identity, a previous cutout for clothes and rendering, or a supplied image for pose. When editing, state what must stay aligned and what changes. Prefer the current character record if an older illustration disagrees. Keep Coppercoil markedly smaller than the adult party members and preserve his mechanical jaw and green core. Use the specific visual traits recorded for the cast rather than relying on names in prompts.

## Loading-screen composition references

Use the supplied Witcher 3-style loading-screen examples as visual references for staging a held image. Carry their compositional techniques into the parchment-and-ink house style.

- **Compose around a story moment.** Use a decisive gesture, an eyeline, or an implied collision to suggest what just happened and what might happen next. The mounted rider and guard read through opposing diagonals. The storm scene uses a small traveller and a bright distant tower to establish scale and direction.
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

For a character-led close-up, the subject can supply all three visible depth planes against a simple, persistent backdrop. The supplied staff-wielder reference puts the cape behind the silhouette, the head and torso in the middle, and the foreshortened gripping hand and weapon nearest the viewer. The weapon's diagonal leads the eye across the frame, and its bright tip supplies the accent.

- Draw one master pose and derive aligned layers from it. Match the camera, proportions, lighting, and canvas registration. Paint overlap behind the shoulder and wrist so movement does not expose gaps. Keep the grip and weapon on one cutout.
- Keep the body stable as the visual anchor. Give the foreground more travel than the body within a tight range, and let the loose cape edge move subtly around its fixed attachment. Test the extremes of parallax and the reduced-motion still for a continuous silhouette.
- Keep an opaque backdrop underneath the transparent character pieces. With the current player, a stationary rear cape can be part of the far art behind the middle body. Use a separate actor cutout for a cape that needs its own motion, and keep the hand and weapon in front of the body.

## Crowds at multiple depths

For an army, market, procession, or other large gathering, increase detail as the figures get closer. The supplied army reference uses repeating spear tips and helmet silhouettes to imply ranks beyond the frame, while the nearest soldiers have individually readable poses and armor.

- **Far:** Group small silhouettes into ranks or clusters. Use lower contrast, atmospheric haze, and recurring shapes such as banners, raised hands, or heads to suggest numbers.
- **Middle:** Use overlapping groups with readable poses and varied spacing. Leave gaps where the setting or the focal action needs to show through.
- **Near:** Detail a few people or recognizable props. Crop some at the frame edge to suggest the crowd continues beyond it. Give the main subject the clearest silhouette and strongest contrast.
- Keep perspective and scale consistent across layers. Reveal and hold the groups as one composition. A little dust, cloth movement, or parallax can give the crowd life. Preserve explicit headcounts when the recap specifies them.

## Overhead scenes

Use a straight or slightly angled overhead view when the story depends on where things are, what people are examining, or how they gather around an object. In the supplied example, a warm pool of light makes the map and markers the focal point. Cropped heads and shoulders frame the table, and a hand reaching inward connects the characters to the map.

- **Far:** Establish the floor and surroundings from a consistent overhead angle. Depth follows height above that surface, so the closest objects can enter from any edge of the frame.
- **Middle:** Anchor the table, map, or other focal surface and keep its key details readable. Register any resting hands, markers, and contact shadows to that surface.
- **Near:** Use cropped shoulders, heads, or a reaching arm to frame the action. Leave the point of interest clear at the widest parallax offset.
- Hold the overhead composition while narration continues. Keep contact points aligned and use restrained motion such as a small shift in light or a loose paper edge.

### Counter-rotating overhead layers

Use this for an overhead composition with a strong radial structure, such as a ritual, vision, or magical mechanism. In the supplied example, the illuminated figure and slab form a still center. Repeated wing shapes and the circular structure frame the figure at different depths.

- Keep the subject, floor, and principal light fixed. Put two circular groups on separate transparent layers around a shared pivot at the subject, even if the subject sits off-center in the frame. Keep stationary architecture and contact points on their own layers.
- After the ink entrance, let the middle ring drift slowly clockwise and the near ring counterclockwise. Vary the speed by depth. A shallow arc with a gentle return can preserve the framing, while a continuous orbit needs complete art beyond the visible crop.
- Give both layers enough room for their full travel. Check the crop and overlaps through the loop so the center stays readable. Pause should freeze both rings, and reduced motion should present a balanced still.

## Elemental light and magic

Use fire or a visible elemental effect as a local light source when it helps tell the story. In the supplied torch scene, the bright flame catches the nearest faces, bow, and armor while the surrounding figures recede into blue shadow. Place the source where its light leads the eye toward the main gesture or reaction.

- Give the source a clear silhouette and carry its color onto nearby surfaces. Fire can cast warm spill and rim light, lightning a sharp cool edge, and magical frost a pale glint along ice crystals. Poison can read as tinted vapor or droplets, with a local glow when the magic supports it.
- Separate the flame, arc, frost shimmer, or vapor from the painted spill when it needs its own reveal or idle motion. Align the spill and shadows with the source across layers, and keep faces, hands, and props readable.
- After the entrance, hold the composition. Use a low-amplitude flicker, drifting vapor, or a slow glint. Keep lightning cues brief and local, with a steady highlight in reduced motion.

## Backlit interiors

Use a bright window or doorway behind the cast to separate depth planes in a shadowed room. In the supplied hall scene, figures near the window pick up warm, pale tones while the closest figures and carved ornaments sit in deeper shadow. Narrow highlights along faces, shoulders, and armor keep important shapes legible.

- **Far:** Place the opening and its window pattern in the background. Use pale reflected light and haze to soften the distant figures nearest the source.
- **Middle:** Stage the main exchange where a lit edge or a patch of reflected light can pick out a profile, hand, or gesture. Keep the brightest area clear enough to silhouette the focal figure.
- **Near:** Let darker figures, furniture, or drapery frame the scene. Carry a restrained rim light onto edges facing the window and keep the direction of light consistent across layers.
- Hold the contrast through the narration. A little drifting dust or a slight curtain movement can animate the light without changing the composition.

## Directional motion trails

Use a few low-opacity, tapered strokes to suggest the path of a projectile or a directed spell. The supplied illustration uses faint streaks to carry the eye across the frame while the firing gesture remains dominant.

- Trace a clean line from the visible release gesture toward the intended destination. A nearly straight streak can suggest a quick bolt, while a soft curve can suggest a sweeping cast. Let the trailing end thin and fade into the artwork.
- Keep trails subordinate to hands, faces, and the projectile or spell itself. Use scene-colored ink or a muted echo of the spell's light, and mask strokes where foreground shapes occlude them.
- If animated, reveal the trail with the release, then let it fade to a faint trace or settle out of view. The held pose should still suggest direction. In reduced motion, use a static trace where it helps the composition read.

## Prompt scaffold

Describe the asset’s layer or role, intended aspect ratio, camera and ground reference, visible action, character identity, lighting, the house style, and alpha requirements. State what other layers will supply. Example:

> Transparent 16:9 middle layer for the supplied night clearing. Match its camera and horizon. A long line of parked wagons recedes toward screen right, each with paired draft horses and distinct merchandise. Small merchants and guards stand nearby. Amber lanterns and cool indigo shadows, fine sepia ink crosshatching and muted watercolor. Keep the bottom third and sky transparent for the foreground scene and far background.

Inspect the full composite after generation. Check true alpha, relative human scale, weapon direction, contact points, occlusion, and whether the story reads without narration. Refine only the asset or position that causes the problem.
