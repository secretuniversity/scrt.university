import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
	await page.goto('http://localhost:3001');
	expect(await page.title()).toBe('Home | Secret University');
});
