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

test("When filling baclofen, results are displayed", async ({ page }) => {
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("b");
  await page.getByText("baclofen").click();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("-071")).toBeVisible();
  await expect(page.getByText("Northstar RxLLC").first()).toBeVisible();
  await expect(page.getByText("Prescription").first()).toBeVisible();
  await expect(page.getByText("-072")).toBeVisible();
});

test("When filling acetaminophen, results are displayed", async ({ page }) => {
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("a");
  await page.getByText("acetaminophen").click();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("ACETAMINOPHENCODEINE PHOSPHATE").first()
  ).toBeVisible();
  await expect(
    page.getByText("ACETAMINOPHENCODEINE PHOSPHATE").nth(1)
  ).toBeVisible();
});

test("When filling baclofen and allergic to ibuprofen, results are displayed", async ({
  page,
}) => {
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("b");
  await page.getByText("baclofen").click();
  await page.getByPlaceholder("Allergies").click();
  await page.getByPlaceholder("Allergies").fill("ibu");
  await page.getByText("ibuprofen").click();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("-071")).toBeVisible();
  await expect(page.getByText("Northstar RxLLC").first()).toBeVisible();
  await expect(page.getByText("Prescription").first()).toBeVisible();
  await expect(page.getByText("-072")).toBeVisible();
});

test("When filling acetaminophen and allergic to ibuprofen, results are displayed", async ({
  page,
}) => {
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("a");
  await page.getByText("acetaminophen").click();
  await page.getByPlaceholder("Allergies").click();
  await page.getByPlaceholder("Allergies").fill("ibu");
  await page.getByText("ibuprofen").click();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("ACETAMINOPHENCODEINE PHOSPHATE").first()
  ).toBeVisible();
  await expect(
    page.getByText("ACETAMINOPHENCODEINE PHOSPHATE").nth(1)
  ).toBeVisible();
});

test("When filling multiple active ingredients, results are displayed", async ({
  page,
}) => {
  await page.getByPlaceholder("Active Ingredients").click();
  await page
    .getByPlaceholder("Active Ingredients")
    .fill("acetaminophen, ibuprofen");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("Active Ingredients: acetaminophen, ibuprofen")
  ).toBeVisible();
  await expect(page.getByText("Allergies:")).toBeVisible();
  await expect(page.getByText("Additional Fields:")).toBeVisible();
});

test("When filling multiple active ingredients and allergic to baclofen, results are displayed", async ({
  page,
}) => {
  await page.getByPlaceholder("Active Ingredients").click();
  await page
    .getByPlaceholder("Active Ingredients")
    .fill("acetaminophen, ibuprofen");
  await page.getByPlaceholder("Allergies").click();
  await page.getByPlaceholder("Allergies").fill("baclofen");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("Active Ingredients: acetaminophen, ibuprofen")
  ).toBeVisible();
  await expect(page.getByText("Allergies: baclofen")).toBeVisible();
  await expect(page.getByText("Additional Fields:")).toBeVisible();
});

test("When filling invalid active ingredient, results are not displayed", async ({
  page,
}) => {
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("blah");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Active Ingredients: blah")).toBeVisible();
  await expect(page.getByText("Allergies:")).toBeVisible();
  await expect(page.getByText("Additional Fields:")).toBeVisible();
});

test("When filling invalid allergies, results are displayed", async ({
  page,
}) => {
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("b");
  await page.getByText("baclofen").click();
  await page.getByPlaceholder("Allergies").click();
  await page.getByPlaceholder("Allergies").fill("blah");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("-071")).toBeVisible();
  await expect(page.getByText("Northstar RxLLC").first()).toBeVisible();
  await expect(page.getByText("Prescription").first()).toBeVisible();
  await expect(page.getByText("-072")).toBeVisible();
});

test("On back, webapp navigates to input page", async ({ page }) => {
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("button", { name: "Back" }).click();
  await expect(page.getByText("Welcome Patients")).toBeVisible();
});

test("On learn more, webapp navigates to new page", async ({ page }) => {
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("b");
  await page.getByText("baclofen").click();
  await page.getByRole("button", { name: "Submit" }).click();
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "Learn More" }).first().click();
  const page1 = await page1Promise;
});
