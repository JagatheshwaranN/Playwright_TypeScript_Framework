import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LogoutPage } from '../pages/LogoutPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { TestConfig } from '../test.config';
import { RandomDataGenerator } from '../utils/random_data_generator';

// Combined End-to-End Test Suite
test.describe('End-to-End User Journey Tests', () => {

    let homePage: HomePage;
    let loginPage: LoginPage;
    let myAccountPage: MyAccountPage;
    let logoutPage: LogoutPage;
    let registrationPage: RegistrationPage;
    let testConfig: TestConfig;

    // Setup before each test
    test.beforeEach(async ({ page }) => {
        testConfig = new TestConfig();
        await page.goto(testConfig.appUrl);
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        myAccountPage = new MyAccountPage(page);
        logoutPage = new LogoutPage(page);
        registrationPage = new RegistrationPage(page);
    });

    // Teardown after each test
    test.afterEach(async ({ page }) => {
        await page.close();
    });

    // End-to-End Test: Registration -> Login -> Logout
    test('should register, login, and logout successfully', async ({ page }) => {
        // Navigate to Registration Page and perform registration
        const email = await performRegistration(homePage, registrationPage, myAccountPage, testConfig);
        // Navigate to Login Page and perform login
        await performLogin(homePage, loginPage, email, myAccountPage, logoutPage, testConfig);
        // Perform Logout
        await performLogout(myAccountPage, homePage);
    });

});

/**
 * Performs user registration.
 * @param homePage 
 * @param registrationPage 
 * @param myAccountPage 
 * @param testConfig 
 * @returns 
 */
async function performRegistration(homePage: HomePage, registrationPage: RegistrationPage, myAccountPage: MyAccountPage, testConfig: TestConfig): Promise<string> {
    // Navigate to Registration Page
    await homePage.clickOnMyAccount();
    // Click on Register
    await homePage.clickOnRegister();
    // Verify Registration Page is displayed
    expect(await registrationPage.isRegistrationPageAvailable()).toBeTruthy();
    // Perform Registration with valid details
    const email = RandomDataGenerator.generateEmail();
    // Fill Registration Form
    await registrationPage.registerUser({
        firstName: RandomDataGenerator.generateFirstName(),
        lastName: RandomDataGenerator.generateLastName(),
        email: email,
        telephone: RandomDataGenerator.generateTelephone(),
        password: testConfig.password
    });
    // Verify Successful Registration
    const successMessage = await registrationPage.getSuccessMessage();
    // Assert success message
    expect(successMessage).toContain("Your Account Has Been Created!");
    // Logout after registration
    await myAccountPage.clickOnMyAccount();
    // Click on Logout Button
    await myAccountPage.clickOnLogoutButton();

    return email
}

/**
 * Performs user login.
 * @param homePage 
 * @param loginPage 
 * @param email 
 * @param myAccountPage 
 * @param logoutPage 
 * @param testConfig 
 */
async function performLogin(homePage: HomePage, loginPage: LoginPage, email: string, myAccountPage: MyAccountPage, logoutPage: LogoutPage, testConfig: TestConfig) {
    await logoutPage.clickOnContinue();
    // Navigate to Login Page
    await homePage.clickOnMyAccount();
    // Click on Login
    await homePage.clickOnLogin();
    // Verify Login Page is displayed
    expect(await loginPage.isLoginPageAvailable()).toBeTruthy();
    // Perform Login with registered credentials
    await loginPage.loginToApplication(email, testConfig.password);
    // Verify My Account Page is displayed
    expect(await myAccountPage.isMyAccountPageAvailable()).toBeTruthy();
}

/**
 * Performs user logout.
 * @param myAccountPage 
 * @param homePage 
 */
async function performLogout(myAccountPage: MyAccountPage, homePage: HomePage) {
    // Perform Logout
    const logoutPageInstance = await myAccountPage.clickOnLogout();
    // Verify Logout Page is displayed
    expect(await logoutPageInstance.isLogoutPageAvailable()).toBeTruthy();
    // Verify Logout Header is displayed
    expect(await logoutPageInstance.isLogoutHeaderDisplayed()).toBeTruthy();
    // Click on Continue to go to Home Page
    homePage = await logoutPageInstance.clickOnContinue();
    // Verify Home Page is displayed
    expect(await homePage.isHomePageAvailable()).toBeTruthy();
}
