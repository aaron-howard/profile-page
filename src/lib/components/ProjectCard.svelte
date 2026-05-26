<script lang="ts">
	import type { Project } from '$lib/types';
	import { getProjectCategoryColor, safeProjectUrl } from '$lib/project-utils';
	import { projectImageSrc } from '$lib/project-image';
	import ProjectCategoryIcon from './ProjectCategoryIcon.svelte';

	let {
		project,
		showImage = true
	}: {
		project: Project;
		showImage?: boolean;
	} = $props();

	const detailHref = $derived(`/projects/${project.id}`);
	const githubUrl = $derived(safeProjectUrl(project.github));
	const liveUrl = $derived(safeProjectUrl(project.live));
	const imageSrc = $derived(projectImageSrc(project.image));
</script>

<div class="overflow-hidden rounded-xl bg-surface-container-lowest shadow-ambient">
	<a href={detailHref} class="block">
		{#if showImage && imageSrc}
			<img src={imageSrc} alt="" class="h-40 w-full object-cover" loading="lazy" decoding="async" />
		{:else}
			<div
				class="flex h-40 items-center justify-center"
				style="background: linear-gradient(135deg, {getProjectCategoryColor(
					project.category
				)}29 0%, {getProjectCategoryColor(project.category)}52 100%);"
			>
				<ProjectCategoryIcon category={project.category} size={60} />
			</div>
		{/if}
	</a>
	<div class="p-6">
		<h3 class="mb-2 font-headline text-lg font-bold text-on-surface">
			<a href={detailHref} class="hover:text-primary">{project.title}</a>
		</h3>
		<p class="mb-4 line-clamp-3 text-sm text-secondary">{project.description}</p>
		<div class="mb-4 flex flex-wrap gap-1">
			{#each project.technologies.slice(0, 3) as tech (tech)}
				<span
					class="rounded px-2 py-1 text-xs font-medium uppercase tracking-wide text-secondary bg-secondary-container/10"
					>{tech}</span
				>
			{/each}
			{#if project.technologies.length > 3}
				<span
					class="rounded px-2 py-1 text-xs font-medium uppercase tracking-wide text-secondary bg-secondary-container/10"
					>+{project.technologies.length - 3}</span
				>
			{/if}
		</div>
		<div class="flex gap-2">
			{#if githubUrl}
				<a
					href={githubUrl}
					class="scale-102 flex-1 rounded-md bg-primary px-3 py-2 text-center font-headline text-sm font-semibold text-on-primary"
					rel="noopener noreferrer"
					target="_blank"
				>
					Code
				</a>
			{/if}
			{#if liveUrl}
				<a
					href={liveUrl}
					class="scale-102 flex-1 rounded-md bg-surface-container-high px-3 py-2 text-center font-headline text-sm font-semibold text-on-surface"
					rel="noopener noreferrer"
					target="_blank"
				>
					Demo
				</a>
			{/if}
			{#if !githubUrl && !liveUrl}
				<a
					href={detailHref}
					class="scale-102 flex-1 rounded-md bg-primary px-3 py-2 text-center font-headline text-sm font-semibold text-on-primary"
				>
					Details
				</a>
			{/if}
		</div>
	</div>
</div>
