/**
 * Re-export sanitization and rate limiting utilities for backwards compatibility
 * These have been split into separate modules for better organization
 */

// Sanitization exports
export { escapeHtml, sanitizeText, sanitizeHtml, sanitizeEmail, sanitizeUrl } from './sanitize-utils';

// Rate limiting exports
export { checkRateLimit, getClientIdentifier, resetRateLimit, clearAllRateLimits } from './rate-limit-utils';
export type { RateLimitResult } from './rate-limit-utils';
