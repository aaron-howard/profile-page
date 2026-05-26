/**
 * Simple in-memory rate limiter for contact form submissions.
 * Suitable for single-instance dev; on serverless, limits apply per warm instance.
 */

type RateLimitEntry = { count: number; resetAt: number };

const store = new Map<string, RateLimitEntry>();

export type RateLimitResult = { allowed: true } | { allowed: false; retryAfterSeconds: number };

function pruneExpired(now: number): void {
	for (const [key, entry] of store.entries()) {
		if (now >= entry.resetAt) {
			store.delete(key);
		}
	}
}

export function checkRateLimit(
	key: string,
	{ maxRequests = 5, windowMs = 15 * 60 * 1000 }: { maxRequests?: number; windowMs?: number } = {}
): RateLimitResult {
	const now = Date.now();
	pruneExpired(now);
	const entry = store.get(key);

	if (!entry) {
		store.set(key, { count: 1, resetAt: now + windowMs });
		return { allowed: true };
	}

	if (entry.count >= maxRequests) {
		const retryAfterSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
		return { allowed: false, retryAfterSeconds };
	}

	entry.count += 1;
	return { allowed: true };
}
