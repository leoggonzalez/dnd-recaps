import { z } from "zod";
const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const time = z.number().finite().nonnegative();
const point = z
  .object({ x: z.number().finite(), y: z.number().finite() })
  .strict();
export const assetSchema = z
  .object({
    id,
    path: z.string().regex(/^assets\/[a-zA-Z0-9_/-]+\.webp$/),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    bytes: z.number().int().positive(),
    sha256: z.string().regex(/^[a-f0-9]{64}$/),
    kind: z.enum(["background", "cutout", "prop", "effect", "cover"]),
    anchor: z
      .object({ x: z.number().min(0).max(1), y: z.number().min(0).max(1) })
      .strict(),
  })
  .strict();
const environmentSchema = z
  .object({
    id,
    name: z.string().min(1),
    layers: z.tuple([
      z
        .object({
          slot: z.literal("far"),
          assetId: id,
          zIndex: z.number().int(),
        })
        .strict(),
      z
        .object({
          slot: z.literal("middle"),
          offsetY: z.number().finite().optional(),
          assetId: id,
          zIndex: z.number().int(),
        })
        .strict(),
      z
        .object({
          slot: z.literal("near"),
          assetId: id,
          zIndex: z.number().int(),
        })
        .strict(),
    ]),
    overscan: z.number().finite().nonnegative(),
    cameraLimit: z.number().finite().nonnegative(),
  })
  .strict();
const actorSchema = z
  .object({
    id,
    assetId: id,
    position: point,
    opacity: z.number().min(0).max(1).optional(),
    effect: z.literal("invisibility").optional(),
    flipX: z.boolean().optional(),
    width: z.number().finite().positive(),
    zIndex: z.number().int(),
    poses: z.array(z.object({ assetId: id, startMs: time }).strict()),
    motion: z
      .object({
        preset: z.enum([
          "translate",
          "fade",
          "recoil",
          "lunge",
          "rise",
          "projectile",
        ]),
        from: point,
        to: point,
        delayMs: time,
        durationMs: time,
        easing: z.enum(["linear", "ease-in", "ease-out", "ease-in-out"]),
      })
      .strict()
      .optional(),
  })
  .strict();
export const sessionSchema = z
  .object({
    schemaVersion: z.literal(1),
    id,
    title: z.string().min(1),
    date: z.iso.date(),
    displayDate: z.string().min(1),
    inWorldDate: z.string().min(1),
    location: z.string().min(1),
    summary: z.string().min(1),
    status: z.enum(["draft", "published"]),
    coverAssetId: id.nullable(),
    assets: z.array(assetSchema),
    environments: z.array(environmentSchema),
    scenes: z
      .array(
        z
          .object({
            id,
            title: z.string().min(1),
            environmentId: id,
            description: z.string().min(1),
            durationMs: z.number().finite().positive(),
            narration: z
              .array(
                z
                  .object({
                    id,
                    text: z.string().min(1),
                    delayMs: time,
                    durationMs: time,
                  })
                  .strict(),
              )
              .min(1),
            artwork: z
              .enum(["planned", "prototype", "complete"])
              .default("planned"),
            actors: z.array(actorSchema),
            reducedMotion: z.literal("final"),
          })
          .strict(),
      )
      .min(1),
  })
  .strict()
  .superRefine((session, ctx) => {
    const fail = (message: string) => ctx.addIssue({ code: "custom", message });
    const unique = (values: string[], label: string) => {
      if (new Set(values).size !== values.length) fail(`Duplicate ${label}`);
    };
    unique(
      session.assets.map((a) => a.id),
      "asset ID",
    );
    unique(
      session.environments.map((e) => e.id),
      "environment ID",
    );
    unique(
      session.scenes.map((s) => s.id),
      "scene ID",
    );
    const assets = new Set(session.assets.map((a) => a.id));
    const reference = (ref: string) => {
      if (!assets.has(ref)) fail(`Missing asset: ${ref}`);
    };
    if (session.coverAssetId) reference(session.coverAssetId);
    if (
      session.status === "published" &&
      (!session.coverAssetId || !session.assets.length)
    )
      fail("Published sessions require artwork and cover");
    session.environments.forEach((e) => {
      e.layers.forEach((l) => reference(l.assetId));
      if (e.overscan < e.cameraLimit) fail(`Insufficient overscan: ${e.id}`);
      if (!(
        e.layers[0].zIndex < e.layers[1].zIndex &&
        e.layers[1].zIndex < e.layers[2].zIndex
      ))
        fail(`Invalid layer depths: ${e.id}`);
    });
    session.scenes.forEach((s) => {
      if (session.status === "published" && s.artwork !== "complete")
        fail(`Incomplete artwork: ${s.id}`);
      // Drafts may name planned environments before production assets exist.
      if (
        session.status === "published" &&
        !session.environments.some((e) => e.id === s.environmentId)
      )
        fail(`Missing environment: ${s.environmentId}`);
      unique(
        s.actors.map((a) => a.id),
        `actor ID in ${s.id}`,
      );
      unique(
        s.narration.map((n) => n.id),
        `narration ID in ${s.id}`,
      );
      s.narration.forEach((n) => {
        if (n.delayMs + n.durationMs > s.durationMs)
          fail(`Narration exceeds duration: ${s.id}`);
      });
      s.actors.forEach((a) => {
        reference(a.assetId);
        a.poses.forEach((p, i) => {
          const base = session.assets.find((asset) => asset.id === a.assetId);
          const pose = session.assets.find((asset) => asset.id === p.assetId);
          if (
            base &&
            pose &&
            (base.width !== pose.width ||
              base.height !== pose.height ||
              base.anchor.x !== pose.anchor.x ||
              base.anchor.y !== pose.anchor.y)
          )
            fail(`Pose frame mismatch: ${a.id}`);
          reference(p.assetId);
          if (
            p.startMs > s.durationMs ||
            (i > 0 && p.startMs <= a.poses[i - 1].startMs)
          )
            fail(`Invalid pose timing: ${a.id}`);
        });
        if (a.motion && a.motion.delayMs + a.motion.durationMs > s.durationMs)
          fail(`Motion exceeds duration: ${a.id}`);
      });
    });
  });
export type Session = z.infer<typeof sessionSchema>;

/** All required assets, including alternate poses, deduplicated by content hash. */
export function assetGraph(session: Session) {
  const ids = new Set<string>();
  if (session.coverAssetId) ids.add(session.coverAssetId);
  const environmentIds = new Set(session.scenes.map((s) => s.environmentId));
  session.environments
    .filter((e) => environmentIds.has(e.id))
    .forEach((e) => e.layers.forEach((l) => ids.add(l.assetId)));
  session.scenes.forEach((s) =>
    s.actors.forEach((a) => {
      ids.add(a.assetId);
      a.poses.forEach((p) => ids.add(p.assetId));
    }),
  );
  const hashes = new Set<string>();
  return session.assets
    .filter((a) => ids.has(a.id))
    .filter((a) => {
      if (hashes.has(a.sha256)) return false;
      hashes.add(a.sha256);
      return true;
    });
}
