# Sequence Diagram: User Login Flow

```
User -> SvelteKit Frontend: Submit login form
SvelteKit Frontend -> SvelteKit Backend: POST /login
SvelteKit Backend -> Auth Module: Validate credentials
Auth Module -> Prisma ORM: Query User
Prisma ORM -> PostgreSQL: SELECT user
PostgreSQL -> Prisma ORM: User data
Prisma ORM -> Auth Module: User object
Auth Module -> SvelteKit Backend: Session token
SvelteKit Backend -> SvelteKit Frontend: Set cookie, redirect
SvelteKit Frontend -> User: Show dashboard
```

This sequence covers the main authentication flow.