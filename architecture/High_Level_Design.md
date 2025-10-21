# High-Level Design (HLD)

## Overview
A modern portfolio web app using SvelteKit, TypeScript, Tailwind CSS, and PostgreSQL (via Prisma). Features include project/blog CRUD, authentication, and responsive UI.

## Architecture
- **Frontend**: SvelteKit, Tailwind CSS
- **Backend**: SvelteKit server endpoints, Prisma ORM
- **Database**: PostgreSQL

## Key Flows
- User views portfolio, blog, and projects
- Admin can log in to manage content
- Data is fetched from JSON (static) or DB (dynamic)

## Security
- Session-based authentication
- Environment variables for secrets

## Extensibility
- Add OAuth, more content types, or deploy to any Node.js-compatible cloud

See diagrams for details.