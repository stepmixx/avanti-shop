import { test, expect } from "@playwright/test";

test("Search a product and submit", async ({ page }) => {
  const searchTerm = "shirt";
  await page.goto("http://localhost:3000/");
  await page.waitForTimeout(2000);
  await page.getByRole("navigation").getByRole("button").nth(2).click();
  const inputSelector = 'input[placeholder="Search for products..."]';
  await page.waitForSelector(inputSelector);
  const input = await page.$(inputSelector);
  await input?.fill(searchTerm);
  await input?.press("Enter");
  await page.waitForURL(new RegExp(`/products\\?query=${searchTerm}}`));
  const selector = "#product-0 h6";
  const text = await page.$(selector);
  expect((await text?.innerText())?.toLowerCase()).toMatch(searchTerm);
});

test("Search an unexisting product", async ({ page }) => {
  const searchTerm = "unexisting-product";
  await page.goto("http://localhost:3000/");
  await page.waitForTimeout(2000);
  await page.getByRole("navigation").getByRole("button").nth(2).click();
  const inputSelector = 'input[placeholder="Search for products..."]';
  await page.waitForSelector(inputSelector);
  const input = await page.$(inputSelector);
  await input?.fill(searchTerm);
  await input?.press("Enter");
  await page.waitForURL(new RegExp(`/products\\?query=${searchTerm}`));
  const text = await page.$("h5");
  expect(await text?.innerText()).toMatch("No products found");
});
