import { base } from '$app/paths';

/**
 * Normalize project image paths for `<img src>`.
 * Files in `static/projects/` are served at `/projects/...`, not `/static/projects/...`.
 */
export function projectImageSrc(path: string | null | undefined): string | null {
	if (path == null) return null;
	const trimmed = String(path).trim();
	if (trimmed === '') return null;

	if (/^https?:\/\//i.test(trimmed)) return trimmed;

	let p = trimmed.replace(/\\/g, '/');
	if (p.startsWith('static/')) p = p.slice('static/'.length);
	if (!p.startsWith('/')) p = `/${p}`;

	const segments = p
		.split('/')
		.filter(Boolean)
		.map((seg) => encodeURIComponent(seg));
	const encoded = `/${segments.join('/')}`;

	return `${base}${encoded}`;
}
