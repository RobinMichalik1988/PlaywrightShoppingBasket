import { type Page, type Locator } from "playwright/test";

export class BasePage {
    readonly page: Page;
    readonly magentoLogo: Locator;
    readonly cookieButton: Locator;
    readonly miniCart: Locator;
    readonly miniCartViewAndEdit: Locator;

    constructor(page: Page) {
        this.page = page;
        this.magentoLogo = page.getByRole('link', { name: 'Magento Logo' });
        this.cookieButton = page.getByRole('button', { name: 'AGREE', exact: true });
        this.miniCart = page.getByRole('link', { name: ' My Cart' });
        this.miniCartViewAndEdit = page.getByRole('link', { name: 'View and Edit Cart' });
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
        await this.miniCart.click();
    }

    async goToShoppingBasketAfterMiniBasketIsVisible(): Promise<void> {
        await this.miniCartViewAndEdit.click();
    }

    async goToShoppingBasket(): Promise<void> {
        await this.goToMiniShoppingBasket();
        await this.goToShoppingBasketAfterMiniBasketIsVisible();
    }
}