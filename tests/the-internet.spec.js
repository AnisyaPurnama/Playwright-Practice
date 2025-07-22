import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
});

test.describe('The internet herokuapp test automation', () => {
  test('should add and remove element', async ({ page }) => {
    const addRemoveLink = page.locator('a', { hasText: 'Add/Remove Elements' });
    const addButton = page.locator('button', { hasText: 'Add Element' });
    const deleteButtons = page.locator('.added-manually');

    await addRemoveLink.click();
    await addButton.click();
    await expect(deleteButtons).toBeVisible();
    await deleteButtons.click();
    await expect(deleteButtons).toBeHidden();
  });

  test('should able to select a dropdown value', async ({ page }) => {
    const dropdownLink = page.locator('a', { hasText: 'Dropdown' });
    const dropdownBtn = page.locator('#dropdown');

    await dropdownLink.click();
    await dropdownBtn.click();
    await dropdownBtn.selectOption('1');
    await expect(dropdownBtn).toHaveValue('1');
  });

  test('should able select and unselect checkboxes', async ({ page }) => {
    const checkboxesLink = page.locator('a', { hasText: 'Checkboxes' });
    const checkbox1 = page.locator('form#checkboxes input[type="checkbox"]').nth(0);
    const checkbox2 = page.locator('form#checkboxes input[type="checkbox"]').nth(1);

    await checkboxesLink.click();

    await expect(checkbox1).not.toBeChecked();
    await expect(checkbox2).toBeChecked();

    await checkbox1.check();
    await checkbox2.uncheck();

    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).not.toBeChecked();
  });

  test.only('should able to hover over a figure', async ({ page }) => {
    const hoversLink = page.locator('a', { hasText: 'Hovers' });
    const firstFigure = page.locator('.figure').nth(0);
    const userText = firstFigure.locator('.figcaption h5');

    await hoversLink.click();
    await firstFigure.hover();
    await expect(userText).toBeVisible();
    await expect(userText).toHaveText('name: user1');
  });
});
