import { test, expect } from "@playwright/test";

test("Navigate to a collection", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .getByRole("navigation")
    .getByRole("button", { name: "Collections" })
    .click();
  await page.waitForURL(/collections/);
  const selector = "#collection-1";
  const collection = await page.$(`${selector} h3`);
  const collectionText = await collection?.innerText();
  await page.click(selector);
  await page.waitForURL(
    new RegExp(`collections\\/${collectionText?.toLowerCase()}`)
  );
  const pageTitle = await page.title();
  expect(pageTitle).toMatch(new RegExp(`${collectionText}`, "i"));
  const h1 = await page.$("h1");
  expect((await h1?.innerText())?.toLowerCase()).toBe(
    collectionText?.toLocaleLowerCase()
  );
});
