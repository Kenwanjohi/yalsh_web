import { test, expect } from "@playwright/test";

test.describe("Link List Display", () => {
  const mockLinks = [
    { linkId: 1, url: "https://google.com", key: "goog", clicks: 15 },
    { linkId: 2, url: "https://github.com", key: "ghub", clicks: 42 },
  ];

  test.beforeEach(async ({ page }) => {
    // 1. Force Auth
    await page.addInitScript(() => {
      window.localStorage.setItem("authenticated", "true");
    });

    // 2. Mock GET /links
    await page.route("**/links", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ links: mockLinks }),
      });
    });

    await page.goto("/");
  });

  test("should display the list of links", async ({ page }) => {
    // Check for mock links
    await expect(page.getByText("yalsh.com/goog")).toBeVisible();
    await expect(page.getByText("yalsh.com/ghub")).toBeVisible();

    // Check for click counts
    await expect(page.getByText("15 clicks")).toBeVisible();
    await expect(page.getByText("42 clicks")).toBeVisible();

    // Verify summary text
    await expect(page.getByText("Showing 2 of 2 links")).toBeVisible();
  });

  test("should show empty state when no links exist", async ({ page }) => {
    // Mock empty response
    await page.route("**/links", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ links: [] }),
      });
    });
    
    await page.goto("/");
    await expect(page.getByText(/no links found/i)).toBeVisible();
  });

  test("should verify search bar is present but disabled (per current code)", async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search/i);
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeDisabled();
  });
});
