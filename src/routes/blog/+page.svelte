<script lang="ts">
	import blogPosts from '$lib/content/blog.json';

	const categories = [
		{ id: 'all', name: 'All Posts' },
		{ id: 'Development', name: 'Development' },
		{ id: 'Technology', name: 'Technology' },
		{ id: 'Backend', name: 'Backend' },
		{ id: 'CSS', name: 'CSS' },
		{ id: 'DevOps', name: 'DevOps' }
	];

	let selectedCategory = 'all';
	let filteredPosts = blogPosts;

	function filterPosts(category: string) {
		selectedCategory = category;
		if (category === 'all') {
			filteredPosts = blogPosts;
		} else {
			filteredPosts = blogPosts.filter((post) => post.category === category);
		}
	}

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<div class="mx-auto max-w-6xl">
	<!-- Header -->
	<div class="mb-12 text-center">
		<h1 class="mb-4 text-4xl font-bold text-heading">Blog</h1>
		<p class="mx-auto max-w-3xl text-xl text-body">
			Thoughts, tutorials, and insights about web development, technology, and the industry.
		</p>
	</div>

	<!-- Filter Buttons -->
	<div class="mb-12 flex justify-center">
		<div class="flex flex-wrap gap-4">
			{#each categories as category}
				<button
					on:click={() => filterPosts(category.id)}
					class="rounded-lg px-6 py-2 font-medium transition-colors border {selectedCategory === category.id ? 'bg-accent-500 text-inverse border-accent' : 'bg-surface text-body border-base hover:bg-surface-alt'}"
				>
					{category.name}
				</button>
			{/each}
		</div>
	</div>

	<!-- Featured Posts -->
	{#if selectedCategory === 'all' || filteredPosts.some((p) => p.featured)}
		<div class="mb-16">
			<h2 class="mb-8 text-2xl font-semibold text-heading">Featured Posts</h2>
			<div class="grid gap-8 lg:grid-cols-2">
				{#each filteredPosts.filter((p) => p.featured) as post}
					<article
						class="overflow-hidden rounded-lg card card-elevated transition-shadow hover:shadow-xl"
					>
						<div
							class="flex h-48 items-center justify-center bg-accent-gradient"
						>
							<div class="text-4xl font-bold text-white">
								{post.title
									.split(' ')
									.map((word) => word[0])
									.join('')}
							</div>
						</div>
						<div class="p-6">
							<div class="mb-4 flex items-center gap-4">
								<span class="rounded-full badge-accent text-xs"
									>{post.category}</span
								>
								<span class="text-sm text-muted">{post.readTime}</span>
							</div>
							<h3 class="mb-3 text-xl font-semibold text-heading">{post.title}</h3>
							<p class="mb-4 text-body">{post.excerpt}</p>

							<div class="mb-6 flex flex-wrap gap-2">
								{#each post.tags as tag}
									<span class="rounded bg-surface-alt px-2 py-1 text-xs font-medium text-body"
										>{tag}</span
									>
								{/each}
							</div>

							<div class="flex items-center justify-between">
								<div class="flex items-center gap-2">
									<div
										class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white"
									>
										{post.author
											.split(' ')
											.map((n) => n[0])
											.join('')}
									</div>
									<span class="text-sm text-body">{post.author}</span>
								</div>
								<span class="text-sm text-muted">{formatDate(post.date)}</span>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	{/if}

	<!-- All Posts Grid -->
	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each filteredPosts.filter((p) => !p.featured || selectedCategory !== 'all') as post}
			<article
				class="overflow-hidden rounded-lg card shadow-md transition-shadow hover:shadow-lg"
			>
				<div
					class="flex h-40 items-center justify-center bg-primary-gradient"
				>
					<div class="text-2xl font-bold text-white">
						{post.title
							.split(' ')
							.map((word) => word[0])
							.join('')}
					</div>
				</div>
				<div class="p-6">
					<div class="mb-3 flex items-center gap-3">
						<span class="rounded badge-accent"
							>{post.category}</span
						>
						<span class="text-xs text-muted">{post.readTime}</span>
					</div>
					<h3 class="mb-2 text-lg font-semibold text-heading">{post.title}</h3>
					<p class="mb-4 line-clamp-3 text-sm text-body">{post.excerpt}</p>

					<div class="mb-4 flex flex-wrap gap-1">
						{#each post.tags.slice(0, 2) as tag}
							<span class="rounded bg-surface-alt px-2 py-1 text-xs font-medium text-body"
								>{tag}</span
							>
						{/each}
						{#if post.tags.length > 2}
							<span class="rounded bg-surface-alt px-2 py-1 text-xs font-medium text-body"
								>+{post.tags.length - 2}</span
							>
						{/if}
					</div>

					<div class="flex items-center justify-between">
						<div class="flex items-center gap-2">
							<div
								class="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-bold text-white"
							>
								{post.author
									.split(' ')
									.map((n) => n[0])
									.join('')}
							</div>
							<span class="text-xs text-body">{post.author}</span>
						</div>
						<span class="text-xs text-muted">{formatDate(post.date)}</span>
					</div>
				</div>
			</article>
		{/each}
	</div>

	<!-- Empty State -->
	{#if filteredPosts.length === 0}
		<div class="py-16 text-center">
			<div
				class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-surface-alt"
			>
				<svg class="h-12 w-12 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
					/>
				</svg>
			</div>
			<h3 class="mb-2 text-xl font-semibold text-heading">No posts found</h3>
			<p class="text-body">Try selecting a different category to see more blog posts.</p>
		</div>
	{/if}
</div>
