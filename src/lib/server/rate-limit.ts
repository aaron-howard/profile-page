/**
 * Simple in-memory rate limiter for contact form submissions.
 * Suitable for single-instance dev; on serverless, limits apply per warm instance.
 */

type RateLimitEntry = { count: number; resetAt: number };

const store = new Map<string, RateLimitEntry>();

export type RateLimitResult = { allowed: true } | { allowed: false; retryAfterSeconds: number };

export function checkRateLimit(
	key: string,
	{ maxRequests = 5, windowMs = 15 * 60 * 1000 }: { maxRequests?: number; windowMs?: number } = {}
): RateLimitResult {
	const now = Date.now();
	const entry = store.get(key);

	if (!entry || now >= entry.resetAt) {
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

export function getClientIp(request: Request): string {
	return (
		request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
		request.headers.get('x-real-ip') ||
		'unknown'
	);
}
