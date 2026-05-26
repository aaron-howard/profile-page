<script lang="ts">
	let {
		title,
		description = 'Portfolio of Aaron Howard — full stack developer building digital experiences.'
	}: {
		title: string;
		description?: string;
	} = $props();

	const fullTitle = $derived(title.includes('Aaron Howard') ? title : `${title} | Aaron Howard`);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
</svelte:head>
