import { writeFileSync } from "node:fs";
import { z } from "zod";
import { libraryRecordSchema } from "../src/lib/asset-library-schema";
writeFileSync(
  "src/model/schema.json",
  JSON.stringify(z.toJSONSchema(libraryRecordSchema), null, 2) + "\n",
);
