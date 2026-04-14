import { test, expect } from "@playwright/test";

test.describe("Link Management", () => {
  test.beforeEach(async ({ page }) => {
    // 1. Set authentication state in localStorage before loading the page
    await page.addInitScript(() => {
      window.localStorage.setItem("authenticated", "true");
    });

    // 2. Mock the initial "GET /links" request to return an empty list
    await page.route("**/links", async (route) => {
      if (route.request().method() === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ links: [] }),
        });
      } else {
        await route.continue();
      }
    });

    await page.goto("/");
    // Wait for the HomePage to load (Chakra's NavBar should be visible)
    await expect(page.getByText(/manage your links here/i)).toBeVisible();
  });

  test("should open the creation modal and show validation errors", async ({ page }) => {
    // Click "Create link" button
    await page.getByRole("button", { name: /create link/i }).click();

    // Verify modal heading
    await expect(page.getByText(/create short link/i)).toBeVisible();

    // Clear the auto-generated key to trigger validation
    await page.getByLabel(/short key/i).fill("");

    // Click "Create link" in the modal footer
    await page.locator('form').getByRole("button", { name: /create link/i }).click();

    // Verify validation errors
    await expect(page.getByText(/url is required/i)).toBeVisible();
    await expect(page.getByText(/key is required/i)).toBeVisible();
  });

  test("should successfully create a new short link", async ({ page }) => {
    // Mock the "POST /links" success response
    await page.route("**/links", async (route) => {
      if (route.request().method() === "POST") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ message: "Link successfully created", links: [] }),
        });
      } else {
        await route.continue();
      }
    });

    // 1. Open Modal
    await page.getByRole("button", { name: /create link/i }).click();

    // 2. Fill Form
    await page.getByLabel(/^URL$/).fill("https://google.com");
    
    // The key is auto-generated in your Home.tsx
    const keyValue = await page.getByLabel(/short key/i).inputValue();
    expect(keyValue.length).toBeGreaterThan(0);

    // 3. Submit
    await page.locator('form').getByRole("button", { name: /create link/i }).click();

    // 4. Verify Success Toast (sonner)
    await expect(page.getByText(/link successfully created/i)).toBeVisible();
    
    // 5. Verify Modal is closed
    await expect(page.getByText(/create short link/i)).not.toBeVisible();
  });
});
