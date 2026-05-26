import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { setPublicCacheHeaders } from '$lib/server/cache-headers';
import { sanitizeHtml } from '$lib/server/sanitize-utils';

export const load: PageServerLoad = async (event) => {
	const id = Number(event.params.id);
	if (!Number.isInteger(id) || id < 1) {
		error(404, 'Post not found');
	}

	setPublicCacheHeaders(event);

	try {
		const post = await db.blogPost.findUnique({ where: { id } });
		if (!post) {
			error(404, 'Post not found');
		}
		return { post, safeContent: sanitizeHtml(post.content) };
	} catch (err) {
		console.error('Blog post load failed:', err);
		error(500, 'Failed to load post');
	}
};
