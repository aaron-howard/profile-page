<script lang="ts">
	import projects from '$lib/content/projects.json';

	const categories = [
		{ id: 'all', name: 'All Projects' },
		{ id: 'frontend', name: 'Frontend' },
		{ id: 'backend', name: 'Backend' },
		{ id: 'fullstack', name: 'Full Stack' }
	];

	let selectedCategory = 'all';
	let filteredProjects = projects;

	function filterProjects(category: string) {
		selectedCategory = category;
		if (category === 'all') {
			filteredProjects = projects;
		} else {
			filteredProjects = projects.filter((project) => project.category === category);
		}
	}
</script>

<div class="mx-auto max-w-6xl">
	<!-- Header -->
	<div class="mb-12 text-center">
		<h1 class="mb-4 text-4xl font-bold text-heading">My Projects</h1>
		<p class="mx-auto max-w-3xl text-xl text-body">
			Here are some of the projects I've worked on. Each one represents a unique challenge and
			learning experience.
		</p>
	</div>

	<!-- Filter Buttons -->
	<div class="mb-12 flex justify-center">
		<div class="flex flex-wrap gap-4">
			{#each categories as category}
				<button
					on:click={() => filterProjects(category.id)}
					class="rounded-lg px-6 py-2 font-medium transition-colors border {selectedCategory === category.id ? 'bg-accent-500 text-inverse border-accent' : 'bg-surface text-body border-base hover:bg-surface-alt'}"
				>
					{category.name}
				</button>
			{/each}
		</div>
	</div>

	<!-- Featured Projects -->
	{#if selectedCategory === 'all' || filteredProjects.some((p) => p.featured)}
		<div class="mb-16">
			<h2 class="mb-8 text-2xl font-semibold text-heading">Featured Projects</h2>
			<div class="grid gap-8 lg:grid-cols-2">
				{#each filteredProjects.filter((p) => p.featured) as project}
					<div
						class="overflow-hidden rounded-lg card card-elevated transition-shadow hover:shadow-xl"
					>
						<div
							class="flex h-48 items-center justify-center bg-accent-gradient"
						>
							<!-- Project image placeholder -->
							<div class="text-4xl font-bold text-white">
								{project.title
									.split(' ')
									.map((word) => word[0])
									.join('')}
							</div>
						</div>
						<div class="p-6">
							<h3 class="mb-3 text-xl font-semibold text-heading">{project.title}</h3>
							<p class="mb-4 text-body">{project.description}</p>

							<div class="mb-6 flex flex-wrap gap-2">
								{#each project.technologies as tech}
									<span class="rounded-full badge">{tech}</span>
								{/each}
							</div>

							<div class="flex gap-4">
								<a
									href={project.github}
									class="flex-1 btn btn-secondary"
								>
									View Code
								</a>
								<a
									href={project.live}
									class="flex-1 btn btn-primary"
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
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each filteredProjects.filter((p) => !p.featured || selectedCategory !== 'all') as project}
			<div class="overflow-hidden rounded-lg card shadow-md transition-shadow hover:shadow-lg">
				<div
					class="flex h-40 items-center justify-center bg-primary-gradient"
				>
					<!-- Project image placeholder -->
					<div class="text-2xl font-bold text-white">
						{project.title
							.split(' ')
							.map((word) => word[0])
							.join('')}
					</div>
				</div>
				<div class="p-6">
					<h3 class="mb-2 text-lg font-semibold text-heading">{project.title}</h3>
					<p class="mb-4 line-clamp-3 text-sm text-body">{project.description}</p>

					<div class="mb-4 flex flex-wrap gap-1">
						{#each project.technologies.slice(0, 3) as tech}
							<span class="rounded bg-surface-alt px-2 py-1 text-xs font-medium text-body"
								>{tech}</span
							>
						{/each}
						{#if project.technologies.length > 3}
							<span class="rounded bg-surface-alt px-2 py-1 text-xs font-medium text-body"
								>+{project.technologies.length - 3}</span
							>
						{/if}
					</div>

					<div class="flex gap-2">
						<a
							href={project.github}
							class="flex-1 btn btn-secondary text-sm"
						>
							Code
						</a>
						<a
							href={project.live}
							class="flex-1 btn btn-primary text-sm"
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
		<div class="py-16 text-center">
			<div
				class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-surface-alt"
			>
				<svg class="h-12 w-12 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
					/>
				</svg>
			</div>
			<h3 class="mb-2 text-xl font-semibold text-heading">No projects found</h3>
			<p class="text-body">Try selecting a different category to see more projects.</p>
		</div>
	{/if}
</div>
