import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';

test.describe('Logout Page Tests', () => {

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

    test('should logout from the application', { tag: '@sanity' }, async ({ page }) => {
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
        // Perform Logout
        const logoutPage = await myAccountPage.clickOnLogout();
        // Verify Logout Page is displayed
        expect(await logoutPage.isLogoutPageAvailable()).toBeTruthy();
        await logoutPage.isLogoutHeaderDisplayed();
        // Click on Continue to go to Home Page
        homePage = await logoutPage.clickOnContinue();
        expect(await homePage.isHomePageAvailable()).toBeTruthy();
    });
});