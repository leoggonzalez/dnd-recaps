import { z } from "zod";
const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const point = z
  .object({ x: z.number().min(0).max(1), y: z.number().min(0).max(1) })
  .strict();
export const libraryAssetSchema = z
  .object({
    id,
    description: z.string().min(1),
    path: z.string().regex(/^public\/assets\/[a-zA-Z0-9_./-]+\.(webp|png)$/),
    sourcePath: z
      .string()
      .regex(/^public\/assets\/sources\/[a-z0-9-]+-v\d+\.png$/)
      .optional(),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    bytes: z.number().int().positive(),
    sha256: z.string().regex(/^[a-f0-9]{64}$/),
    kind: z.enum([
      "background",
      "cutout",
      "prop",
      "effect",
      "cover",
      "reference",
      "illustration",
    ]),
    anchor: point,
    hasAlpha: z.boolean(),
    encoding: z.enum(["lossy-webp", "original-png"]),
    version: z.number().int().positive(),
    status: z.enum(["prototype", "approved", "retired", "reference"]),
    usage: z
      .enum(["standalone", "shared-composition", "portrait-reference"])
      .optional(),
    alternatives: z
      .object({
        lossyBytes: z.number().int().positive(),
        nearLosslessBytes: z.number().int().positive(),
      })
      .strict()
      .optional(),
    provenance: z
      .string()
      .regex(/^src\/data\/[a-zA-Z0-9_./-]+\.json$/)
      .optional(),
  })
  .strict();
const base = z.object({
  schemaVersion: z.literal(1),
  id,
  name: z.string().min(1),
  description: z.string().min(1),
  style: z.enum(["parchment-ink-v1", "legacy"]),
  references: z.array(
    z
      .string()
      .regex(
        /^(src\/(model|data)|public\/assets)\/[a-zA-Z0-9_./-]+\.(json|md|png|webp)$/,
      ),
  ),
  tags: z.array(z.string().min(1)),
  reuseWhen: z.string().min(1),
  assets: z.array(libraryAssetSchema),
});
// Party/NPC schemas retain the full, varied source sheets without dropping fields.
export const libraryRecordSchema = z.discriminatedUnion("category", [
  base.extend({ category: z.literal("characters") }).passthrough(),
  base.extend({ category: z.literal("npcs") }).passthrough(),
  base.extend({ category: z.literal("creatures") }).strict(),
  base.extend({ category: z.literal("objects") }).strict(),
  base.extend({ category: z.literal("environments") }).strict(),
  base.extend({ category: z.literal("groups") }).strict(),
  base.extend({ category: z.literal("illustrations") }).strict(),
]);
export type LibraryRecord = z.infer<typeof libraryRecordSchema>;
export type LibraryAsset = z.infer<typeof libraryAssetSchema>;
