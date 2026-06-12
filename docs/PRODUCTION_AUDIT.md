# Production Readiness Audit — profile-page

**Date:** 2026-06-12 · **Branch:** `audit/production-fixes` · **Auditor:** Claude (full repo review + toolchain run)

Verified against the working tree at commit `4c944a0`. All findings are from reading the actual source and running the project's own toolchain (vitest, eslint, svelte-check, prettier, npm audit) in a clean Linux sandbox.

---

## 1. Executive Summary

This is a healthy, well-engineered codebase — far beyond a typical portfolio. It already has: CSP via SvelteKit config, security headers in `hooks.server.ts`, rate limiting on the contact form, Zod + Superforms validation with CRLF-injection guards, HTML escaping in email templates, a 114-test suite with coverage thresholds, CI with lint/type-check/test/audit/build gates, Husky pre-commit/pre-push hooks, and Dependabot. Tests (114/114), ESLint, and svelte-check all pass.

**Top 5 issues blocking/risking production readiness** (1–3 fixed in this branch):

1. **CI security gate failing** — `npm audit` reports 2 moderate vulns (`joi` <18.2.1, GHSA-q7cg-457f-vx79, transitive via `sveltekit-superforms`). The CI step `npm audit --audit-level=moderate` fails on every push until resolved. **Fixed:** npm override `"joi": ">=18.2.1"` (app uses the zod adapter; joi is unused at runtime). Audit now reports 0 vulnerabilities.
2. **Honeypot was inert** — `contactFormSchema` defines a `website` honeypot field, but the contact form never rendered it, so it caught zero bots. **Fixed:** hidden, `aria-hidden`, `tabindex="-1"` input added to the form.
3. **Missing page titles** — Home, About, and Contact rendered no `<title>` or meta description (WCAG 2.4.2, SEO). Blog and Projects already used `SeoHead`. **Fixed:** `SeoHead` added to all three.
4. **Unoptimized images** — `static/projects/*.jpg` total ~950 KB (200–290 KB each). Converting to WebP/AVIF at display size would cut this ~75%.
5. **Documentation drift** — README/CLAUDE.md cite SvelteKit 2.16.0 and 102 tests (actual: kit ~2.61, 114 tests), CLAUDE.md still shows a `bio/` route as primary (it 308-redirects to `/about`) and omits rate limiting, `about/`, and detail routes. Also: `stitch_profile.zip` (1.5 MB design asset) is committed to the repo, and the local `.env` contains a stale `ADMIN_TOKEN` from the removed auth system (gitignored, never committed — but delete/rotate it).

## 2. Production Readiness Score: **85 / 100**

| Category | Score | Notes |
|---|---|---|
| Architecture | 88 | Clean route/lib separation, server-only modules, typed utils, singleton Prisma w/ pg adapter |
| UI/UX | 85 | Coherent design system (tokens in `app.css`), responsive, good empty/error states |
| Accessibility | 82 | Labels, aria-expanded, aria-pressed, alt="" on decorative imgs; gaps: mobile-menu focus handling, tiny 10px label text |
| Security | 90 | CSP, headers, rate limit, validation, escaping, honeypot (now live), 0 audit vulns after fix |
| Performance | 78 | Cache headers, lazy images, font preload; gaps: heavy JPEGs, third-party fonts, `img-src https:` wide open |
| Testing | 84 | 114 tests, thresholds (80/80/75/80), mocks for SvelteKit modules; gaps: no page/component coverage beyond ErrorPage, no E2E/a11y tests |
| DevOps | 87 | Full CI gauntlet, Dependabot, Husky, engine pinning; gaps: adapter-auto unpinned, coverage runs tests twice |
| Documentation | 80 | README/SECURITY/DEPLOYMENT/DATABASE guides exist but versions/details have drifted |

## 3. Detailed Findings

### A. Security

| # | Issue | Severity | File(s) | Status / Fix |
|---|---|---|---|---|
| S1 | `joi` <18.2.1 (2 moderate advisories) via sveltekit-superforms; breaks CI audit gate | **High** | `package.json` | ✅ Fixed — override `"joi": ">=18.2.1"`; verified 0 vulns, 114/114 tests pass |
| S2 | Honeypot field never rendered | **High** (spam) | `src/routes/contact/+page.svelte` | ✅ Fixed — hidden input wired to `$form.website` |
| S3 | `X-XSS-Protection: 1; mode=block` is deprecated; modern guidance is to omit or set `0` | Low | `src/hooks.server.ts` | Remove the header (CSP supersedes it) |
| S4 | No `Strict-Transport-Security` header set by app | Low | `src/hooks.server.ts` | Vercel adds HSTS on HTTPS domains; add explicitly if you ever move hosts |
| S5 | CSP `img-src 'self' data: https:` allows any HTTPS image origin | Low | `svelte.config.js` | Tighten to known origins if project images ever come from a CDN |
| S6 | Stale `ADMIN_TOKEN` in local `.env` (auth system was removed); also duplicated `PRISMA_DATABASE_URL` line | Low (local only — `.env` is gitignored and has never been committed) | `.env` | Delete the token, rotate the credential wherever it originated |
| S7 | In-memory rate limiter is per-warm-instance on serverless (already documented in code) | Info | `src/lib/server/rate-limit.ts` | Fine for a portfolio; use Upstash/Vercel KV if abuse appears |

Checked and clean: no secrets in git history (`.env` never tracked), no `{@html}` usage anywhere (blog content renders as text — no XSS path), email templates escape all user input, subject line strips CRLF (header injection), Zod schema rejects control characters, parameterized queries via Prisma.

### B. Accessibility (WCAG 2.1 AA)

| # | Issue | Severity | File(s) | Fix |
|---|---|---|---|---|
| A1 | Home/About/Contact had no `<title>` (2.4.2 Page Titled) | **High** | route pages | ✅ Fixed via `SeoHead` |
| A2 | Mobile menu: no `Escape` to close, no focus management on open/close | Medium | `src/routes/+layout.svelte` | Add `onkeydown` Escape handler; move focus into menu on open |
| A3 | `text-[10px]` form labels and tag chips are below comfortable reading size | Low | contact page, cards | Bump to 12px minimum |
| A4 | Hover-only "View projects →" overlay on home cards is invisible to keyboard users | Low | `src/routes/+page.svelte` | Add `group-focus-within:opacity-100` |

Strengths: semantic landmarks (`nav`/`main`/`footer`, labeled), `aria-expanded` on menu toggle, `aria-pressed` on filters, `aria-invalid` + inline errors on form fields, decorative images use `alt=""`, palette passes AA contrast (#655d58 on #fbf9f4 ≈ 5.5:1; #00694b on white ≈ 6.9:1).

### C. Performance

| # | Issue | Severity | File(s) | Fix |
|---|---|---|---|---|
| P1 | Project JPEGs 200–290 KB each (~950 KB total) | Medium | `static/projects/*.jpg` | Convert to WebP (quality ~80, max 800px wide); keep jpg fallback or update DB paths |
| P2 | Google Fonts third-party request chain (preconnect+preload mitigates, but still a render dependency) | Low | `src/app.html` | Self-host Manrope/Inter via `@fontsource` |
| P3 | No `og:image`, so link previews fetch nothing useful | Low | `SeoHead.svelte` | Add a static 1200×630 og image |
| P4 | Featured-projects "filler" query runs a second sequential DB roundtrip | Low | `src/routes/+page.server.ts` | Acceptable; could be one query with ordering on `featured desc, id desc` |

Already good: `loading="lazy"`/`decoding="async"` on card images, `Cache-Control: public, max-age=60, stale-while-revalidate=300` on read routes, esbuild minify, no sourcemaps in prod, `data-sveltekit-preload-data="hover"`.

### D. Architecture & Code Quality

| # | Issue | Severity | Fix |
|---|---|---|---|
| C1 | Home blog teaser links to `/blog` and featured projects to `/projects` instead of their detail pages | Medium (UX) | Link to `/blog/${post.id}` and `/projects/${project.id}` |
| C2 | Blog categories hardcoded in `blog/+page.svelte` — will drift from DB content | Low | Derive from `data.posts` |
| C3 | Dead code: `education`/`interests` empty arrays + their render blocks in About; hardcoded "5+ years" stat | Low | Remove or move to Bio JSON |
| C4 | `db:seed` script only seeds projects; `seed-bio.js` not wired into package.json | Low | Add `db:seed:bio` script |
| C5 | `stitch_profile.zip` (1.5 MB) committed to repo | Low | `git rm`, keep design assets out of the repo |

### E. Testing

114/114 tests pass; coverage thresholds enforced (80/80/75/80). Gaps: only one component test (ErrorPage); no tests for `project-image.ts` edge cases beyond existing, no E2E (Playwright) smoke test, no automated a11y checks. Recommendation: add Playwright with one smoke spec per route + `@axe-core/playwright`, and a component test for the contact form (including the honeypot rejecting filled submissions).

### F. DevOps / CI-CD

CI is comprehensive (audit → lint → type-check → test → coverage → build). Improvements: `test` and `test:coverage` run the suite twice — drop the bare `test` step; pin `@sveltejs/adapter-vercel` instead of `adapter-auto` for deterministic builds; consider Lighthouse CI on PRs and CodeQL.

### G. Documentation

README/CLAUDE.md version and route drift (see Exec Summary #5). SECURITY.md, DEPLOYMENT_GUIDE.md, DATABASE_CONFIG.md exist — good. Update README badges/claims after this branch merges (test count, kit version, route map).

## 4. 30-Day Roadmap

**Week 1 — Critical (✅ done in this branch):** joi override (CI gate green), honeypot rendered, page titles on all routes. Merge `audit/production-fixes`.

**Week 2 — SEO & performance:** WebP project images; `og:image` + canonical URL in `SeoHead`; `robots.txt` + `sitemap.xml` (server route reading DB ids); self-host fonts.

**Week 3 — A11y & UX polish:** mobile-menu Escape/focus handling; deep-link home teasers (C1); dynamic blog categories (C2); remove deprecated `X-XSS-Protection`; bump 10px text; remove dead About sections.

**Week 4 — CI/CD & docs:** pin `adapter-vercel`; dedupe CI test runs; add Playwright + axe smoke suite; refresh README/CLAUDE.md; `git rm stitch_profile.zip`; delete stale `ADMIN_TOKEN` from `.env`.

## 5. Fixes Applied in This Branch

Commit `e6cfbeb` — 4 files, +30/−1:

- `package.json` — `"joi": ">=18.2.1"` override (verified: `npm audit` 0 vulns, install clean, joi@18.2.1 resolved)
- `src/routes/contact/+page.svelte` — honeypot rendered (sr-only, aria-hidden, tabindex −1, autocomplete off) + `SeoHead`
- `src/routes/+page.svelte` — `SeoHead` with bio-driven title/description
- `src/routes/about/+page.svelte` — `SeoHead`

Verification after fixes: vitest 114/114 ✅ · eslint 0 errors ✅ · svelte-check 0 real errors ✅ (1 sandbox-only error: Prisma engines can't download in the audit sandbox) · prettier clean on changed files ✅ · `npm audit --audit-level=moderate` 0 vulnerabilities ✅
