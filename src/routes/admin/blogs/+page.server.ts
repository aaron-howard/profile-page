import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { redirect, fail } from '@sveltejs/kit';
import { sanitizeText, sanitizeHtml } from '$lib/server/sanitize';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.session || locals.user?.id !== 'admin') {
    throw redirect(302, '/login');
  }
  const posts = await db.blogPost.findMany({ orderBy: { date: 'desc' } });
  return { posts };
};

export const actions: Actions = {
  create: async ({ request, locals }) => {
    // Authentication check
    if (!locals.session || locals.user?.id !== 'admin') {
      return fail(403, { error: 'Unauthorized' });
    }

    try {
      const data = await request.formData();
      const title = sanitizeText(String(data.get('title') ?? '').trim());
      const content = sanitizeHtml(String(data.get('content') ?? '').trim());
      
      if (!title || !content) {
        return fail(400, { error: 'Title and content are required' });
      }
      
      // Input length validation
      if (title.length > 200) {
        return fail(400, { error: 'Title must be 200 characters or less' });
      }
      if (content.length > 50000) {
        return fail(400, { error: 'Content must be 50,000 characters or less' });
      }

      const excerpt = sanitizeText(String(data.get('excerpt') ?? '').trim()) || null;
      if (excerpt && excerpt.length > 500) {
        return fail(400, { error: 'Excerpt must be 500 characters or less' });
      }

      const author = sanitizeText(String(data.get('author') ?? 'Admin').trim());
      if (author.length > 100) {
        return fail(400, { error: 'Author name must be 100 characters or less' });
      }

      const category = sanitizeText(String(data.get('category') ?? 'General').trim());
      const readTime = sanitizeText(String(data.get('readTime') ?? '').trim()) || null;
      const featured = data.get('featured') === 'on';
      const tagsRaw = String(data.get('tags') ?? '').trim();
      const tags = tagsRaw 
        ? tagsRaw.split(',').map((t) => sanitizeText(t.trim())).filter(Boolean).slice(0, 20) 
        : [];
      
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
    } catch (error) {
      console.error('Error creating blog post:', error);
      return fail(500, { error: 'Failed to create blog post' });
    }
  },
  delete: async ({ request, locals }) => {
    // Authentication check
    if (!locals.session || locals.user?.id !== 'admin') {
      return fail(403, { error: 'Unauthorized' });
    }

    try {
      const data = await request.formData();
      const idRaw = data.get('id');
      const id = idRaw ? Number(idRaw) : NaN;
      
      if (!id || !Number.isInteger(id) || id <= 0) {
        return fail(400, { error: 'Invalid id' });
      }

      // Check if post exists
      const post = await db.blogPost.findUnique({ where: { id } });
      if (!post) {
        return fail(404, { error: 'Post not found' });
      }

      await db.blogPost.delete({ where: { id } });
      throw redirect(303, '/admin/blogs');
    } catch (error) {
      console.error('Error deleting blog post:', error);
      return fail(500, { error: 'Failed to delete blog post' });
    }
  }
};


