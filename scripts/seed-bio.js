import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
	const bioData = {
		id: 1,
		name: 'Aaron Howard',
		title: 'Full Stack Developer',
		location: 'Irving, USA',
		about:
			"I'm a passionate full-stack developer with a love for creating elegant, user-friendly applications. With several years of experience in web development, I specialize in modern JavaScript frameworks, cloud technologies, and building scalable solutions that solve real-world problems.",
		skillsFrontend: ['React', 'Vue.js', 'Svelte', 'TypeScript', 'Tailwind CSS', 'Next.js'],
		skillsBackend: [
			'Node.js',
			'Python',
			'PostgreSQL',
			'MongoDB',
			'Express.js',
			'FastAPI'
		],
		skillsTools: ['Git', 'Docker', 'Netlify', 'Vercel', 'Figma', 'Postman'],
		skillsLanguages: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML/CSS'],
		experience: [
			{
				title: 'Senior Full Stack Developer',
				company: 'City of Dallas',
				period: '2022 - Present',
				description:
					'Leading development of web applications using React, Node.js, and cloud technologies. Certified Advanced Scrum Master for our ServiceNow Platform.'
			},
			{
				title: 'Frontend Developer',
				company: 'City of Dallas',
				period: '2020 - 2022',
				description:
					'Built responsive user interfaces and improved user experience across multiple products.'
			},
			{
				title: 'Junior Developer',
				company: 'City of Dallas',
				period: '2015 - 2020',
				description:
					'Developed websites and web applications for various clients using modern technologies.'
			}
		]
	};

	try {
		const bio = await db.bio.upsert({
			where: { id: 1 },
			update: bioData,
			create: bioData
		});
		console.log('✓ Bio data seeded successfully:', bio.name);
	} catch (error) {
		console.error('Error seeding bio:', error);
		process.exit(1);
	} finally {
		await db.$disconnect();
	}
}

main();
