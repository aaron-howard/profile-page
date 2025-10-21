# Technical Design Document (TDD)

## 1. Overview
Modern SvelteKit app with TypeScript, Tailwind CSS, and PostgreSQL (Prisma ORM).

## 2. Data Models
See `prisma/schema.prisma` for User, Session, BlogPost, Project models.

## 3. API Endpoints
- `/api/login` (POST): Auth
- `/api/blog` (CRUD): Blog posts
- `/api/projects` (CRUD): Projects

## 4. Authentication
- Session token in cookie
- Auth logic in `lib/server/auth.ts`

## 5. Frontend
- Svelte components for each page/section
- Tailwind for styling

## 6. Backend
- SvelteKit server endpoints
- Prisma for DB access

## 7. Deployment
- Node.js or serverless
- Env vars for secrets

See other docs for diagrams and architecture.