import { test, expect } from "@playwright/test";

test("Go to an unexixting page", async ({ page }) => {
  await page.goto("http://localhost:3000/unexisting-page");
  const text = await page.$("h2");
  expect(await text?.innerText()).toMatch("Page not found");
});
