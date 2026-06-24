# Security Policy

## Supported versions

Security fixes are applied to the **`main`** branch and released through normal deployments. There are no separate long-term support branches for this project.

## Reporting a vulnerability

If you believe you have found a security vulnerability in **this repository’s application code** (SvelteKit routes, server logic, Prisma usage, form handling, headers, or similar), please report it responsibly:

1. **Preferred:** Open a **private vulnerability report** via this repository’s **Security** tab on GitHub (**Report a vulnerability**), if enabled for the repo.
2. **Alternative:** Contact the maintainer through a **private** channel (do not file a public issue for unfixed security bugs).

Please include:

- A clear description of the issue and its impact
- Steps to reproduce (or a proof-of-concept) where safe to share
- Affected area (e.g. contact form, server load, headers)
- Versions or commit you tested, if known

We aim to acknowledge reports within a few business days. Critical issues (e.g. remote code execution, authentication bypass) are prioritized; this app is **public and unauthenticated**, so scope is mainly data integrity, injection, and misuse of server-side behavior.

## Out of scope

The following are generally **not** treated as vulnerabilities in this project alone:

- **Dependency advisories** — [Dependabot](https://docs.github.com/en/code-security/dependabot) (Actions), [Renovate](https://github.com/apps/renovate) (npm), and `npm audit` in CI; see `docs/DEPENDENCY-MANAGEMENT.md`.
- **Misconfiguration of hosting** (e.g. missing `DATABASE_URL`, leaked env vars on the deploy provider) — follow your host’s and your own secret-management practices.
- **Content stored in the database** (bio, blog, projects) when changed by the **owner** via Prisma Studio or equivalent — that is administrative access to your own data.
- **Denial of service** against a personal portfolio unless trivially fixable in app code.
- **Social engineering** or issues in third-party services (DNS, email provider, Vercel, PostgreSQL host) outside this codebase.

## Secure development reminders

Maintainers and contributors should:

- Keep dependencies updated and run `npm audit` / CI as configured
- Never commit secrets; use environment variables for `DATABASE_URL`, email API keys, etc.
- Review server-side validation and sanitization for user-facing inputs (e.g. contact form)

Thank you for helping keep this project and its users safe.
