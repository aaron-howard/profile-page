<script lang="ts">
	import type { Project } from '$lib/types';

	let { data } = $props<{ data: { projects: Project[] } }>();

	const categories = [
		{ id: 'all', name: 'All Projects' },
		{ id: 'frontend', name: 'Frontend' },
		{ id: 'backend', name: 'Backend' },
		{ id: 'fullstack', name: 'Full Stack' }
	];

	let selectedCategory = $state('all');

	const filteredProjects = $derived(
		selectedCategory === 'all'
			? data.projects
			: data.projects.filter((project) => project.category === selectedCategory)
	);

	// Derived groups for display by category
	const frontendProjects = $derived(
		filteredProjects.filter((p) => p.category === 'frontend')
	);

	const backendProjects = $derived(
		filteredProjects.filter((p) => p.category === 'backend')
	);

	const fullstackProjects = $derived(
		filteredProjects.filter((p) => p.category === 'fullstack')
	);

	function filterProjects(category: string) {
		selectedCategory = category;
	}

	function getCategoryColor(category: string): string {
		const colors: Record<string, string> = {
			frontend: '#a85a4d',     // Warm terracotta
			backend: '#8b9c8a',      // Sage green
			fullstack: '#c4a562'     // Warm gold
		};
		return colors[category] || '#9b8b7e';
	}

	function getCategoryIcon(category: string): string {
		const icons: Record<string, string> = {
			frontend: 'window',
			backend: 'database',
			fullstack: 'layers'
		};
		return icons[category] || 'cube';
	}
</script>

<div class="mx-auto max-w-6xl">
	<!-- Header -->
	<div class="mb-12 text-center">
		<h1 class="mb-4 text-4xl font-bold" style="color: #2c2622;">My Projects</h1>
		<p class="mx-auto max-w-3xl text-xl" style="color: #6b6460;">
			Here are some of the projects I've worked on. Each one represents a unique challenge and
			learning experience.
		</p>
	</div>

	<!-- Filter Buttons -->
	<div class="mb-12 flex justify-center">
		<div class="flex flex-wrap gap-4">
			{#each categories as category}
				<button
					onclick={() => filterProjects(category.id)}
					class="rounded-lg px-6 py-2 font-medium transition-colors"
					style={selectedCategory === category.id
						? 'background: #a85a4d; color: white;'
						: 'border: 1px solid #e8e6e3; background: white; color: #6b6460;'}
				>
					{category.name}
				</button>
			{/each}
		</div>
	</div>

	<!-- Featured Projects -->
	{#if selectedCategory === 'all' && filteredProjects.filter((p) => p.featured).length > 0}
		<div class="mb-16">
			<h2 class="mb-8 text-2xl font-semibold" style="color: #2c2622;">Featured Projects</h2>
			<div class="grid gap-8 lg:grid-cols-2">
				{#each filteredProjects.filter((p) => p.featured) as project}
					<div
						class="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl"
					>
						<div
							class="flex h-48 items-center justify-center"
							style="background: linear-gradient(135deg, {getCategoryColor(project.category)}20 0%, {getCategoryColor(project.category)}40 100%);"
						>
							<!-- Minimal geometric icon -->
							<svg width="80" height="80" viewBox="0 0 80 80" fill="none">
								{#if getCategoryIcon(project.category) === 'window'}
									<!-- Window/Frontend icon -->
									<rect x="12" y="12" width="56" height="56" rx="4" stroke={getCategoryColor(project.category)} stroke-width="3" />
									<line x1="12" y1="28" x2="68" y2="28" stroke={getCategoryColor(project.category)} stroke-width="2" />
									<line x1="40" y1="12" x2="40" y2="68" stroke={getCategoryColor(project.category)} stroke-width="2" stroke-dasharray="4,4" />
								{:else if getCategoryIcon(project.category) === 'database'}
									<!-- Database/Backend icon -->
									<ellipse cx="40" cy="20" rx="16" ry="8" stroke={getCategoryColor(project.category)} stroke-width="3" fill="none" />
									<path d="M 24 20 L 24 60 Q 24 68 40 68 Q 56 68 56 60 L 56 20" stroke={getCategoryColor(project.category)} stroke-width="3" fill="none" />
									<ellipse cx="40" cy="60" rx="16" ry="8" stroke={getCategoryColor(project.category)} stroke-width="2" fill="none" />
									<line x1="24" y1="40" x2="56" y2="40" stroke={getCategoryColor(project.category)} stroke-width="2" stroke-dasharray="2,2" />
								{:else if getCategoryIcon(project.category) === 'layers'}
									<!-- Layers/Full Stack icon -->
									<rect x="10" y="12" width="60" height="16" rx="2" stroke={getCategoryColor(project.category)} stroke-width="3" fill="none" />
									<rect x="14" y="32" width="60" height="16" rx="2" stroke={getCategoryColor(project.category)} stroke-width="3" fill="none" />
									<rect x="18" y="52" width="60" height="16" rx="2" stroke={getCategoryColor(project.category)} stroke-width="3" fill="none" />
								{/if}
							</svg>
						</div>
						<div class="p-6">
							<h3 class="mb-3 text-xl font-semibold" style="color: #2c2622;">{project.title}</h3>
							<p class="mb-4" style="color: #6b6460;">{project.description}</p>

							<div class="mb-6 flex flex-wrap gap-2">
								{#each project.technologies as tech}
									<span
										class="rounded-full px-3 py-1 text-sm font-medium"
										style="background: rgba(165, 90, 77, 0.1); color: #a85a4d;"
										>{tech}</span
									>
								{/each}
							</div>

							<div class="flex gap-4">
								{#if project.github}
									<a
										href={project.github}
										target="_blank"
										rel="noopener noreferrer"
										class="flex-1 rounded-lg px-4 py-2 text-center text-white transition-colors font-medium"
										style="background: #a85a4d;"
									>
										View Code
									</a>
								{/if}
								{#if project.live}
									<a
										href={project.live}
										target="_blank"
										rel="noopener noreferrer"
										class="flex-1 rounded-lg px-4 py-2 text-center text-white transition-colors font-medium"
										style="background: #8b9c8a;"
									>
										Live Demo
									</a>
								{/if}
								{#if !project.github && !project.live}
									<span class="flex-1 rounded-lg px-4 py-2 text-center font-medium" style="background: #e8e6e3; color: #9b8b7e;">
										No links available
									</span>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Grouped Projects by Category -->
	{#if selectedCategory === 'all'}
		<!-- Frontend Section -->
		{#if frontendProjects.length}
			<div class="mb-10">
				<h2 class="mb-4 text-2xl font-semibold" style="color: #2c2622;">Frontend</h2>
				<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each frontendProjects as project}
						<div class="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
							<div class="flex h-40 items-center justify-center" style="background: linear-gradient(135deg, #a85a4d20 0%, #a85a4d40 100%);">
								<!-- Window icon for frontend -->
								<svg width="60" height="60" viewBox="0 0 80 80" fill="none">
									<rect x="12" y="12" width="56" height="56" rx="4" stroke="#a85a4d" stroke-width="3" />
									<line x1="12" y1="28" x2="68" y2="28" stroke="#a85a4d" stroke-width="2" />
									<line x1="40" y1="12" x2="40" y2="68" stroke="#a85a4d" stroke-width="2" stroke-dasharray="4,4" />
								</svg>
							</div>
							<div class="p-6">
								<h3 class="mb-2 text-lg font-semibold" style="color: #2c2622;">{project.title}</h3>
								<p class="mb-4 line-clamp-3 text-sm" style="color: #6b6460;">{project.description}</p>
								<div class="mb-4 flex flex-wrap gap-1">
									{#each project.technologies.slice(0, 3) as tech}
										<span class="rounded px-2 py-1 text-xs font-medium" style="background: rgba(165, 90, 77, 0.1); color: #a85a4d;">{tech}</span>
									{/each}
									{#if project.technologies.length > 3}
										<span class="rounded px-2 py-1 text-xs font-medium" style="background: rgba(165, 90, 77, 0.1); color: #a85a4d;">+{project.technologies.length - 3}</span>
									{/if}
								</div>
								<div class="flex gap-2">
									<a href={project.github} class="flex-1 rounded px-3 py-2 text-center text-sm text-white transition-colors font-medium" style="background: #a85a4d;">Code</a>
									<a href={project.live} class="flex-1 rounded px-3 py-2 text-center text-sm text-white transition-colors font-medium" style="background: #8b9c8a;">Demo</a>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Backend Section -->
		{#if backendProjects.length}
			<div class="mb-10">
				<h2 class="mb-4 text-2xl font-semibold" style="color: #2c2622;">Backend</h2>
				<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each backendProjects as project}
						<div class="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
							<div class="flex h-40 items-center justify-center" style="background: linear-gradient(135deg, #8b9c8a20 0%, #8b9c8a40 100%);">
								<!-- Database icon for backend -->
								<svg width="60" height="60" viewBox="0 0 80 80" fill="none">
									<ellipse cx="40" cy="20" rx="16" ry="8" stroke="#8b9c8a" stroke-width="3" fill="none" />
									<path d="M 24 20 L 24 60 Q 24 68 40 68 Q 56 68 56 60 L 56 20" stroke="#8b9c8a" stroke-width="3" fill="none" />
									<ellipse cx="40" cy="60" rx="16" ry="8" stroke="#8b9c8a" stroke-width="2" fill="none" />
									<line x1="24" y1="40" x2="56" y2="40" stroke="#8b9c8a" stroke-width="2" stroke-dasharray="2,2" />
								</svg>
							</div>
							<div class="p-6">
								<h3 class="mb-2 text-lg font-semibold" style="color: #2c2622;">{project.title}</h3>
								<p class="mb-4 line-clamp-3 text-sm" style="color: #6b6460;">{project.description}</p>
								<div class="mb-4 flex flex-wrap gap-1">
									{#each project.technologies.slice(0, 3) as tech}
										<span class="rounded px-2 py-1 text-xs font-medium" style="background: rgba(139, 156, 138, 0.1); color: #8b9c8a;">{tech}</span>
									{/each}
									{#if project.technologies.length > 3}
										<span class="rounded px-2 py-1 text-xs font-medium" style="background: rgba(139, 156, 138, 0.1); color: #8b9c8a;">+{project.technologies.length - 3}</span>
									{/if}
								</div>
								<div class="flex gap-2">
									<a href={project.github} class="flex-1 rounded px-3 py-2 text-center text-sm text-white transition-colors font-medium" style="background: #8b9c8a;">Code</a>
									<a href={project.live} class="flex-1 rounded px-3 py-2 text-center text-sm text-white transition-colors font-medium" style="background: #a85a4d;">Demo</a>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Full Stack Section -->
		{#if fullstackProjects.length}
			<div class="mb-10">
				<h2 class="mb-4 text-2xl font-semibold" style="color: #2c2622;">Full Stack</h2>
				<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each fullstackProjects as project}
						<div class="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
							<div class="flex h-40 items-center justify-center" style="background: linear-gradient(135deg, #c4a56220 0%, #c4a56240 100%);">
								<!-- Layers icon for full stack -->
								<svg width="60" height="60" viewBox="0 0 80 80" fill="none">
									<rect x="10" y="12" width="60" height="16" rx="2" stroke="#c4a562" stroke-width="3" fill="none" />
									<rect x="14" y="32" width="60" height="16" rx="2" stroke="#c4a562" stroke-width="3" fill="none" />
									<rect x="18" y="52" width="60" height="16" rx="2" stroke="#c4a562" stroke-width="3" fill="none" />
								</svg>
							</div>
							<div class="p-6">
								<h3 class="mb-2 text-lg font-semibold" style="color: #2c2622;">{project.title}</h3>
								<p class="mb-4 line-clamp-3 text-sm" style="color: #6b6460;">{project.description}</p>
								<div class="mb-4 flex flex-wrap gap-1">
									{#each project.technologies.slice(0, 3) as tech}
										<span class="rounded px-2 py-1 text-xs font-medium" style="background: rgba(196, 165, 98, 0.1); color: #c4a562;">{tech}</span>
									{/each}
									{#if project.technologies.length > 3}
										<span class="rounded px-2 py-1 text-xs font-medium" style="background: rgba(196, 165, 98, 0.1); color: #c4a562;">+{project.technologies.length - 3}</span>
									{/if}
								</div>
								<div class="flex gap-2">
									<a href={project.github} class="flex-1 rounded px-3 py-2 text-center text-sm text-white transition-colors font-medium" style="background: #c4a562;">Code</a>
									<a href={project.live} class="flex-1 rounded px-3 py-2 text-center text-sm text-white transition-colors font-medium" style="background: #a85a4d;">Demo</a>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	{/if}

	{#if selectedCategory !== 'all'}
		<!-- When a specific category is selected, show a single grid (non-featured) -->
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredProjects as project}
				<div class="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
					<div class="flex h-40 items-center justify-center" style="background: linear-gradient(135deg, {getCategoryColor(project.category)}20 0%, {getCategoryColor(project.category)}40 100%);">
						<!-- Minimal icon based on category -->
						<svg width="60" height="60" viewBox="0 0 80 80" fill="none">
							{#if project.category === 'frontend'}
								<rect x="12" y="12" width="56" height="56" rx="4" stroke={getCategoryColor(project.category)} stroke-width="3" />
								<line x1="12" y1="28" x2="68" y2="28" stroke={getCategoryColor(project.category)} stroke-width="2" />
								<line x1="40" y1="12" x2="40" y2="68" stroke={getCategoryColor(project.category)} stroke-width="2" stroke-dasharray="4,4" />
							{:else if project.category === 'backend'}
								<ellipse cx="40" cy="20" rx="16" ry="8" stroke={getCategoryColor(project.category)} stroke-width="3" fill="none" />
								<path d="M 24 20 L 24 60 Q 24 68 40 68 Q 56 68 56 60 L 56 20" stroke={getCategoryColor(project.category)} stroke-width="3" fill="none" />
								<ellipse cx="40" cy="60" rx="16" ry="8" stroke={getCategoryColor(project.category)} stroke-width="2" fill="none" />
								<line x1="24" y1="40" x2="56" y2="40" stroke={getCategoryColor(project.category)} stroke-width="2" stroke-dasharray="2,2" />
							{:else}
								<rect x="10" y="12" width="60" height="16" rx="2" stroke={getCategoryColor(project.category)} stroke-width="3" fill="none" />
								<rect x="14" y="32" width="60" height="16" rx="2" stroke={getCategoryColor(project.category)} stroke-width="3" fill="none" />
								<rect x="18" y="52" width="60" height="16" rx="2" stroke={getCategoryColor(project.category)} stroke-width="3" fill="none" />
							{/if}
						</svg>
					</div>
					<div class="p-6">
						<h3 class="mb-2 text-lg font-semibold" style="color: #2c2622;">{project.title}</h3>
						<p class="mb-4 line-clamp-3 text-sm" style="color: #6b6460;">{project.description}</p>
						<div class="mb-4 flex flex-wrap gap-1">
							{#each project.technologies.slice(0, 3) as tech}
								<span class="rounded px-2 py-1 text-xs font-medium" style="background: rgba({project.category === 'frontend' ? '165, 90, 77' : project.category === 'backend' ? '139, 156, 138' : '196, 165, 98'}, 0.1); color: {getCategoryColor(project.category)};">{tech}</span>
							{/each}
							{#if project.technologies.length > 3}
								<span class="rounded px-2 py-1 text-xs font-medium" style="background: rgba({project.category === 'frontend' ? '165, 90, 77' : project.category === 'backend' ? '139, 156, 138' : '196, 165, 98'}, 0.1); color: {getCategoryColor(project.category)};">+{project.technologies.length - 3}</span>
							{/if}
						</div>
						<div class="flex gap-2">
							<a href={project.github} class="flex-1 rounded px-3 py-2 text-center text-sm text-white transition-colors font-medium" style="background: {getCategoryColor(project.category)};">Code</a>
							<a href={project.live} class="flex-1 rounded px-3 py-2 text-center text-sm text-white transition-colors font-medium" style="background: {project.category === 'frontend' ? '#8b9c8a' : project.category === 'backend' ? '#c4a562' : '#a85a4d'};">Demo</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Empty State -->
	{#if filteredProjects.length === 0}
		<div class="py-16 text-center">
			<div
				class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full"
				style="background: rgba(165, 90, 77, 0.1);"
			>
				<svg class="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #a85a4d;">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
					/>
				</svg>
			</div>
			<h3 class="mb-2 text-xl font-semibold" style="color: #2c2622;">No projects found</h3>
			<p style="color: #6b6460;">Try selecting a different category to see more projects.</p>
		</div>
	{/if}
</div>
