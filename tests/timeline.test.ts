import { test } from "node:test";
import assert from "node:assert/strict";
import { poseIntervals, poseKeyframes } from "../src/lib/timeline";
test("pose compiler creates complete exclusive intervals and a holding final state", () => {
  const actor = {
    id: "figure",
    assetId: "waiting",
    position: { x: 0, y: 0 },
    width: 200,
    zIndex: 30,
    poses: [
      { assetId: "offering", startMs: 1000 },
      { assetId: "settled", startMs: 3000 },
    ],
  };
  const intervals = poseIntervals(actor, 4000);
  assert.deepEqual(
    intervals.map((p) => [p.startMs, p.endMs, p.final]),
    [
      [0, 1000, false],
      [1000, 3000, false],
      [3000, 4000, true],
    ],
  );
  assert.match(
    poseKeyframes("last", 3000, 4000, 4000, true),
    /75\.000000%\{opacity:1\}100%\{opacity:1\}/,
  );
});
