import type { RequestEvent } from '@sveltejs/kit';

/** Short public cache for read-only portfolio pages */
export function setPublicCacheHeaders(event: RequestEvent, maxAgeSeconds = 60): void {
	event.setHeaders({
		'Cache-Control': `public, max-age=${maxAgeSeconds}, stale-while-revalidate=300`
	});
}
