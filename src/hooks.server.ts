import type { Handle, HandleServerError } from '@sveltejs/kit';
import { startInstrumentation } from '$lib/observability/instrumentation';
import { tracer } from '$lib/observability/tracer';
import { checkRateLimit } from '$lib/server/rate-limit';

startInstrumentation();

function applySecurityHeaders(response: Response): Response {
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
	return response;
}

export const handle: Handle = async ({ event, resolve }) => {
	return tracer.startActiveSpan(`route ${event.route.id}`, async (span) => {
		span.setAttribute('route.id', event.route.id ?? 'unknown');
		span.setAttribute('http.method', event.request.method);
		span.setAttribute('http.target', event.url.pathname);

		try {
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
		} finally {
			span.end();
		}
	});
};

/** Logs unexpected errors (e.g. Prisma/DB). Check Vercel function logs when debugging 500s. */
export const handleError: HandleServerError = ({ error, event }) => {
	const err = error instanceof Error ? error : new Error(String(error));
	console.error(`[handleError] ${event.url.pathname}`, err);
	return { message: 'Internal server error' };
};
