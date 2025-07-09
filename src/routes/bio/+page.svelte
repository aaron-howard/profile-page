<script lang="ts">
	// Customize this data with your information
	const bioData = {
		name: "Your Name",
		title: "Full Stack Developer",
		location: "Your City, Country",
		about: "I'm a passionate full-stack developer with a love for creating elegant, user-friendly applications. With several years of experience in web development, I specialize in modern JavaScript frameworks, cloud technologies, and building scalable solutions that solve real-world problems.",
		
		skills: {
			frontend: ["React", "Vue.js", "Svelte", "TypeScript", "Tailwind CSS", "Next.js"],
			backend: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Express.js", "FastAPI"],
			tools: ["Git", "Docker", "AWS", "Vercel", "Figma", "Postman"],
			languages: ["JavaScript", "TypeScript", "Python", "SQL", "HTML/CSS"]
		},
		
		experience: [
			{
				title: "Senior Full Stack Developer",
				company: "Tech Company",
				period: "2022 - Present",
				description: "Leading development of web applications using React, Node.js, and cloud technologies."
			},
			{
				title: "Frontend Developer",
				company: "Startup Inc",
				period: "2020 - 2022",
				description: "Built responsive user interfaces and improved user experience across multiple products."
			},
			{
				title: "Junior Developer",
				company: "Digital Agency",
				period: "2018 - 2020",
				description: "Developed websites and web applications for various clients using modern technologies."
			}
		],
		
		education: [
			{
				degree: "Bachelor of Computer Science",
				school: "University Name",
				period: "2014 - 2018",
				description: "Focused on software engineering and web development"
			}
		],
		
		interests: [
			"Open Source Development",
			"Machine Learning",
			"UI/UX Design",
			"Cloud Architecture",
			"Technical Writing"
		]
	};
</script>

<div class="max-w-4xl mx-auto">
	<!-- Header -->
	<div class="text-center mb-12">
		<h1 class="text-4xl font-bold text-slate-900 mb-4">About Me</h1>
		<p class="text-xl text-slate-600 max-w-3xl mx-auto">{bioData.about}</p>
	</div>

	<!-- Personal Info -->
	<div class="bg-white rounded-lg shadow-md p-8 mb-8">
		<h2 class="text-2xl font-semibold text-slate-900 mb-6">Personal Information</h2>
		<div class="grid md:grid-cols-2 gap-6">
			<div>
				<h3 class="font-medium text-slate-700 mb-2">Name</h3>
				<p class="text-slate-900">{bioData.name}</p>
			</div>
			<div>
				<h3 class="font-medium text-slate-700 mb-2">Title</h3>
				<p class="text-slate-900">{bioData.title}</p>
			</div>
			<div>
				<h3 class="font-medium text-slate-700 mb-2">Location</h3>
				<p class="text-slate-900">{bioData.location}</p>
			</div>
			<div>
				<h3 class="font-medium text-slate-700 mb-2">Experience</h3>
				<p class="text-slate-900">5+ years in web development</p>
			</div>
		</div>
	</div>

	<!-- Skills -->
	<div class="bg-white rounded-lg shadow-md p-8 mb-8">
		<h2 class="text-2xl font-semibold text-slate-900 mb-6">Skills & Technologies</h2>
		
		<div class="grid md:grid-cols-2 gap-8">
			<div>
				<h3 class="text-lg font-medium text-slate-900 mb-4">Frontend</h3>
				<div class="flex flex-wrap gap-2">
					{#each bioData.skills.frontend as skill}
						<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{skill}</span>
					{/each}
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-medium text-slate-900 mb-4">Backend</h3>
				<div class="flex flex-wrap gap-2">
					{#each bioData.skills.backend as skill}
						<span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">{skill}</span>
					{/each}
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-medium text-slate-900 mb-4">Tools & Platforms</h3>
				<div class="flex flex-wrap gap-2">
					{#each bioData.skills.tools as tool}
						<span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">{tool}</span>
					{/each}
				</div>
			</div>
			
			<div>
				<h3 class="text-lg font-medium text-slate-900 mb-4">Programming Languages</h3>
				<div class="flex flex-wrap gap-2">
					{#each bioData.skills.languages as language}
						<span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">{language}</span>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Experience -->
	<div class="bg-white rounded-lg shadow-md p-8 mb-8">
		<h2 class="text-2xl font-semibold text-slate-900 mb-6">Work Experience</h2>
		
		<div class="space-y-6">
			{#each bioData.experience as job}
				<div class="border-l-4 border-blue-500 pl-6">
					<div class="flex justify-between items-start mb-2">
						<h3 class="text-lg font-semibold text-slate-900">{job.title}</h3>
						<span class="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded">{job.period}</span>
					</div>
					<p class="text-blue-600 font-medium mb-2">{job.company}</p>
					<p class="text-slate-600">{job.description}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Education -->
	<div class="bg-white rounded-lg shadow-md p-8 mb-8">
		<h2 class="text-2xl font-semibold text-slate-900 mb-6">Education</h2>
		
		<div class="space-y-6">
			{#each bioData.education as edu}
				<div class="border-l-4 border-green-500 pl-6">
					<div class="flex justify-between items-start mb-2">
						<h3 class="text-lg font-semibold text-slate-900">{edu.degree}</h3>
						<span class="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded">{edu.period}</span>
					</div>
					<p class="text-green-600 font-medium mb-2">{edu.school}</p>
					<p class="text-slate-600">{edu.description}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Interests -->
	<div class="bg-white rounded-lg shadow-md p-8">
		<h2 class="text-2xl font-semibold text-slate-900 mb-6">Interests & Hobbies</h2>
		<div class="flex flex-wrap gap-3">
			{#each bioData.interests as interest}
				<span class="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium">{interest}</span>
			{/each}
		</div>
	</div>
</div> 