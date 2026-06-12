<script lang="ts">
	import type { PageData } from './$types';
	import ProjectPicture from '$lib/components/ProjectPicture.svelte';
	import { safeProjectUrl } from '$lib/project-utils';
	import SeoHead from '$lib/components/SeoHead.svelte';

	let { data } = $props<{ data: PageData }>();

	const project = $derived(data.project);
	const githubUrl = $derived(safeProjectUrl(project.github));
	const liveUrl = $derived(safeProjectUrl(project.live));
</script>

<SeoHead title={project.title} description={project.description} />

<article class="mx-auto max-w-3xl">
	<a href="/projects" class="mb-8 inline-block text-sm font-medium text-primary hover:underline">
		← Back to projects
	</a>

	{#if project.image}
		<div class="mb-8 aspect-video w-full overflow-hidden rounded-xl">
			<ProjectPicture
				imagePath={project.image}
				alt={project.title}
				class="h-full w-full object-cover"
				loading="lazy"
			/>
		</div>
	{/if}

	<h1 class="mb-4 font-headline text-4xl font-extrabold tracking-tight text-on-surface">
		{project.title}
	</h1>
	<p class="mb-6 text-lg text-secondary">{project.description}</p>

	<div class="mb-8 flex flex-wrap gap-2">
		{#each project.technologies as tech (tech)}
			<span
				class="rounded px-2 py-1 text-xs font-medium uppercase tracking-wide text-secondary bg-secondary-container/10"
				>{tech}</span
			>
		{/each}
	</div>

	<div class="flex flex-wrap gap-4">
		{#if githubUrl}
			<a
				href={githubUrl}
				class="scale-102 rounded-md bg-primary px-6 py-3 font-headline font-semibold text-on-primary"
				rel="noopener noreferrer"
				target="_blank"
			>
				View code
			</a>
		{/if}
		{#if liveUrl}
			<a
				href={liveUrl}
				class="scale-102 rounded-md bg-surface-container-high px-6 py-3 font-headline font-semibold text-on-surface"
				rel="noopener noreferrer"
				target="_blank"
			>
				Live demo
			</a>
		{/if}
	</div>
</article>
