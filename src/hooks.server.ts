import type { Handle, HandleServerError } from '@sveltejs/kit';
import { checkRateLimit, getClientIp } from '$lib/server/rate-limit';

const handleSecurityHeaders: Handle = async ({ event, resolve }) => {
	if (event.request.method === 'POST' && event.url.pathname === '/contact') {
		const ip = getClientIp(event.request);
		const limit = checkRateLimit(`contact:${ip}`);
		if (!limit.allowed) {
			return new Response('Too many requests. Please try again later.', {
				status: 429,
				headers: { 'Retry-After': String(limit.retryAfterSeconds) }
			});
		}
	}

	const response = await resolve(event);

	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-XSS-Protection', '1; mode=block');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

	return response;
};

export const handle: Handle = handleSecurityHeaders;

/** Logs unexpected errors (e.g. Prisma/DB). Check Vercel function logs when debugging 500s. */
export const handleError: HandleServerError = ({ error, event }) => {
	const err = error instanceof Error ? error : new Error(String(error));
	console.error(`[handleError] ${event.url.pathname}`, err);
	return { message: 'Internal server error' };
};
