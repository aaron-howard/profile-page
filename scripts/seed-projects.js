import { createPrismaClient } from './lib/create-prisma-client.js';

const prisma = createPrismaClient();

const projects = [
	{
		title: 'E-Commerce Platform',
		description:
			'A full-stack e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, product management, shopping cart, and payment integration.',
		image: '/projects/ecommerce.jpg',
		technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
		category: 'fullstack',
		github: 'https://github.com/yourusername/ecommerce-platform',
		live: 'https://ecommerce-demo.com',
		featured: true
	},
	{
		title: 'Task Management App',
		description:
			'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
		image: '/projects/taskapp.jpg',
		technologies: ['Vue.js', 'Firebase', 'Vuex', 'Vuetify'],
		category: 'frontend',
		github: 'https://github.com/aaron-howard/task-management-app',
		live: 'https://task-management-app-32eee.web.app/',
		featured: true
	},
	{
		title: 'Weather Dashboard',
		description:
			'A weather dashboard that displays current weather and forecasts using multiple weather APIs with beautiful data visualization.',
		image: '/projects/weather.jpg',
		technologies: ['JavaScript', 'Chart.js', 'Weather API', 'CSS3'],
		category: 'frontend',
		github: 'https://github.com/aaron-howard/weather-dashboard',
		live: 'https://aaron-howard.github.io/weather-dashboard/demo.html',
		featured: false
	},
	{
		title: 'REST API Service',
		description:
			'A scalable REST API service built with Express.js and MongoDB, featuring authentication, rate limiting, and comprehensive documentation.',
		image: '/projects/api.jpg',
		technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
		category: 'backend',
		github: 'https://github.com/yourusername/rest-api',
		live: 'https://api-docs.com',
		featured: false
	},
	{
		title: 'Portfolio Website',
		description:
			'A modern, responsive portfolio website built with SvelteKit and Tailwind CSS, featuring smooth animations and optimal performance.',
		image: '/projects/portfolio.jpg',
		technologies: ['SvelteKit', 'Tailwind CSS', 'TypeScript', 'Vite'],
		category: 'frontend',
		github: 'https://github.com/aaron-howard/profile-page',
		live: 'https://portfilio-aaron-howard.vercel.app/',
		featured: true
	},
	{
		title: 'Machine Learning Dashboard',
		description:
			'A dashboard for visualizing machine learning model performance and predictions with interactive charts and real-time data.',
		image: '/projects/ml-dashboard.jpg',
		technologies: ['Python', 'Flask', 'TensorFlow', 'D3.js', 'Bootstrap'],
		category: 'fullstack',
		github: 'https://github.com/yourusername/ml-dashboard',
		live: 'https://ml-dashboard.com',
		featured: false
	}
];

async function main() {
	console.log('Seeding projects...');

	try {
		// Clear existing projects
		await prisma.project.deleteMany();

		// Create new projects
		for (const project of projects) {
			await prisma.project.create({
				data: project
			});
		}

		console.log('Projects seeded successfully!');
	} catch (error) {
		console.error('Error seeding projects:', error);
		throw error;
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		try {
			await prisma.$disconnect();
		} catch (error) {
			console.error('Error disconnecting Prisma:', error);
		}
	});
