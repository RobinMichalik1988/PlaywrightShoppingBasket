import { TIMEOUT } from "node:dns";
import { test, expect } from "../fixtures/fixtures";

test("User can add Radiant Tee to cart", async ({ homePage, productPage, shoppingBasketPage }) => {
    await homePage.navigateToRadiantTee();
    await productPage.selectSizeM();
    await productPage.selectColorOrange();
    await productPage.addToCart();
    
    await homePage.goToShoppingBasketThroughMiniCart();
    
    await shoppingBasketPage.validateCartItem("Radiant Tee", "M", "Orange", "$22.00", "1");
});
