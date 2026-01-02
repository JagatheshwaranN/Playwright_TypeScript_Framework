import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { TestConfig } from '../test.config';
import { RandomDataGenerator } from '../utils/random_data_generator';

test.describe('Account Registration Tests', () => {

    let homePage: HomePage;
    let registrationPage: RegistrationPage;

    test.beforeEach(async ({ page }) => {
        await page.goto(new TestConfig().appUrl);
        homePage = new HomePage(page);
        registrationPage = new RegistrationPage(page);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('Verify Account Registration with Valid Data', async ({ page }) => {

        // Verify Home Page is displayed
        expect(await homePage.isHomePageAvailable()).toBeTruthy();

        // Navigate to Registration Page
        await homePage.clickOnMyAccount();
        await homePage.clickOnRegister();

        // Fill Registration Form with Valid Data
        const firstName = RandomDataGenerator.generateFirstName();
        const lastName = RandomDataGenerator.generateLastName();
        const email = RandomDataGenerator.generateEmail();
        const telephone = RandomDataGenerator.generateTelephone();
        const password = RandomDataGenerator.generatePassword(8);
        await registrationPage.enterFirstName(firstName);
        await registrationPage.enterLastName(lastName);
        await registrationPage.enterEmail(email);
        await registrationPage.enterTelephone(telephone);
        await registrationPage.enterPassword(password);
        await registrationPage.enterConfirmPassword(password);
        await registrationPage.checkPrivacyPolicy();
        await registrationPage.clickOnContinue();

        // Verify Successful Registration
        const successMessage = await registrationPage.getSuccessMessage();
        expect(successMessage).toContain("Your Account Has Been Created!");

        await page.waitForTimeout(3000);
    });

});