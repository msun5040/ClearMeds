import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

{/********************* MOCK UNIT TESTING FOR BROADBAND FUNCTION **********************/}

// basic testing for a basic query
test("correct response for a basic query", async ({ page }) => {
  // testing-image : broad-basic-1
  await page.route("http://localhost:4000/broadband?state=florida&county=miami", (route) => {
    route.fulfill({
      body: JSON.stringify({
        result: "success",
        data: { percentage: 90, retrievalTime: "10-25 9:00PM"},
      }),
    });
  });

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("broadband florida miami");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.screenshot({
    path: "tests/mocked-backend/testing-images/broad-basic-1.png",
    fullPage: true,
  });
  const response = await page.waitForSelector(
    'text="90 percent of houses in miami County, florida have broadband internet. This data was retrieved from ACS on 10-25 9:00PM"'
  );
  const isVisible = await response.isVisible();
  expect(isVisible).toBe(true);

  await page.screenshot({path: "tests/mocked-backend/testing-images/broad-basic-1.png", fullPage: true,});
});

// basic testing for a basic query
test("correct response for a basic query with no data", async ({ page }) => {
  // testing-image : broad-basic-2
  await page.route("http://localhost:4000/broadband?state=florida&county=nodata", (route) => {
    route.fulfill({
      body: JSON.stringify({
        result: "success",
        data: {},
      }),
    });
  });

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("broadband florida nodata");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.screenshot({
    path: "tests/mocked-backend/testing-images/broad-basic-1.png",
    fullPage: true,
  });
  const response = await page.waitForSelector(
    'text="No data returned from API"'
  );
  const isVisible = await response.isVisible();
  expect(isVisible).toBe(true);

  await page.screenshot({path: "tests/mocked-backend/testing-images/broad-basic-2.png", fullPage: true,});
});

// edge testing for a basic query
test("correct response for an empty query", async ({ page }) => {
  // testing-image : broad-edge-2
  await page.route("http://localhost:4000/broadband?state=undefined&county=undefined", (route) => {
    route.fulfill({
      body: JSON.stringify({
        result: "success",
        data: {},
      }),
    });
  });

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("broadband");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.screenshot({
    path: "tests/mocked-backend/testing-images/broad-edge-2.png",
    fullPage: true,
  });
  const response = await page.waitForSelector(
    'text="Please input a state and a county."'
  );
  const isVisible = await response.isVisible();
  expect(isVisible).toBe(true);

  await page.screenshot({path: "tests/mocked-backend/testing-images/broad-edge-2.png", fullPage: true,});
});

// edge testing for a basic query
test("correct response for a half empty query", async ({ page }) => {
  // testing-image : broad-edge-1
  await page.route("http://localhost:4000/broadband?state=florida&county=undefined", (route) => {
    route.fulfill({
      body: JSON.stringify({
        result: "success",
        data: {},
      }),
    });
  });

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("broadband florida");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.screenshot({
    path: "tests/mocked-backend/testing-images/broad-edge-2.png",
    fullPage: true,
  });
  const response = await page.waitForSelector(
    'text="Please input a state and a county."'
  );
  const isVisible = await response.isVisible();
  expect(isVisible).toBe(true);

  await page.screenshot({path: "tests/mocked-backend/testing-images/broad-edge-1.png", fullPage: true,});
});