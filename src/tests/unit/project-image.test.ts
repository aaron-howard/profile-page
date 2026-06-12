import { describe, it, expect } from 'vitest';
import { projectImageSrc, projectWebpSrc } from '$lib/project-image';

describe('projectImageSrc', () => {
	it('returns null for empty path', () => {
		expect(projectImageSrc(null)).toBeNull();
		expect(projectImageSrc('  ')).toBeNull();
	});

	it('returns absolute http URLs unchanged', () => {
		expect(projectImageSrc('https://cdn.example.com/x.png')).toBe('https://cdn.example.com/x.png');
	});

	it('normalizes static projects path', () => {
		expect(projectImageSrc('static/projects/x.jpg')).toMatch(/\/projects\/x\.jpg$/);
	});
});

describe('projectWebpSrc', () => {
	it('returns webp path for local jpg', () => {
		expect(projectWebpSrc('/projects/foo.jpg')).toMatch(/foo\.webp$/);
	});

	it('returns null for remote URLs', () => {
		expect(projectWebpSrc('https://x.com/a.jpg')).toBeNull();
	});

	it('returns null for non-jpeg', () => {
		expect(projectWebpSrc('/projects/foo.png')).toBeNull();
	});
});
