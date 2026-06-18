import { disconnectPrisma, prisma as db } from './prisma-script-client.js';

async function main() {
	const bioData = {
		id: 1,
		name: 'Aaron Howard',
		title: 'Full Stack Developer',
		location: 'Fort Worth, TX, USA',
		about:
			"I'm a passionate full-stack developer with a love for creating elegant, user-friendly applications. With several years of experience in web development, I specialize in modern JavaScript frameworks, cloud technologies, and building scalable solutions that solve real-world problems.",
		skillCategories: {
			'Languages & runtimes': [
				'JavaScript',
				'TypeScript',
				'Python',
				'C#',
				'HTML',
				'CSS',
				'SQL',
				'Bun',
				'Node.js',
				'.NET 8',
				'.NET 10',
				'ts-node',
				'Nodemon'
			],
			'Frontend & UI': [
				'React',
				'React DOM',
				'React Hook Form',
				'React Router',
				'Svelte',
				'SvelteKit',
				'Vue',
				'Vue Router',
				'Nuxt',
				'Next.js',
				'HTMX',
				'TanStack Query',
				'TanStack Router',
				'TanStack Start',
				'Superforms',
				'Radix UI',
				'Chart.js',
				'vue-chartjs',
				'Pinia',
				'ky',
				'Web Workers',
				'Potrace',
				'Zod',
				'Valibot'
			],
			'Backend & APIs': [
				'Elysia',
				'FastAPI',
				'ASP.NET Core',
				'Nitro',
				'Convex',
				'Uvicorn',
				'OpenAPI',
				'Swashbuckle',
				'Pino',
				'FluentValidation'
			],
			'Data & persistence': [
				'PostgreSQL',
				'SQLite',
				'Turso',
				'libSQL',
				'Prisma',
				'Drizzle ORM',
				'Entity Framework Core',
				'Npgsql',
				'Better-SQLite3',
				'ChromaDB'
			],
			'Styling & CSS': ['Tailwind CSS', 'PostCSS', 'Autoprefixer', 'Lightning CSS'],
			'AI, ML & documents': [
				'PyTorch',
				'Hugging Face Transformers',
				'sentence-transformers',
				'LangChain',
				'PyMuPDF',
				'PyYAML',
				'pandas',
				'Beautiful Soup',
				'lxml'
			],
			'Python tooling & automation': [
				'diagrams',
				'Graphviz',
				'Pillow',
				'PyQt6',
				'python-docx',
				'python-dotenv',
				'python-pptx',
				'requests',
				'Ruff',
				'tabulate',
				'prettytable'
			],
			'Testing, quality & observability': [
				'Vitest',
				'Playwright',
				'Testing Library',
				'jsdom',
				'ESLint',
				'Prettier',
				'Husky',
				'TypeDoc',
				'Patch Package',
				'Sentry'
			],
			'Auth, cloud & delivery': ['Clerk', 'Vercel', 'Vite', 'Git'],
			'Enterprise platforms': ['ServiceNow', 'PagerDuty']
		},
		siteMetadata: {
			email: 'mr.aaronjhoward@outlook.com',
			phone: '+1 (459) 964-2476',
			github: 'https://github.com/aaron-howard',
			linkedin: 'https://www.linkedin.com/in/aaronjhoward/',
			bluesky: 'https://bsky.app/profile/aaron-howard.bsky.social',
			availability: "I'm currently available for freelance work opportunities.",
			responseTime: 'I typically respond within 24 hours.'
		},
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
		try {
			await disconnectPrisma();
		} catch (error) {
			console.error('Error disconnecting Prisma:', error);
		}
	}
}

main();
