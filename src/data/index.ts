import october from "./sessions/2026-10-28.json";
import { sessionSchema } from "../lib/schema";
export const sessions = [sessionSchema.parse(october)];
