<script lang="ts">
	import { projectImageSrc, projectWebpSrc } from '$lib/project-image';

	let {
		imagePath,
		alt = '',
		class: imgClass = '',
		loading = 'lazy',
		decoding = 'async' as 'async' | 'auto' | 'sync',
		imgError
	}: {
		imagePath: string | null | undefined;
		alt?: string;
		class?: string;
		loading?: 'lazy' | 'eager';
		decoding?: 'async' | 'auto' | 'sync';
		imgError?: (ev: Event) => void;
	} = $props();

	const fallback = $derived(projectImageSrc(imagePath));
	const webp = $derived(projectWebpSrc(imagePath));
</script>

{#if fallback}
	{#if webp}
		<picture>
			<source srcset={webp} type="image/webp" />
			<img src={fallback} {alt} class={imgClass} {loading} {decoding} onerror={imgError} />
		</picture>
	{:else}
		<img src={fallback} {alt} class={imgClass} {loading} {decoding} onerror={imgError} />
	{/if}
{/if}
