import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async () => {
	const projects = await db.project.findMany({ orderBy: { id: 'desc' } });
	return { projects };
};
