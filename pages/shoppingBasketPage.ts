import { expect, type Locator, type Page } from "playwright/test";
import { BasePage } from "./basePage";

export class ShoppingBasketPage extends BasePage {
    readonly shoppingCartTable: Locator;
    readonly cartItem: Locator;
    readonly cartItemOptionTableForColorAndSize: Locator;
    readonly itemPrice: Locator;
    readonly itemQuantity: Locator;
    readonly removeItemButton: Locator;
    readonly emptyCartMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.shoppingCartTable = page.locator("#shopping-cart-table");
        this.cartItem = page.locator("#shopping-cart-table .product-item-name");
        this.cartItemOptionTableForColorAndSize = page.locator("#shopping-cart-table .item-options");
        this.itemPrice = page.locator("#shopping-cart-table .col.price .price");
        this.itemQuantity = page.getByRole("spinbutton", { name: "Qty" });
        this.removeItemButton = page.getByRole("link", { name: " Remove item" });
        this.emptyCartMessage = page.locator("#maincontent").getByText("You have no items in your shopping cart.");
    }

    async validateCartItem(productName: string, size: string, color: string, price: string, quantity: string): Promise<void> {
        await expect(this.cartItem).toContainText(productName);
        await expect(this.cartItemOptionTableForColorAndSize).toContainText(size);
        await expect(this.cartItemOptionTableForColorAndSize).toContainText(color);
        await expect(this.itemPrice).toContainText(price);
        await expect(this.itemQuantity).toHaveValue(quantity);
    }

    async removeItemFromCart(): Promise<void> {
        await this.removeItemButton.click();
    }
}
