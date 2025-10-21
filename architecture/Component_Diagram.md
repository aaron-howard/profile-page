# Component Diagram

## Main Svelte Components
- `+layout.svelte`: App layout
- `+page.svelte`: Home page
- `/bio/+page.svelte`: Bio section
- `/projects/+page.svelte`: Projects listing
- `/blog/+page.svelte`: Blog listing
- `/contact/+page.svelte`: Contact form
- `/admin/*`: Admin dashboard, blog/project management
- `/login/+page.svelte`, `/logout/+server.ts`: Auth flows

## Server Components
- `hooks.server.ts`: Auth/session middleware
- `lib/server/auth.ts`: Auth logic
- `lib/server/db/`: DB access
- `routes/**/*.server.ts`: API endpoints

## Content
- `lib/content/*.json`: Static content
- `prisma/schema.prisma`: Data models