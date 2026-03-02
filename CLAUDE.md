# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start Commands

```bash
# Development
npm run dev              # Start dev server at http://localhost:5173

# Building and Type Checking
npm run build           # Build for production (includes Prisma generate)
npm run check           # Type check with svelte-check
npm run check:watch     # Watch mode type checking

# Code Quality
npm run lint            # Run ESLint and Prettier check
npm run format          # Auto-format code with Prettier

# Database
npm run db:push         # Push schema changes to database
npm run db:migrate      # Run database migrations interactively
npm run db:studio       # Open Prisma Studio GUI
npm run db:generate     # Generate Prisma client
npm run db:seed         # Seed projects from scripts/seed-projects.js

# Deployment Preview
npm run preview         # Preview production build locally
```

## Project Architecture

This is a **SvelteKit 2.16.0 portfolio application** with a custom backend for blog posts and projects management.

### Tech Stack
- **Frontend**: Svelte 5.0.0, TypeScript, Tailwind CSS v4
- **Backend**: SvelteKit with server-side routes
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: Custom session-based auth using Oslo.js crypto
- **Build**: Vite 6.2.6
- **Deployment**: Vercel (adapter-auto configured)

### Directory Structure
```
src/
├── routes/              # SvelteKit routes and pages
│   ├── +layout.svelte   # Root layout
│   ├── +layout.server.ts # Root layout server load
│   ├── +page.svelte     # Home page
│   ├── bio/             # About/Bio page
│   │   ├── +page.svelte
│   │   └── +page.server.ts
│   ├── blog/            # Blog posts page
│   │   ├── +page.svelte
│   │   └── +page.server.ts
│   ├── projects/        # Projects showcase
│   │   ├── +page.svelte
│   │   └── +page.server.ts
│   └── contact/         # Contact form page
│       ├── +page.svelte
│       └── +page.server.ts
├── lib/
│   ├── server/
│   │   ├── db/
│   │   │   └── index.ts     # Prisma client singleton
│   │   ├── email.ts         # Email utilities
│   │   ├── rate-limit.ts    # Rate limiting for forms
│   │   └── sanitize.ts      # HTML/input sanitization
│   ├── types.ts         # TypeScript interfaces (BlogPost, Project)
│   └── index.ts
├── hooks.server.ts      # SvelteKit server hooks (security headers)
├── app.css              # Global Tailwind CSS
└── app.html             # HTML template
```

### Database Schema
**Models** (in `prisma/schema.prisma`):
- **Bio** (singleton): name, title, location, about, skills (frontend/backend/tools/languages), experience (JSON)
- **BlogPost**: id, title, excerpt, content, author, date, category, readTime, featured, tags
- **Project**: id, title, description, image, technologies, category, github, live, featured

## Recent Changes

**Latest Work** (Session March 2, 2026):
1. ✅ **Removed Authentication System** - Deleted auth module, login/logout/admin routes, User/Session database models
2. ✅ **Consolidated Content Sources** - Migrated bio.json to database, all content now database-driven
3. ✅ **Cleaned Up Admin Routes** - Replaced with Prisma Studio for content management

**Previous**: Svelte 5 Migration
- Uses `$state()` rune for reactive variables
- Uses `$derived()` rune for computed values (instead of `$:` reactive statements)
- Uses `let { data } = $props()` for component props (instead of `export let`)

## Content Editing Workflow

Since this is a public portfolio without authentication:
1. Content is managed via **Prisma Studio** (`npm run db:studio`)
2. No login required - internal tool only
3. For production, you would:
   - Use Prisma Studio locally and push changes to database
   - Or add a headless CMS integration (Sanity, Contentful, etc.)
   - Or implement proper authentication if adding admin functionality

## Styling & Components

**Tailwind CSS v4** is used for all styling:
- Configuration in `vite.config.ts` (via `@tailwindcss/vite`)
- Global styles in `src/app.css`
- Components use utility classes (no separate component library)
- Supports: forms plugin, typography plugin

CSP (Content Security Policy) configured in `svelte.config.js` with `unsafe-inline` for styles (Tailwind requirement).

## Content Management

All content is stored in PostgreSQL via Prisma and managed through **Prisma Studio**:

```bash
npm run db:studio
```

**Content Models:**
- **Bio** (id=1): Personal profile, skills, and work experience
- **BlogPost**: Blog posts with categories, tags, and featured status
- **Project**: Portfolio projects with technologies and links

To update content, use Prisma Studio's GUI instead of editing files. This provides a single source of truth and type-safe data management.

## Environment Variables

`.env` file required with:
```
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

Optional: Connection pooling parameters in DATABASE_URL for serverless/production environments.

## Testing & Linting

- **ESLint**: TypeScript + Svelte rules configured in `eslint.config.js`
- **Prettier**: Code formatter with Svelte plugin support
- **svelte-check**: Type checking for Svelte components
- **No unit/integration tests configured** - add testing framework if needed

## Build & Deployment

- **Development Build**: `npm run build` generates `.svelte-kit/` and `build/` directories
- **Deployment**: Uses `@sveltejs/adapter-auto` (Vercel optimized)
- **Prisma**: Must run `prisma generate` before build (included in build script)
- **Source Maps**: Disabled in production build (vite.config.ts)

## Key Implementation Details

### Rate Limiting
Implemented in `src/lib/server/rate-limit.ts` using in-memory Map - **not production-ready for multiple instances**. For production, consider Redis or similar.

### Form Handling
- Contact form uses SvelteKit form actions in `src/routes/contact/+page.server.ts`
- Input sanitization in `src/lib/server/sanitize.ts` (sanitizeText, sanitizeHtml)
- Validation is manual (consider adding schema validation library for better UX)
- Email sending via SendGrid, Resend, or SMTP (configured via EMAIL_SERVICE env var)

### Server Hooks
`src/hooks.server.ts` handles:
- Security headers (CSP, X-Frame-Options, XSS-Protection, etc.)
- No authentication (portfolio is public)

## Git & Workflow

- Main branch: `main`
- Recent history shows color/CSS tweaks and Svelte 5 migration work
- `MIGRATION_REPORT.md` documents tech stack analysis
- Architecture documentation in `architecture/` directory (C4 models, diagrams, etc.)
