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
});
