import type { RequestHandler } from './$types';
import { deleteSessionTokenCookie, validateSessionToken, invalidateSession } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
  const token = event.cookies.get('auth-session');
  if (token) {
    const { session } = await validateSessionToken(token);
    if (session) await invalidateSession(session.id);
  }
  deleteSessionTokenCookie(event);
  throw redirect(302, '/');
};


