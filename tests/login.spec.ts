import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';


test.describe('Login Page Tests', () => {

    let homePage: HomePage;
    let loginPage: LoginPage;
    let myAccountPage: MyAccountPage;

    test.beforeEach(async ({ page }) => {
        await page.goto(new TestConfig().appUrl);
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        myAccountPage = new MyAccountPage(page);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('should login with valid credentials', { tag: ['@regression', '@sanity'] }, async ({ page }) => {
        // Navigate to Login Page
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();
        // Verify Login Page is displayed
        expect(await loginPage.isLoginPageAvailable()).toBeTruthy();
        // Perform Login with valid credentials
        const validEmail = new TestConfig().email;
        const validPassword = new TestConfig().password;
        await loginPage.loginToApplication(validEmail, validPassword);
        // Verify My Account Page is displayed
        expect(await myAccountPage.isMyAccountPageAvailable()).toBeTruthy();
    });

    test('should not login with invalid credentials', { tag: ['@regression'] }, async ({ page }) => {
        // Navigate to Login Page
        await homePage.clickOnMyAccount();
        await homePage.clickOnLogin();
        // Verify Login Page is displayed
        expect(await loginPage.isLoginPageAvailable()).toBeTruthy();
        // Perform Login with invalid credentials
        const invalidEmail = "invalid@example.com";
        const invalidPassword = "wrongpassword";
        await loginPage.loginToApplication(invalidEmail, invalidPassword);
        // Verify Login Page is still displayed
        expect(await loginPage.isLoginPageAvailable()).toBeTruthy();
        // Verify appropriate error message is shown
        const errorMessage = await loginPage.getLoginErrorMessage();
        expect(errorMessage).toContain("Warning: No match for E-Mail Address and/or Password.");
    });

});