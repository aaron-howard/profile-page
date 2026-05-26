import { describe, it, expect } from 'vitest';
import {
	formatBlogDate,
	getAuthorInitials,
	getBlogCategoryColor,
	getBlogCategoryIconKey
} from '$lib/blog-utils';

describe('blog-utils', () => {
	it('formats valid dates', () => {
		const formatted = formatBlogDate('2024-06-15');
		expect(formatted).toContain('2024');
	});

	it('returns initials from author name', () => {
		expect(getAuthorInitials('Aaron Howard')).toBe('AH');
	});

	it('returns category color and icon', () => {
		expect(getBlogCategoryColor('Development')).toBe('#00694b');
		expect(getBlogCategoryIconKey('Development')).toBe('code');
	});
});
