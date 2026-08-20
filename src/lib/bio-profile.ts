import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export interface ExperienceItem {
	title: string;
	company: string;
	period: string;
	description: string;
}

export interface SkillCategories {
	readonly [category: string]: readonly string[];
}

export interface BioProfile {
	name: string;
	title: string;
	location: string;
	about: string;
	skillCategories: SkillCategories;
	experience: ExperienceItem[];
}

const skillCategoriesSchema = z.record(z.string(), z.array(z.string()));

const experienceItemSchema = z.object({
	title: z.string(),
	company: z.string(),
	period: z.string(),
	description: z.string()
});

const experienceSchema = z.array(experienceItemSchema);

export function parseSkillCategories(raw: Prisma.JsonValue | null | undefined): SkillCategories {
	const parsed = skillCategoriesSchema.safeParse(raw);
	return parsed.success ? parsed.data : {};
}

export function parseExperience(raw: Prisma.JsonValue | null | undefined): ExperienceItem[] {
	const parsed = experienceSchema.safeParse(raw);
	return parsed.success ? parsed.data : [];
}

export function toBioProfile(bio: {
	name: string;
	title: string;
	location: string;
	about: string;
	skillCategories: Prisma.JsonValue;
	experience: Prisma.JsonValue | null;
}): BioProfile {
	return {
		name: bio.name,
		title: bio.title,
		location: bio.location,
		about: bio.about,
		skillCategories: parseSkillCategories(bio.skillCategories),
		experience: parseExperience(bio.experience)
	};
}
