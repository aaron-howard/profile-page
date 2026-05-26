<script lang="ts">
	import type { PageData } from './$types';
	import { formatBlogDate, getAuthorInitials } from '$lib/blog-utils';
	import SeoHead from '$lib/components/SeoHead.svelte';

	let { data } = $props<{ data: PageData }>();
</script>

<SeoHead title={data.post.title} description={data.post.excerpt ?? data.post.title} />

<article class="mx-auto max-w-3xl">
	<a href="/blog" class="mb-8 inline-block text-sm font-medium text-primary hover:underline">
		← Back to blog
	</a>
	<header class="mb-10">
		<span
			class="mb-4 block font-body text-xs font-medium uppercase tracking-[0.3em] text-secondary"
		>
			{data.post.category}
		</span>
		<h1
			class="mb-4 font-headline text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl"
		>
			{data.post.title}
		</h1>
		<div class="flex flex-wrap items-center gap-4 text-secondary">
			<div class="flex items-center gap-2">
				<div
					class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary"
				>
					{getAuthorInitials(data.post.author)}
				</div>
				<span>{data.post.author}</span>
			</div>
			<span>{formatBlogDate(data.post.date)}</span>
			{#if data.post.readTime}<span>{data.post.readTime}</span>{/if}
		</div>
		{#if data.post.tags.length}
			<div class="mt-4 flex flex-wrap gap-2">
				{#each data.post.tags as tag (tag)}
					<span
						class="rounded px-2 py-1 text-xs font-medium uppercase tracking-wide text-secondary bg-secondary-container/10"
						>{tag}</span
					>
				{/each}
			</div>
		{/if}
	</header>

	<div class="prose prose-lg max-w-none text-on-surface">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- safeContent sanitized server-side -->
		{@html data.safeContent}
	</div>
</article>
