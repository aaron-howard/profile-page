<script lang="ts">
	type Category = { id: string; name: string };

	let {
		categories,
		selectedId,
		onSelect
	}: {
		categories: Category[];
		selectedId: string;
		onSelect: (id: string) => void;
	} = $props();
</script>

<div class="mb-12 flex justify-center">
	<div class="flex flex-wrap gap-4">
		{#each categories as category (category.id)}
			<button
				onclick={() => onSelect(category.id)}
				type="button"
				aria-pressed={selectedId === category.id}
				class="rounded-md px-6 py-2 font-headline font-semibold transition-colors"
				class:bg-primary={selectedId === category.id}
				class:text-on-primary={selectedId === category.id}
				class:bg-surface-container-high={selectedId !== category.id}
				class:text-secondary={selectedId !== category.id}
				class:hover:bg-surface-container={selectedId !== category.id}
			>
				{category.name}
			</button>
		{/each}
	</div>
</div>
