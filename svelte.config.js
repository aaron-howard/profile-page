import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter(),
		csrf: {
			checkOrigin: true
		},
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ['self'],
				'script-src': ['self'],
				'style-src': [
					'self',
					'unsafe-inline',
					'https://fonts.googleapis.com' // Google Fonts CSS (app.html)
				],
				'img-src': ['self', 'data:', 'https:'],
				'font-src': ['self', 'https://fonts.gstatic.com'],
				'connect-src': ['self']
			}
		}
	}
};

export default config;
