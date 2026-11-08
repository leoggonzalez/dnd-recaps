import type { Session } from "./schema";
type Actor = Session["scenes"][number]["actors"][number];
/** Complete intervals are compiled once; CSS owns timing, pause and replay. */
export function poseIntervals(actor: Actor, duration: number) {
  const cues = [{ assetId: actor.assetId, startMs: 0 }, ...actor.poses];
  if (cues.length > 1 && cues[1].startMs === 0) cues.shift();
  return cues.map((cue, i) => ({
    ...cue,
    endMs: cues[i + 1]?.startMs ?? duration,
    final: i === cues.length - 1,
  }));
}
export function poseKeyframes(
  name: string,
  start: number,
  end: number,
  duration: number,
  final: boolean,
) {
  const percent = (ms: number) => `${((ms / duration) * 100).toFixed(6)}%`;
  const frames =
    start === 0
      ? ["0%{opacity:1}"]
      : [`0%{opacity:0}`, `${percent(start)}{opacity:1}`];
  if (!final) frames.push(`${percent(end)}{opacity:0}`);
  frames.push(`100%{opacity:${final ? 1 : 0}}`);
  return `@keyframes ${name}{${frames.join("")}}`;
}
