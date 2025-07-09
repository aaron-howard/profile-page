<script lang="ts">
	// Customize this data with your actual projects
	const projects = [
		{
			id: 1,
			title: "E-Commerce Platform",
			description: "A full-stack e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, product management, shopping cart, and payment integration.",
			image: "/projects/ecommerce.jpg",
			technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
			category: "fullstack",
			github: "https://github.com/yourusername/ecommerce-platform",
			live: "https://ecommerce-demo.com",
			featured: true
		},
		{
			id: 2,
			title: "Task Management App",
			description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
			image: "/projects/taskapp.jpg",
			technologies: ["Vue.js", "Firebase", "Vuex", "Vuetify"],
			category: "frontend",
			github: "https://github.com/yourusername/task-app",
			live: "https://task-app-demo.com",
			featured: true
		},
		{
			id: 3,
			title: "Weather Dashboard",
			description: "A weather dashboard that displays current weather and forecasts using multiple weather APIs with beautiful data visualization.",
			image: "/projects/weather.jpg",
			technologies: ["JavaScript", "Chart.js", "Weather API", "CSS3"],
			category: "frontend",
			github: "https://github.com/yourusername/weather-dashboard",
			live: "https://weather-demo.com",
			featured: false
		},
		{
			id: 4,
			title: "REST API Service",
			description: "A scalable REST API service built with Express.js and MongoDB, featuring authentication, rate limiting, and comprehensive documentation.",
			image: "/projects/api.jpg",
			technologies: ["Node.js", "Express", "MongoDB", "JWT", "Swagger"],
			category: "backend",
			github: "https://github.com/yourusername/rest-api",
			live: "https://api-docs.com",
			featured: false
		},
		{
			id: 5,
			title: "Portfolio Website",
			description: "A modern, responsive portfolio website built with SvelteKit and Tailwind CSS, featuring smooth animations and optimal performance.",
			image: "/projects/portfolio.jpg",
			technologies: ["SvelteKit", "Tailwind CSS", "TypeScript", "Vite"],
			category: "frontend",
			github: "https://github.com/yourusername/portfolio",
			live: "https://your-portfolio.com",
			featured: true
		},
		{
			id: 6,
			title: "Machine Learning Dashboard",
			description: "A dashboard for visualizing machine learning model performance and predictions with interactive charts and real-time data.",
			image: "/projects/ml-dashboard.jpg",
			technologies: ["Python", "Flask", "TensorFlow", "D3.js", "Bootstrap"],
			category: "fullstack",
			github: "https://github.com/yourusername/ml-dashboard",
			live: "https://ml-dashboard.com",
			featured: false
		}
	];

	const categories = [
		{ id: "all", name: "All Projects" },
		{ id: "frontend", name: "Frontend" },
		{ id: "backend", name: "Backend" },
		{ id: "fullstack", name: "Full Stack" }
	];

	let selectedCategory = "all";
	let filteredProjects = projects;

	function filterProjects(category: string) {
		selectedCategory = category;
		if (category === "all") {
			filteredProjects = projects;
		} else {
			filteredProjects = projects.filter(project => project.category === category);
		}
	}
</script>

<div class="max-w-6xl mx-auto">
	<!-- Header -->
	<div class="text-center mb-12">
		<h1 class="text-4xl font-bold text-slate-900 mb-4">My Projects</h1>
		<p class="text-xl text-slate-600 max-w-3xl mx-auto">
			Here are some of the projects I've worked on. Each one represents a unique challenge and learning experience.
		</p>
	</div>

	<!-- Filter Buttons -->
	<div class="flex justify-center mb-12">
		<div class="flex flex-wrap gap-4">
			{#each categories as category}
				<button
					on:click={() => filterProjects(category.id)}
					class="px-6 py-2 rounded-lg font-medium transition-colors {selectedCategory === category.id 
						? 'bg-blue-600 text-white' 
						: 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'}"
				>
					{category.name}
				</button>
			{/each}
		</div>
	</div>

	<!-- Featured Projects -->
	{#if selectedCategory === "all" || filteredProjects.some(p => p.featured)}
		<div class="mb-16">
			<h2 class="text-2xl font-semibold text-slate-900 mb-8">Featured Projects</h2>
			<div class="grid lg:grid-cols-2 gap-8">
				{#each filteredProjects.filter(p => p.featured) as project}
					<div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
						<div class="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
							<!-- Project image placeholder -->
							<div class="text-white text-4xl font-bold">
								{project.title.split(' ').map(word => word[0]).join('')}
							</div>
						</div>
						<div class="p-6">
							<h3 class="text-xl font-semibold text-slate-900 mb-3">{project.title}</h3>
							<p class="text-slate-600 mb-4">{project.description}</p>
							
							<div class="flex flex-wrap gap-2 mb-6">
								{#each project.technologies as tech}
									<span class="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">{tech}</span>
								{/each}
							</div>
							
							<div class="flex gap-4">
								<a 
									href={project.github} 
									class="flex-1 bg-slate-900 text-white text-center py-2 px-4 rounded-lg hover:bg-slate-800 transition-colors"
								>
									View Code
								</a>
								<a 
									href={project.live} 
									class="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
								>
									Live Demo
								</a>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- All Projects Grid -->
	<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
		{#each filteredProjects.filter(p => !p.featured || selectedCategory !== "all") as project}
			<div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
				<div class="h-40 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
					<!-- Project image placeholder -->
					<div class="text-white text-2xl font-bold">
						{project.title.split(' ').map(word => word[0]).join('')}
					</div>
				</div>
				<div class="p-6">
					<h3 class="text-lg font-semibold text-slate-900 mb-2">{project.title}</h3>
					<p class="text-slate-600 text-sm mb-4 line-clamp-3">{project.description}</p>
					
					<div class="flex flex-wrap gap-1 mb-4">
						{#each project.technologies.slice(0, 3) as tech}
							<span class="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium">{tech}</span>
						{/each}
						{#if project.technologies.length > 3}
							<span class="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium">+{project.technologies.length - 3}</span>
						{/if}
					</div>
					
					<div class="flex gap-2">
						<a 
							href={project.github} 
							class="flex-1 bg-slate-900 text-white text-center py-2 px-3 rounded text-sm hover:bg-slate-800 transition-colors"
						>
							Code
						</a>
						<a 
							href={project.live} 
							class="flex-1 bg-blue-600 text-white text-center py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
						>
							Demo
						</a>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Empty State -->
	{#if filteredProjects.length === 0}
		<div class="text-center py-16">
			<div class="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
				<svg class="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
				</svg>
			</div>
			<h3 class="text-xl font-semibold text-slate-900 mb-2">No projects found</h3>
			<p class="text-slate-600">Try selecting a different category to see more projects.</p>
		</div>
	{/if}
</div> 