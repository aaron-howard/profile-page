import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { setPublicCacheHeaders } from '$lib/server/cache-headers';

export const load: PageServerLoad = async (event) => {
	const id = Number(event.params.id);
	if (!Number.isInteger(id) || id < 1) {
		error(404, 'Post not found');
	}

	try {
		const post = await db.blogPost.findUnique({ where: { id } });
		if (!post) {
			error(404, 'Post not found');
		}
		setPublicCacheHeaders(event);
		return { post };
	} catch (err) {
		event.setHeaders({ 'Cache-Control': 'no-store' });
		console.error('Blog post load failed:', err);
		error(500, 'Failed to load post');
	}
};
