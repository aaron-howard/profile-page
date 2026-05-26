/**
 * Client-safe URL validation (no server-only imports).
 */

export function sanitizeUrl(url: string): string {
	const trimmed = url.trim().toLowerCase();

	if (
		trimmed.startsWith('javascript:') ||
		trimmed.startsWith('data:') ||
		trimmed.startsWith('vbscript:')
	) {
		return '';
	}

	return url.trim();
}
