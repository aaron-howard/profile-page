import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { setPublicCacheHeaders } from '$lib/server/cache-headers';

export const load: PageServerLoad = async (event) => {
	try {
		const projects = await db.project.findMany({ orderBy: { id: 'desc' } });
		setPublicCacheHeaders(event);
		return { projects };
	} catch (e) {
		event.setHeaders({ 'Cache-Control': 'no-store' });
		console.error('[projects/+page.server] load failed:', e);
		return { projects: [], dbError: true };
	}
};
