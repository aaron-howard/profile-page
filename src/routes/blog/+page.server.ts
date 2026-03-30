import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	try {
		const posts = await db.blogPost.findMany({ orderBy: { date: 'desc' } });
		return { posts };
	} catch (e) {
		console.error('[blog/+page.server] load failed:', e);
		return { posts: [], dbError: true };
	}
};
