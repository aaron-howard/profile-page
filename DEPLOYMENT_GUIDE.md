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

## 🔗 Helpful Links

- [Vercel Documentation](https://vercel.com/docs)
- [SvelteKit Deployment Guide](https://kit.svelte.dev/docs/adapters)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [GitHub Actions for CI/CD](https://docs.github.com/en/actions)

---

**🎊 Congratulations!** Your SvelteKit portfolio is now live on Vercel with automatic deployments from GitHub!