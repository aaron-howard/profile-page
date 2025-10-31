<script lang="ts">
    import '../app.css';
    import type { LayoutData } from './$types';
    let { children, data } = $props<{ children: any; data: LayoutData }>();
    const isLoggedIn = !!data?.session;
    let mobileMenuOpen = $state(false);
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
	<!-- Navigation Header -->
	<header class="border-b border-slate-200 bg-white shadow-sm">
		<nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center">
					<h1 class="text-xl font-bold text-slate-900">Aaron Howard</h1>
				</div>
                <div class="hidden md:block">
					<div class="ml-10 flex items-baseline space-x-4">
						<a
							href="/"
							class="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
							>Home</a
						>
						<a
							href="/bio"
							class="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
							>Bio</a
						>
						<a
							href="/projects"
							class="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
							>Projects</a
						>
						<a
							href="/blog"
							class="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
							>Blog</a
						>
                        <a
							href="/contact"
							class="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
							>Contact</a
						>
                        {#if isLoggedIn}
                            <a href="/logout" class="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900">Logout</a>
                        {:else}
                            <a href="/login" class="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900">Login</a>
                        {/if}
					</div>
				</div>
				<!-- Mobile menu button -->
				<div class="md:hidden">
					<button
						type="button"
						onclick={() => mobileMenuOpen = !mobileMenuOpen}
						class="p-2 text-slate-700 hover:text-slate-900"
						aria-label="Toggle mobile menu"
						aria-expanded={mobileMenuOpen}
					>
						{#if mobileMenuOpen}
							<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						{:else}
							<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						{/if}
					</button>
				</div>
			</div>
			<!-- Mobile menu -->
			{#if mobileMenuOpen}
				<div class="md:hidden">
					<div class="space-y-1 px-2 pb-3 pt-2">
						<a href="/" class="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900">Home</a>
						<a href="/bio" class="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900">Bio</a>
						<a href="/projects" class="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900">Projects</a>
						<a href="/blog" class="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900">Blog</a>
						<a href="/contact" class="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900">Contact</a>
						{#if isLoggedIn}
							<a href="/logout" class="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900">Logout</a>
						{:else}
							<a href="/login" class="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:text-slate-900">Login</a>
						{/if}
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
	<footer class="mt-16 border-t border-slate-200 bg-white">
		<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<div class="text-center text-slate-600">
				<p>&copy; 2025 Aaron Howard. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>
