import { expect, test } from "@playwright/test";
test("library, deep reload, navigation, boundaries and history work under repository subpath", async ({
  page,
}) => {
  const failures: string[] = [];
  page.on("pageerror", (e) => failures.push(e.message));
  await page.goto("./");
  await page.getByRole("link", { name: "Open the story" }).click();
  await expect(page.getByRole("button", { name: "Previous" })).toBeDisabled();
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page).toHaveURL(/#scene=a-walk-through-camp$/);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "A walk through camp" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Next" }).click();
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "A walk through camp" }),
  ).toBeVisible();
  await page.getByLabel("Go to scene").selectOption("8");
  await expect(page.getByRole("button", { name: "Next" })).toBeDisabled();
  await expect(
    page.getByRole("button", { name: "Replay session" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Replay session" }).click();
  await expect(page.getByRole("button", { name: "Previous" })).toBeDisabled();
  expect(failures).toEqual([]);
});
test("invalid scene fallback, pause and reduced motion", async ({ page }) => {
  await page.goto("./sessions/2026-10-28/#scene=missing");
  await expect(
    page.getByText("That scene could not be found. Showing the first scene."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Pause", exact: true }).click();
  await expect(page.locator(".narration-line").first()).toHaveCSS(
    "animation-play-state",
    "paused",
  );
  await page.getByRole("button", { name: "Replay", exact: true }).click();
  await expect(page.locator(".narration-line").first()).toHaveCSS(
    "animation-play-state",
    "paused",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".narration-line").first()).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(page.locator(".narration-line").first()).toHaveCSS(
    "animation-name",
    "none",
  );
});
test("unknown session serves exported not-found page", async ({ page }) => {
  const response = await page.goto("./sessions/unknown/");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "This tale is missing." }),
  ).toBeVisible();
});

test("keyboard navigation ignores focused controls and handles rapid input", async ({
  page,
}) => {
  await page.goto("./sessions/2026-10-28/");
  await expect(
    page.getByRole("heading", { name: "A little luck", exact: true }),
  ).toBeVisible();
  await page.locator("body").click({ position: { x: 1, y: 1 } });
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL(/#scene=a-walk-through-camp$/);
  await page.keyboard.press("Space");
  await expect(page.getByRole("button", { name: "Resume" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.getByRole("button", { name: "Replay", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL(/#scene=a-walk-through-camp$/);
  await page.locator("body").click({ position: { x: 1, y: 1 } });
  for (let i = 0; i < 18; i++) await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("button", { name: "Next" })).toBeDisabled();
  await expect(
    page.getByRole("heading", { name: "The cocoon’s secret" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".narration-line").first()).toHaveCSS(
    "opacity",
    "1",
  );
  await page.screenshot({
    path: test.info().outputPath("reader.png"),
    fullPage: true,
  });
});

test("required image failure blocks entry, retry retains successes, and every scene works offline", async ({
  page,
  context,
}) => {
  let fail = true;
  const counts = new Map<string, number>();
  page.on("request", (request) => {
    if (request.url().endsWith(".webp"))
      counts.set(request.url(), (counts.get(request.url()) ?? 0) + 1);
  });
  await page.route("**/peryton-v1.webp", (route) =>
    fail ? route.abort() : route.continue(),
  );
  await page.goto("./sessions/2026-10-28/#scene=an-offering-for-the-peryton");
  await expect(
    page.getByRole("button", { name: "Retry images" }),
  ).toBeVisible();
  await expect(page.locator(".illustration-stage")).toHaveCount(0);
  const successfulCounts = [...counts].filter(
    ([url]) => !url.includes("peryton-v1.webp"),
  );
  fail = false;
  await page.getByRole("button", { name: "Retry images" }).click();
  await expect(page.locator('.playback[data-ready="true"]')).toBeVisible();
  expect(
    [...counts].filter(([url]) => !url.includes("peryton-v1.webp")),
  ).toEqual(successfulCounts);
  expect(
    [...counts].find(([url]) => url.includes("peryton-v1.webp"))?.[1],
  ).toBe(3);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator('[data-pose="balerias-ready"]')).toHaveCSS(
    "opacity",
    "0",
  );
  await expect(page.locator('[data-pose="balerias-offering"]')).toHaveCSS(
    "opacity",
    "1",
  );
  await page.screenshot({
    path: test.info().outputPath("peryton.png"),
    fullPage: true,
  });
  await context.setOffline(true);
  for (let i = 0; i < 9; i++) {
    await page.getByLabel("Go to scene").selectOption(String(i));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      [
        "A little luck",
        "A walk through camp",
        "An offering for the peryton",
        "A note in the dark",
        "Counting the wagons",
        "Out of earshot",
        "Under the horse’s neck",
        "The horses fight back",
        "The cocoon’s secret",
      ][i],
    );
    await expect(page.locator('.playback[data-ready="true"]')).toBeVisible();
    expect(
      await page
        .locator(".illustration-stage img")
        .evaluateAll((images) =>
          images.every(
            (image) =>
              (image as HTMLImageElement).complete &&
              (image as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    ).toBe(true);
    if (i === 0 || i === 6)
      await page.screenshot({
        path: test.info().outputPath(`scene-${i + 1}.png`),
        fullPage: true,
      });
  }
});

test("pause applies to environment, actor and narration, and survives visibility changes", async ({
  page,
}) => {
  await page.goto("./sessions/2026-10-28/");
  await expect(page.locator('.playback[data-ready="true"]')).toBeVisible();
  await page.getByRole("button", { name: "Pause", exact: true }).click();
  for (const selector of [
    ".environment-layer",
    ".actor-motion",
    ".actor-pose",
    ".narration-line",
    ".ink-reveal",
  ])
    await expect(page.locator(selector).first()).toHaveCSS(
      "animation-play-state",
      "paused",
    );
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(page.getByRole("button", { name: "Resume" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.locator(".environment-layer").first()).toHaveCSS(
    "animation-play-state",
    "paused",
  );
});

test("authored pose changes are exclusive before and after the cue and hold their final frame", async ({
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
  await seek(1199);
  await expect(page.locator('[data-pose="balerias-ready"]')).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(page.locator('[data-pose="balerias-offering"]')).toHaveCSS(
    "opacity",
    "0",
  );
  await seek(1200);
  await expect(page.locator('[data-pose="balerias-ready"]')).toHaveCSS(
    "opacity",
    "0",
  );
  await expect(page.locator('[data-pose="balerias-offering"]')).toHaveCSS(
    "opacity",
    "1",
  );
  await seek(6000);
  await expect(page.locator('[data-pose="balerias-offering"]')).toHaveCSS(
    "opacity",
    "1",
  );
});
