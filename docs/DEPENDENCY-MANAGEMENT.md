# Dependency Management

Implements **AI Engineering Blueprint §4** — Dependabot + Renovate with predictable division of labor.

## Tool split

| Tool           | Scope                                            | Why                                                                                                                                  |
| -------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Dependabot** | `github-actions` only (`.github/dependabot.yml`) | Native GitHub integration for Actions bumps; grouped weekly PRs                                                                      |
| **Renovate**   | `npm` (`renovate.json`)                          | Grouped weekly batches, semver-aware rules, patch auto-merge for devDeps                                                             |
| **CI**         | Every dependency PR                              | `npm audit`, Semgrep, lint, tests, build via [ci-templates@v1.0.0](https://github.com/aaron-howard/ci-templates/releases/tag/v1.0.0) |
| **Semgrep**    | Code on PRs                                      | Architecture/security rules catch unsafe patterns after upgrades                                                                     |

npm version updates are **not** in Dependabot — duplicate PRs from both bots are avoided.

## One-time setup: Renovate GitHub App

Renovate runs via the [Mend Renovate GitHub App](https://github.com/apps/renovate) (free for public repos).

1. Open https://github.com/apps/renovate → **Install**
2. Select **Only select repositories** → add `profile-page` (repeat for other repos)
3. After install, Renovate opens an onboarding PR — **merge it** (or merge this repo’s `renovate.json` first; Renovate respects local config)
4. Optional: enable **Dependency graph** and **Dependabot alerts** under **Settings → Security** (recommended)

No repo secrets required for basic npm updates.

## Dependabot (already configured)

`.github/dependabot.yml` updates **GitHub Actions** weekly (Mondays), grouped into a single PR when possible.

Dependabot PR workflow:

```text
Claude  → Review action release notes (breaking changes rare).
Cursor  → Merge if CI green, or update workflow if action API changed.
```

## Renovate configuration

`renovate.json` at repo root:

| Setting    | Value                                                        |
| ---------- | ------------------------------------------------------------ |
| Schedule   | Weekly, before 6am Monday (America/Chicago)                  |
| Groups     | sveltekit, prisma, opentelemetry, testing, tailwind, linting |
| Auto-merge | Patch/pin/digest **devDependencies** when CI passes          |
| Security   | `vulnerabilityAlerts` enabled (labels: `security`)           |
| Lock file  | Monthly maintenance                                          |

### Dependency Dashboard

Renovate maintains a **Dependency Dashboard** issue listing pending updates. Use it to schedule major bumps or pause noisy packages.

### Auto-merge prerequisites

Patch auto-merge for devDependencies requires:

1. **Settings → General → Allow auto-merge** enabled
2. Renovate app allowed to merge PRs (default on install)
3. Branch protection (if any) must allow Renovate / GitHub Actions checks to satisfy merge requirements

Production **dependencies** (e.g. Prisma, OTEL, Zod) are **not** auto-merged — review manually.

## AI workflow (Cursor + Claude)

### Renovate PR (routine)

```text
Claude  → Summarize changelog; flag major/minor risk for SvelteKit, Prisma, Vite.
Cursor  → gh pr checkout <n> → npm ci → npm run check && npm test → fix breakages → push.
```

### Security PR (Renovate `security` label or high audit)

```text
Claude  → Priority + blast radius (transitive vs direct).
Cursor  → Apply upgrade; run npm run test:coverage; verify Semgrep clean.
```

### Dependabot Actions PR

```text
Cursor  → Verify CI; merge if green (pin ci-templates @v1.0.0 unaffected unless workflow YAML changes).
```

See also [AI-WORKFLOW-PLAYBOOK.md](./AI-WORKFLOW-PLAYBOOK.md) §5.

## Local verification before merging

```bash
npm ci
npm audit --audit-level=moderate
npm run lint
npm run check
npm test
npm run build
npm run semgrep:scan   # optional
```

## Roll out to another repo

1. Copy `renovate.json` and adjust `packageRules` groups for the stack.
2. Copy `.github/dependabot.yml` (github-actions only) or extend for Docker/pip if needed.
3. Install Renovate app on the repository.
4. Remove npm from Dependabot if both were enabled.

## Related

- [SECURITY.md](../SECURITY.md) — reporting vulnerabilities
- [CI-CD.md](./CI-CD.md) — CI gates on dependency PRs
- [BLUEPRINT-STATUS.md](./BLUEPRINT-STATUS.md)
