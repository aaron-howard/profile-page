<script lang="ts">
    export let data: { projects: Array<any> };
    const projects = data.projects;

	const categories = [
		{ id: 'all', name: 'All Projects' },
		{ id: 'frontend', name: 'Frontend' },
		{ id: 'backend', name: 'Backend' },
		{ id: 'fullstack', name: 'Full Stack' }
	];

	let selectedCategory = 'all';
	let filteredProjects = projects;

	// Derived groups for display by category
	$: frontendProjects = filteredProjects.filter((p) => p.category === 'frontend');
	$: backendProjects = filteredProjects.filter((p) => p.category === 'backend');
	$: fullstackProjects = filteredProjects.filter((p) => p.category === 'fullstack');

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
		<h1 class="mb-4 text-4xl font-bold text-slate-900">My Projects</h1>
		<p class="mx-auto max-w-3xl text-xl text-slate-600">
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
					class="rounded-lg px-6 py-2 font-medium transition-colors {selectedCategory ===
					category.id
						? 'bg-blue-600 text-white'
						: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}"
				>
					{category.name}
				</button>
			{/each}
		</div>
	</div>

	<!-- Featured Projects -->
	{#if selectedCategory === 'all' && filteredProjects.filter((p) => p.featured).length > 0}
		<div class="mb-16">
			<h2 class="mb-8 text-2xl font-semibold text-slate-900">Featured Projects</h2>
			<div class="grid gap-8 lg:grid-cols-2">
				{#each filteredProjects.filter((p) => p.featured) as project}
					<div
						class="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl"
					>
						<div
							class="flex h-48 items-center justify-center bg-gradient-to-br from-indigo-500 to-cyan-600"
						>
							<!-- Project image placeholder -->
                            <div class="text-4xl font-bold text-white">
                                {project.title
                                    .split(' ')
                                    .map((word: string) => word[0])
                                    .join('')}
                            </div>
						</div>
						<div class="p-6">
							<h3 class="mb-3 text-xl font-semibold text-slate-900">{project.title}</h3>
							<p class="mb-4 text-slate-600">{project.description}</p>

							<div class="mb-6 flex flex-wrap gap-2">
								{#each project.technologies as tech}
									<span
										class="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
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
										class="flex-1 rounded-lg bg-slate-900 px-4 py-2 text-center text-white transition-colors hover:bg-slate-800"
									>
										View Code
									</a>
								{/if}
								{#if project.live}
									<a
										href={project.live}
										target="_blank"
										rel="noopener noreferrer"
										class="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center text-white transition-colors hover:bg-blue-700"
									>
										Live Demo
									</a>
								{/if}
								{#if !project.github && !project.live}
									<span class="flex-1 rounded-lg bg-slate-300 px-4 py-2 text-center text-slate-600">
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
				<h2 class="mb-4 text-2xl font-semibold text-slate-900">Frontend</h2>
				<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each frontendProjects as project}
						<div class="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
							<div class="flex h-40 items-center justify-center bg-gradient-to-br from-rose-500 to-orange-600">
								<div class="text-2xl font-bold text-white">
									{project.title.split(' ').map((word: string) => word[0]).join('')}
								</div>
							</div>
							<div class="p-6">
								<h3 class="mb-2 text-lg font-semibold text-slate-900">{project.title}</h3>
								<p class="mb-4 line-clamp-3 text-sm text-slate-600">{project.description}</p>
								<div class="mb-4 flex flex-wrap gap-1">
									{#each project.technologies.slice(0, 3) as tech}
										<span class="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{tech}</span>
									{/each}
									{#if project.technologies.length > 3}
										<span class="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">+{project.technologies.length - 3}</span>
									{/if}
								</div>
								<div class="flex gap-2">
									<a href={project.github} class="flex-1 rounded bg-slate-900 px-3 py-2 text-center text-sm text-white transition-colors hover:bg-slate-800">Code</a>
									<a href={project.live} class="flex-1 rounded bg-blue-600 px-3 py-2 text-center text-sm text-white transition-colors hover:bg-blue-700">Demo</a>
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
				<h2 class="mb-4 text-2xl font-semibold text-slate-900">Backend</h2>
				<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each backendProjects as project}
						<div class="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
							<div class="flex h-40 items-center justify-center bg-gradient-to-br from-rose-500 to-orange-600">
								<div class="text-2xl font-bold text-white">
									{project.title.split(' ').map((word: string) => word[0]).join('')}
								</div>
							</div>
							<div class="p-6">
								<h3 class="mb-2 text-lg font-semibold text-slate-900">{project.title}</h3>
								<p class="mb-4 line-clamp-3 text-sm text-slate-600">{project.description}</p>
								<div class="mb-4 flex flex-wrap gap-1">
									{#each project.technologies.slice(0, 3) as tech}
										<span class="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{tech}</span>
									{/each}
									{#if project.technologies.length > 3}
										<span class="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">+{project.technologies.length - 3}</span>
									{/if}
								</div>
								<div class="flex gap-2">
									<a href={project.github} class="flex-1 rounded bg-slate-900 px-3 py-2 text-center text-sm text-white transition-colors hover:bg-slate-800">Code</a>
									<a href={project.live} class="flex-1 rounded bg-blue-600 px-3 py-2 text-center text-sm text-white transition-colors hover:bg-blue-700">Demo</a>
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
				<h2 class="mb-4 text-2xl font-semibold text-slate-900">Full Stack</h2>
				<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each fullstackProjects as project}
						<div class="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
							<div class="flex h-40 items-center justify-center bg-gradient-to-br from-rose-500 to-orange-600">
								<div class="text-2xl font-bold text-white">
									{project.title.split(' ').map((word: string) => word[0]).join('')}
								</div>
							</div>
							<div class="p-6">
								<h3 class="mb-2 text-lg font-semibold text-slate-900">{project.title}</h3>
								<p class="mb-4 line-clamp-3 text-sm text-slate-600">{project.description}</p>
								<div class="mb-4 flex flex-wrap gap-1">
									{#each project.technologies.slice(0, 3) as tech}
										<span class="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{tech}</span>
									{/each}
									{#if project.technologies.length > 3}
										<span class="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">+{project.technologies.length - 3}</span>
									{/if}
								</div>
								<div class="flex gap-2">
									<a href={project.github} class="flex-1 rounded bg-slate-900 px-3 py-2 text-center text-sm text-white transition-colors hover:bg-slate-800">Code</a>
									<a href={project.live} class="flex-1 rounded bg-blue-600 px-3 py-2 text-center text-sm text-white transition-colors hover:bg-blue-700">Demo</a>
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
					<div class="flex h-40 items-center justify-center bg-gradient-to-br from-green-500 to-blue-600">
						<div class="text-2xl font-bold text-white">
							{project.title.split(' ').map((word: string) => word[0]).join('')}
						</div>
					</div>
					<div class="p-6">
						<h3 class="mb-2 text-lg font-semibold text-slate-900">{project.title}</h3>
						<p class="mb-4 line-clamp-3 text-sm text-slate-600">{project.description}</p>
						<div class="mb-4 flex flex-wrap gap-1">
							{#each project.technologies.slice(0, 3) as tech}
								<span class="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{tech}</span>
							{/each}
							{#if project.technologies.length > 3}
								<span class="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">+{project.technologies.length - 3}</span>
							{/if}
						</div>
						<div class="flex gap-2">
							<a href={project.github} class="flex-1 rounded bg-slate-900 px-3 py-2 text-center text-sm text-white transition-colors hover:bg-slate-800">Code</a>
							<a href={project.live} class="flex-1 rounded bg-blue-600 px-3 py-2 text-center text-sm text-white transition-colors hover:bg-blue-700">Demo</a>
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
				class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100"
			>
				<svg class="h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
					/>
				</svg>
			</div>
			<h3 class="mb-2 text-xl font-semibold text-slate-900">No projects found</h3>
			<p class="text-slate-600">Try selecting a different category to see more projects.</p>
		</div>
	{/if}
</div>
