import {test, expect, Locator} from '@playwright/test';
const path = require('path');


let usernameField: Locator;
let emailField: Locator;
let placeButton: Locator;
let popupModal: Locator;


test.beforeEach(async ({ page }) => {
    usernameField = page.getByTestId('username');
    emailField = page.getByTestId('email');
    placeButton = page.getByTestId('submit-order');
    popupModal = page.locator("#popup-message");

    const filePath = `file://${path.resolve("src/order-flow.html")}`
    await page.goto(filePath);
})

test('Popup is visible', async ({ page }) => {
    await expect(placeButton).toBeDisabled();
    await usernameField.fill("test");
    await emailField.fill("test@test.test");
    await expect(placeButton).toBeEnabled();
    await placeButton.click();

    await expect(popupModal).toBeVisible();
    expect(await popupModal.getAttribute("style")).toContain('display: block');
});

test('placeButton disabled initially', async ({ page }) => {
    await expect(placeButton).toBeDisabled();
})

test('placeButton is enabled after filling correct data', async ({ page }) => {
    await usernameField.fill("test");
    await emailField.fill("test@test.test");
    await expect(placeButton).toBeEnabled();
})