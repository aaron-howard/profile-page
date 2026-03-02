<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="mx-auto max-w-4xl px-4 py-16 text-center">
	<!-- Error Header -->
	<div class="mb-8">
		<h1 class="mb-4 text-6xl font-bold text-slate-900">
			{$page.status}
		</h1>
		<p class="text-xl text-slate-600">
			{#if $page.status === 404}
				Page Not Found
			{:else if $page.status === 500}
				Internal Server Error
			{:else}
				An Error Occurred
			{/if}
		</p>
	</div>

	<!-- Error Message -->
	<div class="mb-12">
		<p class="mb-4 text-lg text-slate-700">
			{#if $page.status === 404}
				The page you're looking for doesn't exist. It might have been moved or deleted.
			{:else if $page.status === 500}
				Something went wrong on our end. Please try again later.
			{:else}
				An unexpected error occurred: {$page.error?.message || 'Unknown error'}
			{/if}
		</p>

		{#if $page.error?.message && $page.status !== 404 && $page.status !== 500}
			<details class="mb-8 inline-block text-left">
				<summary class="cursor-pointer font-medium text-slate-600 hover:text-slate-900">
					Error Details
				</summary>
				<pre class="mt-2 overflow-auto rounded bg-slate-100 p-4 text-sm text-slate-800">
{$page.error.message}</pre>
			</details>
		{/if}
	</div>

	<!-- Action Buttons -->
	<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
		<a
			href="/"
			class="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
		>
			Go Home
		</a>

		<button
			on:click={() => window.history.back()}
			class="inline-block rounded-lg bg-slate-200 px-6 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-300 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
		>
			Go Back
		</button>
	</div>

	<!-- Support -->
	<div class="mt-12 border-t border-slate-200 pt-8">
		<p class="text-slate-600">
			If you believe this is a mistake, please
			<a href="/contact" class="font-medium text-blue-600 hover:text-blue-800">contact us</a>.
		</p>
	</div>
</div>
