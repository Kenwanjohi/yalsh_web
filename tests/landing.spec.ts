import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test("should load the landing page and show correct heading", async ({ page }) => {
    // Start from the home page (baseURL is configured in playwright.config.ts)
    await page.goto("/");

    // The heading should contain "Yet another link shortener"
    const heading = page.locator("h1");
    await expect(heading).toContainText("Yet another link shortener");

    // The "Get Started" button should be visible
    const getStartedButton = page.getByRole("button", { name: /get started/i });
    await expect(getStartedButton).toBeVisible();
  });

  test("should navigate to register page when clicking Get Started", async ({ page }) => {
    await page.goto("/");
    
    const getStartedButton = page.getByRole("button", { name: /get started/i });
    await getStartedButton.click();

    // The URL should now contain /register
    await expect(page).toHaveURL(/\/register/);
  });
});
