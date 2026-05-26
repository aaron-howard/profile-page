<script lang="ts">
	import type { BlogPost } from '$lib/types';
	import { formatBlogDate, getAuthorInitials, getBlogCategoryColor } from '$lib/blog-utils';
	import BlogCategoryIcon from './BlogCategoryIcon.svelte';

	let { post, featured = false }: { post: BlogPost; featured?: boolean } = $props();

	const headerHeight = $derived(featured ? 'h-48' : 'h-40');
	const iconSize = $derived(featured ? 80 : 50);
	const detailHref = $derived(`/blog/${post.id}`);
	const tagList = $derived(featured ? post.tags : post.tags.slice(0, 2));
</script>

<article class="overflow-hidden rounded-xl bg-surface-container-lowest shadow-ambient">
	<a href={detailHref} class="block">
		<div
			class="flex {headerHeight} items-center justify-center"
			style="background: linear-gradient(135deg, {getBlogCategoryColor(
				post.category
			)}29 0%, {getBlogCategoryColor(post.category)}52 100%);"
		>
			<BlogCategoryIcon category={post.category} size={iconSize} />
		</div>
	</a>
	<div class="p-6">
		<div class="mb-3 flex items-center gap-3">
			<span
				class="rounded px-2 py-1 text-xs font-medium uppercase tracking-wide text-primary bg-secondary-container/10"
			>
				{post.category}
			</span>
			{#if post.readTime}<span class="text-xs text-secondary">{post.readTime}</span>{/if}
		</div>
		<h3 class="mb-2 font-headline text-lg font-bold text-on-surface">
			<a href={detailHref} class="hover:text-primary">{post.title}</a>
		</h3>
		{#if post.excerpt}<p class="mb-4 line-clamp-3 text-sm text-secondary">{post.excerpt}</p>{/if}
		<div class="mb-4 flex flex-wrap gap-1">
			{#each tagList as tag (tag)}
				<span
					class="rounded px-2 py-1 text-xs font-medium uppercase tracking-wide text-secondary bg-secondary-container/10"
					>{tag}</span
				>
			{/each}
			{#if !featured && post.tags.length > 2}
				<span
					class="rounded px-2 py-1 text-xs font-medium uppercase tracking-wide text-secondary bg-secondary-container/10"
					>+{post.tags.length - 2}</span
				>
			{/if}
		</div>
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<div
					class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary"
				>
					{getAuthorInitials(post.author)}
				</div>
				<span class="text-xs text-on-surface">{post.author || 'Unknown'}</span>
			</div>
			<span class="text-xs text-secondary">{formatBlogDate(post.date)}</span>
		</div>
	</div>
</article>
