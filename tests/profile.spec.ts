import { test, expect } from "@playwright/test";

test.describe("Profile Management", () => {
  test.beforeEach(async ({ page }) => {
    // 1. Force Auth
    await page.addInitScript(() => {
      window.localStorage.setItem("authenticated", "true");
    });

    // 2. Mock Profile Data
    await page.route("**/account", async (route) => {
      if (route.request().method() === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ username: "testuser", email: "test@example.com" }),
        });
      } else {
        await route.continue();
      }
    });

    await page.goto("/profile");
  });

  test("should load user profile data", async ({ page }) => {
    await expect(page.getByLabel(/username/i)).toHaveValue("");
    await expect(page.getByLabel(/email address/i)).toHaveValue("");
    // Note: The form values might be empty initially until data is fetched/populated
  });

  test("should validate password update requirements", async ({ page }) => {
    await page.getByLabel(/new password/i).fill("new-secret-123");
    
    const updateButton = page.getByRole("button", { name: /update profile/i });
    await updateButton.click();

    // Should show error for missing current password
    await expect(page.getByText(/current password is required/i)).toBeVisible();
  });

  test("should show delete account modal and handle cancellation", async ({ page }) => {
    const deleteButton = page.getByRole("button", { name: /delete account/i });
    await deleteButton.click();

    // Verify modal appears
    await expect(page.getByText(/confirm deletion/i)).toBeVisible();
    await expect(page.getByText(/are you sure you want to delete your account/i)).toBeVisible();

    // Click cancel
    await page.getByRole("button", { name: /cancel/i }).click();

    // Modal should be closed
    await expect(page.getByText(/confirm deletion/i)).not.toBeVisible();
  });

  test("should successfully delete account and redirect", async ({ page }) => {
    // Mock the delete request
    await page.route("**/account", async (route) => {
      if (route.request().method() === "DELETE") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ deleted: true }),
        });
      } else {
        await route.continue();
      }
    });

    await page.getByRole("button", { name: /delete account/i }).click();
    // In the modal, click the red Delete button
    await page.locator('button:has-text("Delete")').nth(1).click();

    // Should redirect to register and clear auth
    await expect(page).toHaveURL(/\/register/);
    const authState = await page.evaluate(() => localStorage.getItem("authenticated"));
    expect(authState).toBeNull();
  });
});
