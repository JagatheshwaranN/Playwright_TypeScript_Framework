import { Page, Locator } from '@playwright/test';
import { LogoutPage } from './LogoutPage';

export class MyAccountPage {

    private readonly page: Page;
    private readonly myAccountHeader: Locator;
    private readonly myAccountLink: Locator;
    private readonly logoutLink: Locator;
    private readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.myAccountHeader = page.locator('h2:has-text("My Account")');
        this.myAccountLink = page.locator('a[title="My Account"]');
        this.logoutLink = page.locator('a').filter({ hasText: 'Logout' }).last()
        this.logoutButton = page.locator('a').filter({ hasText: 'Logout' }).first()

    }

    async isMyAccountPageAvailable(): Promise<boolean> {
        return await this.myAccountHeader.isVisible();
    }

    async clickOnMyAccount() {
        await this.myAccountLink.click();
    }

    async clickOnLogout(): Promise<LogoutPage> {
        await this.logoutLink.click();
        return new LogoutPage(this.page);
    }

    async clickOnLogoutButton(): Promise<LogoutPage> {
        await this.logoutButton.click();
        return new LogoutPage(this.page);
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

}