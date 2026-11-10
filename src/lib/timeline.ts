import type { Session } from "./schema";
type Actor = Session["scenes"][number]["actors"][number];
/** Complete intervals are compiled once; CSS owns timing, pause and replay. */
export function poseIntervals(actor: Actor, duration: number) {
  const cues: Actor["poses"] = [
    { assetId: actor.assetId, startMs: 0 },
    ...actor.poses,
  ];
  if (cues.length > 1 && cues[1].startMs === 0) cues.shift();
  return cues.map((cue, i) => ({
    ...cue,
    endMs: cues[i + 1]?.startMs ?? duration,
    fadeInMs: cue.fadeMs ?? 0,
    fadeOutMs: cues[i + 1]?.fadeMs ?? 0,
    final: i === cues.length - 1,
  }));
}
export function poseKeyframes(
  name: string,
  start: number,
  end: number,
  duration: number,
  final: boolean,
  fadeInMs = 0,
  fadeOutMs = 0,
) {
  const percent = (ms: number) => `${((ms / duration) * 100).toFixed(6)}%`;
  const frames = start === 0 ? ["0%{opacity:1}"] : ["0%{opacity:0}"];
  if (start > 0) {
    if (fadeInMs)
      frames.push(
        `${percent(start)}{opacity:0;animation-timing-function:linear}`,
      );
    frames.push(`${percent(start + fadeInMs)}{opacity:1}`);
  }
  if (!final) {
    if (fadeOutMs)
      frames.push(
        `${percent(end)}{opacity:1;animation-timing-function:linear}`,
      );
    frames.push(`${percent(end + fadeOutMs)}{opacity:0}`);
  }
  frames.push(`100%{opacity:${final ? 1 : 0}}`);
  return `@keyframes ${name}{${frames.join("")}}`;
}
