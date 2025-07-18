<script lang="ts">
	// Customize this data with your actual blog posts
	const blogPosts = [
		{
			id: 1,
			title: 'Building Scalable Web Applications with SvelteKit',
			excerpt:
				"Learn how to create high-performance web applications using SvelteKit's modern architecture and best practices for scalability.",
			content:
				"SvelteKit is revolutionizing how we build web applications. In this comprehensive guide, I'll walk you through the key concepts and best practices for building scalable applications...",
			author: 'Your Name',
			date: '2024-01-15',
			category: 'Development',
			readTime: '8 min read',
			featured: true,
			tags: ['SvelteKit', 'Web Development', 'Performance']
		},
		{
			id: 2,
			title: "The Future of Frontend Development: What's Next?",
			excerpt:
				'Exploring emerging trends and technologies that will shape the future of frontend development in the coming years.',
			content:
				'The frontend development landscape is constantly evolving. From new frameworks to innovative tools, developers need to stay ahead of the curve...',
			author: 'Your Name',
			date: '2024-01-10',
			category: 'Technology',
			readTime: '6 min read',
			featured: true,
			tags: ['Frontend', 'Trends', 'Technology']
		},
		{
			id: 3,
			title: 'Optimizing Database Performance in Node.js Applications',
			excerpt:
				'Practical tips and techniques for improving database performance in Node.js applications, from query optimization to connection pooling.',
			content:
				"Database performance is crucial for any application's success. In this post, I'll share practical strategies I've learned from optimizing various Node.js applications...",
			author: 'Your Name',
			date: '2024-01-05',
			category: 'Backend',
			readTime: '10 min read',
			featured: false,
			tags: ['Node.js', 'Database', 'Performance']
		},
		{
			id: 4,
			title: 'CSS Grid vs Flexbox: When to Use Each',
			excerpt:
				'A detailed comparison of CSS Grid and Flexbox, with practical examples showing when to use each layout system.',
			content:
				'CSS Grid and Flexbox are both powerful layout systems, but they serve different purposes. Understanding when to use each can significantly improve your CSS skills...',
			author: 'Your Name',
			date: '2023-12-28',
			category: 'CSS',
			readTime: '7 min read',
			featured: false,
			tags: ['CSS', 'Grid', 'Flexbox']
		},
		{
			id: 5,
			title: "Getting Started with TypeScript: A Beginner's Guide",
			excerpt:
				'Everything you need to know to start using TypeScript in your projects, from basic concepts to advanced features.',
			content:
				'TypeScript has become an essential tool for modern JavaScript development. This guide will help you understand the basics and get started quickly...',
			author: 'Your Name',
			date: '2023-12-20',
			category: 'Development',
			readTime: '12 min read',
			featured: false,
			tags: ['TypeScript', 'JavaScript', 'Tutorial']
		},
		{
			id: 6,
			title: 'Deploying Applications with Docker: Best Practices',
			excerpt:
				'Learn the best practices for containerizing and deploying applications with Docker, including security considerations and optimization tips.',
			content:
				"Docker has simplified application deployment, but there are still important best practices to follow. Here's what I've learned from deploying numerous applications...",
			author: 'Your Name',
			date: '2023-12-15',
			category: 'DevOps',
			readTime: '9 min read',
			featured: false,
			tags: ['Docker', 'DevOps', 'Deployment']
		}
	];

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
		<h1 class="mb-4 text-4xl font-bold text-slate-900">Blog</h1>
		<p class="mx-auto max-w-3xl text-xl text-slate-600">
			Thoughts, tutorials, and insights about web development, technology, and the industry.
		</p>
	</div>

	<!-- Filter Buttons -->
	<div class="mb-12 flex justify-center">
		<div class="flex flex-wrap gap-4">
			{#each categories as category}
				<button
					on:click={() => filterPosts(category.id)}
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

	<!-- Featured Posts -->
	{#if selectedCategory === 'all' || filteredPosts.some((p) => p.featured)}
		<div class="mb-16">
			<h2 class="mb-8 text-2xl font-semibold text-slate-900">Featured Posts</h2>
			<div class="grid gap-8 lg:grid-cols-2">
				{#each filteredPosts.filter((p) => p.featured) as post}
					<article
						class="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl"
					>
						<div
							class="flex h-48 items-center justify-center bg-gradient-to-br from-purple-500 to-pink-600"
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
								<span class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
									>{post.category}</span
								>
								<span class="text-sm text-slate-500">{post.readTime}</span>
							</div>
							<h3 class="mb-3 text-xl font-semibold text-slate-900">{post.title}</h3>
							<p class="mb-4 text-slate-600">{post.excerpt}</p>

							<div class="mb-6 flex flex-wrap gap-2">
								{#each post.tags as tag}
									<span class="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700"
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
									<span class="text-sm text-slate-600">{post.author}</span>
								</div>
								<span class="text-sm text-slate-500">{formatDate(post.date)}</span>
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
				class="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
			>
				<div
					class="flex h-40 items-center justify-center bg-gradient-to-br from-green-500 to-blue-600"
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
						<span class="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
							>{post.category}</span
						>
						<span class="text-xs text-slate-500">{post.readTime}</span>
					</div>
					<h3 class="mb-2 text-lg font-semibold text-slate-900">{post.title}</h3>
					<p class="mb-4 line-clamp-3 text-sm text-slate-600">{post.excerpt}</p>

					<div class="mb-4 flex flex-wrap gap-1">
						{#each post.tags.slice(0, 2) as tag}
							<span class="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700"
								>{tag}</span
							>
						{/each}
						{#if post.tags.length > 2}
							<span class="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700"
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
							<span class="text-xs text-slate-600">{post.author}</span>
						</div>
						<span class="text-xs text-slate-500">{formatDate(post.date)}</span>
					</div>
				</div>
			</article>
		{/each}
	</div>

	<!-- Empty State -->
	{#if filteredPosts.length === 0}
		<div class="py-16 text-center">
			<div
				class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100"
			>
				<svg class="h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
					/>
				</svg>
			</div>
			<h3 class="mb-2 text-xl font-semibold text-slate-900">No posts found</h3>
			<p class="text-slate-600">Try selecting a different category to see more blog posts.</p>
		</div>
	{/if}
</div>
