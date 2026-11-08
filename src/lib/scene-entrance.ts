import type { Session } from "./schema";
/** Ink, camera and authored actions share scene time; narration follows the opening. */
export const SCENE_NARRATION_DELAY_MS = 2400;
export const INK_REVEAL_DURATION_MS = 820;
export function actorEntranceDelays(
  session: Session,
  scene: Session["scenes"][number],
) {
  const ranked = [...scene.actors].sort((a, b) => {
    const prop = (assetId: string) =>
      session.assets.find((asset) => asset.id === assetId)?.kind === "prop";
    return (
      Number(prop(b.assetId)) - Number(prop(a.assetId)) || a.zIndex - b.zIndex
    );
  });
  return new Map(
    ranked.map((actor, rank) => [actor.id, 600 + Math.min(rank, 6) * 75]),
  );
}
