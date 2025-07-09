<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
	<!-- Navigation Header -->
	<header class="bg-white shadow-sm border-b border-slate-200">
		<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-16">
				<div class="flex items-center">
					<h1 class="text-xl font-bold text-slate-900">Your Name</h1>
				</div>
				<div class="hidden md:block">
					<div class="ml-10 flex items-baseline space-x-4">
						<a href="/" class="text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">Home</a>
						<a href="/bio" class="text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">Bio</a>
						<a href="/projects" class="text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">Projects</a>
						<a href="/blog" class="text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">Blog</a>
						<a href="/contact" class="text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
					</div>
				</div>
				<!-- Mobile menu button -->
				<div class="md:hidden">
					<button type="button" class="text-slate-700 hover:text-slate-900 p-2">
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>
				</div>
			</div>
		</nav>
	</header>

	<!-- Main Content -->
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="bg-white border-t border-slate-200 mt-16">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div class="text-center text-slate-600">
				<p>&copy; 2024 Your Name. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>
