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

/**
 * Basic HTML sanitization to prevent XSS attacks
 * For production, consider using a library like DOMPurify or sanitize-html
 */

const ALLOWED_TAGS = ['p', 'br', 'strong', 'em', 'u', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre'];
const ALLOWED_ATTRIBUTES: string[] = [];

export function sanitizeHtml(html: string): string {
	// Remove script tags and event handlers
	let sanitized = html
		.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
		.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
		.replace(/javascript:/gi, '')
		.replace(/data:text\/html/gi, '');

	// For a more robust solution, you'd parse the HTML and rebuild it
	// For now, we'll escape HTML in text fields and only allow safe HTML in content
	return sanitized;
}

export function escapeHtml(text: string): string {
	const map: Record<string, string> = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};
	return text.replace(/[&<>"']/g, (m) => map[m]);
}

export function sanitizeText(text: string): string {
	// Remove any HTML tags and escape special characters
	return escapeHtml(text.replace(/<[^>]*>/g, ''));
}
