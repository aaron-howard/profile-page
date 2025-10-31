import type { Actions, PageServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { checkRateLimit, getClientIdentifier } from '$lib/server/rate-limit';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.session) throw redirect(302, '/');
  return {};
};

export const actions: Actions = {
  default: async (event) => {
    const clientId = getClientIdentifier(event);
    const rateLimit = await checkRateLimit(clientId);

    if (!rateLimit.allowed) {
      const resetMinutes = Math.ceil((rateLimit.resetTime - Date.now()) / 60000);
      return fail(429, { 
        error: `Too many login attempts. Please try again in ${resetMinutes} minute(s).` 
      });
    }

    const { request } = event;
    const formData = await request.formData();
    const tokenRaw = String(formData.get('token') ?? '');
    const adminTokenRaw = env.ADMIN_TOKEN ?? '';

    const normalize = (s: string) => s.trim().replace(/^"([\s\S]*)"$/, '$1').replace(/^'([\s\S]*)'$/, '$1');
    const token = normalize(tokenRaw);
    const adminToken = normalize(adminTokenRaw);

    if (!adminToken) {
      return fail(500, { error: 'Admin login not configured' });
    }
    
    if (token !== adminToken) {
      // Don't reveal which part failed for security
      return fail(400, { error: 'Invalid credentials' });
    }

    // Reset rate limit on successful login
    // (This is handled automatically since we create a new entry on success)

    // Ensure an admin user exists (id = 'admin')
    const adminUserId = 'admin';
    try {
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
    } catch (error) {
      console.error('Error during login:', error);
      return fail(500, { error: 'Failed to create session. Please try again.' });
    }
  }
};


