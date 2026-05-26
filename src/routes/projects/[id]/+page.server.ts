import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { setPublicCacheHeaders } from '$lib/server/cache-headers';

export const load: PageServerLoad = async (event) => {
	const id = Number(event.params.id);
	if (!Number.isInteger(id) || id < 1) {
		error(404, 'Project not found');
	}

	try {
		const project = await db.project.findUnique({ where: { id } });
		if (!project) {
			error(404, 'Project not found');
		}
		setPublicCacheHeaders(event);
		return { project };
	} catch (err) {
		event.setHeaders({ 'Cache-Control': 'no-store' });
		console.error('Project load failed:', err);
		error(500, 'Failed to load project');
	}
};
