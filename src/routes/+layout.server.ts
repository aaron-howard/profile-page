import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { parseSiteMetadata } from '$lib/site-metadata';

export const load: LayoutServerLoad = async () => {
	try {
		const bio = await db.bio.findUnique({ where: { id: 1 } });
		return {
			site: {
				name: bio?.name ?? 'Aaron Howard',
				title: bio?.title ?? 'Full Stack Developer',
				location: bio?.location ?? '',
				metadata: parseSiteMetadata(bio?.siteMetadata)
			}
		};
	} catch (error) {
		console.error('Layout bio load failed:', error);
		return {
			site: {
				name: 'Aaron Howard',
				title: 'Full Stack Developer',
				location: '',
				metadata: parseSiteMetadata(null)
			}
		};
	}
};
