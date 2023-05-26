import { test, expect } from "@playwright/test";

test("Navigate to products page an test pagination", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .getByRole("navigation")
    .getByRole("button", { name: "Products" })
    .click();
  await page.waitForURL(/products/);
  const selector = "#product-0 h6";
  const firstText = await page.$(selector);
  expect((await firstText?.innerText())?.toLowerCase()).toBe("slides");
  await page
    .locator("div")
    .filter({ hasText: /^next page$/i })
    .getByRole("button")
    .click();
  await page.waitForURL(/products\?cursor=.+$/);
  const secondText = await page.$(selector);
  expect((await secondText?.innerText())?.toLowerCase()).toBe("puffer");
  await page
    .locator("div")
    .filter({ hasText: /^previous page$/i })
    .getByRole("button")
    .click();
  await page.waitForURL(/products\?cursor=.+&direction=.+$/);
  const thirdText = await page.$(selector);
  expect((await thirdText?.innerText())?.toLowerCase()).toBe("slides");
});
