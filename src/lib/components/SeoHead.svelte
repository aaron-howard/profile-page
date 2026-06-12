<script lang="ts">
	import { page } from '$app/state';

	let {
		title,
		description = 'Portfolio of Aaron Howard — full stack developer building digital experiences.',
		ogImagePath
	}: {
		title: string;
		description?: string;
		/** `undefined` → `/og-image.png`; `null` → omit image meta tags. */
		ogImagePath?: string | null;
	} = $props();

	const fullTitle = $derived(title.includes('Aaron Howard') ? title : `${title} | Aaron Howard`);
	const effectiveOgPath = $derived(ogImagePath === null ? null : (ogImagePath ?? '/og-image.png'));
	const ogImageAbsolute = $derived(
		effectiveOgPath ? new URL(effectiveOgPath, page.url.origin).href : null
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	{#if ogImageAbsolute}
		<meta property="og:image" content={ogImageAbsolute} />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={fullTitle} />
		<meta name="twitter:description" content={description} />
		<meta name="twitter:image" content={ogImageAbsolute} />
	{/if}
</svelte:head>
