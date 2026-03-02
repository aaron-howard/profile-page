# Technical Improvements & Recommendations

This document outlines recommendations for improving the codebase. These are opportunities to address, not blocking issues—work through them as time and resources allow.

---

## Priority 1: Architecture Clarity (High Impact)

### 1.1 Decide on Authentication Strategy
**Status**: ⏳ Not Started
**Effort**: 2-4 hours

**Problem**: Full authentication system exists (sessions, token hashing, Prisma tables) but is unused and disabled for a public portfolio.

**Options**:
- **Option A - Remove Auth**: Delete `src/lib/server/auth.ts`, remove `/login` route, remove `/admin/*` routes, remove User/Session Prisma models
- **Option B - Complete Auth**: Wire up login functionality, secure admin routes with working authentication, use for content management

**Recommendation**: Option A for a public portfolio. Auth adds complexity without value if the site is public-facing.

**Tasks**:
- [ ] Remove `src/lib/server/auth.ts` if choosing Option A
- [ ] Remove `/admin` routes if choosing Option A
- [ ] Remove User and Session models from `prisma/schema.prisma` if choosing Option A
- [ ] Delete `/login` route if choosing Option A
- [ ] Run `npm run db:push` to update schema

---

### 1.2 Consolidate Content Sources
**Status**: ⏳ Not Started
**Effort**: 3-5 hours

**Problem**: Content can come from JSON files (`src/lib/content/*.json`) *and* PostgreSQL. This creates confusion about source of truth.

**Current State**:
- `bio.json`, `blog.json`, `projects.json` in version control
- Prisma models `BlogPost` and `Project` in database
- Routes read from both or have fallbacks

**Recommendation**: **Database-only approach**
- Use Prisma Studio (`npm run db:studio`) for content management
- Remove JSON content files
- Update all routes to fetch from database only
- Delete fallback logic

**Alternative**: If you want simpler, version-controlled content:
- Delete BlogPost/Project tables from Prisma schema
- Remove database reads from routes
- Keep JSON files only
- Delete admin routes (no longer needed)

**Tasks**:
- [ ] Decide: database-only or JSON-only
- [ ] Update `src/routes/blog/+page.svelte` to use single content source
- [ ] Update `src/routes/projects/+page.svelte` to use single content source
- [ ] Remove unused content source files/code
- [ ] Update `prisma/schema.prisma` if removing database models
- [ ] Run migrations if needed

---

### 1.3 Clean Up or Complete Admin Routes
**Status**: ⏳ Not Started
**Effort**: 2-3 hours (if removing) or 8-12 hours (if completing)

**Problem**: Admin routes exist (`/admin/blogs`, `/admin/projects`) but authentication isn't wired up, making them non-functional for actual content management.

**Options**:
- **Option A - Remove**: Delete `/admin` directory and routes
- **Option B - Complete**: Wire authentication, add proper form handling, add delete/edit functionality
- **Option C - Replace**: Use Prisma Studio for content management instead

**Recommendation**: Option A (remove) or Option C (use Prisma Studio). Option B requires completing the authentication system.

**Tasks**:
- [ ] Decide on admin strategy
- [ ] If removing: delete `src/routes/admin/*`
- [ ] If using Prisma Studio: document workflow in README
- [ ] If completing: wire up actual authentication checks

---

## Priority 2: Data Validation (Medium Impact)

### 2.1 Add Schema Validation Library
**Status**: ⏳ Not Started
**Effort**: 4-6 hours

**Problem**: Validation is manual and inconsistent. Different forms validate differently.

**Current State**:
- Contact form and admin forms have manual validation
- No centralized validation schema
- Inconsistent error handling

**Recommendation**: Add **Zod** + **Superforms** (SvelteKit-native pairing)

```bash
npm install zod superforms
```

**Benefits**:
- Declarative validation schemas
- Type-safe forms
- Consistent error messages
- Better DX with Superforms SvelteKit integration

**Files to Update**:
- `src/routes/contact/+page.svelte` - convert to Superforms
- `src/routes/admin/blogs/+page.server.ts` - add Zod schema
- `src/routes/admin/projects/+page.server.ts` - add Zod schema

**Tasks**:
- [ ] Install `zod` and `superforms`
- [ ] Create `src/lib/schemas.ts` with Zod schemas for blog/project/contact
- [ ] Convert contact form to Superforms
- [ ] Convert admin forms to Superforms
- [ ] Remove manual validation code

---

### 2.2 Standardize Sanitization
**Status**: ⏳ Not Started
**Effort**: 2-3 hours

**Problem**: Sanitization exists but isn't consistently applied. Some forms sanitize, others don't.

**Current State**: `src/lib/server/sanitize.ts` exists but usage is unclear

**Tasks**:
- [ ] Audit all form handlers to ensure sanitization is applied
- [ ] Document where sanitization should happen
- [ ] Add type safety (export typed sanitization functions)
- [ ] Ensure it's used on contact form, admin forms

---

## Priority 3: Production Readiness (Medium Impact)

### 3.1 Fix Rate Limiting
**Status**: ⏳ Not Started
**Effort**: 3-4 hours

**Problem**: In-memory rate limiting (`src/lib/server/rate-limit.ts`) won't work with multiple server instances or serverless deployments.

**Options**:
- **Option A - Remove**: Delete rate limiting if not needed
- **Option B - Implement properly**: Use Redis or similar external service
- **Option C - Document limitation**: Add warning for single-instance deployments only

**Recommendation**: Option A (remove) unless you actually need rate limiting.

**Tasks**:
- [ ] Decide on rate limiting strategy
- [ ] If removing: delete `src/lib/server/rate-limit.ts` and remove from form handlers
- [ ] If keeping: add Redis integration (requires infrastructure)
- [ ] Update deployment documentation

---

### 3.2 Add Error Handling Strategy
**Status**: ⏳ Not Started
**Effort**: 4-6 hours

**Problem**: No documented error handling approach. Form failures may not be reported to users properly.

**Tasks**:
- [ ] Add error.page.svelte for 404/500 pages
- [ ] Add try-catch with proper error responses in form actions
- [ ] Create error handling utility in `src/lib/server/`
- [ ] Log errors appropriately (development vs production)
- [ ] Display user-friendly error messages

---

### 3.3 Database Connection Pooling (For Production)
**Status**: ⏳ Not Started
**Effort**: 1-2 hours

**Problem**: PostgreSQL connection pooling not configured for serverless/scaled deployments.

**Current State**: `src/lib/server/db/index.ts` has comments about this but not implemented

**Tasks**:
- [ ] For Vercel: Configure connection pooling in `.env` or use Vercel Postgres
- [ ] For other platforms: Set up PgBouncer or similar
- [ ] Update connection string in `.env.example`
- [ ] Document in deployment guide

---

## Priority 4: Testing (High Impact for Portfolio/Production)

### 4.1 Add Test Infrastructure
**Status**: ⏳ Not Started
**Effort**: 6-10 hours (initial setup + tests)

**Problem**: Zero tests configured. Can't confidently refactor. Red flag for portfolio.

**Recommendation**: Add **Vitest** + **@testing-library/svelte**

```bash
npm install --save-dev vitest @testing-library/svelte @testing-library/user-event jsdom
```

**What to Test** (prioritized):
1. Page routing and basic renders
2. Form submission handlers
3. Database queries (mock Prisma)
4. Authentication functions (if kept)

**Tasks**:
- [ ] Install test dependencies
- [ ] Create `vitest.config.ts`
- [ ] Add test files for main routes
- [ ] Test contact form submission
- [ ] Test blog/project loading
- [ ] Add `npm run test` and `npm run test:watch` scripts
- [ ] Add test to CI/CD if using

---

## Priority 5: Documentation (Low Impact, High Value)

### 5.1 Clean Up Architecture Documentation
**Status**: ⏳ Not Started
**Effort**: 2-3 hours

**Problem**: `/architecture` folder has detailed diagrams/docs but may not reflect actual implementation.

**Tasks**:
- [ ] Review `/architecture` docs for accuracy
- [ ] Remove docs that don't match actual code
- [ ] Update or delete `MIGRATION_REPORT.md` (planning doc from abandoned tech stack migration)
- [ ] Update `TECH_STACK_ANALYSIS.md` if outdated

---

### 5.2 Clarify Deployment Process
**Status**: ⏳ Not Started
**Effort**: 1-2 hours

**Problem**: `DEPLOYMENT_GUIDE.md` exists but may need updates for current stack.

**Tasks**:
- [ ] Verify deployment guide matches Svelte 5 + current setup
- [ ] Document Prisma setup steps
- [ ] Document environment variables needed
- [ ] Add troubleshooting section

---

## Priority 6: Code Quality (Low Priority, Nice to Have)

### 6.1 Remove Unused Dependencies
**Status**: ⏳ Not Started
**Effort**: 1 hour

**Problem**: Some dependencies may be unused after auth removal or other refactoring.

**Tasks**:
- [ ] Run `npm prune` or `npm audit`
- [ ] Remove unused dependencies
- [ ] Verify build still works

---

### 6.2 Simplify Email System
**Status**: ⏳ Not Started
**Effort**: 1-2 hours

**Problem**: `src/lib/server/email.ts` exists but usage unclear.

**Tasks**:
- [ ] Determine if email functionality is actually used
- [ ] If not used: remove it
- [ ] If used: document and test

---

## Quick Wins (< 1 Hour Each)

- [ ] Remove `MIGRATION_REPORT.md` (it documents an abandoned tech stack migration)
- [ ] Update `.env.example` with all required variables
- [ ] Add `.env.example` to git (remove from .gitignore if needed)
- [ ] Add `npm run test` script (once testing is set up)
- [ ] Document Prisma Studio workflow in README

---

## Work Tracking

Use checkboxes above to track progress. Suggested order:

1. **Start with Priority 1** - Architecture clarity affects everything else
2. **Then Priority 2** - Better validation prevents bugs
3. **Then Priority 4** - Tests give confidence for refactoring
4. **Then Priority 3** - Production readiness for deployment
5. **Finally Priority 5-6** - Polish and cleanup

---

## Related Documents

- `CLAUDE.md` - Current architecture overview
- `SVELTE5_MIGRATION_GUIDE.md` - Svelte 5 migration notes
- `MIGRATION_REPORT.md` - Abandoned tech stack analysis (consider archiving)
- `DEPLOYMENT_GUIDE.md` - Deployment instructions
