import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/about', '/projects', '/blog', '/contact'] as const;

for (const path of routes) {
	test.describe(`${path}`, () => {
		test('loads and has document title', async ({ page }) => {
			const res = await page.goto(path);
			expect(res?.ok() ?? false).toBeTruthy();
			await expect(page.locator('main')).toBeVisible();
			const title = await page.title();
			expect(title.length).toBeGreaterThan(0);
		});

		test('has no serious axe violations', async ({ page }) => {
			await page.goto(path);
			const results = await new AxeBuilder({ page }).analyze();
			expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
		});
	});
}
