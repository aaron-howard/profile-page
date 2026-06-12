import { test, expect } from '@playwright/test';

test('contact form rejects filled honeypot', async ({ page }) => {
	await page.goto('/contact');
	await page.locator('#website').fill('https://spam.example');
	await page.locator('#name').fill('Test User');
	await page.locator('#email').fill('test@example.com');
	await page.locator('#subject').fill('Hello');
	await page.locator('#message').fill('Short message body for the test.');
	await page.getByRole('button', { name: /send message/i }).click();
	await expect(page.getByText(/invalid submission/i)).toBeVisible();
});
