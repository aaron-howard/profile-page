# System and Application Architecture Diagram

```
[User]
   |
   v
[SvelteKit Frontend] <-> [SvelteKit Backend/API] <-> [Prisma ORM] <-> [PostgreSQL DB]
```

- **User**: Interacts via browser
- **Frontend**: SvelteKit renders UI, fetches data
- **Backend/API**: Handles business logic, authentication, and data access
- **Prisma ORM**: Maps TypeScript models to database
- **PostgreSQL**: Stores persistent data

Authentication, session management, and content CRUD flow through this pipeline.