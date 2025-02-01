import { test as base } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { ProductPage } from "../pages/productPage";
import { ShoppingBasketPage } from "../pages/shoppingBasketPage";

type Fixtures = {
    homePage: HomePage;
    productPage: ProductPage;
    shoppingBasketPage: ShoppingBasketPage;
};

export const test = base.extend<Fixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    },

    shoppingBasketPage: async ({ page }, use) => {
        const shoppingBasketPage = new ShoppingBasketPage(page);
        await use(shoppingBasketPage);
    }
});

// Runs **before each test** to load the homepage & accept cookies
test.beforeEach(async ({ homePage }) => {
    await homePage.getStartedAndAcceptCookies();
});

export { expect } from "@playwright/test";
