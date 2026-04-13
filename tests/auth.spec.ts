import { test, expect } from "@playwright/test";

test.describe("Registration Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the register page before each test
    await page.goto("/register");
  });

  test("should show validation errors for empty fields", async ({ page }) => {
    // Click register without filling anything
    const registerButton = page.getByRole("button", { name: /register/i });
    await registerButton.click();

    // Check for validation messages based on Register.tsx
    await expect(page.getByText(/username is required/i)).toBeVisible();
    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/password is required/i)).toBeVisible();
  });

  test("should show error for invalid email format", async ({ page }) => {
    // Fill in fields using their labels
    await page.getByLabel(/username/i).fill("testuser");
    // "test@fail" passes HTML5 type="email" validation in many browsers 
    // but fails your custom regex /\S+@\S+\.\S+/ because it lacks a dot.
    await page.getByLabel(/email address/i).fill("test@fail");
    await page.getByLabel(/^password$/i).fill("password123");
    
    const registerButton = page.getByRole("button", { name: /register/i });
    await registerButton.click();

    // Expect exact "Invalid email address" message from Register.tsx
    await expect(page.getByText(/invalid email address/i)).toBeVisible();
  });

  test("should navigate to login page when clicking login link", async ({ page }) => {
    // Based on RegisterPage component, the link text is "Log in"
    const loginLink = page.getByRole("link", { name: /log in/i });
    await loginLink.click();

    await expect(page).toHaveURL(/\/login/);
  });
});
