<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	let { children } = $props<{ children: Snippet }>();
	let mobileMenuOpen = $state(false);
</script>

<div class="min-h-screen" style="background: linear-gradient(135deg, #faf8f3 0%, #f5f3f0 100%);">
	<!-- Navigation Header -->
	<header class="border-b shadow-sm" style="background: #ffffff; border-color: #e8e6e3;">
		<nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center">
					<h1 class="text-xl font-bold" style="color: #2c2622;">Aaron Howard</h1>
				</div>
				<div class="hidden md:block">
					<div class="ml-10 flex items-baseline space-x-4">
						<a
							href="/"
							class="rounded-md px-3 py-2 text-sm font-medium transition-colors"
							style="color: #6b6460; hover:color: #2c2622;">Home</a
						>
						<a
							href="/bio"
							class="rounded-md px-3 py-2 text-sm font-medium transition-colors"
							style="color: #6b6460;">Bio</a
						>
						<a
							href="/projects"
							class="rounded-md px-3 py-2 text-sm font-medium transition-colors"
							style="color: #6b6460;">Projects</a
						>
						<a
							href="/blog"
							class="rounded-md px-3 py-2 text-sm font-medium transition-colors"
							style="color: #6b6460;">Blog</a
						>
						<a
							href="/contact"
							class="rounded-md px-3 py-2 text-sm font-medium transition-colors"
							style="color: #6b6460;">Contact</a
						>
					</div>
				</div>
				<!-- Mobile menu button -->
				<div class="md:hidden">
					<button
						type="button"
						onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
						class="p-2 transition-colors"
						style="color: #6b6460;"
						aria-label="Toggle mobile menu"
						aria-expanded={mobileMenuOpen}
					>
						{#if mobileMenuOpen}
							<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						{:else}
							<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						{/if}
					</button>
				</div>
			</div>
			<!-- Mobile menu -->
			{#if mobileMenuOpen}
				<div class="md:hidden">
					<div class="space-y-1 px-2 pb-3 pt-2">
						<a
							href="/"
							class="block rounded-md px-3 py-2 text-base font-medium transition-colors"
							style="color: #6b6460;">Home</a
						>
						<a
							href="/bio"
							class="block rounded-md px-3 py-2 text-base font-medium transition-colors"
							style="color: #6b6460;">Bio</a
						>
						<a
							href="/projects"
							class="block rounded-md px-3 py-2 text-base font-medium transition-colors"
							style="color: #6b6460;">Projects</a
						>
						<a
							href="/blog"
							class="block rounded-md px-3 py-2 text-base font-medium transition-colors"
							style="color: #6b6460;">Blog</a
						>
						<a
							href="/contact"
							class="block rounded-md px-3 py-2 text-base font-medium transition-colors"
							style="color: #6b6460;">Contact</a
						>
					</div>
				</div>
			{/if}
		</nav>
	</header>

	<!-- Main Content -->
	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="mt-16" style="background: #ffffff; border-top: 1px solid #e8e6e3;">
		<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<div class="text-center" style="color: #9b8b7e;">
				<p>&copy; 2025 Aaron Howard. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>
