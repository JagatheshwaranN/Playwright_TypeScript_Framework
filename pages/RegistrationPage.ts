import { Locator, Page } from "@playwright/test";

export class RegistrationPage {

    private readonly page: Page;
    private readonly firstNameField: Locator;
    private readonly lastNameField: Locator;
    private readonly emailField: Locator;
    private readonly telephoneField: Locator;
    private readonly passwordField: Locator;
    private readonly confirmPasswordField: Locator;
    private readonly privacyPolicyCheckbox: Locator;
    private readonly continueButton: Locator;
    private readonly successMessage: Locator;
    // Your Account Has Been Created!

    constructor(page: Page) {
        this.page = page;
        this.firstNameField = page.locator('input#input-firstname');
        this.lastNameField = page.locator('input#input-lastname');
        this.emailField = page.locator('input#input-email');
        this.telephoneField = page.locator('input#input-telephone');
        this.passwordField = page.locator('input#input-password');
        this.confirmPasswordField = page.locator('input#input-confirm');
        this.privacyPolicyCheckbox = page.locator('input[type="checkbox"]');
        this.continueButton = page.locator('input[type="submit"]');
        this.successMessage = page.locator('div#content h1');
    }

    async isRefisterPageAvailable(): Promise<boolean> {
        let title: string = await this.page.title();
        return title.includes("Register Account");
    }

    async enterFirstName(firstName: string) {
        await this.firstNameField.fill(firstName);
    }

    async enterLastName(lastName: string) {
        await this.lastNameField.fill(lastName);
    }

    async enterEmail(email: string) {
        await this.emailField.fill(email);
    }

    async enterTelephone(telephone: string) {
        await this.telephoneField.fill(telephone);
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async enterConfirmPassword(confirmPassword: string) {
        await this.confirmPasswordField.fill(confirmPassword);
    }

    async checkPrivacyPolicy() {
        await this.privacyPolicyCheckbox.check();
    }

    async clickOnContinue() {
        await this.continueButton.click();
    }

    async getSuccessMessage(): Promise<string> {
        return await this.successMessage.textContent() || "";
    }

    async registerUser(userDetails: { 
        firstName: string; lastName: string; email: string; 
        telephone: string; password: string; }): Promise<void> {
        await this.enterFirstName(userDetails.firstName);
        await this.enterLastName(userDetails.lastName);
        await this.enterEmail(userDetails.email);
        await this.enterTelephone(userDetails.telephone);
        await this.enterPassword(userDetails.password);
        await this.enterConfirmPassword(userDetails.password);
        await this.checkPrivacyPolicy();
        await this.clickOnContinue();
    }

}