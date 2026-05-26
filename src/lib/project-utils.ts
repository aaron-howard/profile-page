import { sanitizeUrl } from '$lib/url';

export const projectCategoryColors: Record<string, string> = {
	frontend: '#00694b',
	backend: '#3d5c52',
	fullstack: '#0a8060'
};

export function getProjectCategoryColor(category: string): string {
	return projectCategoryColors[category] ?? '#655d58';
}

export function getProjectCategoryIconKey(category: string): string {
	const icons: Record<string, string> = {
		frontend: 'window',
		backend: 'database',
		fullstack: 'layers'
	};
	return icons[category] ?? 'cube';
}

/** Returns a safe external URL or empty string when invalid / missing */
export function safeProjectUrl(url: string | null | undefined): string {
	if (!url) return '';
	return sanitizeUrl(url);
}
