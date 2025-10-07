import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
  if (!locals.session || locals.user?.id !== 'admin') throw redirect(302, '/login');
  return {};
};


