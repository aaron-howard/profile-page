# AI Engineering Blueprint — Status

Progress for **profile-page** as the reference implementation. Full blueprint: [AI-Engineering-Blueprint.md](../AI-Engineering-Blueprint.md).

Last updated: 2026-06-24

| Phase | Blueprint item           | Status   | Notes                                                                                                 |
| ----- | ------------------------ | -------- | ----------------------------------------------------------------------------------------------------- |
| **2** | Semgrep                  | **100%** | Shared baseline in `ci-templates/rules`; app rules in `config/semgrep/rules/`; `npm run semgrep:scan` |
| **3** | CI/CD                    | **100%** | Pinned `@v1.0.0`, Dependabot, concurrency, `docs/CI-CD.md`, E2E post-merge gate                       |
| **5** | OpenTelemetry + Grafana  | **~55%** | SDK + spans in repo; dashboards/alerts/production OTLP TBD                                            |
| **1** | Cursor + Claude workflow | **100%** | [AI-WORKFLOW-PLAYBOOK.md](./AI-WORKFLOW-PLAYBOOK.md), `.cursor/rules/`, doc cross-links               |
| **4** | Dependabot + Renovate    | **100%** | Actions via Dependabot; npm via Renovate; [DEPENDENCY-MANAGEMENT.md](./DEPENDENCY-MANAGEMENT.md)      |

## Completed (this repo)

- [x] Central `aaron-howard/ci-templates` (public, reusable workflows)
- [x] `profile-page` uses shared `semgrep.yml`, `ci.yml`, `e2e.yml` pinned at **`v1.0.0`**
- [x] CI/CD architecture documented in `docs/CI-CD.md`
- [x] Semgrep custom rules (architecture, security, quality, SvelteKit) + shared ci-templates baseline
- [x] OpenTelemetry instrumentation (routes, Prisma, email)
- [x] Dependabot (github-actions) + Renovate (`renovate.json` for npm)
- [x] Husky pre-commit / pre-push
- [x] AI workflow playbook and Cursor rule

## Remaining (blueprint)

- [ ] Grafana Cloud dashboards and alerts (import JSON in Grafana UI)
- [ ] Production OTLP env vars on Vercel
- [ ] Roll `ci-templates` + Semgrep pattern to other 16–17 repos

## Multi-repo

`ci-templates` README documents visibility rules (public caller → public templates). Private app repos may use a private `ci-templates` with Actions access enabled.
