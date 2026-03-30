import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	try {
		const [bio, featuredProjects, latestPosts] = await Promise.all([
			db.bio.findUnique({ where: { id: 1 } }),
			db.project.findMany({
				where: { featured: true },
				orderBy: { id: 'desc' },
				take: 4
			}),
			db.blogPost.findMany({
				orderBy: { date: 'desc' },
				take: 3
			})
		]);

		const showcaseProjects =
			featuredProjects.length > 0
				? featuredProjects
				: await db.project.findMany({ orderBy: { id: 'desc' }, take: 4 });

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
