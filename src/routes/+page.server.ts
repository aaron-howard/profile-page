import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	try {
		const [bio, featuredOnly, latestPosts] = await Promise.all([
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

		/** Featured rows first; if fewer than 4, pad with newest non-featured so the grid fills and recent work still appears. */
		let showcaseProjects = featuredOnly;
		if (featuredOnly.length > 0 && featuredOnly.length < 4) {
			const excludeIds = featuredOnly.map((p: { id: number }) => p.id);
			const filler = await db.project.findMany({
				where: { id: { notIn: excludeIds } },
				orderBy: { id: 'desc' },
				take: 4 - featuredOnly.length
			});
			showcaseProjects = [...featuredOnly, ...filler];
		} else if (featuredOnly.length === 0) {
			showcaseProjects = await db.project.findMany({ orderBy: { id: 'desc' }, take: 4 });
		}

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
