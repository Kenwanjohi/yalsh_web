import { test, expect } from "@playwright/test";

test.describe("Login Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("should show validation errors for empty fields", async ({ page }) => {
    const loginButton = page.getByRole("button", { name: /^login$/i });
    await loginButton.click();

    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/password is required/i)).toBeVisible();
  });

  test("should show error for invalid email format", async ({ page }) => {
    await page.getByLabel(/email address/i).fill("test@fail");
    await page.getByLabel(/password/i).fill("password123");
    
    const loginButton = page.getByRole("button", { name: /^login$/i });
    await loginButton.click();

    await expect(page.getByText(/invalid email address/i)).toBeVisible();
  });

  test("should successfully login with valid credentials", async ({ page }) => {
    // Mock successful login response
    await page.route("**/session", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ authenticated: true }),
      });
    });

    await page.getByLabel(/email address/i).fill("user@example.com");
    await page.getByLabel(/password/i).fill("correct-password");
    
    const loginButton = page.getByRole("button", { name: /^login$/i });
    await loginButton.click();

    // Verify navigation to home and localStorage update
    await expect(page).toHaveURL("/");
    const authState = await page.evaluate(() => localStorage.getItem("authenticated"));
    expect(authState).toBe("true");
  });
});
