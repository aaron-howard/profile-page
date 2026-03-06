# Personal Portfolio Website

A modern, responsive personal portfolio website built with **SvelteKit**, **Svelte 5**, **TypeScript**, and **Tailwind CSS v4**. Features a blog, project showcase, and contact form—all powered by PostgreSQL and Prisma ORM.

## ✨ Features

- **Modern Tech Stack**: SvelteKit 2.16.0, Svelte 5, TypeScript, Tailwind CSS v4, Vite
- **Responsive Design**: Mobile-first approach with beautiful UI/UX
- **Multiple Sections**: Home, Bio, Projects, Blog, and Contact pages
- **Database-Driven Content**: PostgreSQL with Prisma ORM for all content
- **Type-Safe Validation**: Zod schemas with Superforms for forms
- **Comprehensive Testing**: Vitest with 102 tests covering utilities, validation, and components
- **CI/CD Pipeline**: GitHub Actions for lint, type-check, test, and build verification
- **Pre-commit Hooks**: Husky + lint-staged for local quality gates
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Error Handling**: Centralized error utilities with user-friendly messages
- **Security**: Input sanitization, CSP headers, secure form handling

## 🚀 Quick Start

### Prerequisites

- **Node.js 22+** (configured in `engines` field)
- **npm 10+** or **pnpm**
- **PostgreSQL 12+** (required for database features)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd profile-page
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/portfolio_db"
   ```

   See `.env.example` for all available options.

4. **Set up the database**

   ```bash
   npm run db:push
   ```

5. **Start development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to `http://localhost:5173`

## 📚 Available Scripts

### Development

```bash
npm run dev              # Start dev server at http://localhost:5173
npm run preview          # Preview production build locally
```

### Code Quality

```bash
npm run lint            # Run ESLint and Prettier check
npm run format          # Auto-format code with Prettier
npm run check           # Type check with svelte-check
npm run check:watch     # Watch mode type checking
```

### Testing

```bash
npm test                # Run full test suite (102 tests)
npm run test:watch      # Watch mode for tests
npm run test:unit       # Run unit tests only
npm run test:coverage   # Test coverage report
npm run test:integration    # Run integration tests
npm run test:components     # Run component tests
```

### Database

```bash
npm run db:push         # Push schema changes to database
npm run db:migrate      # Run database migrations interactively
npm run db:studio       # Open Prisma Studio GUI (content management)
npm run db:generate     # Generate Prisma client
npm run db:seed         # Seed projects from scripts/seed-projects.js
```

### Production

```bash
npm run build           # Build for production (includes Prisma generate)
```

## 📁 Project Structure

```
src/
├── routes/                          # SvelteKit pages and routes
│   ├── +layout.svelte              # Root layout
│   ├── +layout.server.ts           # Root layout server load
│   ├── +page.svelte                # Home page
│   ├── +error.svelte               # Global error page
│   ├── bio/                        # About/Bio page
│   ├── blog/                       # Blog posts page
│   ├── projects/                   # Projects showcase
│   └── contact/                    # Contact form page
├── lib/
│   ├── server/
│   │   ├── db/
│   │   │   └── index.ts           # Prisma client singleton
│   │   ├── error-handler.ts       # Centralized error handling
│   │   ├── email.ts               # Email utilities
│   │   ├── sanitize.ts            # Input sanitization functions
│   │   └── sanitize-utils.ts      # Detailed sanitization utilities
│   ├── schemas.ts                 # Zod validation schemas
│   └── types.ts                   # TypeScript interfaces
├── hooks.server.ts                 # SvelteKit server hooks (security headers)
├── app.css                         # Global Tailwind CSS
└── app.html                        # HTML template
prisma/
├── schema.prisma                   # Database schema (Bio, BlogPost, Project)
└── migrations/                     # Database migration history
```

## 🗄️ Database Schema

**Models** (in `prisma/schema.prisma`):

- **Bio** (singleton): Personal profile, title, location, about, skills, and work experience
- **BlogPost**: Blog posts with title, excerpt, content, category, tags, featured status
- **Project**: Portfolio projects with title, description, technologies, links, featured status

## 🎨 Content Management

All content is managed through **Prisma Studio** — no authentication required, no web interface needed:

```bash
npm run db:studio
```

This opens a GUI where you can:

- Edit your bio/profile
- Create and manage blog posts
- Manage your portfolio projects
- Preview changes instantly

## 🔐 Security

- **Input Sanitization**: All user input is sanitized using dedicated utilities
- **Form Validation**: Zod schemas with Superforms for type-safe validation
- **CSP Headers**: Content Security Policy configured in `svelte.config.js`
- **Error Handling**: Sensitive errors hidden from users, logged internally
- **CSRF Protection**: Built into SvelteKit

## ✅ Testing

**102 test cases** covering:

- **Sanitization utilities**: 46 tests (100% coverage)
- **Schema validation**: 17 tests (100% coverage)
- **Error handling**: 28 tests (100% coverage)
- **Contact form**: 4 integration tests
- **Error page**: 7 component tests

Run tests with:

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables:
   - `DATABASE_URL`: PostgreSQL connection string
4. Deploy

See `DEPLOYMENT_GUIDE.md` for:

- Connection pooling setup for serverless
- Vercel Postgres integration
- Environment configuration for production

### Other Platforms

The project works on any platform supporting SvelteKit:

- Netlify
- Railway
- DigitalOcean App Platform
- Self-hosted servers

## 🔄 Git Workflow

**Pre-commit hooks** (via Husky):

- Lint-staged checks only modified files
- Runs Prettier and ESLint on commits
- Fast (<5 seconds)

**Pre-push hooks** (via Husky):

- Type-check (svelte-check)
- Unit tests only
- Catches issues before remote

**CI/CD** (GitHub Actions):

- Lint & format check
- Type check
- Full test suite (102 tests)
- Production build verification

All quality gates must pass before merging to main.

## 🛠️ Tech Stack

| Layer      | Technology                                       |
| ---------- | ------------------------------------------------ |
| Frontend   | Svelte 5.0.0, SvelteKit 2.16.0, TypeScript       |
| Styling    | Tailwind CSS v4 with plugins (forms, typography) |
| Build      | Vite 6.2.6                                       |
| Database   | PostgreSQL 12+                                   |
| ORM        | Prisma 6.1.0                                     |
| Validation | Zod 4.3.6 + Superforms 2.30.0                    |
| Testing    | Vitest 3.2.4 + @testing-library/svelte 5.2.7     |
| Quality    | ESLint, Prettier, svelte-check                   |
| Hooks      | Husky 9.1.7 + lint-staged 16.3.2                 |
| Deployment | Vercel (adapter-auto)                            |

## 📖 Documentation

- **CLAUDE.md** - Architecture overview and quick commands for Claude Code
- **DEPLOYMENT_GUIDE.md** - Step-by-step deployment instructions
- **DATABASE_CONFIG.md** - Connection pooling and production database setup
- **IMPROVEMENTS.md** - Project status and task tracking

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint && npm run check && npm test` locally
4. Commit and push (pre-commit/pre-push hooks will validate)
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using SvelteKit, Svelte 5, and Tailwind CSS**
