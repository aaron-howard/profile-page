import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: 'e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? 'github' : 'list',
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				baseURL: 'http://127.0.0.1:5174',
				trace: 'on-first-retry'
			}
		}
	],
	webServer: {
		command: 'npx vite dev --port 5174 --strictPort --host 127.0.0.1',
		url: 'http://127.0.0.1:5174',
		reuseExistingServer: !process.env.CI,
		timeout: 120_000
	}
});
