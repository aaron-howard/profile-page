import type { BioProfile } from '$lib/bio-profile';

/**
 * Minimal profile used only when `dev` is true and the database cannot be reached,
 * so `/about` still renders for local work without Postgres.
 */
export const devFallbackBio: BioProfile = {
	name: 'Aaron Howard',
	title: 'Full Stack Developer',
	location: 'Local development',
	about:
		'This placeholder profile is shown because the app could not connect to PostgreSQL. ' +
		'Create a `.env` with `DATABASE_URL`, start Postgres, then run `npm run db:push` and `npm run db:seed:bio` to load real content.',
	skillCategories: {
		'Languages & runtimes': ['TypeScript', 'JavaScript'],
		'Frontend & UI': ['Svelte', 'SvelteKit', 'Tailwind CSS']
	},
	experience: [
		{
			title: 'Connect your database',
			company: 'Development',
			period: '—',
			description:
				'Replace this block by seeding the bio table. Run `npm run db:seed:bio` after `DATABASE_URL` is configured.'
		}
	]
};
