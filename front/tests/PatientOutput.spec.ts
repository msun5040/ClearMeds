import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/patientinput");
});

test("When filling nothing, no results are displayed", async ({ page }) => {
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Active Ingredients:")).toBeVisible();
  await expect(page.getByText("Allergies:")).toBeVisible();
  await expect(page.getByText("Additional Fields:")).toBeVisible();
});

test("When filling valid active ingredients, results are displayed", async ({
  page,
}) => {
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("b");
  await page.getByText("baclofen").click();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Active Ingredients: baclofen")).toBeVisible();
  await expect(page.getByText("Allergies:")).toBeVisible();
  await expect(page.getByText("Additional Fields:")).toBeVisible();
});

test("When filling multiple active ingredients", async ({ page }) => {});
