<script lang="ts">
	// Customize this data with your information
	const bioData = {
		name: 'Aaron Howard',
		title: 'Full Stack Developer',
		location: 'Irving, USA',
		about:
			"I'm a passionate full-stack developer with a love for creating elegant, user-friendly applications. With several years of experience in web development, I specialize in modern JavaScript frameworks, cloud technologies, and building scalable solutions that solve real-world problems.",

		skills: {
			frontend: ['React', 'Vue.js', 'Svelte', 'TypeScript', 'Tailwind CSS', 'Next.js'],
			backend: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Express.js', 'FastAPI'],
			tools: ['Git', 'Docker', 'Netlify', 'Vercel', 'Figma', 'Postman'],
			languages: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML/CSS']
		},

		experience: [
			{
				title: 'Senior Full Stack Developer',
				company: 'City of Dallas',
				period: '2022 - Present',
				description:
					'Leading development of web applications using React, Node.js, and cloud technologies. Certified Advanced Scrum Master for our ServiceNow Platform.'
			},
			{
				title: 'Frontend Developer',
				company: 'City of Dallas',
				period: '2020 - 2022',
				description:
					'Built responsive user interfaces and improved user experience across multiple products.'
			},
			{
				title: 'Junior Developer',
				company: 'City of Dallas',
				period: '2015 - 2020',
				description:
					'Developed websites and web applications for various clients using modern technologies.'
			}
		],

		education: [
			{
				degree: 'Bachelor of Business Administration in Business Analytics',
				school: 'East Texas A&M University',
				period: '2015 - 2019',
				description: 'Focused on software engineering and web development'
			},
			{
				degree: 'Associate of Applied Science in Computer Science',
				school: 'Front Range Community College',
				period: '2013 - 2015',
				description: 'Focused on software engineering and web development'
			}
		],

		interests: [
			'Open Source Development',
			'Machine Learning',
			'UI/UX Design',
			'Cloud Architecture',
			'Technical Writing'
		]
	};
</script>

<div class="mx-auto max-w-4xl">
	<!-- Header -->
	<div class="mb-12 text-center">
		<h1 class="mb-4 text-4xl font-bold text-slate-900">About Me</h1>
		<p class="mx-auto max-w-3xl text-xl text-slate-600">{bioData.about}</p>
	</div>

	<!-- Personal Info -->
	<div class="mb-8 rounded-lg bg-white p-8 shadow-md">
		<h2 class="mb-6 text-2xl font-semibold text-slate-900">Personal Information</h2>
		<div class="grid gap-6 md:grid-cols-2">
			<div>
				<h3 class="mb-2 font-medium text-slate-700">Name</h3>
				<p class="text-slate-900">{bioData.name}</p>
			</div>
			<div>
				<h3 class="mb-2 font-medium text-slate-700">Title</h3>
				<p class="text-slate-900">{bioData.title}</p>
			</div>
			<div>
				<h3 class="mb-2 font-medium text-slate-700">Location</h3>
				<p class="text-slate-900">{bioData.location}</p>
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
					{#each bioData.skills.frontend as skill}
						<span class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
							>{skill}</span
						>
					{/each}
				</div>
			</div>

			<div>
				<h3 class="mb-4 text-lg font-medium text-slate-900">Backend</h3>
				<div class="flex flex-wrap gap-2">
					{#each bioData.skills.backend as skill}
						<span class="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
							>{skill}</span
						>
					{/each}
				</div>
			</div>

			<div>
				<h3 class="mb-4 text-lg font-medium text-slate-900">Tools & Platforms</h3>
				<div class="flex flex-wrap gap-2">
					{#each bioData.skills.tools as tool}
						<span class="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800"
							>{tool}</span
						>
					{/each}
				</div>
			</div>

			<div>
				<h3 class="mb-4 text-lg font-medium text-slate-900">Programming Languages</h3>
				<div class="flex flex-wrap gap-2">
					{#each bioData.skills.languages as language}
						<span class="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800"
							>{language}</span
						>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Experience -->
	<div class="mb-8 rounded-lg bg-white p-8 shadow-md">
		<h2 class="mb-6 text-2xl font-semibold text-slate-900">Work Experience</h2>

		<div class="space-y-6">
			{#each bioData.experience as job}
				<div class="border-l-4 border-blue-500 pl-6">
					<div class="mb-2 flex items-start justify-between">
						<h3 class="text-lg font-semibold text-slate-900">{job.title}</h3>
						<span class="rounded bg-slate-100 px-2 py-1 text-sm text-slate-500">{job.period}</span>
					</div>
					<p class="mb-2 font-medium text-blue-600">{job.company}</p>
					<p class="text-slate-600">{job.description}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Education -->
	<div class="mb-8 rounded-lg bg-white p-8 shadow-md">
		<h2 class="mb-6 text-2xl font-semibold text-slate-900">Education</h2>

		<div class="space-y-6">
			{#each bioData.education as edu}
				<div class="border-l-4 border-green-500 pl-6">
					<div class="mb-2 flex items-start justify-between">
						<h3 class="text-lg font-semibold text-slate-900">{edu.degree}</h3>
						<span class="rounded bg-slate-100 px-2 py-1 text-sm text-slate-500">{edu.period}</span>
					</div>
					<p class="mb-2 font-medium text-green-600">{edu.school}</p>
					<p class="text-slate-600">{edu.description}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Interests -->
	<div class="rounded-lg bg-white p-8 shadow-md">
		<h2 class="mb-6 text-2xl font-semibold text-slate-900">Interests & Hobbies</h2>
		<div class="flex flex-wrap gap-3">
			{#each bioData.interests as interest}
				<span class="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
					>{interest}</span
				>
			{/each}
		</div>
	</div>
</div>
