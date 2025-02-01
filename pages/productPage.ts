import { type Locator, type Page } from "playwright/test";
import { BasePage } from "./basePage";

export class ProductPage extends BasePage {
    readonly sizeSelectorM: Locator;
    readonly OrangeColorSelector: Locator;
    readonly addToCartButton: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly SizeErrorMessage: Locator;
    readonly ColorErrorMessage: Locator;
    readonly successMessage: Locator;
    readonly successMessageText: Locator;

    constructor(page: Page) {
        super(page);
        this.sizeSelectorM = page.getByRole('option', { name: 'M' });  
        this.OrangeColorSelector = page.getByRole('option', { name: 'Orange' }); 
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });  
        this.productName = page.locator('h1');  
        this.productPrice = page.locator('#product-price-1556');  
        this.SizeErrorMessage = page.locator('[id="super_attribute\\[143\\]-error"]'); 
        this.ColorErrorMessage = page.locator('[id="super_attribute\\[93\\]-error"]');
        this.successMessage = page.getByRole('alert').locator('div').first();
        this.successMessageText = page.locator('div[data-role="success-message"] div'); 
    }

    async selectSizeM(): Promise<void> {
        await this.sizeSelectorM.click();
    }

    async selectColorOrange(): Promise<void> {
        await this.OrangeColorSelector.click();
    }

    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
        await this.successMessage.waitFor({ state: "visible" });
    }

    async getProductName(): Promise<string> {
        return await this.productName.textContent() || "";
    }

    async getProductPrice(): Promise<string> {
        return await this.productPrice.textContent() || "";
    }

    async getSizeErrorMessage(): Promise<string> {
        return await this.SizeErrorMessage.textContent() || "";
    }

    async getColorErrorMessage(): Promise<string> {
        return await this.ColorErrorMessage.textContent() || "";
    }

    async getSuccessMessage(): Promise<string> {
        return await this.successMessageText.textContent() || "";
    }
}
