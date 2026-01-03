import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';
import { DataReader } from '../utils/data_reader';

const jsonData = DataReader.readJSON('test_data/login.json');

for (const data of jsonData) {

    test.describe('Login Page DataDriven Tests', () => {

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

        test(`should login with credentials - ${data.test_case}`, { tag: ['@dataDriven'] }, async ({ page }) => {
            // Navigate to Login Page
            await homePage.clickOnMyAccount();
            await homePage.clickOnLogin();
            // Verify Login Page is displayed
            expect(await loginPage.isLoginPageAvailable()).toBeTruthy();
            // Perform Login with valid credentials

            await loginPage.loginToApplication(data.email, data.password);

            if (data.result === 'success') {
                // Verify My Account Page is displayed
                expect(await myAccountPage.isMyAccountPageAvailable()).toBeTruthy();
            } else {
                // Verify Login Page is still displayed
                expect(await loginPage.isLoginPageAvailable()).toBeTruthy();
                // Verify appropriate error message is shown
                const errorMessage = await loginPage.getLoginErrorMessage();
                expect(errorMessage).toContain("Warning: No match for E-Mail Address and/or Password.");
            }

        });

    });

}