import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  const posts = await db.blogPost.findMany({ orderBy: { date: 'desc' } });
  return { posts };
};

export const actions: Actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const title = String(data.get('title') ?? '').trim();
    const content = String(data.get('content') ?? '').trim();
    if (!title || !content) return fail(400, { error: 'Title and content are required' });
    const excerpt = String(data.get('excerpt') ?? '').trim() || null;
    const author = String(data.get('author') ?? 'Admin');
    const category = String(data.get('category') ?? 'General');
    const readTime = String(data.get('readTime') ?? '') || null;
    const featured = data.get('featured') === 'on';
    const tagsRaw = String(data.get('tags') ?? '').trim();
    const tags = tagsRaw ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean) : [];
    await db.blogPost.create({
      data: {
        title,
        content,
        excerpt,
        author,
        category,
        readTime,
        featured,
        tags,
        date: new Date()
      }
    });
    throw redirect(303, '/admin/blogs');
  },
  delete: async ({ request }) => {
    const data = await request.formData();
    const id = Number(data.get('id'));
    if (!id) return fail(400, { error: 'Invalid id' });
    await db.blogPost.delete({ where: { id } });
    throw redirect(303, '/admin/blogs');
  }
};


