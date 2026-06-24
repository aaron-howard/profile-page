# Cursor + Claude Workflow Playbook

Operational guide for this repo and the wider **aaron-howard** GitHub portfolio. Implements **AI Engineering Blueprint §1** — how Cursor Pro and Claude Pro divide work without GitHub Copilot.

**Related:** [AI-Engineering-Blueprint.md](../AI-Engineering-Blueprint.md) · [BLUEPRINT-STATUS.md](./BLUEPRINT-STATUS.md) · [aaron-howard/ci-templates](https://github.com/aaron-howard/ci-templates)

---

## Tool roles

| Use **Cursor** (Agent mode)                                          | Use **Claude** (Chat / Claude Code / Projects)       |
| -------------------------------------------------------------------- | ---------------------------------------------------- |
| Multi-file refactors and feature implementation                      | Architecture decisions and trade-off analysis        |
| Applying code changes from a written plan                            | CI/CD failure diagnosis from logs and YAML           |
| Semgrep violation fixes repo-wide                                    | Designing Semgrep rules and observability strategy   |
| OpenTelemetry instrumentation in `hooks.server.ts`, `$lib/server/**` | Grafana dashboard / alert design (JSON you import)   |
| Updating `.github/workflows/*.yml` wrappers                          | Dependency audit summaries across many repos         |
| Dependabot PR: apply breaking-change code fixes                      | Dependabot PR: review risk, changelog, rollback plan |
| `npm run format`, tests, commits on a branch                         | Release notes, ADRs, long-form documentation         |
| E2E / unit test implementation                                       | Multi-repo consistency reviews in Claude Projects    |

**Rule of thumb:** Claude plans and reasons; Cursor executes in the repo.

---

## Engineering stack (this repo)

| Layer              | Tool                                  | Location                                                                                      |
| ------------------ | ------------------------------------- | --------------------------------------------------------------------------------------------- |
| Quality & security | Semgrep                               | `config/semgrep/rules/` · CI via [ci-templates](https://github.com/aaron-howard/ci-templates) |
| CI/CD              | GitHub Actions                        | `.github/workflows/ci.yml`, `e2e.yml` → `uses: aaron-howard/ci-templates/...`                 |
| Observability      | OpenTelemetry + Grafana Cloud         | `config/otel/`, `src/lib/observability/`                                                      |
| Dependencies       | Dependabot (Actions) + Renovate (npm) | `.github/dependabot.yml`, `renovate.json` — see `docs/DEPENDENCY-MANAGEMENT.md`               |
| Local gates        | Husky + lint-staged                   | `.husky/`                                                                                     |

---

## Claude Project setup (multi-repo)

Create one Claude Project — e.g. **“Aaron — GitHub Portfolio”** — and attach:

1. **Knowledge files** (upload or paste links):
   - `AI-Engineering-Blueprint.md`
   - `docs/AI-WORKFLOW-PLAYBOOK.md` (this file)
   - `docs/BLUEPRINT-STATUS.md`
   - `CLAUDE.md` from `profile-page` (reference implementation)
2. **Custom instructions** (paste into Project settings):

   ```
   You are helping maintain 16–17 GitHub repos for a municipal ServiceNow/PagerDuty developer.
   Stack: Cursor Pro + Claude Pro, Semgrep, OpenTelemetry/Grafana, shared ci-templates, Dependabot.
   Prefer plans Cursor can execute. Flag when a change belongs in aaron-howard/ci-templates vs a single app repo.
   Never suggest GitHub Copilot for billing-sensitive workflows.
   ```

3. **Per-repo sessions:** Start with “Repo: `profile-page`” and paste the failing CI log or feature goal.

---

## Standard workflows

### 1. New feature

```text
Claude  → Outline approach, files to touch, test plan, Semgrep/OTEL implications.
Cursor  → Branch from main → implement → npm run lint && npm test → PR.
Claude  → Review PR diff for architecture / security (optional).
```

### 2. CI failure

```text
Claude  → Paste GitHub Actions log; identify root cause (template repo, Semgrep, test, audit).
Cursor  → Apply fix in the correct repo (profile-page or ci-templates).
```

**This repo’s CI** calls shared workflows (pinned at **`v1.0.0`**):

- `aaron-howard/ci-templates/.github/workflows/semgrep.yml@v1.0.0`
- `aaron-howard/ci-templates/.github/workflows/ci.yml@v1.0.0`
- `aaron-howard/ci-templates/.github/workflows/e2e.yml@v1.0.0`

See **`docs/CI-CD.md`** for the full pipeline. `ci-templates` must stay **public** while `profile-page` is public.

### 3. Semgrep finding

```text
Claude  → Explain rule ID; propose rule tweak in config/semgrep/rules/ if false positive.
Cursor  → semgrep scan locally → fix violations → npm run format → commit.
```

Local scan:

```bash
pip install semgrep
semgrep scan --config p/ci --config p/typescript --config p/nodejs --config config/semgrep/rules
```

Autofix hints live in `config/semgrep/rules/quality.yml` (e.g. `console.log` → `console.error`).

### 4. Observability change

```text
Claude  → Span/metric plan (routes, DB, email, external APIs).
Cursor  → Implement in src/lib/observability/ and hooks; set OTLP vars per .env.example.
Claude  → Grafana panel / alert JSON for import.
```

OTLP is opt-in: set `OTEL_EXPORTER_OTLP_*` in Vercel or local `.env.local`. Verify with `npm run otel:verify`. Import dashboard from `config/grafana/dashboard-profile-page.json` — see `docs/OBSERVABILITY.md`.

### 5. Dependency PR (Dependabot or Renovate)

```text
Claude  → Summarize release notes; flag breaking changes for SvelteKit/Prisma/Vite.
Cursor  → gh pr checkout <n> → npm ci → npm run check && npm test → fix breakages → push.
```

- **Dependabot:** GitHub Actions only in this repo.
- **Renovate:** npm (grouped weekly; patch devDeps may auto-merge when CI passes).

Install Renovate: [github.com/apps/renovate](https://github.com/apps/renovate). Full guide: `docs/DEPENDENCY-MANAGEMENT.md`.

After merge: confirm CI + E2E on `main`.

### 6. Roll out pattern to another repo

```text
Claude  → List files to copy vs centralize in ci-templates.
Cursor  → In app repo: thin .github/workflows/ci.yml + config/semgrep/rules/.
         → In ci-templates: only if workflow logic changes for all repos.
```

---

## Cursor session checklist

Before ending an Agent session:

- [ ] On a feature branch (not `main`)
- [ ] `npm run lint` and `npm test` pass
- [ ] No secrets in diff; `.env` untouched
- [ ] Semgrep-relevant paths considered (`src/routes/`, `src/lib/server/`)
- [ ] If workflows changed: note whether **ci-templates** also needs an update

## PR checklist

- [ ] CI green (Semgrep + lint + coverage + build)
- [ ] E2E runs post-merge on `main` (or run `workflow_dispatch` on E2E if risky)
- [ ] Dependabot/Renovate/npm audit not newly failing
- [ ] `CLAUDE.md` / playbook updated if commands or stack changed

---

## Prompt templates

**Claude — architecture**

```text
Repo: profile-page (SvelteKit 2, Prisma, Vercel).
Goal: [describe feature].
Constraints: no end-user auth, contact form only write path, Semgrep architecture rules.
Output: file list, risks, test plan, and handoff prompts for Cursor.
```

**Cursor — execute plan**

```text
Implement the plan below on branch feat/[name]. Match existing conventions in CLAUDE.md.
Run npm run lint and npm test before finishing. Do not commit unless I ask.

[paste Claude plan]
```

**Claude — CI debug**

```text
Workflow run failed. Caller: profile-page. Templates: aaron-howard/ci-templates@main.
Paste log below. Say whether fix belongs in app repo or ci-templates.

[paste log]
```

---

## Cost discipline

| Tool           | Cost                | Use for                                 |
| -------------- | ------------------- | --------------------------------------- |
| Cursor Pro     | ~$20/mo             | Daily coding, Agent, inline edit        |
| Claude Pro     | ~$20/mo             | Planning, reviews, multi-repo reasoning |
| GitHub Actions | Free tier + minutes | CI (no Copilot usage billing)           |

Avoid Copilot for repo-wide automation — unpredictable usage billing across 16–17 repos.

---

## Document maintenance

Update this playbook when:

- CI moves to a new `ci-templates` tag or repo layout
- Semgrep rule layout changes
- OTEL/Grafana endpoints or env var names change
- A new repeatable Cursor↔Claude handoff pattern emerges
