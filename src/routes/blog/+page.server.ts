import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { setPublicCacheHeaders } from '$lib/server/cache-headers';

export const load: PageServerLoad = async (event) => {
	try {
		const posts = await db.blogPost.findMany({ orderBy: { date: 'desc' } });
		setPublicCacheHeaders(event);
		return { posts };
	} catch (e) {
		event.setHeaders({ 'Cache-Control': 'no-store' });
		console.error('[blog/+page.server] load failed:', e);
		return { posts: [], dbError: true };
	}
};
