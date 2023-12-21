import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/providerinput");
});

test("When filling in active ingredients, suggestions are displayed", async ({
  page,
}) => {
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("b");
  await expect(page.getByText("baclofen")).toBeVisible();
  await expect(page.getByText("benztropine mesylate")).toBeVisible();
  await expect(
    page.getByText("bupropion hydrochloride", { exact: true })
  ).toBeVisible();
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("ba");
  await expect(page.getByText("baclofen")).toBeVisible();

  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("a");
  await expect(page.getByText("abacavir sulfate")).toBeVisible();
  await expect(page.getByText("acetaminophen")).toBeVisible();
  await expect(page.getByText("acetic acid, glacial")).toBeVisible();
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("ab");
  await expect(
    page.getByText("abacavir sulfate", { exact: true })
  ).toBeVisible();
});

test("When filling in active ingredients, suggestions can be clicked", async ({
  page,
}) => {
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("b");
  await expect(page.getByText("baclofen")).toBeVisible();
  await expect(page.getByText("benztropine mesylate")).toBeVisible();
  await expect(
    page.getByText("bupropion hydrochloride", { exact: true })
  ).toBeVisible();
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("ba");
  await expect(page.getByText("baclofen")).toBeVisible();

  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("a");
  await expect(page.getByText("abacavir sulfate")).toBeVisible();
  await expect(page.getByText("acetaminophen")).toBeVisible();
  await expect(page.getByText("acetic acid, glacial")).toBeVisible();
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("ab");
  await expect(
    page.getByText("abacavir sulfate", { exact: true })
  ).toBeVisible();
});

test("When filling in allergies, suggestions are displayed", async ({
  page,
}) => {
  await page.getByPlaceholder("Allergies").click();
  await page.getByPlaceholder("Allergies").fill("b");
  await expect(page.getByText("baclofen")).toBeVisible();
  await expect(page.getByText("benztropine mesylate")).toBeVisible();
  await expect(
    page.getByText("bupropion hydrochloride", { exact: true })
  ).toBeVisible();
  await page.getByPlaceholder("Allergies").click();
  await page.getByPlaceholder("Allergies").fill("ba");
  await expect(page.getByText("baclofen")).toBeVisible();

  await page.getByPlaceholder("Allergies").click();
  await page.getByPlaceholder("Allergies").fill("a");
  await expect(page.getByText("abacavir sulfate")).toBeVisible();
  await expect(page.getByText("acetaminophen")).toBeVisible();
  await expect(page.getByText("acetic acid, glacial")).toBeVisible();
  await page.getByPlaceholder("Allergies").click();
  await page.getByPlaceholder("Allergies").fill("ab");
  await expect(
    page.getByText("abacavir sulfate", { exact: true })
  ).toBeVisible();
});

test("When filling in allergies, suggestions can be clicked", async ({
  page,
}) => {
  await page.getByPlaceholder("Allergies").click();
  await page.getByPlaceholder("Allergies").fill("b");
  await expect(page.getByText("baclofen")).toBeVisible();
  await page.getByText("baclofen").click();

  await page.getByPlaceholder("Allergies").click();
  await page.getByPlaceholder("Allergies").fill("a");
  await expect(page.getByText("abacavir sulfate")).toBeVisible();
  await page.getByText("abacavir sulfate").click();
});

test("When filling in marketing status, suggestions are displayed", async ({
  page,
}) => {
  await page.getByPlaceholder("Marketing Status").click();
  await page.getByPlaceholder("Marketing Status").fill("p");
  await expect(page.getByText("prescription")).toBeVisible();

  await page.getByPlaceholder("Marketing Status").click();
  await page.getByPlaceholder("Marketing Status").fill("d");
  await expect(page.getByText("discontinued")).toBeVisible();
});

test("When filling in marketing status, suggestions can be clicked", async ({
  page,
}) => {
  await page.getByPlaceholder("Marketing Status").click();
  await page.getByPlaceholder("Marketing Status").fill("p");
  await expect(page.getByText("prescription")).toBeVisible();
  await page.getByText("prescription").click();

  await page.getByPlaceholder("Marketing Status").click();
  await page.getByPlaceholder("Marketing Status").fill("d");
  await expect(page.getByText("discontinued")).toBeVisible();
  await page.getByText("discontinued").click();
});

test("Input active ingredients, allergies, and marketing status", async ({ page }) => {
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("b");
  await expect(page.getByText("baclofen")).toBeVisible();
  await page.getByText("baclofen").click();

  await page.getByPlaceholder("Allergies").click();
  await page.getByPlaceholder("Allergies").fill("a");
  await expect(page.getByText("abacavir sulfate")).toBeVisible();
  await page.getByText("abacavir sulfate").click();

    await page.getByPlaceholder("Marketing Status").click();
    await page.getByPlaceholder("Marketing Status").fill("p");
    await expect(page.getByText("prescription")).toBeVisible();
    await page.getByText("prescription").click();
});

test("On submission, webapp navigates to new page", async ({ page }) => {
    await page.getByPlaceholder("Active Ingredients").click();
    await page.getByPlaceholder("Active Ingredients").fill("b");
    await expect(page.getByText("baclofen")).toBeVisible();
    await page.getByText("baclofen").click();

    await page.getByPlaceholder("Allergies").click();
    await page.getByPlaceholder("Allergies").fill("a");
    await expect(page.getByText("abacavir sulfate")).toBeVisible();
    await page.getByText("abacavir sulfate").click();

  await page.getByPlaceholder("Marketing Status").click();
  await page.getByPlaceholder("Marketing Status").fill("p");
  await expect(page.getByText("prescription")).toBeVisible();
  await page.getByText("prescription").click();

  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Search Results")).toBeVisible();
});

test("On back, webapp navigates to home page", async ({ page }) => {
  await page.getByRole("button", { name: "Back" }).click();
  await expect(page.getByText("Clear Answers,")).toBeVisible();
});