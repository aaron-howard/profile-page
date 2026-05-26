import { describe, it, expect } from 'vitest';
import { parseSiteMetadata, defaultSiteMetadata } from '$lib/site-metadata';

describe('parseSiteMetadata', () => {
	it('returns defaults for invalid input', () => {
		expect(parseSiteMetadata(null)).toEqual(defaultSiteMetadata);
	});

	it('merges valid partial metadata', () => {
		const result = parseSiteMetadata({ email: 'test@example.com' });
		expect(result.email).toBe('test@example.com');
		expect(result.github).toBe(defaultSiteMetadata.github);
	});
});
