# Personal Profile Page

A modern, responsive personal portfolio website built with **SvelteKit**, **TypeScript**, and **Tailwind CSS**. This project showcases a developer's skills, projects, blog posts, and contact information in a clean, professional design.

## ✨ Features

- **Modern Tech Stack**: SvelteKit 2.16.0, TypeScript, Tailwind CSS v4
- **Responsive Design**: Mobile-first approach with beautiful UI/UX
- **Multiple Sections**: Home, Bio, Projects, Blog, and Contact pages
- **Database Ready**: PostgreSQL with Drizzle ORM for data persistence
- **Authentication System**: Built-in auth system (currently disabled for portfolio use)
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Accessibility**: ARIA labels and keyboard navigation support
- **Performance**: Optimized with Vite and modern build tools

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- PostgreSQL (optional, for database features)

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

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type check with svelte-check
- `npm run lint` - Run ESLint and Prettier
- `npm run format` - Format code with Prettier
- `npm run db:push` - Push database schema changes
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio

## 📁 Project Structure

```
profile-page/
├── src/
│   ├── app.css              # Global styles with Tailwind
│   ├── app.html             # HTML template
│   ├── hooks.server.ts      # Server-side hooks
│   ├── lib/
│   │   ├── server/
│   │   │   ├── auth.ts      # Authentication logic
│   │   │   └── db/
│   │   │       ├── index.ts # Database connection
│   │   │       └── schema.ts # Database schema
│   │   └── routes/
│   │       ├── +layout.svelte   # Root layout
│   │       ├── +page.svelte     # Home page
│   │       ├── bio/+page.svelte # About/Bio page
│   │       ├── blog/+page.svelte # Blog posts
│   │       ├── contact/+page.svelte # Contact form
│   │       └── projects/+page.svelte # Projects showcase
│   ├── static/                  # Static assets
│   └── package.json
```

## 🎨 Customization

### Personal Information

Update the following files with your information:

1. **Home Page** (`src/routes/+page.svelte`)
   ```typescript
   const profileData = {
     name: "Your Name",
     title: "Your Title",
     tagline: "Your tagline",
     socialLinks: {
       github: "https://github.com/yourusername",
       linkedin: "https://linkedin.com/in/yourusername",
       // ... other social links
     }
   };
   ```

2. **Bio Page** (`src/routes/bio/+page.svelte`)
   - Update `bioData` object with your personal information
   - Modify skills, experience, education, and interests

3. **Projects Page** (`src/routes/projects/+page.svelte`)
   - Replace the `projects` array with your actual projects
   - Add project images to `static/projects/`

4. **Blog Page** (`src/routes/blog/+page.svelte`)
   - Update the `blogPosts` array with your blog content
   - Consider integrating with a CMS for dynamic content

5. **Contact Page** (`src/routes/contact/+page.svelte`)
   - Update `contactData` with your contact information
   - Implement actual form submission logic

### Styling

The project uses Tailwind CSS v4. You can customize:

- **Colors**: Modify the color scheme in your components
- **Typography**: Update font classes in the components
- **Layout**: Adjust spacing and grid layouts
- **Components**: Create reusable components in `src/lib/`

### Database Setup (Optional)

If you want to use the database features:

1. **Set up PostgreSQL**
2. **Configure environment variables**
3. **Run database migrations**
   ```bash
   npm run db:push
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

### SvelteKit Configuration

The project uses the default SvelteKit configuration. You can modify `svelte.config.js` for:

- Custom adapters for deployment
- Additional Vite plugins
- Build optimizations

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The project can be deployed to any platform that supports SvelteKit:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Support

If you have questions or need help:

1. Check the [SvelteKit documentation](https://kit.svelte.dev/)
2. Review the [Tailwind CSS documentation](https://tailwindcss.com/)
3. Open an issue in this repository

---

**Built with ❤️ using SvelteKit and Tailwind CSS**
