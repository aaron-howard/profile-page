/**
 * Client-safe URL validation (no server-only imports).
 */

const DANGEROUS_PROTOCOLS = new Set(['javascript:', 'data:', 'vbscript:']);

function protocolForUrl(url: string): string | null {
	try {
		return new URL(url, 'https://example.invalid').protocol.toLowerCase();
	} catch {
		return null;
	}
}

/**
 * Reject javascript:, data:, and vbscript: URLs using URL parsing
 * instead of partial string replacement.
 */
export function sanitizeUrl(url: string): string {
	const trimmed = url.trim();
	if (!trimmed) {
		return '';
	}

	const protocol = protocolForUrl(trimmed);
	if (protocol && DANGEROUS_PROTOCOLS.has(protocol)) {
		return '';
	}

	return trimmed;
}
