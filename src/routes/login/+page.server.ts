import type { Actions, PageServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/auth';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.session) throw redirect(302, '/');
  return {};
};

export const actions: Actions = {
  default: async (event) => {
    const { request } = event;
    const formData = await request.formData();
    const token = String(formData.get('token') ?? '');
    const adminToken = env.ADMIN_TOKEN ?? '';

    if (!adminToken) {
      return fail(500, { error: 'Admin login not configured' });
    }
    if (token !== adminToken) {
      return fail(400, { error: 'Invalid token' });
    }

    // Ensure an admin user exists (id = 'admin')
    const adminUserId = 'admin';
    await db.user.upsert({
      where: { id: adminUserId },
      update: {},
      create: { id: adminUserId }
    });

    // Create session for the admin
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, adminUserId);
    setSessionTokenCookie(event, sessionToken, session.expiresAt);

    throw redirect(302, '/');
  }
};


