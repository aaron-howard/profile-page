<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import { page } from '$app/stores';

	let { children } = $props<{ children: Snippet }>();
	let mobileMenuOpen = $state(false);

	const nav = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/contact', label: 'Contact' }
	];

	function navClass(href: string, path: string): string {
		const active = href === '/' ? path === '/' : path === href || path.startsWith(href + '/');
		return active
			? 'font-headline font-bold tracking-tight text-on-surface border-b-2 border-primary pb-0.5'
			: 'font-headline font-bold tracking-tight text-secondary transition-colors duration-300 hover:text-on-surface';
	}
</script>

<div class="min-h-screen bg-background font-body text-on-surface antialiased">
	<nav
		class="fixed top-0 z-50 w-full bg-surface/80 backdrop-blur-xl backdrop-saturate-150"
		aria-label="Primary"
	>
		<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-8 md:py-6">
			<a href="/" class="font-headline text-xl font-extrabold tracking-tighter text-on-surface">
				Aaron Howard
			</a>
			<div class="hidden items-center gap-10 md:flex">
				{#each nav as item (item.href)}
					<a href={item.href} class={navClass(item.href, $page.url.pathname)}>{item.label}</a>
				{/each}
				<a
					href="/contact"
					class="scale-102 rounded-md bg-primary px-6 py-2 font-headline font-bold text-on-primary"
				>
					Hire Me
				</a>
			</div>
			<div class="md:hidden">
				<button
					type="button"
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					class="p-2 text-on-surface"
					aria-label="Toggle menu"
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
		{#if mobileMenuOpen}
			<div
				class="border-t border-outline-variant/15 bg-surface/95 px-4 py-4 backdrop-blur-xl md:hidden"
			>
				<div class="flex flex-col gap-1">
					{#each nav as item (item.href)}
						<a
							href={item.href}
							class="rounded-md px-3 py-3 font-headline font-semibold text-on-surface"
							onclick={() => (mobileMenuOpen = false)}
						>
							{item.label}
						</a>
					{/each}
					<a
						href="/contact"
						class="mt-2 rounded-md bg-primary px-3 py-3 text-center font-headline font-bold text-on-primary"
						onclick={() => (mobileMenuOpen = false)}
					>
						Hire Me
					</a>
				</div>
			</div>
		{/if}
	</nav>

	<main class="w-full px-6 pb-16 pt-24 md:px-8 md:pt-28">
		{@render children()}
	</main>

	<footer class="w-full bg-surface-container-highest py-16 md:py-20">
		<div
			class="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 md:flex-row md:justify-between md:px-8"
		>
			<a href="/" class="font-headline text-2xl font-bold text-on-surface">Aaron Howard</a>
			<nav class="flex flex-wrap justify-center gap-8 md:gap-12" aria-label="Footer">
				{#each nav as item (item.href)}
					<a
						href={item.href}
						class="font-body text-xs uppercase tracking-widest text-secondary transition-colors hover:text-primary"
					>
						{item.label}
					</a>
				{/each}
			</nav>
			<p class="font-body text-center text-xs uppercase tracking-widest text-secondary">
				© {new Date().getFullYear()} Aaron Howard
			</p>
		</div>
	</footer>
</div>
