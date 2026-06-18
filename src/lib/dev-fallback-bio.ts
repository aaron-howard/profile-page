import type { Bio, Prisma } from '@prisma/client';

/**
 * Minimal Bio row used only when `dev` is true and the database cannot be reached,
 * so `/about` still renders for local work without Postgres.
 */
export const devFallbackBio: Bio = {
	id: 1,
	name: 'Aaron Howard',
	title: 'Full Stack Developer',
	location: 'Local development',
	about:
		'This placeholder profile is shown because the app could not connect to PostgreSQL. ' +
		'Create a `.env` with `DATABASE_URL`, start Postgres, then run `npm run db:push` and `npm run db:seed:bio` to load real content.',
	skillCategories: {
		'Languages & runtimes': ['TypeScript', 'JavaScript'],
		'Frontend & UI': ['Svelte', 'SvelteKit', 'Tailwind CSS']
	} satisfies Prisma.JsonObject as unknown as Prisma.JsonValue,
	experience: [
		{
			title: 'Connect your database',
			company: 'Development',
			period: '—',
			description:
				'Replace this block by seeding the bio table. Run `npm run db:seed:bio` after `DATABASE_URL` is configured.'
		}
	] as unknown as Prisma.JsonValue,
	siteMetadata: {} as unknown as Prisma.JsonValue,
	updatedAt: new Date(0)
};
