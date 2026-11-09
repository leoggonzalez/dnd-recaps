import type { Session } from "./schema";
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
