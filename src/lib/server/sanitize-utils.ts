/**
 * Sanitization utilities for preventing XSS and injection attacks
 */

import sanitizeHtmlLib from 'sanitize-html';
import type { IOptions } from 'sanitize-html';

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

const STRIP_ALL_TAGS_OPTIONS: IOptions = {
	allowedTags: [],
	allowedAttributes: {}
};

function decodeHtmlEntities(text: string): string {
	return text
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'");
}

const SAFE_HTML_OPTIONS: IOptions = {
	allowedTags: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'br', 'span', 'div', 'img'],
	allowedAttributes: {
		a: ['href', 'name', 'target'],
		img: ['src', 'alt', 'width', 'height']
	},
	allowedSchemes: ['http', 'https', 'mailto'],
	allowedSchemesByTag: {
		img: ['http', 'https']
	},
	disallowedTagsMode: 'discard'
};

/**
 * Escape HTML special characters
 * Converts HTML metacharacters to their entity equivalents
 * Safe for use in HTML attributes and text content
 */
export function escapeHtml(text: string): string {
	return text.replace(/[&<>"']/g, (char) => HTML_ESCAPE_MAP[char]);
}

/**
 * Remove all HTML tags from plain text input.
 */
export function stripHtmlTags(text: string): string {
	return decodeHtmlEntities(sanitizeHtmlLib(text, STRIP_ALL_TAGS_OPTIONS));
}

/**
 * Sanitize plain text input
 * Removes HTML tags and escapes special characters
 * Safe for displaying user input as plain text
 */
export function sanitizeText(text: string): string {
	return escapeHtml(stripHtmlTags(text));
}

/**
 * Basic HTML sanitization to prevent XSS attacks
 * Uses sanitize-html to remove dangerous tags, attributes, and URL schemes
 */
export function sanitizeHtml(html: string): string {
	return sanitizeHtmlLib(html, SAFE_HTML_OPTIONS);
}

/**
 * Validate and sanitize email address
 * Removes suspicious characters while preserving valid email format
 */
export function sanitizeEmail(email: string): string {
	const cleaned = stripHtmlTags(email).trim().toLowerCase();
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!emailRegex.test(cleaned)) {
		return '';
	}

	return cleaned;
}

export { sanitizeUrl } from '$lib/url';
