/**
 * Sanitization utilities for preventing XSS and injection attacks
 * These functions escape or strip potentially dangerous HTML/JavaScript
 */

/**
 * HTML entity escape map
 */
const HTML_ESCAPE_MAP: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#039;'
};

/**
 * Escape HTML special characters
 * Converts HTML metacharacters to their entity equivalents
 * Safe for use in HTML attributes and text content
 *
 * @param text - The text to escape
 * @returns Escaped text safe for HTML context
 *
 * @example
 * escapeHtml('<script>alert("xss")</script>')
 * // Returns: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 */
export function escapeHtml(text: string): string {
	return text.replace(/[&<>"']/g, (char) => HTML_ESCAPE_MAP[char]);
}

/**
 * Sanitize plain text input
 * Removes HTML tags and escapes special characters
 * Safe for displaying user input as plain text
 *
 * @param text - The text to sanitize
 * @returns Sanitized text
 *
 * @example
 * sanitizeText('<img src=x onerror=alert("xss")>')
 * // Returns: '&lt;img src=x onerror=alert(&quot;xss&quot;)&gt;'
 */
export function sanitizeText(text: string): string {
	// Remove any HTML tags first, then escape
	const stripped = text.replace(/<[^>]*>/g, '');
	return escapeHtml(stripped);
}

/**
 * Basic HTML sanitization to prevent XSS attacks
 * Removes dangerous tags and attributes
 * For production with user-generated content, consider DOMPurify or sanitize-html
 *
 * @param html - The HTML to sanitize
 * @returns Partially sanitized HTML
 *
 * @example
 * sanitizeHtml('<p>Hello</p><script>alert("xss")</script>')
 * // Returns: '<p>Hello</p>'
 */
export function sanitizeHtml(html: string): string {
	// Remove script tags completely
	let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

	// Remove event handlers
	sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');

	// Remove javascript: and data: URLs
	sanitized = sanitized.replace(/javascript:/gi, '');
	sanitized = sanitized.replace(/data:text\/html/gi, '');

	// Remove iframe tags
	sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

	return sanitized;
}

/**
 * Validate and sanitize email address
 * Removes suspicious characters while preserving valid email format
 *
 * @param email - The email to sanitize
 * @returns Sanitized email
 */
export function sanitizeEmail(email: string): string {
	// Remove any HTML tags and trim
	const cleaned = email.replace(/<[^>]*>/g, '').trim().toLowerCase();

	// Basic email validation pattern (RFC 5322 simplified)
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!emailRegex.test(cleaned)) {
		return '';
	}

	return cleaned;
}

/**
 * Sanitize URL to prevent javascript: and data: URLs
 * @param url - The URL to sanitize
 * @returns Sanitized URL or empty string if dangerous
 */
export function sanitizeUrl(url: string): string {
	const trimmed = url.trim().toLowerCase();

	// Block dangerous protocols
	if (
		trimmed.startsWith('javascript:') ||
		trimmed.startsWith('data:') ||
		trimmed.startsWith('vbscript:')
	) {
		return '';
	}

	return url.trim();
}
