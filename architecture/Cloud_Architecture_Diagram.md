# Cloud Architecture Diagram

```
[Internet]
   |
   v
[Cloud Provider (Vercel/Netlify/AWS)]
   |
   v
[SvelteKit App (Serverless/Node.js)]
   |
   v
[PostgreSQL Database (Managed Cloud DB)]
```

- **Cloud Provider**: Hosts the SvelteKit app (serverless or Node.js runtime)
- **App**: Handles all web traffic, API, and SSR
- **Database**: Managed PostgreSQL (e.g., Supabase, AWS RDS, Neon)

Environment variables (e.g., `DATABASE_URL`) configure DB connection.