<script lang="ts">
	let { pageName = 'This page' }: { pageName?: string } = $props();
</script>

<div
	class="mb-8 rounded-md border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-on-surface"
	role="alert"
>
	<strong class="font-semibold">Content unavailable.</strong>
	{pageName} could not load data from the database. Check
	<code class="rounded bg-surface-container-high px-1">DATABASE_URL</code> and try again later.
</div>
