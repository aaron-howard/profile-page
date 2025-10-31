import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { redirect, fail } from '@sveltejs/kit';
import { sanitizeText } from '$lib/server/sanitize';

// URL validation helper
function isValidUrl(url: string | null): boolean {
  if (!url) return true; // null is valid (optional field)
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.session || locals.user?.id !== 'admin') {
    throw redirect(302, '/login');
  }
  const projects = await db.project.findMany({ orderBy: { id: 'desc' } });
  return { projects };
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
      const description = sanitizeText(String(data.get('description') ?? '').trim());
      
      if (!title || !description) {
        return fail(400, { error: 'Title and description are required' });
      }

      // Input length validation
      if (title.length > 200) {
        return fail(400, { error: 'Title must be 200 characters or less' });
      }
      if (description.length > 2000) {
        return fail(400, { error: 'Description must be 2,000 characters or less' });
      }

      const image = String(data.get('image') ?? '').trim() || null;
      if (image && image.length > 500) {
        return fail(400, { error: 'Image URL must be 500 characters or less' });
      }
      if (image && !isValidUrl(image)) {
        return fail(400, { error: 'Invalid image URL' });
      }

      const category = sanitizeText(String(data.get('category') ?? 'frontend').trim());
      const validCategories = ['frontend', 'backend', 'fullstack'];
      if (!validCategories.includes(category)) {
        return fail(400, { error: 'Invalid category' });
      }

      const github = String(data.get('github') ?? '').trim() || null;
      if (github && github.length > 500) {
        return fail(400, { error: 'GitHub URL must be 500 characters or less' });
      }
      if (github && !isValidUrl(github)) {
        return fail(400, { error: 'Invalid GitHub URL' });
      }

      const live = String(data.get('live') ?? '').trim() || null;
      if (live && live.length > 500) {
        return fail(400, { error: 'Live URL must be 500 characters or less' });
      }
      if (live && !isValidUrl(live)) {
        return fail(400, { error: 'Invalid live URL' });
      }

      const featured = data.get('featured') === 'on';
      const techRaw = String(data.get('technologies') ?? '').trim();
      const technologies = techRaw 
        ? techRaw.split(',').map((t) => sanitizeText(t.trim())).filter(Boolean).slice(0, 20) 
        : [];
      
      await db.project.create({
        data: { title, description, image, category, github, live, featured, technologies }
      });
      throw redirect(303, '/admin/projects');
    } catch (error) {
      console.error('Error creating project:', error);
      return fail(500, { error: 'Failed to create project' });
    }
  },
  update: async ({ request, locals }) => {
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

      // Check if project exists
      const project = await db.project.findUnique({ where: { id } });
      if (!project) {
        return fail(404, { error: 'Project not found' });
      }

      const title = sanitizeText(String(data.get('title') ?? '').trim());
      const description = sanitizeText(String(data.get('description') ?? '').trim());
      
      if (!title || !description) {
        return fail(400, { error: 'Title and description are required' });
      }

      if (title.length > 200) {
        return fail(400, { error: 'Title must be 200 characters or less' });
      }
      if (description.length > 2000) {
        return fail(400, { error: 'Description must be 2,000 characters or less' });
      }

      const image = String(data.get('image') ?? '').trim() || null;
      if (image && image.length > 500) {
        return fail(400, { error: 'Image URL must be 500 characters or less' });
      }
      if (image && !isValidUrl(image)) {
        return fail(400, { error: 'Invalid image URL' });
      }

      const category = sanitizeText(String(data.get('category') ?? 'frontend').trim());
      const validCategories = ['frontend', 'backend', 'fullstack'];
      if (!validCategories.includes(category)) {
        return fail(400, { error: 'Invalid category' });
      }

      const github = String(data.get('github') ?? '').trim() || null;
      if (github && github.length > 500) {
        return fail(400, { error: 'GitHub URL must be 500 characters or less' });
      }
      if (github && !isValidUrl(github)) {
        return fail(400, { error: 'Invalid GitHub URL' });
      }

      const live = String(data.get('live') ?? '').trim() || null;
      if (live && live.length > 500) {
        return fail(400, { error: 'Live URL must be 500 characters or less' });
      }
      if (live && !isValidUrl(live)) {
        return fail(400, { error: 'Invalid live URL' });
      }

      const featured = data.get('featured') === 'on';
      const techRaw = String(data.get('technologies') ?? '').trim();
      const technologies = techRaw 
        ? techRaw.split(',').map((t) => sanitizeText(t.trim())).filter(Boolean).slice(0, 20) 
        : [];
      
      await db.project.update({
        where: { id },
        data: { title, description, image, category, github, live, featured, technologies }
      });
      throw redirect(303, '/admin/projects');
    } catch (error) {
      console.error('Error updating project:', error);
      return fail(500, { error: 'Failed to update project' });
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

      // Check if project exists
      const project = await db.project.findUnique({ where: { id } });
      if (!project) {
        return fail(404, { error: 'Project not found' });
      }

      await db.project.delete({ where: { id } });
      throw redirect(303, '/admin/projects');
    } catch (error) {
      console.error('Error deleting project:', error);
      return fail(500, { error: 'Failed to delete project' });
    }
  }
};


