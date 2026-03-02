import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const bio = await db.bio.findUnique({
		where: { id: 1 }
	});

	if (!bio) {
		throw error(404, 'Bio data not found');
	}

	return { bio };
};
