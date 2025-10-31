import type { RequestHandler } from './$types';
import { deleteSessionTokenCookie, validateSessionToken, invalidateSession, sessionCookieName } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
  const token = event.cookies.get(sessionCookieName);
  if (token) {
    try {
      const { session } = await validateSessionToken(token);
      if (session) await invalidateSession(session.id);
    } catch (error) {
      console.error('Error invalidating session:', error);
    }
  }
  deleteSessionTokenCookie(event);
  throw redirect(302, '/');
};


