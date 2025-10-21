# Integration Architecture Diagram

```
[User]
   |
   v
[SvelteKit App]
   |
   v
[Prisma ORM] <-> [PostgreSQL Database]
   |
   v
[Static Content (JSON)]
```

- **SvelteKit App**: Integrates frontend and backend, handles routing, API, and server-side logic.
- **Prisma ORM**: Maps TypeScript/JS models to PostgreSQL tables.
- **PostgreSQL**: Main data store for users, sessions, blog posts, and projects.
- **Static Content**: JSON files for bio, blog, and projects (read at runtime).

Optional integrations:
- **Authentication**: Custom logic in `lib/server/auth.ts` (can be extended for OAuth, etc.)