import { db } from '$lib/server/db';

interface RateLimitConfig {
	maxAttempts: number;
	windowMs: number;
	identifier: string;
}

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_LOGIN_ATTEMPTS = 5;

// In-memory store for rate limiting (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function cleanupExpiredEntries() {
	const now = Date.now();
	for (const [key, value] of rateLimitStore.entries()) {
		if (now > value.resetTime) {
			rateLimitStore.delete(key);
		}
	}
}

export async function checkRateLimit(identifier: string, maxAttempts = MAX_LOGIN_ATTEMPTS, windowMs = RATE_LIMIT_WINDOW): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
	cleanupExpiredEntries();
	
	const now = Date.now();
	const key = `rate_limit:${identifier}`;
	const entry = rateLimitStore.get(key);

	if (!entry || now > entry.resetTime) {
		// New or expired entry
		rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
		return {
			allowed: true,
			remaining: maxAttempts - 1,
			resetTime: now + windowMs
		};
	}

	if (entry.count >= maxAttempts) {
		return {
			allowed: false,
			remaining: 0,
			resetTime: entry.resetTime
		};
	}

	entry.count++;
	return {
		allowed: true,
		remaining: maxAttempts - entry.count,
		resetTime: entry.resetTime
	};
}

export function getClientIdentifier(event: { getClientAddress: () => string }): string {
	try {
		return event.getClientAddress();
	} catch {
		return 'unknown';
	}
}
