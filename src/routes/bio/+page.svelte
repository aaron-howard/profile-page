<script lang="ts">
	import bioData from '$lib/content/bio.json';
</script>

<div class="mx-auto max-w-4xl">
	<!-- Header -->
	<div class="mb-12 text-center">
		<h1 class="mb-4 text-4xl font-bold text-heading">About Me</h1>
		<p class="mx-auto max-w-3xl text-xl text-body">{bioData.about}</p>
	</div>

	<!-- Personal Info -->
	<div class="mb-8 card p-8 card-elevated">
		<h2 class="mb-6 text-2xl font-semibold text-heading">Personal Information</h2>
		<div class="grid gap-6 md:grid-cols-2">
			<div>
				<h3 class="mb-2 font-medium text-body">Name</h3>
				<p class="text-heading">{bioData.name}</p>
			</div>
			<div>
				<h3 class="mb-2 font-medium text-body">Title</h3>
				<p class="text-heading">{bioData.title}</p>
			</div>
			<div>
				<h3 class="mb-2 font-medium text-body">Location</h3>
				<p class="text-heading">{bioData.location}</p>
			</div>
			<div>
				<h3 class="mb-2 font-medium text-body">Experience</h3>
				<p class="text-heading">5+ years in web development</p>
			</div>
		</div>
	</div>

	<!-- Skills -->
	<div class="mb-8 card p-8 card-elevated">
		<h2 class="mb-6 text-2xl font-semibold text-heading">Skills & Technologies</h2>

		<div class="grid gap-8 md:grid-cols-2">
			<div>
				<h3 class="mb-4 text-lg font-medium text-heading">Frontend</h3>
				<div class="flex flex-wrap gap-2">
					{#each bioData.skills.frontend as skill}
						<span class="rounded-full badge-accent"
							>{skill}</span
						>
					{/each}
				</div>
			</div>

			<div>
				<h3 class="mb-4 text-lg font-medium text-heading">Backend</h3>
				<div class="flex flex-wrap gap-2">
					{#each bioData.skills.backend as skill}
						<span class="rounded-full badge"
							>{skill}</span
						>
					{/each}
				</div>
			</div>

			<div>
				<h3 class="mb-4 text-lg font-medium text-heading">Tools & Platforms</h3>
				<div class="flex flex-wrap gap-2">
					{#each bioData.skills.tools as tool}
						<span class="rounded-full badge"
							>{tool}</span
						>
					{/each}
				</div>
			</div>

			<div>
				<h3 class="mb-4 text-lg font-medium text-heading">Programming Languages</h3>
				<div class="flex flex-wrap gap-2">
					{#each bioData.skills.languages as language}
						<span class="rounded-full badge"
							>{language}</span
						>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Experience -->
	<div class="mb-8 card p-8 card-elevated">
		<h2 class="mb-6 text-2xl font-semibold text-heading">Work Experience</h2>

		<div class="space-y-6">
			{#each bioData.experience as job}
				<div class="border-l-4 border-accent pl-6">
					<div class="mb-2 flex items-start justify-between">
						<h3 class="text-lg font-semibold text-heading">{job.title}</h3>
						<span class="rounded bg-surface-alt px-2 py-1 text-sm text-muted">{job.period}</span>
					</div>
					<p class="mb-2 font-medium text-accent">{job.company}</p>
					<p class="text-body">{job.description}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Education -->
	<div class="mb-8 card p-8 card-elevated">
		<h2 class="mb-6 text-2xl font-semibold text-heading">Education</h2>

		<div class="space-y-6">
			{#each bioData.education as edu}
				<div class="border-l-4 border-primary-500 pl-6">
					<div class="mb-2 flex items-start justify-between">
						<h3 class="text-lg font-semibold text-heading">{edu.degree}</h3>
						<span class="rounded bg-surface-alt px-2 py-1 text-sm text-muted">{edu.period}</span>
					</div>
					<p class="mb-2 font-medium text-accent">{edu.school}</p>
					<p class="text-body">{edu.description}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Interests -->
	<div class="rounded-lg card p-8 card-elevated">
		<h2 class="mb-6 text-2xl font-semibold text-heading">Interests & Hobbies</h2>
		<div class="flex flex-wrap gap-3">
			{#each bioData.interests as interest}
				<span class="rounded-lg bg-surface-alt px-4 py-2 text-sm font-medium text-body"
					>{interest}</span
				>
			{/each}
		</div>
	</div>
</div>
