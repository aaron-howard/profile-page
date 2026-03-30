import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { error, isHttpError } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
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
		throw error(503, 'Could not load profile. Please try again later.');
	}
};
