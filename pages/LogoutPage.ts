import { Locator, Page } from "@playwright/test";
import { HomePage } from "./HomePage";

export class LogoutPage {

    private readonly page: Page;
    private readonly logoutHeader: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutHeader = page.locator('h1:has-text("Account Logout")');
        this.continueButton = page.getByRole('link', { name: 'Continue' });
    }

    async isLogoutPageAvailable(): Promise<boolean> {
        let title: string = await this.page.title();
        return title.includes("Account Logout");
    }

    async isLogoutHeaderDisplayed(): Promise<boolean> {
        return await this.logoutHeader.isVisible();
    }

    async clickOnContinue(): Promise<HomePage> {
        await this.continueButton.click();
        return new HomePage(this.page);
    }

}