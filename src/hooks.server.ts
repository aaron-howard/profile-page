import type { Handle, HandleServerError } from '@sveltejs/kit';

const handleSecurityHeaders: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Add security headers
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
