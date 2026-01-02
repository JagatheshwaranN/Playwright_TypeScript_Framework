import { Page, Locator } from '@playwright/test';

export class LoginPage {

    private readonly page: Page;
    private readonly emailField: Locator;
    private readonly passwordField: Locator;
    private readonly loginButton: Locator;
    //private readonly myAccountHeader: Locator;
    private readonly loginErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailField = page.locator('input#input-email');
        this.passwordField = page.locator('input#input-password');
        this.loginButton = page.locator('input[type="submit"]');
        //this.myAccountHeader = page.locator('h2:has-text("My Account")')
        this.loginErrorMessage = page.locator('div.alert.alert-danger.alert-dismissible');
    }

    async isLoginPageAvailable(): Promise<boolean> {
        let title: string = await this.page.title();
        return title.includes("Login");
    }

    async enterEmail(email: string) {
        await this.emailField.fill(email);
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async clickOnLogin() {
        await this.loginButton.click();
    }

    // async isMyAccountPageDisplayed(): Promise<boolean> {
    //     return await this.myAccountHeader.isVisible();
    // }

    async getLoginErrorMessage(): Promise<string> {
        return await this.loginErrorMessage.textContent() || "";
    }

    async loginToApplication(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickOnLogin();
    }

}