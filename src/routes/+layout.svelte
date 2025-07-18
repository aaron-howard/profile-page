<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
	<!-- Navigation Header -->
	<header class="border-b border-slate-200 bg-white shadow-sm">
		<nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center">
					<h1 class="text-xl font-bold text-slate-900">Your Name</h1>
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
	<main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="mt-16 border-t border-slate-200 bg-white">
		<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<div class="text-center text-slate-600">
				<p>&copy; 2024 Your Name. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>
