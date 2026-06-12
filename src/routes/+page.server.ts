import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	try {
		const [bio, showcaseProjects, latestPosts] = await Promise.all([
			db.bio.findUnique({ where: { id: 1 } }),
			db.project.findMany({
				orderBy: [{ featured: 'desc' }, { id: 'desc' }],
				take: 4
			}),
			db.blogPost.findMany({
				orderBy: { date: 'desc' },
				take: 3
			})
		]);

		return {
			bio,
			featuredProjects: showcaseProjects,
			latestPosts
		};
	} catch (e) {
		console.error('[+page.server] load failed:', e);
		return {
			bio: null,
			featuredProjects: [],
			latestPosts: [],
			dbError: true
		};
	}
};
