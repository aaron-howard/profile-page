<script lang="ts">
	import '../app.css';

	// This layout uses the standard Svelte <slot /> for content projection.
	// The previous Svelte 5 {@render children()} pattern and the `children` prop are no longer used,
	// to ensure compatibility with SvelteKit and to follow current best practices.
	let theme: 'light' | 'dark' = 'light';
	if (typeof window !== 'undefined') {
		theme = (localStorage.getItem('theme') as 'light' | 'dark') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
		updateRoot();
	}
	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		localStorage.setItem('theme', theme);
		updateRoot();
	}
	function updateRoot() {
		if (typeof document !== 'undefined') {
			document.documentElement.dataset.theme = theme;
		}
	}
</script>

<div class="min-h-screen bg-page">
	<!-- Navigation Header -->
	<header class="border-b border-base bg-surface shadow-sm">
		<nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Primary Navigation">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center gap-6">
					<h1 class="text-xl font-bold text-heading">Aaron Howard</h1>
					<button type="button" class="btn btn-ghost text-sm" on:click={toggleTheme} aria-label="Toggle theme">
						{theme === 'light' ? '🌙 Dark' : '☀️ Light'}
					</button>
				</div>
				<div class="hidden md:block">
					<div class="ml-10 flex items-baseline space-x-4 text-sm">
						<a
							href="/"
							class="rounded-md px-3 py-2 font-medium text-body hover:text-heading hover:bg-primary-200/50"
							>Home</a
						>
						<a
							href="/bio"
							class="rounded-md px-3 py-2 font-medium text-body hover:text-heading hover:bg-primary-200/50"
							>Bio</a
						>
						<a
							href="/projects"
							class="rounded-md px-3 py-2 font-medium text-body hover:text-heading hover:bg-primary-200/50"
							>Projects</a
						>
						<a
							href="/blog"
							class="rounded-md px-3 py-2 font-medium text-body hover:text-heading hover:bg-primary-200/50"
							>Blog</a
						>
						<a
							href="/contact"
							class="rounded-md px-3 py-2 font-medium text-body hover:text-heading hover:bg-primary-200/50"
							>Contact</a
						>
					</div>
				</div>
				<!-- Mobile menu button -->
				<div class="md:hidden">
					<button
						type="button"
						class="p-2 text-slate-700 hover:text-slate-900"
						aria-label="Toggle mobile menu"
					>
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>
			</div>
		</nav>
	</header>

	<!-- Main Content -->
	<main id="main" class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<slot />
	</main>

	<!-- Footer -->
	<footer class="mt-16 border-t border-base bg-surface">
		<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<div class="text-center text-muted">
				<p>&copy; 2025 Aaron Howard. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>
