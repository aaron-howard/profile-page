import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('ErrorPage component', () => {
	const componentPath = resolve('./src/routes/+error.svelte');
	const componentSource = readFileSync(componentPath, 'utf-8');

	it('contains h1 element for status code display', () => {
		expect(componentSource).toMatch(/<h1[^>]*>\s*{?\$?page\.status}?\s*<\/h1>/);
	});

	it('renders "Go Home" link with href="/"', () => {
		expect(componentSource).toMatch(/href="\/"\s*class="[^"]*"[^>]*>\s*Go Home\s*<\/a>/);
	});

	it('renders "contact us" link with href="/contact"', () => {
		expect(componentSource).toMatch(/href="\/contact"[^>]*>\s*contact us\s*<\/a>/);
	});

	it('has a Go Back button with click handler', () => {
		expect(componentSource).toMatch(/Go Back/);
		expect(componentSource).toMatch(/on:click/);
	});

	it('checks $page.status for conditional rendering', () => {
		expect(componentSource).toMatch(/\$page\.status === 404/);
		expect(componentSource).toMatch(/\$page\.status === 500/);
	});

	it('displays error details conditionally', () => {
		expect(componentSource).toMatch(/\$page\.error\?.message/);
	});

	it('has responsive layout classes', () => {
		expect(componentSource).toMatch(/flex-col/);
		expect(componentSource).toMatch(/sm:flex-row/);
	});
});
