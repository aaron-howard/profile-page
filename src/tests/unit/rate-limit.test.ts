import { describe, it, expect } from 'vitest';
import { checkRateLimit } from '$lib/server/rate-limit';

describe('checkRateLimit', () => {
	it('allows requests under the limit', () => {
		const key = `test-${Date.now()}`;
		expect(checkRateLimit(key, { maxRequests: 2, windowMs: 60_000 }).allowed).toBe(true);
		expect(checkRateLimit(key, { maxRequests: 2, windowMs: 60_000 }).allowed).toBe(true);
	});

	it('blocks after max requests', () => {
		const key = `block-${Date.now()}`;
		checkRateLimit(key, { maxRequests: 1, windowMs: 60_000 });
		const second = checkRateLimit(key, { maxRequests: 1, windowMs: 60_000 });
		expect(second.allowed).toBe(false);
		if (!second.allowed) {
			expect(second.retryAfterSeconds).toBeGreaterThan(0);
		}
	});
});
