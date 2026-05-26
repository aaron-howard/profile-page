import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { setPublicCacheHeaders } from '$lib/server/cache-headers';

export const load: PageServerLoad = async (event) => {
	setPublicCacheHeaders(event);
	try {
		const projects = await db.project.findMany({ orderBy: { id: 'desc' } });
		return { projects };
	} catch (e) {
		console.error('[projects/+page.server] load failed:', e);
		return { projects: [], dbError: true };
	}
};
