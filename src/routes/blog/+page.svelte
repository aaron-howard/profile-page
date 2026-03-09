<script lang="ts">
	import type { BlogPost } from '$lib/types';

	let { data } = $props<{ data: { posts: BlogPost[] } }>();

	const categories = [
		{ id: 'all', name: 'All Posts' },
		{ id: 'Development', name: 'Development' },
		{ id: 'Technology', name: 'Technology' },
		{ id: 'Backend', name: 'Backend' },
		{ id: 'CSS', name: 'CSS' },
		{ id: 'DevOps', name: 'DevOps' }
	];

	let selectedCategory = $state('all');

	const filteredPosts = $derived(
		selectedCategory === 'all'
			? data.posts
			: data.posts.filter((post) => post.category === selectedCategory)
	);

	const featuredPosts = $derived(
		filteredPosts.filter((p) => p.featured)
	);

	const nonFeaturedPosts = $derived(
		filteredPosts.filter((p) => !p.featured || selectedCategory !== 'all')
	);

	function filterPosts(category: string) {
		selectedCategory = category;
	}

	function formatDate(date: string | Date) {
		try {
			const dateObj = typeof date === 'string' ? new Date(date) : date;
			if (isNaN(dateObj.getTime())) {
				return 'Invalid date';
			}
			return dateObj.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
		} catch {
			return 'Invalid date';
		}
	}

	function getAuthorInitials(author: string | null | undefined): string {
		if (!author || typeof author !== 'string') return '?';
		const parts = author.trim().split(' ').filter(Boolean);
		if (parts.length === 0) return '?';
		return parts.map(part => part[0]?.toUpperCase() || '').join('').slice(0, 2);
	}

	function getCategoryColor(category: string): string {
		const colors: Record<string, string> = {
			Development: '#a85a4d',
			Technology: '#8b9c8a',
			Backend: '#c4a562',
			CSS: '#9b8b7e',
			DevOps: '#7a8d82'
		};
		return colors[category] || '#9b8b7e';
	}

	function getCategoryIcon(category: string): string {
		const icons: Record<string, string> = {
			Development: 'code',
			Technology: 'chip',
			Backend: 'database',
			CSS: 'palette',
			DevOps: 'deploy'
		};
		return icons[category] || 'document';
	}
</script>

<div class="mx-auto max-w-6xl">
	<!-- Header -->
	<div class="mb-12 text-center">
		<h1 class="mb-4 text-4xl font-bold" style="color: #2c2622;">Blog</h1>
		<p class="mx-auto max-w-3xl text-xl" style="color: #6b6460;">
			Thoughts, tutorials, and insights about web development, technology, and the industry.
		</p>
	</div>

	<!-- Filter Buttons -->
	<div class="mb-12 flex justify-center">
		<div class="flex flex-wrap gap-4">
			{#each categories as category}
				<button
					onclick={() => filterPosts(category.id)}
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

	<!-- Featured Posts -->
	{#if featuredPosts.length > 0}
		<div class="mb-16">
			<h2 class="mb-8 text-2xl font-semibold" style="color: #2c2622;">Featured Posts</h2>
			<div class="grid gap-8 lg:grid-cols-2">
				{#each featuredPosts as post}
					<article
						class="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl"
					>
						<div
							class="flex h-48 items-center justify-center"
							style="background: linear-gradient(135deg, {getCategoryColor(post.category)}20 0%, {getCategoryColor(post.category)}40 100%);"
						>
							<!-- Minimal icon based on category -->
							<svg width="80" height="80" viewBox="0 0 80 80" fill="none">
								{#if getCategoryIcon(post.category) === 'code'}
									<!-- Code brackets icon -->
									<path d="M 25 20 L 15 40 L 25 60" stroke={getCategoryColor(post.category)} stroke-width="3" fill="none" stroke-linecap="round" />
									<path d="M 55 20 L 65 40 L 55 60" stroke={getCategoryColor(post.category)} stroke-width="3" fill="none" stroke-linecap="round" />
									<line x1="35" y1="15" x2="45" y2="65" stroke={getCategoryColor(post.category)} stroke-width="3" stroke-linecap="round" />
								{:else if getCategoryIcon(post.category) === 'chip'}
									<!-- Technology/Chip icon -->
									<rect x="20" y="20" width="40" height="40" rx="4" stroke={getCategoryColor(post.category)} stroke-width="3" fill="none" />
									<circle cx="30" cy="30" r="3" fill={getCategoryColor(post.category)} />
									<circle cx="50" cy="30" r="3" fill={getCategoryColor(post.category)} />
									<circle cx="30" cy="50" r="3" fill={getCategoryColor(post.category)} />
									<circle cx="50" cy="50" r="3" fill={getCategoryColor(post.category)} />
								{:else if getCategoryIcon(post.category) === 'database'}
									<!-- Database icon -->
									<ellipse cx="40" cy="20" rx="16" ry="8" stroke={getCategoryColor(post.category)} stroke-width="3" fill="none" />
									<path d="M 24 20 L 24 60 Q 24 68 40 68 Q 56 68 56 60 L 56 20" stroke={getCategoryColor(post.category)} stroke-width="3" fill="none" />
									<ellipse cx="40" cy="60" rx="16" ry="8" stroke={getCategoryColor(post.category)} stroke-width="2" fill="none" />
								{:else if getCategoryIcon(post.category) === 'palette'}
									<!-- Palette/CSS icon -->
									<circle cx="40" cy="40" r="20" stroke={getCategoryColor(post.category)} stroke-width="3" fill="none" />
									<circle cx="28" cy="28" r="3" fill={getCategoryColor(post.category)} />
									<circle cx="52" cy="28" r="3" fill={getCategoryColor(post.category)} />
									<circle cx="28" cy="52" r="3" fill={getCategoryColor(post.category)} />
									<circle cx="52" cy="52" r="3" fill={getCategoryColor(post.category)} />
									<circle cx="40" cy="40" r="2" fill={getCategoryColor(post.category)} />
								{:else if getCategoryIcon(post.category) === 'deploy'}
									<!-- Deploy/DevOps icon -->
									<rect x="15" y="25" width="25" height="25" rx="2" stroke={getCategoryColor(post.category)} stroke-width="2" fill="none" />
									<rect x="40" y="30" width="25" height="25" rx="2" stroke={getCategoryColor(post.category)} stroke-width="2" fill="none" />
									<line x1="40" y1="42" x2="40" y2="42" stroke={getCategoryColor(post.category)} stroke-width="3" stroke-linecap="round" />
								{:else}
									<!-- Default document icon -->
									<rect x="20" y="12" width="40" height="56" rx="4" stroke={getCategoryColor(post.category)} stroke-width="3" fill="none" />
									<line x1="26" y1="24" x2="54" y2="24" stroke={getCategoryColor(post.category)} stroke-width="2" />
									<line x1="26" y1="34" x2="54" y2="34" stroke={getCategoryColor(post.category)} stroke-width="2" />
									<line x1="26" y1="44" x2="54" y2="44" stroke={getCategoryColor(post.category)} stroke-width="2" />
								{/if}
							</svg>
						</div>
						<div class="p-6">
							<div class="mb-4 flex items-center gap-4">
								<span class="rounded-full px-3 py-1 text-sm font-medium" style="background: rgba({post.category === 'Development' ? '168, 90, 77' : post.category === 'Technology' ? '139, 156, 138' : post.category === 'Backend' ? '196, 165, 98' : post.category === 'CSS' ? '155, 139, 126' : '122, 141, 130'}, 0.15); color: {getCategoryColor(post.category)};">
									{post.category}
								</span>
								{#if post.readTime}
									<span class="text-sm" style="color: #9b8b7e;">{post.readTime}</span>
								{/if}
							</div>
							<h3 class="mb-3 text-xl font-semibold" style="color: #2c2622;">{post.title}</h3>
							{#if post.excerpt}
								<p class="mb-4" style="color: #6b6460;">{post.excerpt}</p>
							{/if}

							<div class="mb-6 flex flex-wrap gap-2">
								{#each post.tags as tag}
									<span class="rounded px-2 py-1 text-xs font-medium" style="background: rgba(232, 230, 227, 1); color: #9b8b7e;"
										>{tag}</span
									>
								{/each}
							</div>

							<div class="flex items-center justify-between">
								<div class="flex items-center gap-2">
									<div
										class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
										style="background: {getCategoryColor(post.category)};"
									>
										{getAuthorInitials(post.author)}
									</div>
									<span class="text-sm" style="color: #6b6460;">{post.author || 'Unknown'}</span>
								</div>
								<span class="text-sm" style="color: #9b8b7e;">{formatDate(post.date)}</span>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	{/if}

	<!-- All Posts Grid -->
	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each nonFeaturedPosts as post}
			<article
				class="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
			>
				<div
					class="flex h-40 items-center justify-center"
					style="background: linear-gradient(135deg, {getCategoryColor(post.category)}20 0%, {getCategoryColor(post.category)}40 100%);"
				>
					<!-- Minimal icon based on category -->
					<svg width="50" height="50" viewBox="0 0 80 80" fill="none">
						{#if getCategoryIcon(post.category) === 'code'}
							<!-- Code brackets icon -->
							<path d="M 25 20 L 15 40 L 25 60" stroke={getCategoryColor(post.category)} stroke-width="3" fill="none" stroke-linecap="round" />
							<path d="M 55 20 L 65 40 L 55 60" stroke={getCategoryColor(post.category)} stroke-width="3" fill="none" stroke-linecap="round" />
							<line x1="35" y1="15" x2="45" y2="65" stroke={getCategoryColor(post.category)} stroke-width="3" stroke-linecap="round" />
						{:else if getCategoryIcon(post.category) === 'chip'}
							<!-- Technology/Chip icon -->
							<rect x="20" y="20" width="40" height="40" rx="4" stroke={getCategoryColor(post.category)} stroke-width="3" fill="none" />
							<circle cx="30" cy="30" r="3" fill={getCategoryColor(post.category)} />
							<circle cx="50" cy="30" r="3" fill={getCategoryColor(post.category)} />
							<circle cx="30" cy="50" r="3" fill={getCategoryColor(post.category)} />
							<circle cx="50" cy="50" r="3" fill={getCategoryColor(post.category)} />
						{:else if getCategoryIcon(post.category) === 'database'}
							<!-- Database icon -->
							<ellipse cx="40" cy="20" rx="16" ry="8" stroke={getCategoryColor(post.category)} stroke-width="3" fill="none" />
							<path d="M 24 20 L 24 60 Q 24 68 40 68 Q 56 68 56 60 L 56 20" stroke={getCategoryColor(post.category)} stroke-width="3" fill="none" />
							<ellipse cx="40" cy="60" rx="16" ry="8" stroke={getCategoryColor(post.category)} stroke-width="2" fill="none" />
						{:else if getCategoryIcon(post.category) === 'palette'}
							<!-- Palette/CSS icon -->
							<circle cx="40" cy="40" r="20" stroke={getCategoryColor(post.category)} stroke-width="3" fill="none" />
							<circle cx="28" cy="28" r="3" fill={getCategoryColor(post.category)} />
							<circle cx="52" cy="28" r="3" fill={getCategoryColor(post.category)} />
							<circle cx="28" cy="52" r="3" fill={getCategoryColor(post.category)} />
							<circle cx="52" cy="52" r="3" fill={getCategoryColor(post.category)} />
							<circle cx="40" cy="40" r="2" fill={getCategoryColor(post.category)} />
						{:else if getCategoryIcon(post.category) === 'deploy'}
							<!-- Deploy/DevOps icon -->
							<rect x="15" y="25" width="25" height="25" rx="2" stroke={getCategoryColor(post.category)} stroke-width="2" fill="none" />
							<rect x="40" y="30" width="25" height="25" rx="2" stroke={getCategoryColor(post.category)} stroke-width="2" fill="none" />
							<line x1="40" y1="42" x2="40" y2="42" stroke={getCategoryColor(post.category)} stroke-width="3" stroke-linecap="round" />
						{:else}
							<!-- Default document icon -->
							<rect x="20" y="12" width="40" height="56" rx="4" stroke={getCategoryColor(post.category)} stroke-width="3" fill="none" />
							<line x1="26" y1="24" x2="54" y2="24" stroke={getCategoryColor(post.category)} stroke-width="2" />
							<line x1="26" y1="34" x2="54" y2="34" stroke={getCategoryColor(post.category)} stroke-width="2" />
							<line x1="26" y1="44" x2="54" y2="44" stroke={getCategoryColor(post.category)} stroke-width="2" />
						{/if}
					</svg>
				</div>
				<div class="p-6">
					<div class="mb-3 flex items-center gap-3">
						<span class="rounded px-2 py-1 text-xs font-medium" style="background: rgba({post.category === 'Development' ? '168, 90, 77' : post.category === 'Technology' ? '139, 156, 138' : post.category === 'Backend' ? '196, 165, 98' : post.category === 'CSS' ? '155, 139, 126' : '122, 141, 130'}, 0.15); color: {getCategoryColor(post.category)};"
							>{post.category}</span
						>
						<span class="text-xs" style="color: #9b8b7e;">{post.readTime}</span>
					</div>
					<h3 class="mb-2 text-lg font-semibold" style="color: #2c2622;">{post.title}</h3>
					{#if post.excerpt}
						<p class="mb-4 line-clamp-3 text-sm" style="color: #6b6460;">{post.excerpt}</p>
					{/if}

					<div class="mb-4 flex flex-wrap gap-1">
						{#each post.tags.slice(0, 2) as tag}
							<span class="rounded px-2 py-1 text-xs font-medium" style="background: #e8e6e3; color: #9b8b7e;"
								>{tag}</span
							>
						{/each}
						{#if post.tags.length > 2}
							<span class="rounded px-2 py-1 text-xs font-medium" style="background: #e8e6e3; color: #9b8b7e;"
								>+{post.tags.length - 2}</span
							>
						{/if}
					</div>

					<div class="flex items-center justify-between">
						<div class="flex items-center gap-2">
							<div
								class="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
								style="background: {getCategoryColor(post.category)};"
							>
								{getAuthorInitials(post.author)}
							</div>
							<span class="text-xs" style="color: #6b6460;">{post.author || 'Unknown'}</span>
						</div>
						<span class="text-xs" style="color: #9b8b7e;">{formatDate(post.date)}</span>
					</div>
				</div>
			</article>
		{/each}
	</div>

	<!-- Empty State -->
	{#if filteredPosts.length === 0}
		<div class="py-16 text-center">
			<div
				class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full"
				style="background: rgba(168, 90, 77, 0.1);"
			>
				<svg class="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #a85a4d;">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
					/>
				</svg>
			</div>
			<h3 class="mb-2 text-xl font-semibold" style="color: #2c2622;">No posts found</h3>
			<p style="color: #6b6460;">Try selecting a different category to see more blog posts.</p>
		</div>
	{/if}
</div>
