<script lang="ts">
	// You can customize these values
	const profileData = {
		name: 'Aaron Howard',
		title: 'Full Stack Developer',
		tagline: 'Building modern web applications with passion and precision',
		avatar: '/avatar.jpg', // Add your avatar image to static folder
		socialLinks: {
			github: 'https://github.com/aaron-howard',
			linkedin: 'https://www.linkedin.com/in/aaronjhoward/',
			bluesky: 'https://bsky.app/profile/aaron-howard.bsky.social',
			email: 'mr.aaronjhoward@outlook.com'
		}
	};
</script>

<!-- Hero Section -->
<section class="py-20 text-center">
	<div class="mx-auto max-w-4xl">
		<div class="mb-8">
			<!-- Avatar placeholder - replace with your actual image -->
			<div
				class="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-4xl font-bold text-white"
			>
				{profileData.name
					.split(' ')
					.map((n) => n[0])
					.join('')}
			</div>
			<h1 class="mb-4 text-5xl font-bold text-slate-900">{profileData.name}</h1>
			<h2 class="mb-4 text-2xl font-semibold text-blue-600">{profileData.title}</h2>
			<p class="mx-auto max-w-2xl text-xl text-slate-600">{profileData.tagline}</p>
		</div>

		<!-- Social Links -->
		<div class="mb-12 flex justify-center space-x-6">
			<a
				href={profileData.socialLinks.github}
				class="text-slate-600 transition-colors hover:text-slate-900"
				aria-label="GitHub Profile"
			>
				<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
					<path
						d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
					/>
				</svg>
			</a>
			<a
				href={profileData.socialLinks.linkedin}
				class="text-slate-600 transition-colors hover:text-slate-900"
				aria-label="LinkedIn Profile"
			>
				<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
					<path
						d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
					/>
				</svg>
			</a>
			<a
				href={profileData.socialLinks.bluesky}
				class="text-slate-600 transition-colors hover:text-slate-900"
				aria-label="Bluesky Profile"
			>
				<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
					<path
						d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
					/>
				</svg>
			</a>
			<a
				href="mailto:{profileData.socialLinks.email}"
				class="text-slate-600 transition-colors hover:text-slate-900"
				aria-label="Send Email"
			>
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
					/>
				</svg>
			</a>
		</div>
	</div>
</section>

<!-- Sections Overview -->
<section class="py-16">
	<div class="mx-auto max-w-6xl">
		<h2 class="mb-12 text-center text-3xl font-bold text-slate-900">Explore My Work</h2>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
			<!-- Bio Section -->
			<a href="/bio" class="group">
				<div class="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 transition-colors group-hover:bg-blue-200"
					>
						<svg
							class="h-6 w-6 text-blue-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
					</div>
					<h3 class="mb-2 text-xl font-semibold text-slate-900">About Me</h3>
					<p class="text-slate-600">
						Learn about my background, skills, and what drives me as a developer.
					</p>
				</div>
			</a>

			<!-- Projects Section -->
			<a href="/projects" class="group">
				<div class="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 transition-colors group-hover:bg-green-200"
					>
						<svg
							class="h-6 w-6 text-green-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
							/>
						</svg>
					</div>
					<h3 class="mb-2 text-xl font-semibold text-slate-900">Projects</h3>
					<p class="text-slate-600">
						Explore my development projects and see what I've been working on.
					</p>
				</div>
			</a>

			<!-- Blog Section -->
			<a href="/blog" class="group">
				<div class="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 transition-colors group-hover:bg-purple-200"
					>
						<svg
							class="h-6 w-6 text-purple-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
							/>
						</svg>
					</div>
					<h3 class="mb-2 text-xl font-semibold text-slate-900">Blog</h3>
					<p class="text-slate-600">
						Read my thoughts on technology, development, and industry insights.
					</p>
				</div>
			</a>

			<!-- Contact Section -->
			<a href="/contact" class="group">
				<div class="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 transition-colors group-hover:bg-orange-200"
					>
						<svg
							class="h-6 w-6 text-orange-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<h3 class="mb-2 text-xl font-semibold text-slate-900">Contact</h3>
					<p class="text-slate-600">
						Get in touch with me for collaborations, opportunities, or just to say hello.
					</p>
				</div>
			</a>
		</div>
	</div>
</section>
