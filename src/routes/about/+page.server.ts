import { dev } from '$app/environment';
import type { PageServerLoad } from './$types';
import { devFallbackBio } from '$lib/dev-fallback-bio';
import { db } from '$lib/server/db';
import { error, isHttpError } from '@sveltejs/kit';
import { setPublicCacheHeaders } from '$lib/server/cache-headers';

export const load: PageServerLoad = async (event) => {
	setPublicCacheHeaders(event);

	try {
		const bio = await db.bio.findUnique({
			where: { id: 1 }
		});

		if (!bio) {
			throw error(404, 'Profile data not found');
		}

		return { bio };
	} catch (e) {
		if (isHttpError(e)) throw e;
		console.error('[about/+page.server] load failed:', e);
		if (dev) {
			return { bio: devFallbackBio, devBioFallback: true as const };
		}
		return { bio: null, dbError: true as const };
	}
};
