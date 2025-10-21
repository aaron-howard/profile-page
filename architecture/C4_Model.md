# C4 Model Documentation

## 1. Context Diagram

The Personal Profile Page is a web application for showcasing a developer's portfolio, blog, and contact information. It interacts with users (visitors, admin), a PostgreSQL database, and optionally external authentication providers.

- **Users**: Interact with the web UI to view content, submit contact forms, and (optionally) log in for admin features.
- **Web Application**: Built with SvelteKit, TypeScript, and Tailwind CSS. Handles routing, rendering, and business logic.
- **Database**: PostgreSQL, accessed via Prisma ORM for persistence of users, sessions, blog posts, and projects.

## 2. Container Diagram

- **Frontend (SvelteKit)**: Renders UI, handles client-side routing, fetches data from server endpoints.
- **Backend (SvelteKit/Node.js)**: Handles API requests, authentication, and database access via Prisma.
- **Database (PostgreSQL)**: Stores users, sessions, blog posts, and projects.

## 3. Component Diagram

- **UI Components**: Home, Bio, Projects, Blog, Contact, Admin, Login, Logout
- **Server Components**: Auth handler, DB access layer, API endpoints
- **Content**: JSON files for static content, Prisma models for dynamic content

## 4. Code Diagram

- **Svelte Components**: `src/routes/**/*.svelte`
- **Server Logic**: `src/lib/server/`, `src/routes/**/*.server.ts`
- **Prisma Models**: `prisma/schema.prisma`

---

See additional diagrams and documentation in this folder for more details.