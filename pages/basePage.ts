import exp from "constants";
import { type Page, type Locator, expect } from "playwright/test";

export class BasePage {
    readonly page: Page;
    readonly magentoLogo: Locator;
    readonly cookieButton: Locator;
    readonly miniCart: Locator;
    readonly minicartContent: Locator;
    readonly shoppingBasket: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.magentoLogo = page.getByRole('link', { name: 'Magento Logo' });
        this.cookieButton = page.getByRole('button', { name: 'AGREE', exact: true });
        this.miniCart = page.locator('.action.showcart');
        this.minicartContent = page.locator('#ui-id-1');
        this.shoppingBasket = page.getByRole('link', { name: 'View and Edit Cart' });

    }

    async goTo(): Promise<void> {
        await this.page.goto('https://magento.softwaretestingboard.com/');
    }

    async goToHomepage(): Promise<void> {
        await this.magentoLogo.click();
    }
    
    async acceptCookies(): Promise<void> {
        await this.cookieButton.click();
    }

    async getStartedAndAcceptCookies(): Promise<void> {
        await this.goTo();
        await this.acceptCookies();
    }

    async goToMiniShoppingBasket(): Promise<void> {
            if (await this.minicartContent.isVisible() === false) {
                await this.miniCart.click();
            }
        
    }

    async closeMiniShoppingBasket(): Promise<void> {
        if (await this.minicartContent.isVisible()) {
            await this.minicartContent.click();
        }
    }

    async goToShoppingBasketAfterMiniBasketIsVisible(): Promise<void> {
        await this.shoppingBasket.click();
    }

    async goToShoppingBasketThroughMiniCart(): Promise<void> {
        await this.goToMiniShoppingBasket();
        await this.goToShoppingBasketAfterMiniBasketIsVisible();
    }
}