# Tech Stack Migration Report: Profile Page Repository

## Executive Summary

This report evaluates the current state of the profile-page repository and outlines what it would take to migrate from the current tech stack to the target modern tech stack. The current application is a SvelteKit portfolio site with Prisma/PostgreSQL, custom authentication, and Tailwind CSS. The target stack introduces WorkOS authentication, Convex database, shadcn-svelte components, Superforms, and various other modern tools.

**Estimated Total Migration Effort:** 40-60 hours  
**Complexity Level:** High  
**Risk Level:** Medium-High (database migration is the highest risk)

---

## Current Tech Stack Analysis

### Current Stack Components:
- **Frontend Framework:** Svelte 5.0.0 ✓
- **Language:** TypeScript ✓
- **Backend Framework:** SvelteKit 2.16.0 ✓
- **Build Tool:** Vite 6.2.6 ✓
- **Package Manager:** npm (package-lock.json present)
- **Styling:** Tailwind CSS v4.0.0 ✓
- **UI Components:** Custom components (no component library)
- **Authentication:** Custom auth with Oslo.js crypto + Prisma sessions
- **Database:** PostgreSQL with Prisma ORM
- **Rate Limiting:** In-memory Map (not production-ready)
- **Forms:** Native SvelteKit form actions with manual validation
- **Validation:** Manual validation (no schema validation library)
- **Deployment:** Vercel-ready (adapter-auto)
- **Testing:** None configured
- **Icons:** Inline SVG
- **Animations:** None
- **Charts:** None
- **Data Fetching:** SvelteKit load functions only
- **File Upload:** Not implemented
- **Analytics:** None
- **Monitoring:** None

---

## Migration Requirements by Category

### 1. Package Manager: npm → pnpm

**Current State:** Using npm with `package-lock.json`  
**Target State:** pnpm

**Changes Required:**
- Remove `package-lock.json`
- Install pnpm globally: `npm install -g pnpm`
- Update all scripts/documentation references
- Add `.npmrc` for pnpm configuration
- Update CI/CD workflows if applicable

**Effort:** 1-2 hours  
**Risk:** Low  
**Dependencies:** None

---

### 2. UI Components: Custom → shadcn-svelte

**Current State:** Custom Tailwind components with inline styles  
**Target State:** shadcn-svelte component library

**Changes Required:**
- Install shadcn-svelte CLI and dependencies
- Configure shadcn-svelte (`components.json`)
- Install required dependencies: `class-variance-authority`, `clsx`, `tailwind-merge`, `@radix-ui/*` packages
- Migrate existing components to shadcn-svelte equivalents:
  - Forms (contact, login, admin forms)
  - Buttons
  - Cards
  - Navigation
  - Modals/Dialogs (if any)
- Update all component imports
- Adjust styling to match shadcn-svelte patterns

**Effort:** 8-12 hours  
**Risk:** Medium  
**Dependencies:** Tailwind CSS v4 compatibility check needed

**Files Affected:**
- All `.svelte` files in `src/routes/`
- `src/app.css` (may need theme adjustments)

---

### 3. Authentication: Custom → WorkOS

**Current State:** Custom authentication system using:
- Oslo.js crypto for token generation
- Prisma for session storage
- Custom session validation in `hooks.server.ts`
- Manual cookie management

**Target State:** WorkOS authentication

**Changes Required:**
- Sign up for WorkOS account and configure
- Install `@workos-inc/authkit-sveltekit` or similar
- Remove custom auth code:
  - `src/lib/server/auth.ts` (entire file)
  - Auth logic in `src/hooks.server.ts`
  - Login page logic
  - Session management code
- Implement WorkOS integration:
  - Configure WorkOS client
  - Update `hooks.server.ts` to use WorkOS middleware
  - Replace login page with WorkOS auth flow
  - Update admin route protection
  - Migrate existing user data (if needed)
- Update environment variables
- Remove Prisma User/Session models (if WorkOS handles this)

**Effort:** 12-16 hours  
**Risk:** High (authentication is critical)  
**Dependencies:** WorkOS account setup, data migration planning

**Files Affected:**
- `src/lib/server/auth.ts` (delete)
- `src/hooks.server.ts` (major rewrite)
- `src/routes/login/+page.server.ts` (rewrite)
- `src/routes/login/+page.svelte` (rewrite)
- `src/routes/admin/+layout.server.ts` (update)
- `src/routes/logout/+server.ts` (rewrite)
- `prisma/schema.prisma` (remove User/Session models)

---

### 4. Database: Prisma/PostgreSQL → Convex

**Current State:** PostgreSQL with Prisma ORM  
**Target State:** Convex (serverless database)

**Changes Required:**
- Sign up for Convex account
- Install Convex CLI and SDK: `npm install convex`
- Initialize Convex: `npx convex dev`
- Migrate Prisma schema to Convex schema:
  - `BlogPost` model → Convex schema
  - `Project` model → Convex schema
  - Remove `User` and `Session` models (handled by WorkOS)
- Migrate data from PostgreSQL to Convex:
  - Export existing data
  - Create migration scripts
  - Import data into Convex
- Replace all Prisma queries with Convex queries:
  - `src/routes/projects/+page.server.ts`
  - `src/routes/blog/+page.server.ts`
  - `src/routes/admin/projects/+page.server.ts`
  - `src/routes/admin/blogs/+page.server.ts`
- Update database connection code:
  - Remove `src/lib/server/db/index.ts`
  - Create Convex client setup
- Update build scripts (remove Prisma generate)
- Remove Prisma dependencies
- Update environment variables

**Effort:** 20-30 hours  
**Risk:** Very High (data migration risk)  
**Dependencies:** Convex account, data backup strategy

**Files Affected:**
- `prisma/schema.prisma` (delete entire directory)
- `src/lib/server/db/index.ts` (delete)
- All `+page.server.ts` files with database queries
- `package.json` (remove Prisma, add Convex)
- `scripts/seed-projects.js` (rewrite for Convex)
- Database connection code throughout

**Critical Considerations:**
- Data migration strategy (backup existing data)
- Convex schema design (different from Prisma)
- Real-time capabilities (Convex advantage)
- Cost implications (Convex pricing)

---

### 5. Forms: Manual → Superforms

**Current State:** Native SvelteKit form actions with manual validation  
**Target State:** Superforms with Zod validation

**Changes Required:**
- Install Superforms: `npm install svelte-superforms zod`
- Install Zod: `npm install zod`
- Create Zod schemas for all forms:
  - Contact form schema
  - Login form schema (if still needed)
  - Admin project creation/editing schemas
  - Admin blog creation/editing schemas
- Refactor all form components:
  - `src/routes/contact/+page.svelte`
  - `src/routes/contact/+page.server.ts`
  - `src/routes/admin/projects/+page.svelte`
  - `src/routes/admin/projects/+page.server.ts`
  - `src/routes/admin/blogs/+page.svelte`
  - `src/routes/admin/blogs/+page.server.ts`
- Replace manual validation with Zod validation
- Update form error handling to use Superforms patterns
- Remove manual sanitization (Zod handles this)

**Effort:** 6-8 hours  
**Risk:** Medium  
**Dependencies:** Zod schemas design

**Files Affected:**
- All form-related `.svelte` files
- All form `+page.server.ts` files
- `src/lib/server/sanitize.ts` (may be replaced by Zod)

---

### 6. Validation: Manual → Zod

**Current State:** Manual validation with regex and length checks  
**Target State:** Zod schema validation

**Changes Required:**
- Install Zod: `npm install zod`
- Create validation schemas for:
  - Contact form
  - Admin forms
  - API endpoints (if any)
- Replace all manual validation with Zod
- Integrate with Superforms (see above)
- Update error messages to use Zod errors

**Effort:** 4-6 hours (overlaps with Superforms)  
**Risk:** Low  
**Dependencies:** Superforms integration

---

### 7. Rate Limiting: In-Memory → Vercel Edge Config

**Current State:** In-memory Map (not production-ready)  
**Target State:** Vercel Edge Config

**Changes Required:**
- Set up Vercel Edge Config in Vercel dashboard
- Install Vercel SDK: `npm install @vercel/edge-config`
- Rewrite `src/lib/server/rate-limit.ts`:
  - Replace Map-based storage with Edge Config
  - Update rate limiting logic
  - Handle Edge Config API calls
- Update environment variables
- Test rate limiting across serverless functions

**Effort:** 4-6 hours  
**Risk:** Medium  
**Dependencies:** Vercel account, Edge Config setup

**Files Affected:**
- `src/lib/server/rate-limit.ts` (major rewrite)
- `src/routes/login/+page.server.ts` (update usage)

---

### 8. Icons: Inline SVG → lucide-svelte

**Current State:** Inline SVG icons in components  
**Target State:** lucide-svelte icon library

**Changes Required:**
- Install lucide-svelte: `npm install lucide-svelte`
- Replace all inline SVG icons with lucide-svelte components
- Update icon imports throughout the codebase
- Remove inline SVG code

**Effort:** 2-3 hours  
**Risk:** Low  
**Dependencies:** None

**Files Affected:**
- `src/routes/+page.svelte` (social icons)
- Other components with inline SVGs

---

### 9. Notifications: None → svelte-sonner

**Current State:** No notification system  
**Target State:** svelte-sonner toast notifications

**Changes Required:**
- Install svelte-sonner: `npm install svelte-sonner`
- Add Toaster component to root layout
- Replace form success/error messages with toast notifications
- Update all form submissions to use toasts

**Effort:** 2-3 hours  
**Risk:** Low  
**Dependencies:** None

**Files Affected:**
- `src/routes/+layout.svelte` (add Toaster)
- All form components

---

### 10. Animations: None → svelte/transition + svelte/motion

**Current State:** No animations  
**Target State:** Svelte transitions and motion

**Changes Required:**
- Add animations to:
  - Page transitions
  - Form submissions
  - Component mounts/unmounts
  - List items (projects, blog posts)
- Use `svelte/transition` and `svelte/motion` APIs
- Install `svelte/motion` if needed (built-in)

**Effort:** 3-4 hours  
**Risk:** Low  
**Dependencies:** None

---

### 11. Charts: None → Chart.js + svelte-chartjs

**Current State:** No charts  
**Target State:** Chart.js integration

**Changes Required:**
- Install: `npm install chart.js svelte-chartjs`
- Identify where charts are needed (if any)
- Create chart components
- Integrate with data sources

**Effort:** 2-4 hours (if needed)  
**Risk:** Low  
**Dependencies:** Determine chart requirements

**Note:** No current chart requirements identified. This may be for future features.

---

### 12. Data Fetching: SvelteKit Load → Add TanStack Query

**Current State:** SvelteKit load functions only  
**Target State:** SvelteKit Load + TanStack Query

**Changes Required:**
- Install TanStack Query: `npm install @tanstack/svelte-query`
- Set up QueryClient in root layout
- Identify client-side data fetching needs
- Convert appropriate load functions to TanStack Query
- Add query invalidation logic
- Consider if this is necessary (SvelteKit load functions may be sufficient)

**Effort:** 4-6 hours  
**Risk:** Medium  
**Dependencies:** Determine actual need for client-side queries

**Note:** SvelteKit load functions are already efficient. TanStack Query may be overkill unless you need complex client-side caching/refetching.

---

### 13. Data Handling: Add date-fns/dayjs

**Current State:** No date formatting library  
**Target State:** date-fns or dayjs

**Changes Required:**
- Install date-fns: `npm install date-fns` (or dayjs)
- Replace manual date formatting with library functions
- Update blog post dates, project dates, etc.

**Effort:** 1-2 hours  
**Risk:** Low  
**Dependencies:** None

**Files Affected:**
- Blog post display components
- Project display components

---

### 14. Drag & Drop: None → dnd-kit-svelte

**Current State:** No drag-and-drop functionality  
**Target State:** dnd-kit-svelte

**Changes Required:**
- Install dnd-kit-svelte: `npm install dnd-kit-svelte`
- Identify where drag-and-drop is needed (admin interfaces?)
- Implement drag-and-drop for:
  - Project ordering
  - Blog post ordering
  - Other admin features

**Effort:** 4-6 hours (if needed)  
**Risk:** Medium  
**Dependencies:** Determine requirements

**Note:** No current drag-and-drop requirements identified. May be for future admin features.

---

### 15. File Upload: None → Form Actions + Convex File Storage

**Current State:** No file upload functionality  
**Target State:** Convex file storage

**Changes Required:**
- Set up Convex file storage
- Create file upload form actions
- Implement file upload UI components
- Add file validation and processing
- Update admin interfaces to support file uploads

**Effort:** 6-8 hours  
**Risk:** Medium  
**Dependencies:** Convex setup

---

### 16. Testing: None → Vite + E2E Playwright

**Current State:** No testing setup  
**Target State:** Vite + Playwright E2E tests

**Changes Required:**
- Install Playwright: `npm install -D @playwright/test`
- Configure Playwright
- Write E2E tests for:
  - Home page
  - Blog page
  - Projects page
  - Contact form
  - Admin authentication
  - Admin CRUD operations
- Set up test scripts in package.json
- Configure CI/CD for test runs

**Effort:** 8-12 hours  
**Risk:** Low  
**Dependencies:** None

---

### 17. Analytics: None → PostHog

**Current State:** No analytics  
**Target State:** PostHog integration

**Changes Required:**
- Sign up for PostHog account
- Install PostHog: `npm install posthog-js`
- Initialize PostHog in root layout
- Set up event tracking:
  - Page views
  - Form submissions
  - Button clicks
  - User interactions
- Configure privacy settings

**Effort:** 3-4 hours  
**Risk:** Low  
**Dependencies:** PostHog account

---

### 18. Performance Monitoring: None → Sentry

**Current State:** No error monitoring  
**Target State:** Sentry integration

**Changes Required:**
- Sign up for Sentry account
- Install Sentry: `npm install @sentry/sveltekit`
- Configure Sentry in SvelteKit
- Set up error boundaries
- Configure source maps for production
- Set up alerting rules

**Effort:** 3-4 hours  
**Risk:** Low  
**Dependencies:** Sentry account

---

### 19. Payment Processing: None → Stripe

**Current State:** No payment processing  
**Target State:** Stripe integration

**Changes Required:**
- Sign up for Stripe account
- Install Stripe SDK: `npm install stripe @stripe/stripe-js`
- Set up Stripe webhooks
- Create payment forms
- Implement payment processing logic
- Add payment success/failure handling

**Effort:** 8-12 hours (if needed)  
**Risk:** High (financial transactions)  
**Dependencies:** Stripe account, business requirements

**Note:** No current payment requirements identified. May be for future monetization features.

---

### 20. Code Review Tools: ESLint/Prettier → Add GitHub Copilot

**Current State:** ESLint + Prettier configured  
**Target State:** Add GitHub Copilot

**Changes Required:**
- Set up GitHub Copilot (team/organization level)
- Configure Copilot settings
- Update documentation

**Effort:** 1 hour  
**Risk:** Low  
**Dependencies:** GitHub Copilot access

---

### 21. Deployment: Vercel (Already Configured)

**Current State:** Vercel-ready with adapter-auto  
**Target State:** Vercel (confirmed)

**Changes Required:**
- Update adapter if needed: `@sveltejs/adapter-vercel`
- Configure Vercel Edge Config (for rate limiting)
- Update environment variables
- Test deployment

**Effort:** 2-3 hours  
**Risk:** Low  
**Dependencies:** Vercel account

---

## Migration Priority & Phases

### Phase 1: Foundation (Critical Path)
1. Package Manager: npm → pnpm (1-2 hours)
2. Database: Prisma → Convex (20-30 hours) ⚠️ HIGHEST RISK
3. Authentication: Custom → WorkOS (12-16 hours) ⚠️ HIGH RISK

**Total Phase 1:** 33-48 hours

### Phase 2: Core Features
4. Forms: Manual → Superforms + Zod (6-8 hours)
5. UI Components: Custom → shadcn-svelte (8-12 hours)
6. Rate Limiting: In-Memory → Vercel Edge Config (4-6 hours)

**Total Phase 2:** 18-26 hours

### Phase 3: Enhancements
7. Icons: Inline SVG → lucide-svelte (2-3 hours)
8. Notifications: None → svelte-sonner (2-3 hours)
9. Animations: Add transitions (3-4 hours)
10. Data Handling: Add date-fns (1-2 hours)

**Total Phase 3:** 8-12 hours

### Phase 4: Advanced Features
11. File Upload: Convex File Storage (6-8 hours)
12. Testing: Playwright E2E (8-12 hours)
13. Analytics: PostHog (3-4 hours)
14. Monitoring: Sentry (3-4 hours)

**Total Phase 4:** 20-28 hours

### Phase 5: Optional/Future
15. TanStack Query (if needed) (4-6 hours)
16. Charts: Chart.js (if needed) (2-4 hours)
17. Drag & Drop: dnd-kit-svelte (if needed) (4-6 hours)
18. Stripe (if needed) (8-12 hours)

---

## Risk Assessment

### High Risk Items:
1. **Database Migration (Prisma → Convex)**
   - Data loss risk
   - Schema differences
   - Query pattern changes
   - **Mitigation:** Comprehensive backup, staged migration, thorough testing

2. **Authentication Migration (Custom → WorkOS)**
   - Security implications
   - User session disruption
   - Admin access during migration
   - **Mitigation:** Parallel systems, careful testing, rollback plan

### Medium Risk Items:
- Rate Limiting migration (Edge Config reliability)
- File Upload implementation (Convex learning curve)
- Form migration (Superforms learning curve)

### Low Risk Items:
- Package manager change
- UI component library
- Icons, animations, notifications
- Analytics and monitoring

---

## Estimated Total Effort

**Minimum (if everything goes smoothly):** 40 hours  
**Realistic:** 50-60 hours  
**Maximum (with complications):** 70-80 hours

**Breakdown:**
- Critical Path (Phase 1): 33-48 hours
- Core Features (Phase 2): 18-26 hours
- Enhancements (Phase 3): 8-12 hours
- Advanced Features (Phase 4): 20-28 hours
- Optional Features (Phase 5): 18-28 hours (if implemented)

---

## Recommendations

### Immediate Actions:
1. Create a full backup of the current database
2. Set up development branches for migration work
3. Create a test environment matching production
4. Document current authentication flow thoroughly

### Migration Strategy:
1. Start with Phase 1 (Foundation) — highest risk, most critical
2. Test thoroughly after each phase before proceeding
3. Consider a parallel run period for authentication
4. Migrate database in stages (schema first, then data, then queries)

### Considerations:
1. **Database Migration:** Convex is a significant architectural change. Consider if it's truly necessary or if keeping Prisma while adding other improvements might be better
2. **Authentication:** WorkOS adds cost. Evaluate if custom auth meets your needs or if WorkOS features justify the cost
3. **TanStack Query:** May be unnecessary if SvelteKit load functions are sufficient
4. **Testing:** Prioritize critical paths first (auth, admin, forms)

### Alternative Approach:
Consider a hybrid migration:
- Keep Prisma/PostgreSQL if Convex migration is too risky
- Migrate UI components and forms first (lower risk, high value)
- Add WorkOS authentication
- Add other enhancements incrementally

---

## Conclusion

This migration is feasible but requires careful planning, especially around the database and authentication changes. The highest risk item is the Prisma → Convex migration. Consider whether Convex is truly necessary or if keeping Prisma while adding other improvements might be a better path.

**Recommended Timeline:** 6-8 weeks for a complete migration with proper testing, or 3-4 weeks for a phased approach focusing on high-value, lower-risk changes first.

