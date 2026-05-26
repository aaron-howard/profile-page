<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="mx-auto max-w-4xl px-4 py-16 text-center">
	<div class="mb-8">
		<h1 class="mb-4 font-headline text-6xl font-extrabold text-on-surface">
			{page.status}
		</h1>
		<p class="text-xl text-secondary">
			{#if page.status === 404}
				Page not found
			{:else if page.status === 500}
				Internal server error
			{:else}
				An error occurred
			{/if}
		</p>
	</div>

	<div class="mb-12">
		<p class="mb-4 text-lg text-on-surface">
			{#if page.status === 404}
				The page you're looking for doesn't exist. It might have been moved or deleted.
			{:else if page.status === 500}
				Something went wrong on our end. Please try again later.
			{:else}
				An unexpected error occurred: {page.error?.message || 'Unknown error'}
			{/if}
		</p>

		{#if page.error?.message && page.status !== 404 && page.status !== 500}
			<details class="mb-8 inline-block text-left">
				<summary class="cursor-pointer font-medium text-secondary hover:text-on-surface">
					Error details
				</summary>
				<pre
					class="mt-2 overflow-auto rounded-md bg-surface-container-low p-4 text-sm text-on-surface">
{page.error.message}</pre>
			</details>
		{/if}
	</div>

	<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
		<a
			href="/"
			class="scale-102 inline-block rounded-md bg-primary px-6 py-3 font-headline font-semibold text-on-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
		>
			Go home
		</a>

		<button
			type="button"
			onclick={() => window.history.back()}
			class="scale-102 inline-block rounded-md bg-surface-container-high px-6 py-3 font-headline font-semibold text-on-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-outline-variant focus-visible:ring-offset-2"
		>
			Go back
		</button>
	</div>

	<div class="mt-12 border-t border-outline-variant/20 pt-8">
		<p class="text-secondary">
			If you believe this is a mistake, please
			<a href="/contact" class="font-medium text-primary hover:underline">contact us</a>.
		</p>
	</div>
</div>
