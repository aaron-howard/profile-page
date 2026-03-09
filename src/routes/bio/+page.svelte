<script lang="ts">
	let { data } = $props<{ data: { bio: Record<string, unknown> } }>();
	const bio = $derived(data.bio);

	// Parse experience and education from JSON (stored as JSON in database)
	const experience = $derived(
		(bio.experience || []) as Array<{
			title: string;
			company: string;
			period: string;
			description: string;
		}>
	);

	// These would be additional fields if needed - for now they're not stored
	const education: Array<{
		degree: string;
		school: string;
		period: string;
		description: string;
	}> = [];

	const interests: string[] = [];
</script>

<div class="mx-auto max-w-4xl">
	<!-- Header -->
	<div class="mb-12 text-center">
		<h1 class="mb-4 text-4xl font-bold text-slate-900">About Me</h1>
		<p class="mx-auto max-w-3xl text-xl text-slate-600">{bio.about}</p>
	</div>

	<!-- Personal Info -->
	<div class="mb-8 rounded-lg bg-white p-8 shadow-md">
		<h2 class="mb-6 text-2xl font-semibold text-slate-900">Personal Information</h2>
		<div class="grid gap-6 md:grid-cols-2">
			<div>
				<h3 class="mb-2 font-medium text-slate-700">Name</h3>
				<p class="text-slate-900">{bio.name}</p>
			</div>
			<div>
				<h3 class="mb-2 font-medium text-slate-700">Title</h3>
				<p class="text-slate-900">{bio.title}</p>
			</div>
			<div>
				<h3 class="mb-2 font-medium text-slate-700">Location</h3>
				<p class="text-slate-900">{bio.location}</p>
			</div>
			<div>
				<h3 class="mb-2 font-medium text-slate-700">Experience</h3>
				<p class="text-slate-900">5+ years in web development</p>
			</div>
		</div>
	</div>

	<!-- Skills -->
	<div class="mb-8 rounded-lg bg-white p-8 shadow-md">
		<h2 class="mb-6 text-2xl font-semibold text-slate-900">Skills & Technologies</h2>

		<div class="grid gap-8 md:grid-cols-2">
			<div>
				<h3 class="mb-4 text-lg font-medium text-slate-900">Frontend</h3>
				<div class="flex flex-wrap gap-2">
					{#each bio.skillsFrontend as string[] as skill (skill)}
						<span
							class="rounded-full px-3 py-1 text-sm font-medium"
							style="background-color: var(--color-sage-blue-light); color: var(--color-sage-blue);"
							>{skill}</span
						>
					{/each}
				</div>
			</div>

			<div>
				<h3 class="mb-4 text-lg font-medium text-slate-900">Backend</h3>
				<div class="flex flex-wrap gap-2">
					{#each bio.skillsBackend as string[] as skill (skill)}
						<span
							class="rounded-full px-3 py-1 text-sm font-medium"
							style="background-color: var(--color-rust-clay-light); color: var(--color-rust-clay);"
							>{skill}</span
						>
					{/each}
				</div>
			</div>

			<div>
				<h3 class="mb-4 text-lg font-medium text-slate-900">Tools & Platforms</h3>
				<div class="flex flex-wrap gap-2">
					{#each bio.skillsTools as string[] as tool (tool)}
						<span
							class="rounded-full px-3 py-1 text-sm font-medium"
							style="background-color: var(--color-terracotta-light); color: var(--color-terracotta);"
							>{tool}</span
						>
					{/each}
				</div>
			</div>

			<div>
				<h3 class="mb-4 text-lg font-medium text-slate-900">Programming Languages</h3>
				<div class="flex flex-wrap gap-2">
					{#each bio.skillsLanguages as string[] as language (language)}
						<span
							class="rounded-full px-3 py-1 text-sm font-medium"
							style="background-color: var(--color-ochre-light); color: var(--color-ochre);"
							>{language}</span
						>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Experience -->
	{#if experience.length > 0}
		<div class="mb-8 rounded-lg bg-white p-8 shadow-md">
			<h2 class="mb-6 text-2xl font-semibold text-slate-900">Work Experience</h2>

			<div class="space-y-6">
				{#each experience as job (job.title + job.company + job.period)}
					<div class="border-l-4 border-blue-500 pl-6">
						<div class="mb-2 flex items-start justify-between">
							<h3 class="text-lg font-semibold text-slate-900">{job.title}</h3>
							<span class="rounded bg-slate-100 px-2 py-1 text-sm text-slate-500">{job.period}</span
							>
						</div>
						<p class="mb-2 font-medium text-blue-600">{job.company}</p>
						<p class="text-slate-600">{job.description}</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Education -->
	{#if education.length > 0}
		<div class="mb-8 rounded-lg bg-white p-8 shadow-md">
			<h2 class="mb-6 text-2xl font-semibold text-slate-900">Education</h2>

			<div class="space-y-6">
				{#each education as edu (edu.degree + edu.school + edu.period)}
					<div class="border-l-4 border-green-500 pl-6">
						<div class="mb-2 flex items-start justify-between">
							<h3 class="text-lg font-semibold text-slate-900">{edu.degree}</h3>
							<span class="rounded bg-slate-100 px-2 py-1 text-sm text-slate-500">{edu.period}</span
							>
						</div>
						<p class="mb-2 font-medium text-green-600">{edu.school}</p>
						<p class="text-slate-600">{edu.description}</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Interests -->
	{#if interests.length > 0}
		<div class="rounded-lg bg-white p-8 shadow-md">
			<h2 class="mb-6 text-2xl font-semibold text-slate-900">Interests & Hobbies</h2>
			<div class="flex flex-wrap gap-3">
				{#each interests as interest (interest)}
					<span class="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
						>{interest}</span
					>
				{/each}
			</div>
		</div>
	{/if}
</div>
