import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/');
  await page.getByRole('button', { name: 'AGREE', exact: true }).click();
  await page.getByRole('link', { name: 'Radiant Tee' }).first().click();
  await expect(page.locator('h1')).toContainText('Radiant Tee');
  await expect(page.locator('#product-price-1556')).toContainText('$22.00');
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await expect(page.locator('[id="super_attribute\\[143\\]-error"]')).toBeVisible();
  await page.locator('[id="super_attribute\\[143\\]-error"]').click();
  await expect(page.locator('[id="super_attribute\\[93\\]-error"]')).toBeVisible();
  await page.getByRole('option', { name: 'M' }).click();
  await expect(page.locator('span').filter({ hasText: /^M$/ })).toBeVisible();
  await expect(page.locator('#product-options-wrapper')).toContainText('M');
  await page.getByRole('option', { name: 'Orange' }).click();
  await expect(page.locator('#product-options-wrapper').getByText('Orange')).toBeVisible();
  await expect(page.locator('#product-options-wrapper')).toContainText('Orange');
  await expect(page.getByRole('spinbutton', { name: 'Qty' })).toHaveValue('1');
  await page.getByRole('button', { name: 'Add to Cart' }).click();
  await expect(page.getByRole('alert').locator('div').first()).toBeVisible();
  await expect(page.getByText('You added Radiant Tee to your')).toBeVisible();
  await expect(page.getByRole('alert')).toContainText('You added Radiant Tee to your shopping cart.');
  await page.getByRole('link', { name: ' My Cart 1 1 items' }).click();
  await expect(page.locator('#ui-id-1')).toBeVisible();
  await expect(page.locator('#mini-cart')).toContainText('Radiant Tee');
  await expect(page.locator('#mini-cart')).toContainText('$22.00');
  await expect(page.getByRole('spinbutton', { name: 'Qty:' })).toHaveValue('1');
  await page.getByRole('link', { name: 'View and Edit Cart' }).click();
  await expect(page.locator('#shopping-cart-table')).toContainText('Radiant Tee');
  await page.getByRole('cell', { name: 'Radiant Tee Radiant Tee Size' }).locator('dl').click();
  await expect(page.locator('#shopping-cart-table')).toContainText('M');
  await expect(page.locator('#shopping-cart-table')).toContainText('Orange');
  await expect(page.locator('#shopping-cart-table')).toContainText('$22.00');
  await expect(page.getByRole('spinbutton', { name: 'Qty' })).toHaveValue('1');
  await page.getByRole('link', { name: ' Remove item' }).click();
  await expect(page.locator('#maincontent')).toContainText('You have no items in your shopping cart.');
});