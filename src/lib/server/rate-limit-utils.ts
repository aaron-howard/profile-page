/**
 * Rate limiting utilities for preventing abuse
 * NOTE: In-memory implementation only - not suitable for distributed/serverless deployments
 * For production: use Redis, Memcached, or a rate limiting service
 */

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

/**
 * In-memory store for rate limiting
 * Maps identifier to { count, resetTime }
 * WARNING: This will not work across multiple server instances!
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Clean up expired rate limit entries
 * Removes entries whose reset time has passed
 */
function cleanupExpiredEntries(): void {
	const now = Date.now();
	for (const [key, value] of rateLimitStore.entries()) {
		if (now > value.resetTime) {
			rateLimitStore.delete(key);
		}
	}
}

export interface RateLimitResult {
	allowed: boolean;
	remaining: number;
	resetTime: number;
}

/**
 * Check if a request from an identifier is within rate limits
 *
 * @param identifier - Client identifier (usually IP address)
 * @param maxAttempts - Maximum attempts allowed (default: 5)
 * @param windowMs - Time window in milliseconds (default: 15 minutes)
 * @returns Object with allowed status, remaining attempts, and reset time
 *
 * @example
 * const result = await checkRateLimit('192.168.1.1', 5, 900000);
 * if (!result.allowed) {
 *   console.log(`Too many attempts. Try again in ${result.resetTime - Date.now()}ms`);
 * }
 */
export function checkRateLimit(
	identifier: string,
	maxAttempts = MAX_ATTEMPTS,
	windowMs = RATE_LIMIT_WINDOW
): RateLimitResult {
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

/**
 * Get client IP address from request event
 * Handles forwarded headers for proxied requests
 *
 * @param event - Request event with getClientAddress method
 * @returns Client IP address or 'unknown'
 */
export function getClientIdentifier(event: { getClientAddress: () => string }): string {
	try {
		return event.getClientAddress();
	} catch {
		return 'unknown';
	}
}

/**
 * Reset rate limit for a specific identifier
 * Useful for clearing limits after successful authentication
 *
 * @param identifier - The identifier to reset
 */
export function resetRateLimit(identifier: string): void {
	const key = `rate_limit:${identifier}`;
	rateLimitStore.delete(key);
}

/**
 * Clear all rate limit entries
 * WARNING: Only use in testing or during maintenance
 */
export function clearAllRateLimits(): void {
	rateLimitStore.clear();
}
