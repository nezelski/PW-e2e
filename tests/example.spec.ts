import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.locator("a[class^='getStarted']").click();//nth(1) - if few elements with this attributes

  const installationHeader = page.locator("header h1");
  await expect(installationHeader).toBeVisible();
  await expect(installationHeader).toHaveText("Installation");
});
