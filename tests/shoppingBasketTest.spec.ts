import { test, expect } from '@playwright/test';

test.describe('shoppingBasket functionality (add/remove)', () => {
  test.beforeEach(async ({ page }) => {
    // Go to homepage of the website
    await page.goto('https://magento.softwaretestingboard.com/');
    // Accept cookies
    await page.getByRole('button', { name: 'AGREE', exact: true }).click();    
  });

  test('Navigate to Radiant Tee en validate product page', async ({ page }) => {
    await page.getByRole('link', { name: 'Radiant Tee' }).first().click();
    await expect(page.locator('h1')).toContainText('Radiant Tee');
    await expect(page.locator('#product-price-1556')).toContainText('$22.00');
  });

  test('try to add Radiant Tee to shppingBasket without selecting size and color and expect an error message', async ({ page }) => {
    await page.getByRole('link', { name: 'Radiant Tee' }).first().click();
    await page.getByRole('button', { name: 'Add to Cart' }).click();

    // Validate error-message for missing color and size
    await expect(page.locator('[id="super_attribute\\[143\\]-error"]')).toBeVisible();
    await expect(page.locator('[id="super_attribute\\[93\\]-error"]')).toBeVisible();
  });

  test('Select and validate selected size and color of the product', async ({ page }) => {
    await page.getByRole('link', { name: 'Radiant Tee' }).first().click();

    // Select size(M) and validate
    await page.getByRole('option', { name: 'M' }).click();
    await expect(page.locator('span').filter({ hasText: /^M$/ })).toBeVisible();
    await expect(page.locator('#product-options-wrapper')).toContainText('M');

    // Select color (Orange) and validate
    await page.getByRole('option', { name: 'Orange' }).click();
    await expect(page.locator('#product-options-wrapper').getByText('Orange')).toBeVisible();
    await expect(page.locator('#product-options-wrapper')).toContainText('Orange');
  });

  test('Add product(Tadiant Tee) to shoppingBasket and validate success message', async ({ page }) => {
    await page.getByRole('link', { name: 'Radiant Tee' }).first().click();

    // Select size (M) and color (Orange)
    await page.getByRole('option', { name: 'M' }).click();
    await page.getByRole('option', { name: 'Orange' }).click();

    // Add product to shoppingBasket
    await page.getByRole('button', { name: 'Add to Cart' }).click();

    // Validate success message
    await expect(page.getByRole('alert').locator('div').first()).toBeVisible();
    await expect(page.getByText('You added Radiant Tee to your')).toBeVisible();
    await expect(page.getByRole('alert')).toContainText('You added Radiant Tee to your shopping cart.');
  });

  test('Add product(Tadiant Tee) to shoppingBasket and validate mini-shoppingBasket', async ({ page }) => {
    await page.getByRole('link', { name: 'Radiant Tee' }).first().click();

    // Select size (M) and color (Orange)
    await page.getByRole('option', { name: 'M' }).click();
    await page.getByRole('option', { name: 'Orange' }).click();

    // Add product to shoppingBasket
    await page.getByRole('button', { name: 'Add to Cart' }).click();

    // Go to mini-shoppingBasket
    await page.getByRole('link', { name: ' My Cart 1 1 items' }).click();
    await expect(page.locator('#ui-id-1')).toBeVisible();

    // Validate product and price in mini-shoppingBasket
    await expect(page.locator('#mini-cart')).toContainText('Radiant Tee');
    await expect(page.locator('#mini-cart')).toContainText('$22.00');
    await expect(page.getByRole('spinbutton', { name: 'Qty:' })).toHaveValue('1');
  });

  test('Add product (Radiant Tee) to shoppingBasket and validate shopping basket content', async ({ page }) => {
    await page.getByRole('link', { name: 'Radiant Tee' }).first().click();

    // Selecteer size (M) en color (Orange)
    await page.getByRole('option', { name: 'M' }).click();
    await page.getByRole('option', { name: 'Orange' }).click();

    // add product to shoppingBasket
    await page.getByRole('button', { name: 'Add to Cart' }).click();

    // Go to shoppingBasket
    await page.getByRole('link', { name: ' My Cart 1 1 items' }).click();
    await page.getByRole('link', { name: 'View and Edit Cart' }).click();

    // Validate product in shoppingBasket
    await expect(page.locator('#shopping-cart-table')).toContainText('Radiant Tee');
    await expect(page.locator('#shopping-cart-table')).toContainText('M');
    await expect(page.locator('#shopping-cart-table')).toContainText('Orange');
    await expect(page.locator('#shopping-cart-table')).toContainText('$22.00');
    await expect(page.getByRole('spinbutton', { name: 'Qty' })).toHaveValue('1');
  });

  test('Add and remove product (Radiant Tee) to and from shoppginBasket', async ({ page }) => {
    await page.getByRole('link', { name: 'Radiant Tee' }).first().click();

    // Selecteer size (M) en color (Orange)
    await page.getByRole('option', { name: 'M' }).click();
    await page.getByRole('option', { name: 'Orange' }).click();

    // Add product to shoppingBasket
    await page.getByRole('button', { name: 'Add to Cart' }).click();

    // Go to shoppingBasket
    await page.getByRole('link', { name: ' My Cart 1 1 items' }).click();
    await page.getByRole('link', { name: 'View and Edit Cart' }).click();

    // Remove product from shoppingBasket
    await page.getByRole('link', { name: ' Remove item' }).click();

    // Validate shoppingBasket is empty
    await expect(page.locator('#maincontent')).toContainText('You have no items in your shopping cart.');
  });
});