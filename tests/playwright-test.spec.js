import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');
  await page.getByRole('link', { name: 'English 7,009,000+ articles' }).click();
  await page.getByRole('radio', { name: 'Small' }).check();
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).click();
  await page.getByRole('combobox', { name: 'Search Wikipedia' }).fill('playwright');
  await page.getByRole('link', { name: 'Playwright (software) End-to-' }).click();
  await page.getByRole('link', { name: 'History', exact: true }).click();
  await page.getByRole('link', { name: 'Puppeteer', exact: true }).click();
  await page.locator('#toc-Test_automation').getByRole('link', { name: 'Test automation' }).click();
  await page.getByRole('link', { name: 'test automation software' }).click();
});