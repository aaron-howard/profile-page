import type { Handle, HandleServerError } from '@sveltejs/kit';
import { checkRateLimit } from '$lib/server/rate-limit';

function applySecurityHeaders(response: Response): Response {
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
	return response;
}

const handleSecurityHeaders: Handle = async ({ event, resolve }) => {
	if (event.request.method === 'POST' && event.url.pathname === '/contact') {
		const clientAddress = event.getClientAddress();
		const limit = checkRateLimit(`contact:${clientAddress}`);
		if (!limit.allowed) {
			return applySecurityHeaders(
				new Response('Too many requests. Please try again later.', {
					status: 429,
					headers: { 'Retry-After': String(limit.retryAfterSeconds) }
				})
			);
		}
	}

	const response = await resolve(event);
	return applySecurityHeaders(response);
};

export const handle: Handle = handleSecurityHeaders;

/** Logs unexpected errors (e.g. Prisma/DB). Check Vercel function logs when debugging 500s. */
export const handleError: HandleServerError = ({ error, event }) => {
	const err = error instanceof Error ? error : new Error(String(error));
	console.error(`[handleError] ${event.url.pathname}`, err);
	return { message: 'Internal server error' };
};
