import { Locator, Page } from "@playwright/test";

export class HomePage {


    private readonly page:Page;
    private readonly myAccountLink:Locator;
    private readonly registerLink:Locator;
    private readonly loginLink:Locator;
    private readonly searchBox:Locator;
    private readonly searchButton:Locator;

    constructor(page:Page){
        this.page = page;
        this.myAccountLink = page.locator('a[title="My Account"]');
        this.registerLink = page.locator('a[href="https://localhost/opencart/upload/index.php?route=account/register"]');
        this.loginLink = page.locator('a[href="https://localhost/opencart/upload/index.php?route=account/login"]');
        this.searchBox = page.locator('input[placeholder="Search"]');
        this.searchButton = page.locator('button[class="btn btn-default btn-lg"]');
    }

    async isHomePageAvailable():Promise<boolean>{
        let title:string = await this.page.title();
        return title.includes("Your Store");
    }   
      
    async clickOnMyAccount(){
        await this.myAccountLink.click();
    }

    async clickOnRegister(){
        await this.registerLink.click();
    }

    async clickOnLogin(){
        await this.loginLink.click();   
    }

    async enterProductName(productName:string){
        await this.searchBox.fill(productName);
    }   

    async clickOnSearchButton(){
        await this.searchButton.click();
    }
    
}