import { dev } from '$app/environment';
import type { PageServerLoad } from './$types';
import { devFallbackBio } from '$lib/dev-fallback-bio';
import { db } from '$lib/server/db';
import { setPublicCacheHeaders } from '$lib/server/cache-headers';

export const load: PageServerLoad = async (event) => {
	try {
		const bio = await db.bio.findUnique({
			where: { id: 1 }
		});

		if (!bio) {
			return { bio: null, dbError: true as const };
		}

		setPublicCacheHeaders(event);
		return { bio };
	} catch (e) {
		console.error('[about/+page.server] load failed:', e);
		if (dev && process.env.CI !== 'true') {
			return { bio: devFallbackBio, devBioFallback: true as const };
		}
		return { bio: null, dbError: true as const };
	}
};
