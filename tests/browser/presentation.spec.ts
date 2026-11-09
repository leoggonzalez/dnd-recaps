import { expect, test } from "@playwright/test";

test("scene controls stay in the sidebar and keep focus through replay", async ({
  page,
}) => {
  await page.goto("./sessions/2026-10-28/");
  await expect(page.locator('.playback[data-ready="true"]')).toBeVisible();
  const sidebar = page.getByRole("complementary", {
    name: "Session and scene details",
  });
  const controls = sidebar.getByRole("navigation", { name: "Story controls" });
  await expect(
    sidebar.getByRole("link", { name: "All sessions" }),
  ).toBeVisible();
  await expect(sidebar.locator("time")).toHaveText("28.10.2026");
  await expect(
    sidebar.getByRole("heading", { name: "A little luck" }),
  ).toBeVisible();
  await expect(sidebar.locator(".narration-line").first()).toBeAttached();
  await page.mouse.move(0, 0);
  await expect(controls).toBeVisible();
  const frame = await page.locator(".reader-main").boundingBox();
  const panel = await sidebar.boundingBox();
  expect(frame).not.toBeNull();
  expect(panel).not.toBeNull();
  const stacked = await page.evaluate(
    () => matchMedia("(max-width: 760px), (max-height: 520px)").matches,
  );
  if (stacked) {
    expect(frame!.y + frame!.height).toBeLessThanOrEqual(panel!.y + 1);
  } else {
    expect(panel!.x + panel!.width).toBeLessThanOrEqual(frame!.x + 1);
    expect(frame!.height).toBe(await page.evaluate(() => innerHeight));
  }
  const replay = controls.getByRole("button", { name: "Replay", exact: true });
  await controls.getByRole("button", { name: "Pause", exact: true }).click();
  await replay.focus();
  await page.keyboard.press("Enter");
  await expect(replay).toBeFocused();
  await expect(page.locator('.playback[data-ready="true"]')).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.screenshot({
    path: test.info().outputPath("sidebar-player.png"),
    fullPage: true,
  });
});

test("ink draws far, middle, near, then actors; movement and narration overlap the drawing, and replay resets it", async ({
  page,
}) => {
  await page.goto("./sessions/2026-10-28/#scene=an-offering-for-the-peryton");
  await expect(page.locator('.playback[data-ready="true"]')).toBeVisible();
  await page.getByRole("button", { name: "Pause", exact: true }).click();
  const seek = async (time: number) =>
    page.locator(".playback").evaluate((root, time) => {
      for (const animation of root.getAnimations({ subtree: true })) {
        animation.pause();
        animation.currentTime = time;
      }
    }, time);
  const far = page.locator('[data-reveal="far"]'),
    middle = page.locator('[data-reveal="middle"]'),
    near = page.locator('[data-reveal="near"]');
  expect(await far.evaluate((el) => getComputedStyle(el).maskImage)).toContain(
    "radial-gradient",
  );
  await seek(200);
  const narration = page.locator(".narration-line");
  const firstLineOpacity = await narration
    .first()
    .evaluate((line) => Number(getComputedStyle(line).opacity));
  expect(firstLineOpacity).toBeGreaterThan(0);
  expect(firstLineOpacity).toBeLessThan(1);
  await expect(narration.nth(1)).toHaveCSS("opacity", "0");
  await expect(far).toHaveCSS("opacity", "1");
  await expect(middle).toHaveCSS("opacity", "0");
  await expect(near).toHaveCSS("opacity", "0");
  const partial = await far.evaluate((el) =>
    parseFloat(getComputedStyle(el).getPropertyValue("--ink-spread")),
  );
  expect(partial).toBeGreaterThan(0);
  expect(partial).toBeLessThan(160);
  const cameraAt200 = await page
    .locator(".environment-layer")
    .first()
    .evaluate((el) => getComputedStyle(el).transform);
  await seek(450);
  expect(
    await page
      .locator(".environment-layer")
      .first()
      .evaluate((el) => getComputedStyle(el).transform),
  ).not.toBe(cameraAt200);
  await expect(middle).toHaveCSS("opacity", "1");
  await expect(near).toHaveCSS("opacity", "0");
  await seek(750);
  await expect(near).toHaveCSS("opacity", "1");
  await expect(page.locator('[data-reveal="balerias-feeding"]')).toHaveCSS(
    "opacity",
    "0",
  );
  await seek(830);
  await expect(page.locator('[data-reveal="cage-front"]')).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(page.locator('[data-reveal="balerias-feeding"]')).toHaveCSS(
    "opacity",
    "0",
  );
  await page.screenshot({
    path: test.info().outputPath("ink-opening.png"),
    fullPage: true,
  });
  await seek(1800);
  for (const reveal of await page.locator(".ink-reveal").all()) {
    await expect(reveal).toHaveCSS("opacity", "1");
    expect(
      await reveal.evaluate((el) =>
        parseFloat(getComputedStyle(el).getPropertyValue("--ink-spread")),
      ),
    ).toBe(160);
  }
  await expect(page.locator('[data-pose="balerias-ready"]')).toHaveCSS(
    "opacity",
    "0",
  );
  await expect(page.locator('[data-pose="balerias-offering"]')).toHaveCSS(
    "opacity",
    "1",
  );
  await page.getByRole("button", { name: "Replay", exact: true }).click();
  await expect(page.locator('.playback[data-ready="true"]')).toBeVisible();
  await expect(far).toHaveCSS("opacity", "0");
  await expect(narration.first()).toHaveCSS("opacity", "0");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const reveal of await page.locator(".ink-reveal").all()) {
    await expect(reveal).toHaveCSS("mask-image", "none");
    await expect(reveal).toHaveCSS("opacity", "1");
  }
  await expect(page.locator('[data-pose="balerias-offering"]')).toHaveCSS(
    "opacity",
    "1",
  );
});

test("a moving cutout changes position while its ink mask is still expanding", async ({
  page,
}) => {
  await page.goto("./sessions/2026-10-28/#scene=a-walk-through-camp");
  await expect(page.locator('.playback[data-ready="true"]')).toBeVisible();
  await page.getByRole("button", { name: "Pause", exact: true }).click();
  const seek = async (time: number) =>
    page.locator(".playback").evaluate((root, time) => {
      for (const animation of root.getAnimations({ subtree: true })) {
        animation.pause();
        animation.currentTime = time;
      }
    }, time);
  const actor = page.locator('[data-actor="walking-pair"]');
  await seek(850);
  const position = await actor
    .locator(".actor-motion")
    .evaluate((el) => getComputedStyle(el).transform);
  const spread = await actor
    .locator(".ink-reveal")
    .evaluate((el) =>
      parseFloat(getComputedStyle(el).getPropertyValue("--ink-spread")),
    );
  expect(spread).toBeGreaterThan(0);
  expect(spread).toBeLessThan(160);
  await seek(1000);
  expect(
    await actor
      .locator(".actor-motion")
      .evaluate((el) => getComputedStyle(el).transform),
  ).not.toBe(position);
  const laterSpread = await actor
    .locator(".ink-reveal")
    .evaluate((el) =>
      parseFloat(getComputedStyle(el).getPropertyValue("--ink-spread")),
    );
  expect(laterSpread).toBeGreaterThan(spread);
  expect(laterSpread).toBeLessThan(160);
});

test("mouse parallax starts after the ink reveal and returns to center on exit", async ({
  page,
}) => {
  await page.goto("./sessions/2026-10-28/");
  const stage = page.locator(".illustration-stage");
  await expect(stage).toHaveAttribute("data-entrance-complete", "false");
  const bounds = (await stage.boundingBox())!;
  const moveToCorner = () => page.mouse.move(bounds.x + 2, bounds.y + 2);
  const offsets = () =>
    stage
      .locator(".environment-layer")
      .evaluateAll((layers) =>
        layers.map((layer) => parseFloat(getComputedStyle(layer).translate)),
      );
  await moveToCorner();
  expect(await offsets()).toEqual([0, 0, 0]);

  await expect(stage).toHaveAttribute("data-entrance-complete", "true");
  await stage.dispatchEvent("pointermove", {
    pointerType: "touch",
    clientX: 0,
    clientY: 0,
  });
  expect(await offsets()).toEqual([0, 0, 0]);

  await page.mouse.move(bounds.x + 4, bounds.y + 4);
  await expect
    .poll(async () => {
      const [far, middle, near] = await offsets();
      return far > 0 && middle > far && near > middle;
    })
    .toBe(true);
  await page.mouse.move(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2,
  );
  await moveToCorner();
  await page.mouse.move(0, bounds.y + bounds.height + 1);
  await expect.poll(offsets).toEqual([0, 0, 0]);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await moveToCorner();
  await expect(stage.locator(".environment-layer").first()).toHaveCSS(
    "translate",
    "none",
  );
});
