import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  const projects = await db.project.findMany({ orderBy: { id: 'desc' } });
  return { projects };
};

export const actions: Actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const title = String(data.get('title') ?? '').trim();
    const description = String(data.get('description') ?? '').trim();
    if (!title || !description) return fail(400, { error: 'Title and description are required' });
    const image = String(data.get('image') ?? '').trim() || null;
    const category = String(data.get('category') ?? 'frontend');
    const github = String(data.get('github') ?? '').trim() || null;
    const live = String(data.get('live') ?? '').trim() || null;
    const featured = data.get('featured') === 'on';
    const techRaw = String(data.get('technologies') ?? '').trim();
    const technologies = techRaw ? techRaw.split(',').map((t) => t.trim()).filter(Boolean) : [];
    await db.project.create({
      data: { title, description, image, category, github, live, featured, technologies }
    });
    throw redirect(303, '/admin/projects');
  },
  delete: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));
    if (!id) return fail(400, { error: 'Invalid id' });
    await db.project.delete({ where: { id } });
    throw redirect(303, '/admin/projects');
  }
};


