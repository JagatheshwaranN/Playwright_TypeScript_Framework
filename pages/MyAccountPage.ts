import {Page, Locator} from '@playwright/test';
import { LogoutPage } from './LogoutPage';

export class MyAccountPage {

    private readonly page: Page;
    private readonly myAccountHeader: Locator;
    private readonly logoutLink: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.myAccountHeader = page.locator('h2:has-text("My Account")');
        this.logoutLink = page.locator('a').filter({ hasText: 'Logout' }).last()
    }   

    async isMyAccountPageAvailable(): Promise<boolean> {
        return await this.myAccountHeader.isVisible();
    }

    async clickOnLogout() : Promise<LogoutPage> {
        await this.logoutLink.click();
        return new LogoutPage(this.page);
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

}