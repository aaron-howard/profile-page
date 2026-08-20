import { describe, it, expect } from 'vitest';
import { parseExperience, parseSkillCategories, toBioProfile } from '$lib/bio-profile';

describe('bio-profile', () => {
	it('parses skill category maps and rejects invalid JSON', () => {
		expect(parseSkillCategories({ Languages: ['TypeScript'] })).toEqual({
			Languages: ['TypeScript']
		});
		expect(parseSkillCategories('nope')).toEqual({});
		expect(parseSkillCategories(null)).toEqual({});
	});

	it('parses experience arrays and rejects invalid JSON', () => {
		const job = {
			title: 'Admin',
			company: 'City',
			period: '2020',
			description: 'Platform work'
		};
		expect(parseExperience([job])).toEqual([job]);
		expect(parseExperience({ title: 'nope' })).toEqual([]);
		expect(parseExperience(null)).toEqual([]);
	});

	it('maps a bio row into a display profile', () => {
		const profile = toBioProfile({
			name: 'Aaron Howard',
			title: 'Developer',
			location: 'Dallas',
			about: 'Bio',
			skillCategories: { Languages: ['TypeScript'] },
			experience: [
				{
					title: 'Admin',
					company: 'City',
					period: '2020',
					description: 'Platform work'
				}
			]
		});
		expect(profile.name).toBe('Aaron Howard');
		expect(profile.skillCategories.Languages).toEqual(['TypeScript']);
		expect(profile.experience).toHaveLength(1);
	});
});
