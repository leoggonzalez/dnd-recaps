import { expect, test } from "@playwright/test";
import { SCENE_NARRATION_DELAY_MS } from "../../src/lib/scene-entrance";

test("controls float inside the stage, reveal on hover or keyboard focus, and remain usable on touch", async ({
  page,
  isMobile,
}) => {
  await page.goto("./sessions/2026-10-28/");
  await expect(page.locator('.playback[data-ready="true"]')).toBeVisible();
  const stage = page.locator(".scene-player"),
    controls = page.getByRole("navigation", { name: "Story controls" });
  const frame = await stage.boundingBox();
  const toolbar = await controls.boundingBox();
  expect(frame).not.toBeNull();
  expect(toolbar).not.toBeNull();
  expect(toolbar!.y).toBeGreaterThan(frame!.y);
  expect(toolbar!.y + toolbar!.height).toBeLessThanOrEqual(
    frame!.y + frame!.height,
  );
  expect(toolbar!.x).toBeGreaterThanOrEqual(frame!.x);
  expect(toolbar!.x + toolbar!.width).toBeLessThanOrEqual(
    frame!.x + frame!.width,
  );
  await page.mouse.move(0, 0);
  await expect(controls).toHaveCSS("opacity", isMobile ? "1" : "0");
  if (!isMobile) {
    // Tab from the preceding library link must expose the first enabled control.
    await page.getByRole("link", { name: "All sessions" }).focus();
    await page.keyboard.press("Tab");
    // Safari's native Tab preference may reach the select before buttons.
    await expect(controls.locator(":focus")).toHaveCount(1);
    await expect(controls).toHaveCSS("opacity", "1");
    await page.getByRole("link", { name: "All sessions" }).focus();
    await stage.hover();
    await expect(controls).toHaveCSS("opacity", "1");
  }
  await page.getByRole("button", { name: "Pause", exact: true }).click();
  await page.getByRole("button", { name: "Replay", exact: true }).click();
  await expect(page.locator('.playback[data-ready="true"]')).toBeVisible();
  // A mouse click must not leave the toolbar stuck open after pointer exit.
  if (!isMobile) {
    await page.mouse.move(0, 0);
    await expect(controls).toHaveCSS("opacity", "0");
    await stage.hover();
  }
  await page.getByRole("button", { name: "Replay", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Replay", exact: true }),
  ).toBeFocused();
  await expect(page.locator('.playback[data-ready="true"]')).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.screenshot({
    path: test.info().outputPath("floating-controls.png"),
    fullPage: true,
  });
});

test("ink draws far, middle, near, then actors; movement overlaps the drawing and replay resets it", async ({
  page,
}) => {
  await page.goto("./sessions/2026-10-28/#scene=an-offering-for-the-peryton");
  await expect(page.locator('.playback[data-ready="true"]')).toBeVisible();
  await page.locator(".scene-player").hover();
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
  await seek(SCENE_NARRATION_DELAY_MS);
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
  await page.locator(".scene-player").hover();
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
