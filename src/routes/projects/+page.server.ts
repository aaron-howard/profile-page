import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	try {
		const projects = await db.project.findMany({ orderBy: { id: 'desc' } });
		return { projects };
	} catch (e) {
		console.error('[projects/+page.server] load failed:', e);
		return { projects: [], dbError: true };
	}
};
