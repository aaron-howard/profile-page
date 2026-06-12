# CLAUDE.md

This file provides guidance for AI assistants working in this repository.

## Quick start commands

```bash
# Development
npm run dev              # Vite dev server (default port 5173)

# Build and types
npm run build           # prisma generate + vite build (adapter-vercel)
npm run check           # prisma generate + svelte-kit sync + svelte-check

# Quality
npm run lint            # Prettier check + ESLint
npm run format          # Prettier --write
npm test                # Vitest run (~120 tests)
npm run test:coverage   # Vitest + coverage thresholds (used in CI)
npm run test:e2e        # Playwright (Chromium): smoke, axe, honeypot

# Database
npm run db:push
npm run db:migrate
npm run db:studio
npm run db:generate
npm run db:seed         # scripts/seed-projects.js
npm run db:seed:bio     # scripts/seed-bio.js

# Assets
npm run assets:og               # static/og-image.png via sharp
npm run assets:project-images   # WebP alongside JPEGs in static/projects/

npm run preview         # Preview production build
```

## Architecture

**SvelteKit 2.61.x** portfolio: server routes + Prisma (PostgreSQL). No end-user auth; content is edited via **Prisma Studio** (`npm run db:studio`).

- **Deployment**: `@sveltejs/adapter-vercel` with `runtime: 'nodejs22.x'` in `svelte.config.js`.
- **Fonts**: `@fontsource/manrope` and `@fontsource/inter` imported from `src/app.css` (no Google Fonts in `app.html`).
- **SEO**: `src/lib/components/SeoHead.svelte` — title, description, `og:image` / Twitter card (absolute URL from request origin). Default image: `/og-image.png`.
- **Images**: `projectImageSrc` / `projectWebpSrc` in `src/lib/project-image.ts`; `<picture>` via `ProjectPicture.svelte` on home featured grid, project cards, and project detail.
- **Contact**: `src/routes/contact/+page.server.ts` — Superforms + Zod (`contactFormSchema` includes honeypot `website`). `hooks.server.ts` applies security headers and **rate-limits** `POST /contact` per client IP (`src/lib/server/rate-limit.ts`).
- **Redirects**: `src/routes/bio/` exists for legacy URLs; primary about route is **`/about`**.

### Routes (high level)

```
src/routes/
  +layout.svelte / +layout.server.ts
  +page.svelte / +page.server.ts          # Home
  about/                                   # Bio / profile
  bio/                                     # Redirect → /about
  blog/ + blog/[id]/
  projects/ + projects/[id]/
  contact/
```

### Security headers

`src/hooks.server.ts` sets `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`. Deprecated `X-XSS-Protection` is **not** set (CSP covers XSS).

## Testing

- **Vitest** (`vitest.config.ts`): happy-dom, mocks for `$app/*` and `$lib/server/db` under `src/tests/mocks/`. Coverage thresholds on `src/lib/**/*.ts`.
- **Playwright** (`playwright.config.ts`, `e2e/`): `npx vite dev` on port **5174** as `webServer`. CI installs **Chromium** only.

## CI

`.github/workflows/ci.yml`: `npm ci` → `prisma generate` → `npm audit --audit-level=moderate` → lint → `npm run check` → **`npm run test:coverage`** (single Vitest+coverage run) → Playwright → **`npm run build`**.

## Documentation

- `README.md` — onboarding and scripts
- `DEPLOYMENT_GUIDE.md`, `DATABASE_CONFIG.md`, `SECURITY.md`
- `docs/PRODUCTION_AUDIT.md`, `docs/DESIGN_ASSETS.md`

## Conventions

- Svelte 5 runes: `$state`, `$derived`, `$props`, `$effect` where needed.
- Match existing Tailwind token usage from `src/app.css` `@theme`.
- Do not commit large design archives; see `docs/DESIGN_ASSETS.md`.
