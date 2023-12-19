import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/providerinput");
});

test("When filling nothing, no results are displayed", async ({ page }) => {
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Active Ingredients:")).toBeVisible();
  await expect(page.getByText("Allergies:")).toBeVisible();
  await expect(page.getByText("Marketing Status:")).toBeVisible();
});

test("When filling baclofen, results are displayed", async ({ page }) => {
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("b");
  await page.getByText("baclofen").click();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("-071")).toBeVisible();
  await expect(page.getByText("ORAL").first()).toBeVisible();
  await expect(page.getByText("Northstar RxLLC").first()).toBeVisible();
  await page.getByRole("button", { name: "Back" }).click();
});

test("When filling acetaminophen, results are displayed", async ({ page }) => {
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("a");
  await page.getByText("acetaminophen").click();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Product NDC:63304-562Active")).toBeVisible();
  await expect(page.getByText("Product NDC:63304-561Active")).toBeVisible();
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
  await expect(page.getByText("ORAL").first()).toBeVisible();
  await expect(page.getByText("Northstar RxLLC").first()).toBeVisible();
});

test("When filling baclofen and marketing status to prescription, results are displayed", async ({
  page,
}) => {
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("b");
  await page.getByText("baclofen").click();
  await page.getByPlaceholder("Marketing Status").click();
  await page.getByPlaceholder("Marketing Status").fill("p");
  await page.getByText("prescription").click();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("-071")).toBeVisible();
  await expect(page.getByText("ORAL").first()).toBeVisible();
  await expect(page.getByText("Northstar RxLLC").first()).toBeVisible();
});

test("When filling baclofen, allergic to ibuprofen, marketing status to prescription, results are displayed", async ({
  page,
}) => {
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("b");
  await page.getByText("baclofen").click();
  await page.getByPlaceholder("Allergies").click();
  await page.getByPlaceholder("Allergies").fill("ibu");
  await page.getByText("ibuprofen").click();
  await page.getByPlaceholder("Marketing Status").click();
  await page.getByPlaceholder("Marketing Status").fill("p");
  await page.getByText("prescription").click();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("-071")).toBeVisible();
  await expect(page.getByText("ORAL").first()).toBeVisible();
  await expect(page.getByText("Northstar RxLLC").first()).toBeVisible();
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
  await expect(page.getByText("Product NDC:63304-562Active")).toBeVisible();
  await expect(page.getByText("Product NDC:63304-561Active")).toBeVisible();
});

test("When filling acetaminophen and marketing status to prescription, results are displayed", async ({
  page,
}) => {
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("a");
  await page.getByText("acetaminophen").click();
  await page.getByPlaceholder("Marketing Status").click();
  await page.getByPlaceholder("Marketing Status").fill("p");
  await page.getByText("prescription").click();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Product NDC:63304-562Active")).toBeVisible();
  await expect(page.getByText("Product NDC:63304-561Active")).toBeVisible();
});

test("When filling acetaminophen, allergic to ibuprofen, marketing status to prescription , results are displayed", async ({
  page,
}) => {
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("a");
  await page.getByText("acetaminophen").click();
  await page.getByPlaceholder("Allergies").click();
  await page.getByPlaceholder("Allergies").fill("ibu");
  await page.getByText("ibuprofen").click();
  await page.getByPlaceholder("Marketing Status").click();
  await page.getByPlaceholder("Marketing Status").fill("p");
  await page.getByText("prescription").click();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Product NDC:63304-562Active")).toBeVisible();
  await expect(page.getByText("Product NDC:63304-561Active")).toBeVisible();
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
  await expect(page.getByText("Marketing Status:")).toBeVisible();
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
  await expect(page.getByText("Marketing Status:")).toBeVisible();
});

test("When filling multiple active ingredients, allergic to baclofen, marketing status to prescription, results are displayed", async ({
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
  await expect(page.getByText("Marketing Status: ")).toBeVisible();
});

test("When filling invalid active ingredient, results are not displayed", async ({
  page,
}) => {
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("blah");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Active Ingredients: blah")).toBeVisible();
  await expect(page.getByText("Allergies:")).toBeVisible();
  await expect(page.getByText("Marketing Status:")).toBeVisible();
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
  await expect(page.getByText("ORAL").first()).toBeVisible();
  await expect(page.getByText("Northstar RxLLC").first()).toBeVisible();
});

test("When filling invalid marketing status, results are not displayed", async ({
  page,
}) => {
  await page.getByPlaceholder("Active Ingredients").click();
  await page.getByPlaceholder("Active Ingredients").fill("blah");
  await page.getByPlaceholder("Marketing Status").click();
  await page.getByPlaceholder("Marketing Status").fill("blah");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Active Ingredients: blah")).toBeVisible();
  await expect(page.getByText("Allergies:")).toBeVisible();
  await expect(page.getByText("Marketing Status: blah")).toBeVisible();
});

test("On back, webapp navigates to input page", async ({ page }) => {
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("button", { name: "Back" }).click();
  await expect(page.getByText("Welcome Providers")).toBeVisible();
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