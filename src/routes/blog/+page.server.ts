import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const posts = await db.blogPost.findMany({ orderBy: { date: 'desc' } });
	return { posts };
};
