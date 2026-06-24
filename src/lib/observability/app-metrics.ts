import { meter } from './metrics';

const httpRequests = meter.createCounter('app.http.requests', {
	description: 'HTTP requests handled by SvelteKit hooks'
});

const httpErrors = meter.createCounter('app.http.errors', {
	description: 'HTTP 5xx responses and unhandled route errors'
});

const rateLimitHits = meter.createCounter('app.rate_limit.exceeded', {
	description: 'Contact form rate-limit rejections (429)'
});

const contactSubmissions = meter.createCounter('app.contact.submissions', {
	description: 'Contact form submission attempts'
});

export function recordHttpRequest(method: string, routeId: string, status: number): void {
	httpRequests.add(1, {
		'http.method': method,
		'route.id': routeId,
		'http.status_code': String(status)
	});

	if (status >= 500) {
		httpErrors.add(1, { 'route.id': routeId });
	}
}

export function recordRateLimitExceeded(routeId: string): void {
	rateLimitHits.add(1, { 'route.id': routeId });
}

export function recordContactSubmission(
	outcome: 'success' | 'validation_error' | 'delivery_error'
): void {
	contactSubmissions.add(1, { outcome });
}

export function recordUnhandledError(routeId: string): void {
	httpErrors.add(1, { 'route.id': routeId, source: 'handleError' });
}
