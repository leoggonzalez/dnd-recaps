import october from "./sessions/2026-10-28.json";
import november from "./sessions/2026-11-04.json";
import { sessionSchema } from "../lib/schema";
export const sessions = [sessionSchema.parse(october), sessionSchema.parse(november)];
