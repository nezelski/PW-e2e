import * as dotenv from 'dotenv';
dotenv.config();
import {test, expect} from '@playwright/test';
import {faker} from "@faker-js/faker";

const appUrl = process.env.APP_URL
const randomUsername = faker.internet.username();
const randomPassword = faker.internet.password();

test.beforeEach(async ({ page }) => {
 await page.goto(appUrl);
 await page.waitForLoadState('networkidle');
})

test('Login button is disabled if one field is empty', async ({page}) => {
    const loginField= page.getByTestId('username-input');
    const signInButton= page.getByTestId('signIn-button');

    await expect(signInButton).toBeEnabled();
    await loginField.fill("test");
    await expect(signInButton).toBeDisabled();

})

test('Auth error modal is visible if credentials are wrong', async ({page}) => {
    const loginField = page.getByTestId('username-input');
    const passwordField = page.getByTestId('password-input');
    const signInButton = page.getByTestId('signIn-button');
    const authPopup = page.getByTestId('authorizationError-popup');

    await loginField.fill(randomUsername);
    await passwordField.fill(randomPassword);
    await signInButton.click();

    await expect(authPopup).toBeVisible();
})
