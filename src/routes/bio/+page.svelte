<script lang="ts">
	let { data } = $props<{ data: { bio: Record<string, unknown> } }>();
	const bio = $derived(data.bio);

	const experience = $derived(
		(bio.experience || []) as Array<{
			title: string;
			company: string;
			period: string;
			description: string;
		}>
	);

	const education: Array<{
		degree: string;
		school: string;
		period: string;
		description: string;
	}> = [];

	const interests: string[] = [];
</script>

<div class="mx-auto max-w-4xl">
	<header class="mb-16 md:mb-24">
		<span
			class="mb-4 block font-body text-xs font-medium uppercase tracking-[0.3em] text-secondary"
		>
			Profile
		</span>
		<h1 class="font-headline text-4xl font-extrabold tracking-tight text-on-surface md:text-6xl">
			The philosophy of craft in every line of code.
		</h1>
		<p class="mt-8 max-w-2xl text-lg leading-relaxed text-secondary">
			{bio.about}
		</p>
	</header>

	<section class="mb-20 grid gap-12 md:grid-cols-2 md:items-start md:gap-20">
		<div
			class="flex aspect-[4/5] items-center justify-center rounded-xl bg-surface-container-highest font-headline text-7xl font-extrabold text-primary/25"
			aria-hidden="true"
		>
			{(bio.name as string)
				.split(' ')
				.map((n) => n[0])
				.join('')}
		</div>
		<div class="flex flex-col gap-8">
			<h2 class="font-headline text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl">
				{bio.name}
			</h2>
			<p class="text-lg text-secondary">{bio.title} · {bio.location}</p>
			<div class="grid grid-cols-2 gap-8 pt-2">
				<div>
					<span class="block font-headline text-3xl font-bold text-primary">5+</span>
					<span class="text-xs font-medium uppercase tracking-widest text-secondary"
						>Years building</span
					>
				</div>
				<div>
					<span class="block font-headline text-3xl font-bold text-primary">∞</span>
					<span class="text-xs font-medium uppercase tracking-widest text-secondary">Curiosity</span
					>
				</div>
			</div>
		</div>
	</section>

	<section class="mb-20 rounded-xl bg-surface-container-low p-8 md:p-12">
		<h2 class="mb-10 font-headline text-2xl font-bold text-on-surface md:text-3xl">
			Skills & technologies
		</h2>

		<div class="grid gap-12 md:grid-cols-2">
			<div>
				<h3 class="mb-4 font-body text-sm font-semibold uppercase tracking-widest text-secondary">
					Frontend
				</h3>
				<div class="flex flex-wrap gap-2">
					{#each bio.skillsFrontend as string[] as skill (skill)}
						<span
							class="rounded px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-secondary bg-secondary-container/10"
							>{skill}</span
						>
					{/each}
				</div>
			</div>

			<div>
				<h3 class="mb-4 font-body text-sm font-semibold uppercase tracking-widest text-secondary">
					Backend
				</h3>
				<div class="flex flex-wrap gap-2">
					{#each bio.skillsBackend as string[] as skill (skill)}
						<span
							class="rounded px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-secondary bg-secondary-container/10"
							>{skill}</span
						>
					{/each}
				</div>
			</div>

			<div>
				<h3 class="mb-4 font-body text-sm font-semibold uppercase tracking-widest text-secondary">
					Tools & platforms
				</h3>
				<div class="flex flex-wrap gap-2">
					{#each bio.skillsTools as string[] as tool (tool)}
						<span
							class="rounded px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-secondary bg-secondary-container/10"
							>{tool}</span
						>
					{/each}
				</div>
			</div>

			<div>
				<h3 class="mb-4 font-body text-sm font-semibold uppercase tracking-widest text-secondary">
					Languages
				</h3>
				<div class="flex flex-wrap gap-2">
					{#each bio.skillsLanguages as string[] as language (language)}
						<span
							class="rounded px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-secondary bg-secondary-container/10"
							>{language}</span
						>
					{/each}
				</div>
			</div>
		</div>
	</section>

	{#if experience.length > 0}
		<section class="mb-20">
			<h2 class="mb-12 font-headline text-2xl font-bold text-on-surface md:text-3xl">
				Work experience
			</h2>

			<div class="flex flex-col gap-14">
				{#each experience as job (job.title + job.company + job.period)}
					<div>
						<div class="mb-3 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
							<h3 class="font-headline text-xl font-bold text-on-surface">{job.title}</h3>
							<span class="font-body text-sm text-secondary">{job.period}</span>
						</div>
						<p class="mb-3 font-headline font-semibold text-primary">{job.company}</p>
						<p class="max-w-3xl leading-relaxed text-secondary">{job.description}</p>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	{#if education.length > 0}
		<section class="mb-20 rounded-xl bg-surface-container-low p-8 md:p-12">
			<h2 class="mb-10 font-headline text-2xl font-bold text-on-surface md:text-3xl">Education</h2>

			<div class="flex flex-col gap-12">
				{#each education as edu (edu.degree + edu.school + edu.period)}
					<div>
						<div class="mb-3 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
							<h3 class="font-headline text-xl font-bold text-on-surface">{edu.degree}</h3>
							<span class="font-body text-sm text-secondary">{edu.period}</span>
						</div>
						<p class="mb-3 font-headline font-semibold text-primary">{edu.school}</p>
						<p class="text-secondary">{edu.description}</p>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	{#if interests.length > 0}
		<section class="rounded-xl bg-surface-container-lowest p-8 shadow-ambient md:p-10">
			<h2 class="mb-8 font-headline text-2xl font-bold text-on-surface">Interests</h2>
			<div class="flex flex-wrap gap-3">
				{#each interests as interest (interest)}
					<span
						class="rounded-md bg-surface-container-high px-4 py-2 text-sm font-medium text-on-surface"
						>{interest}</span
					>
				{/each}
			</div>
		</section>
	{/if}
</div>
