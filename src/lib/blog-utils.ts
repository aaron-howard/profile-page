export const blogCategoryColors: Record<string, string> = {
	Development: '#00694b',
	Technology: '#3d5c52',
	Backend: '#0a8060',
	CSS: '#655d58',
	DevOps: '#3d5c52'
};

export function getBlogCategoryColor(category: string): string {
	return blogCategoryColors[category] ?? '#655d58';
}

export function getBlogCategoryIconKey(category: string): string {
	const icons: Record<string, string> = {
		Development: 'code',
		Technology: 'chip',
		Backend: 'database',
		CSS: 'palette',
		DevOps: 'deploy'
	};
	return icons[category] ?? 'document';
}

export function formatBlogDate(date: string | Date): string {
	try {
		const dateObj = typeof date === 'string' ? new Date(date) : date;
		if (Number.isNaN(dateObj.getTime())) return 'Invalid date';
		return dateObj.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	} catch {
		return 'Invalid date';
	}
}

export function getAuthorInitials(author: string | null | undefined): string {
	if (!author || typeof author !== 'string') return '?';
	const parts = author.trim().split(' ').filter(Boolean);
	if (parts.length === 0) return '?';
	return parts
		.map((part) => part[0]?.toUpperCase() || '')
		.join('')
		.slice(0, 2);
}
