/**
 * Type definitions for the application
 */

export interface BlogPost {
	id: number;
	title: string;
	excerpt?: string | null;
	content: string;
	author: string;
	date: Date | string;
	category: string;
	readTime?: string | null;
	featured: boolean;
	tags: string[];
}

export interface Project {
	id: number;
	title: string;
	description: string;
	image?: string | null;
	technologies: string[];
	category: string;
	github?: string | null;
	live?: string | null;
	featured: boolean;
}

