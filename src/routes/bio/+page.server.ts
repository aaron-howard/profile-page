import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

/** Legacy URL: `/bio` → `/about` */
export const load: PageServerLoad = () => {
	redirect(308, '/about');
};
