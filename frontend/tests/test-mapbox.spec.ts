import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

//==================== BASIC FUNCTIONALITY ===========================
test("setting up redlining data is a success - not mocked", async ({
  page,
}) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("setup_redlining");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Redlining data loaded")).toBeVisible();
});

test("clicking map with redlining loaded - not mocked", async ({ page }) => {
  // setup redlining
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("setup_redlining");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Redlining data loaded")).toBeVisible();

  // click map
  await page.getByLabel("Map", { exact: true }).click({
    position: {
      x: 320,
      y: 244,
    },
  });
});

test("doing a map search positive result - not mocked", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("setup_redlining");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Redlining data loaded")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("term_search Birmingham");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("column").nth(1)).toContainText(
    "Search results highlighted on map!"
  );
});

test("doing a bbox search from frontend - not mocked", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("setup_redlining");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel('column')).toContainText("Redlining data loaded");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("bbox_search [-87,-86] [33,34]");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("Search results highlighted on map!")
  ).toBeVisible();
});

test("doing a map search no result - not mocked", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("setup_redlining");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel('column')).toContainText("Redlining data loaded");

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("term_search alksdjalksjdlkas");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("column").nth(1)).toContainText(
    "No entries with the search specifications were found!"
  );
});

test("clicking layer toggle", async ({ page }) => {
  await page.getByRole("button", { name: "Hide Layer" }).click();
  await expect(page.getByText("Show Layer")).toBeVisible();

  await page.getByRole("button", { name: "Show Layer" }).click();
  await expect(page.getByText("Hide Layer")).toBeVisible();
});

// ================ MOCKED TESTS ===========================
test("turning on and off mocked mode", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("set_mock_mode true");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Mocking mode turned on")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("set_mock_mode false");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("column").nth(1)).toContainText(
    "Mocking mode turned off"
  );
  await expect(page.getByLabel("column").first()).toContainText(
    "Mocking mode turned on"
  );
});

test("turning on and off mocked mode repeat command", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("set_mock_mode true");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Mocking mode turned on")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("set_mock_mode true");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("column").nth(1)).toContainText(
    "Mocking mode turned on"
  );
  await expect(page.getByLabel("column").first()).toContainText(
    "Mocking mode turned on"
  );
});

test("setting up redlining overlay - mocked", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("set_mock_mode true");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Mocking mode turned on")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("setup_redlining");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Redlining data loaded")).toBeVisible();
});

test("setting up redlining overlay 1 response- mocked", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("set_mock_mode true");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Mocking mode turned on")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("setup_redlining");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Redlining data loaded")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("term_search mockResponse1");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("Search results highlighted on map!")
  ).toBeVisible();
});

test("setting up redlining overlay 2 response- mocked", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("set_mock_mode true");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Mocking mode turned on")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("setup_redlining");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Redlining data loaded")).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("term_search mockResponse2");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("Search results highlighted on map!")
  ).toBeVisible();
});
