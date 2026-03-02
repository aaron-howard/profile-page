# 🗄️ Database Configuration & Connection Pooling Guide

This document explains database setup, connection pooling strategies, and best practices for different hosting environments.

## Quick Reference

| Provider | Built-in Pooling | Configuration | Effort |
|----------|------------------|---------------|--------|
| **Vercel Postgres** | ✅ Yes (automatic) | Copy URL | 5 min |
| **Neon** | ✅ Yes (separate URL) | Use pool connection string | 5 min |
| **Supabase** | ✅ Yes (separate URL) | Use pool connection string | 5 min |
| **Railway** | ✅ Yes (automatic) | Copy URL | 5 min |
| **Self-hosted + PgBouncer** | ⚠️ Manual setup | Configure PgBouncer | 30 min |

---

## Understanding Connection Pooling

### The Problem

Each serverless function invocation creates a new database connection:

```
Request 1 → New Connection → Query → Close Connection (250ms overhead)
Request 2 → New Connection → Query → Close Connection (250ms overhead)
Request 3 → New Connection → Query → Close Connection (250ms overhead)
```

This causes:
- **Slow responses** (250ms+ per request just for connection)
- **Connection limit exceeded** errors (databases limit to ~100-200 connections)
- **Resource waste** (unused connections consume memory)

### The Solution: Connection Pooling

```
Pool holds N reusable connections
Request 1 → Borrow Connection → Query → Return to Pool (5ms overhead)
Request 2 → Borrow Connection → Query → Return to Pool (5ms overhead)
Request 3 → Borrow Connection → Query → Return to Pool (5ms overhead)
```

This provides:
- **Fast responses** (reuse connections, minimal overhead)
- **Reliability** (pool manages connection limits gracefully)
- **Efficiency** (connections serve multiple requests)

---

## Provider-Specific Setup

### 1. Vercel Postgres (Recommended for Vercel Deployments)

**Advantages:**
- ✅ Built-in connection pooling (automatic)
- ✅ Free tier available (2 GB storage)
- ✅ No configuration needed
- ✅ Optimized for Vercel Functions
- ✅ Automatic backups

**Setup:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Storage" → "Create Database" → "Postgres"
3. Choose "Hobby" tier (free)
4. Copy the `POSTGRES_URL`
5. Add to your `.env` as `DATABASE_URL`

**Connection String Example:**
```
postgresql://default:password@ep-calm-lake.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require
```

**Configuration:**
No additional configuration needed! Vercel Postgres automatically handles:
- Connection pooling
- SSL/TLS encryption
- Automatic backups
- High availability

---

### 2. Neon (PostgreSQL as a Service)

**Advantages:**
- ✅ Generous free tier (3GB storage, 50 GB data transfer)
- ✅ Serverless PostgreSQL (scales to 0)
- ✅ Built-in connection pooling
- ✅ Git integration for schema management

**Setup:**
1. Go to [neon.tech](https://neon.tech)
2. Create account and project
3. Get connection string from console
4. Use the **pooling connection string** (important!)

**Connection String Format:**
```
postgresql://user:password@[project].us-east-1.neon.tech:5432/neondb?sslmode=require
```

**For Pooling, Use This URL:**
```
postgresql://user:password@[project]-pooler.us-east-1.neon.tech:6432/neondb?sslmode=require
```

**Key Difference:** Replace the host with `-pooler` variant to enable connection pooling.

---

### 3. Supabase (Firebase Alternative)

**Advantages:**
- ✅ Generous free tier
- ✅ Built-in authentication and storage
- ✅ Connection pooling included
- ✅ Dashboard GUI for management

**Setup:**
1. Go to [supabase.com](https://supabase.com)
2. Create project
3. Go to Project Settings → Database
4. Copy **Session Pool** connection string
5. Use as `DATABASE_URL`

**Connection String Example:**
```
postgresql://postgres:password@db.project-ref.supabase.co:6543/postgres
```

**Note:** Supabase uses port `6543` for pooling (instead of standard `5432`).

---

### 4. Railway (All-in-One Platform)

**Advantages:**
- ✅ Simple deployment
- ✅ Built-in connection pooling
- ✅ Pay-as-you-go pricing ($5 free credit/month)
- ✅ PostgreSQL preconfigured

**Setup:**
1. Go to [railway.app](https://railway.app)
2. Create project
3. Add PostgreSQL
4. Get connection string from Variables
5. Use as `DATABASE_URL`

**Configuration:**
Railway automatically handles pooling. No additional configuration needed.

---

### 5. Self-Hosted PostgreSQL with PgBouncer

**Use When:**
- You want full control over the database
- You're running on your own servers
- You need custom PostgreSQL configuration

**Challenges:**
- You maintain the database
- You handle backups
- You manage scaling
- More setup complexity

**PgBouncer Setup:**

1. **Install PgBouncer on your server:**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install pgbouncer

   # macOS
   brew install pgbouncer
   ```

2. **Configure PgBouncer** (`/etc/pgbouncer/pgbouncer.ini`):
   ```ini
   [databases]
   portfolio = host=localhost port=5432 dbname=portfolio user=postgres password=yourpassword

   [pgbouncer]
   # Pool mode (transaction, session, statement)
   pool_mode = transaction

   # Connection limits
   max_client_conn = 1000
   default_pool_size = 25
   min_pool_size = 10
   reserve_pool_size = 5
   reserve_pool_timeout = 3

   # Connection timeout
   server_connect_timeout = 15
   server_lifetime = 3600

   # Logging
   log_connections = 1
   log_disconnections = 1
   ```

3. **Point your `DATABASE_URL` to PgBouncer:**
   ```
   DATABASE_URL="postgresql://postgres:password@localhost:6432/portfolio"
   ```

4. **Start PgBouncer:**
   ```bash
   sudo systemctl start pgbouncer
   sudo systemctl enable pgbouncer
   ```

**Pool Mode Explanation:**
- **Transaction**: Connection released after each transaction (recommended for serverless)
- **Session**: Connection released after client disconnects
- **Statement**: Connection released after each SQL statement

---

## Adding Pooling Parameters to Connection Strings

If your provider doesn't offer managed pooling, you can add pooling parameters to your connection URL:

```
postgresql://user:password@host:5432/database?connection_limit=20&statement_cache_size=20
```

**Common Parameters:**

| Parameter | Default | Example | Purpose |
|-----------|---------|---------|---------|
| `connection_limit` | 10 | 20 | Max connections per pool |
| `statement_cache_size` | 15 | 20 | Cache prepared statements |
| `sslmode` | prefer | require | Enforce SSL encryption |
| `pool_timeout` | 3 | 10 | Timeout waiting for connection |

---

## Performance Tips

### 1. Use Connection Pooling
- Always enable connection pooling for serverless
- Managed providers (Vercel, Neon, Supabase) are recommended
- Reduces latency by 200-250ms per request

### 2. Optimize Pool Size
```
# Formula: connections_needed = (workers * queries_per_second) + buffer
# Example: (50 workers * 10 queries/sec) + 10 = 510 connections

# For small apps: 10-20 connections
# For medium apps: 20-50 connections
# For large apps: 50-100+ connections
```

### 3. Use Prisma Efficiently
```typescript
// ✅ Good: Reuse db instance
import { db } from '$lib/server/db';

// ✅ Use batch operations
const posts = await db.post.findMany({
  where: { published: true },
  take: 10,
  skip: 0
});

// ✅ Use select to fetch only needed fields
const authors = await db.user.findMany({
  select: { id: true, name: true }
});

// ❌ Avoid: Creating new PrismaClient instances
const newDb = new PrismaClient(); // Don't do this!

// ❌ Avoid: N+1 queries
const posts = await db.post.findMany();
for (const post of posts) {
  post.author = await db.user.findUnique({
    where: { id: post.authorId }
  });
}
```

### 4. Add Database Indexes
```sql
-- Index frequently queried columns
CREATE INDEX idx_posts_published ON posts(published);
CREATE INDEX idx_users_email ON users(email);
```

### 5. Monitor Connection Usage
```bash
# Check active connections
SELECT count(*) FROM pg_stat_activity;

# Check connection limits
SHOW max_connections;
```

---

## Troubleshooting

### Error: "too many connections"

**Symptoms:** Requests start failing with connection limit errors

**Causes:**
- Connection pooling not enabled
- Pool size too small for traffic
- Connections not being released (idle connections)

**Solutions:**
1. Enable connection pooling
2. Increase pool size
3. Add connection timeout to close idle connections
4. Check for connection leaks in code

### Error: "connection timeout"

**Symptoms:** Requests hang or timeout when connecting to database

**Causes:**
- Database server is down/unreachable
- Network connectivity issues
- Firewall blocking connections

**Solutions:**
1. Verify database is running: `psql postgresql://...`
2. Check network connectivity: `ping host`
3. Verify firewall rules allow your IP
4. Check database logs for errors

### Slow Queries

**Symptoms:** Database queries taking 1+ seconds

**Causes:**
- Missing indexes
- Inefficient queries
- Connection latency
- Database resource limits

**Solutions:**
1. Add indexes to frequently queried columns
2. Use Prisma's `select` to fetch only needed data
3. Enable query logging: `npm run dev` (shows queries)
4. Check database performance metrics

### Connection Pool Exhaustion

**Symptoms:** "Connection pool exhausted" errors

**Causes:**
- Too many simultaneous connections
- Connections not being released properly
- Pool size too small

**Solutions:**
```typescript
// ✅ Always close Prisma connections when done
import { db } from '$lib/server/db';

// In +server.ts for scheduled tasks
await db.$disconnect(); // Close after use

// For long-running processes
const result = await db.post.findMany();
await db.$disconnect(); // Explicitly close
```

---

## Environment Variables Example

```bash
# .env for local development (self-hosted)
DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio"

# .env for Vercel Postgres
DATABASE_URL="postgresql://default:password@ep-calm-lake.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require"

# .env for Neon with pooling
DATABASE_URL="postgresql://user:password@project-pooler.us-east-1.neon.tech:6432/neondb?sslmode=require"

# .env for Supabase with pooling
DATABASE_URL="postgresql://postgres:password@db.project-ref.supabase.co:6543/postgres"

# .env for Railway
DATABASE_URL="postgresql://postgres:password@railway.railway.internal:5432/railway"

# .env for self-hosted with PgBouncer
DATABASE_URL="postgresql://postgres:password@localhost:6432/portfolio"
```

---

## Migration from Self-Hosted to Managed PostgreSQL

If you're moving from self-hosted to a managed provider:

1. **Dump your database:**
   ```bash
   pg_dump postgresql://user:password@localhost:5432/portfolio > backup.sql
   ```

2. **Create database in new provider**

3. **Restore database:**
   ```bash
   psql postgresql://new-url < backup.sql
   ```

4. **Update `DATABASE_URL` in environment**

5. **Run Prisma migration:**
   ```bash
   DATABASE_URL="new-url" npm run db:push
   ```

---

## Recommended Setup by Scenario

### Scenario: Portfolio on Vercel
**Best Choice:** Vercel Postgres
- Copy connection string, done
- No configuration needed
- Optimal performance for Vercel

### Scenario: Using Vercel + Additional Services
**Best Choice:** Supabase or Neon
- Integrates well with external services
- Good free tier
- Built-in auth if needed

### Scenario: Self-Hosted Server
**Best Choice:** Self-hosted PostgreSQL + PgBouncer
- Full control
- Save on database costs
- More maintenance burden

---

## Related Documentation

- **DEPLOYMENT_GUIDE.md** - Full deployment steps
- **CLAUDE.md** - Architecture overview
- **prisma/schema.prisma** - Database schema definition
