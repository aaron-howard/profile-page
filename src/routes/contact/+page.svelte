<script lang="ts">
	// Customize this data with your information
	const contactData = {
		name: 'Aaron Howard',
		email: 'mr.aaronjhoward@outlook.com',
		location: 'Irving, TX, USA',
		phone: '+1 (459) 964-2476',
		socialLinks: {
			github: 'https://github.com/aaron-howard',
			linkedin: 'https://linkedin.com/in/aaronjhoward/',
			bluesky: 'https://bsky.app/profile/aaronjhoward.bsky.social',
			twitter: 'https://twitter.com/aaronjhoward',
			instagram: 'https://instagram.com/aaronjhoward'
		},
		availability: "I'm currently available for freelance work opportunities.",
		responseTime: 'I typically respond within 24 hours.'
	};

	let formData = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};

	let isSubmitting = false;
	let submitMessage = '';

	function handleSubmit() {
		isSubmitting = true;

		// Simulate form submission
		setTimeout(() => {
			isSubmitting = false;
			submitMessage = "Thank you for your message! I'll get back to you soon.";

			// Reset form
			formData = {
				name: '',
				email: '',
				subject: '',
				message: ''
			};

			// Clear message after 5 seconds
			setTimeout(() => {
				submitMessage = '';
			}, 5000);
		}, 2000);
	}
</script>

<div class="mx-auto max-w-6xl">
	<!-- Header -->
	<div class="mb-12 text-center">
		<h1 class="mb-4 text-4xl font-bold text-heading">Get In Touch</h1>
		<p class="mx-auto max-w-3xl text-xl text-body">
			I'm always interested in hearing about new opportunities, collaborations, or just having a
			chat about technology and development.
		</p>
	</div>

	<div class="grid gap-12 lg:grid-cols-2">
		<!-- Contact Information -->
		<div class="space-y-8">
			<!-- Personal Info -->
			<div class="card p-8 card-elevated">
				<h2 class="mb-6 text-2xl font-semibold text-heading">Contact Information</h2>

				<div class="space-y-6">
					<div class="flex items-center gap-4">
						<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-100">
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
						<div>
							<h3 class="font-medium text-heading">Name</h3>
							<p class="text-body">{contactData.name}</p>
						</div>
					</div>

					<div class="flex items-center gap-4">
						<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-200">
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
									d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<div>
							<h3 class="font-medium text-heading">Email</h3>
							<a href="mailto:{contactData.email}" class="text-accent hover:text-accent-700"
								>{contactData.email}</a
							>
						</div>
					</div>

					<div class="flex items-center gap-4">
						<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-200">
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
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						</div>
						<div>
							<h3 class="font-medium text-heading">Location</h3>
							<p class="text-body">{contactData.location}</p>
						</div>
					</div>

					<div class="flex items-center gap-4">
						<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-100">
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
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
								/>
							</svg>
						</div>
						<div>
							<h3 class="font-medium text-heading">Phone</h3>
							<a href="tel:{contactData.phone}" class="text-accent hover:text-accent-700"
								>{contactData.phone}</a
							>
						</div>
					</div>
				</div>
			</div>

			<!-- Social Links -->
			<div class="card p-8 card-elevated">
				<h2 class="mb-6 text-2xl font-semibold text-heading">Follow Me</h2>

				<div class="grid grid-cols-2 gap-4">
					<a
						href={contactData.socialLinks.github}
						class="flex items-center gap-3 rounded-lg bg-surface-alt p-4 transition-colors hover:bg-primary-200/60"
					>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
							/>
						</svg>
						<span class="font-medium text-heading">GitHub</span>
					</a>

					<a
						href={contactData.socialLinks.linkedin}
						class="flex items-center gap-3 rounded-lg bg-surface-alt p-4 transition-colors hover:bg-primary-200/60"
					>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
							/>
						</svg>
						<span class="font-medium text-heading">LinkedIn</span>
					</a>

					<a
						href={contactData.socialLinks.twitter}
						class="flex items-center gap-3 rounded-lg bg-surface-alt p-4 transition-colors hover:bg-primary-200/60"
					>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
							/>
						</svg>
						<span class="font-medium text-heading">Twitter</span>
					</a>

					<a
						href={contactData.socialLinks.instagram}
						class="flex items-center gap-3 rounded-lg bg-surface-alt p-4 transition-colors hover:bg-primary-200/60"
					>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z"
							/>
						</svg>
						<span class="font-medium text-heading">Instagram</span>
					</a>
				</div>
			</div>

			<!-- Availability -->
			<div class="rounded-lg bg-accent-gradient p-8 text-white">
				<h2 class="mb-4 text-2xl font-semibold">Current Availability</h2>
				<p class="mb-4">{contactData.availability}</p>
				<p class="text-blue-100">{contactData.responseTime}</p>
			</div>
		</div>

		<!-- Contact Form -->
		<div class="card p-8 card-elevated">
			<h2 class="mb-6 text-2xl font-semibold text-heading">Send Me a Message</h2>

			<form on:submit|preventDefault={handleSubmit} class="space-y-6">
				<div>
					<label for="name" class="mb-2 block text-sm font-medium text-body">Name</label>
					<input
						type="text"
						id="name"
						bind:value={formData.name}
						required
						class="w-full rounded-lg border border-base px-4 py-3 focus:border-accent focus:ring-2 focus:ring-accent-500"
						placeholder="Your name"
					/>
				</div>

				<div>
					<label for="email" class="mb-2 block text-sm font-medium text-body">Email</label>
					<input
						type="email"
						id="email"
						bind:value={formData.email}
						required
						class="w-full rounded-lg border border-base px-4 py-3 focus:border-accent focus:ring-2 focus:ring-accent-500"
						placeholder="your.email@example.com"
					/>
				</div>

				<div>
					<label for="subject" class="mb-2 block text-sm font-medium text-body">Subject</label>
					<input
						type="text"
						id="subject"
						bind:value={formData.subject}
						required
						class="w-full rounded-lg border border-base px-4 py-3 focus:border-accent focus:ring-2 focus:ring-accent-500"
						placeholder="What's this about?"
					/>
				</div>

				<div>
					<label for="message" class="mb-2 block text-sm font-medium text-body">Message</label>
					<textarea
						id="message"
						bind:value={formData.message}
						required
						rows="6"
						class="w-full resize-none rounded-lg border border-base px-4 py-3 focus:border-accent focus:ring-2 focus:ring-accent-500"
						placeholder="Tell me about your project, opportunity, or just say hello!"
					></textarea>
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					class="w-full btn btn-primary disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isSubmitting ? 'Sending...' : 'Send Message'}
				</button>
			</form>

			{#if submitMessage}
				<div class="mt-6 rounded-lg border border-success-600 bg-success-100 p-4 text-success-700">
					{submitMessage}
				</div>
			{/if}
		</div>
	</div>
</div>
