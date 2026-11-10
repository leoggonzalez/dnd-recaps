import { readFileSync } from "node:fs";
import { z } from "zod";

const description = z.string().trim().min(1);
const composition = z.discriminatedUnion("layout", [
  z.strictObject({
    layout: z.literal("single-location"),
    background: description,
    focus: description,
  }),
  z.strictObject({
    layout: z.literal("composite"),
    background: description,
    focus: description,
    zones: z.array(description).min(2),
  }),
]);
const planSchema = z.strictObject({
  scenes: z
    .array(
      z.strictObject({
        title: description,
        recapEvent: description,
        composition,
        cast: z.array(description),
        narration: description,
        entrance: description,
        hold: description,
      }),
    )
    .min(1),
  openReferences: z.array(description).default([]),
});

function main(args: string[]) {
  const usage =
    "Usage: npm run --silent session-storyboard -- DD.MM.YYYY [--plan path/to/plan.json]";
  if (args.length === 1 && args[0] === "--help") {
    console.log(usage);
    return;
  }
  const [date, flag, planPath] = args;
  if (
    !date ||
    !/^\d{2}\.\d{2}\.\d{4}$/.test(date) ||
    (args.length !== 1 && (args.length !== 3 || flag !== "--plan" || !planPath))
  ) {
    throw new Error(usage);
  }
  const recapPath = `src/data/sessions/${date}.md`;
  const recap = readFileSync(recapPath, "utf8").trim();
  if (!recap) throw new Error(`Empty recap: ${recapPath}`);

  if (!planPath) {
    console.log(
      [
        `# Storyboard planning brief — ${date}`,
        "Follow skills/session-storyboard/SKILL.md. Check the latest corrections and existing storyboard.",
        "Prefer one location per scene. Plan one persistent 16:9 background with a focal action. If several locations belong together, stage them in visible zones of that one composition.",
        "Plan the entrance and a readable hold with subtle idle motion or parallax. Keep the background in place throughout playback.",
        recap,
      ].join("\n\n"),
    );
    return;
  }

  const plan = planSchema.parse(JSON.parse(readFileSync(planPath, "utf8")));
  const output = [
    `# Draft storyboard — ${date}`,
    "",
    `[Session recap](../${date}.md)`,
    "",
    "Each scene uses one persistent 16:9 composition with a readable hold.",
  ];
  for (const [index, scene] of plan.scenes.entries()) {
    const { layout, background, focus } = scene.composition;
    output.push(
      "",
      `## ${index + 1}. ${scene.title}`,
      "",
      `- **Recap event** — ${scene.recapEvent}`,
      `- **Background** — ${background}`,
      `- **Focal action** — ${focus}`,
    );
    if (layout === "composite") {
      output.push(
        "- **Zones within the background**",
        ...scene.composition.zones.map((zone) => `  - ${zone}`),
      );
    }
    if (scene.cast.length) {
      output.push(
        "- **Cast placement**",
        ...scene.cast.map((placement) => `  - ${placement}`),
      );
    }
    output.push(
      `- **Narration** — ${scene.narration}`,
      `- **Entrance** — ${scene.entrance}`,
      `- **Hold** — ${scene.hold}`,
    );
  }
  if (plan.openReferences.length) {
    output.push(
      "",
      "## Open references",
      "",
      ...plan.openReferences.map((reference) => `- ${reference}`),
    );
  }
  console.log(output.join("\n"));
}

try {
  main(process.argv.slice(2));
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
