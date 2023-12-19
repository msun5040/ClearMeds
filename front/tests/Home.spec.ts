import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test("When clicking any button without accepting, input page does not show up", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Patients Start Here" }).click();
  await expect(page.getByText("Clear Answers,")).toBeVisible();
  await page.getByRole("button", { name: "Providers Start Here" }).click();
  await expect(page.getByText("Clear Answers,")).toBeVisible();
});

test("When accepting disclaimer, and clicking patient it navigates to new page", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Accept All" }).click();
  await page.getByRole("button", { name: "Patients Start Here" }).click();
  await expect(page.getByText("Welcome Patients")).toBeVisible();
});

test("When accepting disclaimer, and clicking provider it navigates to new page", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Accept All" }).click();
  await page.getByRole("button", { name: "Providers Start Here" }).click();
  await expect(page.getByText("Welcome Providers")).toBeVisible();
});
