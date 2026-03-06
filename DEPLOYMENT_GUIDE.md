# 🚀 GitHub + Vercel Deployment Guide

This guide will walk you through deploying your SvelteKit portfolio with Prisma to Vercel using GitHub integration.

## Prerequisites

- [x] GitHub account
- [x] Vercel account (free tier available)
- [x] PostgreSQL database (we'll set this up)
- [x] Your project is ready (Prisma migration complete)

---

## 📋 Step 1: Prepare Your Local Repository

### 1.1 Initialize Git Repository (if not already done)

```bash
git init
git add .
git commit -m "Initial commit: SvelteKit portfolio with Prisma"
```

### 1.2 Create .gitignore (verify it includes)

```
node_modules/
.env
.svelte-kit/
build/
.vercel/
```

---

## 🗄️ Step 2: Set Up PostgreSQL Database

### Option A: Vercel Postgres (Recommended - Free Tier Available)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub

2. **Create Database**
   - Click "Storage" in sidebar
   - Click "Create Database"
   - Select "Postgres"
   - Choose "Hobby" (free tier)
   - Name: `portfolio-db` (or your preference)
   - Region: Choose closest to your users
   - Click "Create"

3. **Get Connection String**
   - Click on your new database
   - Go to "Settings" tab
   - Copy the `POSTGRES_URL` (this is your `DATABASE_URL`)

### Option B: Other PostgreSQL Providers

- **Neon** (free tier): [neon.tech](https://neon.tech)
- **Supabase** (free tier): [supabase.com](https://supabase.com)
- **Railway** (free tier): [railway.app](https://railway.app)

---

## 🔌 Connection Pooling Configuration

### Why Connection Pooling?

Without pooling, serverless functions create new database connections on each request, causing:

- **Connection overhead**: Slower requests (250ms+ per new connection)
- **Connection limits**: Databases limit concurrent connections (usually 100-200)
- **Resource waste**: Unused connections consume server memory

Connection pooling reuses connections, improving performance and reliability.

### Vercel Postgres (Recommended)

✅ **No configuration needed** - Vercel Postgres includes built-in connection pooling automatically.

Just copy the `POSTGRES_URL` from your Vercel dashboard and use it as `DATABASE_URL`.

### Other Database Providers

If using Neon, Supabase, Railway, or similar, add connection pooling parameters to your `DATABASE_URL`:

```
DATABASE_URL="postgresql://user:password@host:5432/database?connection_limit=20&statement_cache_size=20"
```

**Explanation:**

- `connection_limit=20`: Maximum connections per pool (adjust based on your plan)
- `statement_cache_size=20`: Cache prepared statements for performance

**Provider-Specific Guides:**

**Neon:**

- Pooling is available (check Neon dashboard for pool connection string)
- Add `?connection_limit=20` to your connection string

**Supabase:**

- Use the "Connection Pooling" connection string from Project Settings
- Already configured with optimal pooling settings

**Railway:**

- Connection pooling is included in their PostgreSQL offering
- Use the provided connection string as-is

### Self-Hosted PostgreSQL with PgBouncer

If you're self-hosting PostgreSQL (not recommended for serverless), use **PgBouncer** as an external connection pooler:

**Setup Steps:**

1. Install PgBouncer on your server
2. Configure PgBouncer to forward connections to your PostgreSQL instance
3. Point your `DATABASE_URL` to PgBouncer (usually `localhost:6432`)

**Example PgBouncer config:**

```ini
[databases]
portfolio = host=localhost port=5432 dbname=portfolio user=postgres password=password

[pgbouncer]
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 25
```

**Note:** PgBouncer adds complexity. For most use cases, Vercel Postgres or a managed provider with built-in pooling is better.

---

## 📁 Step 3: Push to GitHub

### 3.1 Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click "New repository" (green button)
3. Repository name: `portfolio-website` (or your choice)
4. Set to **Public** or **Private**
5. **Don't** initialize with README (you already have files)
6. Click "Create repository"

### 3.2 Connect Local Repository to GitHub

```bash
# Add GitHub remote (replace with your username/repo)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🌐 Step 4: Deploy to Vercel

### 4.1 Connect GitHub to Vercel

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"

2. **Import Git Repository**
   - Click "Continue with GitHub"
   - Authorize Vercel to access your repositories
   - Find your portfolio repository
   - Click "Import"

### 4.2 Configure Project Settings

1. **Project Settings**
   - Project Name: `portfolio-website` (or your choice)
   - Framework Preset: Should auto-detect "SvelteKit"
   - Root Directory: `./` (leave default)

2. **Build Settings** (should auto-populate)
   - Build Command: `npm run build`
   - Output Directory: `.svelte-kit/output`
   - Install Command: `npm install`

### 4.3 Add Environment Variables

1. **In the deployment configuration**
   - Expand "Environment Variables" section
   - Add variable:
     - **Name**: `DATABASE_URL`
     - **Value**: Your PostgreSQL connection string from Step 2
   - Click "Add"

2. **Click "Deploy"**

---

## 🔧 Step 5: Post-Deployment Setup

### 5.1 Initialize Database Schema

After your first deployment:

1. **Go to Vercel Dashboard**
   - Click on your project
   - Go to "Functions" tab
   - Click "View Function Logs"

2. **Run Database Migration**
   - In your local terminal:

   ```bash
   # Set your production DATABASE_URL locally for this command
   DATABASE_URL="your_production_database_url" npm run db:push
   ```

   **OR** use Vercel CLI:

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Link your project
   vercel link

   # Run command in Vercel environment
   vercel env pull .env.local
   npm run db:push
   ```

### 5.2 Verify Deployment

1. **Check your live site**
   - Vercel will provide a URL like: `https://your-project.vercel.app`
   - Test all pages and functionality

2. **Check Database Connection**
   - If using auth features, test login/logout
   - Check Vercel function logs for any database errors

---

## 🔄 Step 6: Set Up Continuous Deployment

### 6.1 Automatic Deployments

- **Already configured!** Every push to `main` branch will auto-deploy
- Pull requests create preview deployments

### 6.2 Branch Protection (Optional but Recommended)

1. **In GitHub Repository**
   - Go to Settings → Branches
   - Add rule for `main` branch
   - Enable "Require pull request reviews"

---

## 🛠️ Step 7: Custom Domain (Optional)

### 7.1 Add Custom Domain

1. **In Vercel Dashboard**
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your domain
   - Follow DNS configuration instructions

### 7.2 SSL Certificate

- Vercel automatically provides SSL certificates
- Your site will be available via HTTPS

---

## 📊 Step 8: Monitoring & Analytics

### 8.1 Vercel Analytics (Optional)

1. **Enable Analytics**
   - In project settings
   - Go to "Analytics" tab
   - Enable Web Analytics (free tier available)

### 8.2 Function Logs

- Monitor database connections and errors
- Access via Vercel Dashboard → Functions → View Logs

---

## 🚨 Troubleshooting

### Common Issues:

**Build Fails:**

```bash
# Check build locally first
npm run build
npm run check
```

**Database Connection Issues:**

- Verify `DATABASE_URL` is correctly set in Vercel
- Check database is accessible from external connections
- Ensure connection string includes SSL parameters if required

**Prisma Issues:**

```bash
# Regenerate Prisma client
npm run db:generate
```

**Environment Variables:**

- Make sure `DATABASE_URL` is set in Vercel dashboard
- Don't commit `.env` file to GitHub

**Connection Pool Exhaustion:**

```
Error: too many connections for role "postgres"
```

- Your application is creating too many connections
- **For Vercel Postgres**: Already pooled, shouldn't happen
- **For other providers**: Add/increase connection pooling parameters in `DATABASE_URL`
- **For self-hosted**: Configure PgBouncer with appropriate pool_size

**Connection Timeouts:**

```
Error: connect ETIMEDOUT
```

- Database server is not responding
- Check database is running and accessible
- Verify firewall allows connections from Vercel (if self-hosted)
- For self-hosted PostgreSQL: Check network connectivity

**Slow Database Queries:**

- Enable query logging in development: `npm run dev`
- Check `.svelte-kit/logs/` for slow query information
- Add indexes to frequently queried columns
- Review Prisma query performance with `@prisma/client/debug`

---

## 🎉 Success Checklist

- [ ] Repository pushed to GitHub
- [ ] Vercel project created and deployed
- [ ] Database connected and schema pushed
- [ ] Environment variables configured
- [ ] Site accessible via Vercel URL
- [ ] All pages loading correctly
- [ ] Database operations working (if using auth)
- [ ] Custom domain configured (if applicable)

---

## 📝 Useful Commands

```bash
# Local development
npm run dev

# Build and test locally
npm run build
npm run preview

# Database operations
npm run db:push          # Push schema to database
npm run db:studio        # Open Prisma Studio
npm run db:generate      # Generate Prisma client

# Vercel CLI
vercel                   # Deploy from CLI
vercel --prod           # Deploy to production
vercel logs             # View deployment logs
```

---

## ⚠️ Rate Limiting

**Note**: This application does not include rate limiting by default. Rate limiting was intentionally removed because:

1. **Single-instance limitation**: The original in-memory implementation only worked for single server instances
2. **Serverless incompatibility**: In-memory rate limiting doesn't work with serverless or distributed deployments
3. **Not required for this use case**: The contact form uses Zod validation instead

### If You Need Rate Limiting

For production applications that need rate limiting, consider:

- **Vercel Rate Limiting**: Vercel's built-in rate limiting through Edge Functions
- **Redis-based solution**: Use a Redis instance with libraries like `redis` or `ioredis`
- **Third-party service**: Use services like Cloudflare Rate Limiting or API Gateway rate limiting
- **Middleware**: Implement custom rate limiting middleware based on your needs

Example setup with Redis would require:

1. Setting up a Redis instance (e.g., via Vercel KV or separate Redis service)
2. Installing `redis` package
3. Adding rate limiting middleware to your SvelteKit hooks

---

## 🔗 Helpful Links

- [Vercel Documentation](https://vercel.com/docs)
- [SvelteKit Deployment Guide](https://kit.svelte.dev/docs/adapters)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [GitHub Actions for CI/CD](https://docs.github.com/en/actions)
- [Redis Rate Limiting](https://redis.io/commands/incr/) (for custom implementation)

---

**🎊 Congratulations!** Your SvelteKit portfolio is now live on Vercel with automatic deployments from GitHub!
