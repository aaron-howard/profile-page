import { describe, it, expect } from 'vitest';
import { safeProjectUrl, getProjectCategoryColor } from '$lib/project-utils';

describe('project-utils', () => {
	it('blocks javascript URLs', () => {
		expect(safeProjectUrl('javascript:alert(1)')).toBe('');
	});

	it('allows https URLs', () => {
		expect(safeProjectUrl('https://example.com')).toBe('https://example.com');
	});

	it('returns category colors', () => {
		expect(getProjectCategoryColor('frontend')).toBe('#00694b');
	});
});
