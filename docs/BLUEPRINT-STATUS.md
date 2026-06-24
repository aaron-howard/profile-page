# AI Engineering Blueprint — Status

Progress for **profile-page** as the reference implementation. Full blueprint: [AI-Engineering-Blueprint.md](../AI-Engineering-Blueprint.md).

Last updated: 2026-06-24

| Phase | Blueprint item           | Status   | Notes                                                                                   |
| ----- | ------------------------ | -------- | --------------------------------------------------------------------------------------- |
| **2** | Semgrep                  | **~90%** | Rules in `config/semgrep/rules/`; CI via `ci-templates`                                 |
| **3** | CI/CD                    | **~90%** | All jobs use `aaron-howard/ci-templates`; thin wrappers in `.github/workflows/`         |
| **5** | OpenTelemetry + Grafana  | **~55%** | SDK + spans in repo; dashboards/alerts/production OTLP TBD                              |
| **1** | Cursor + Claude workflow | **100%** | [AI-WORKFLOW-PLAYBOOK.md](./AI-WORKFLOW-PLAYBOOK.md), `.cursor/rules/`, doc cross-links |
| **4** | Dependabot + Renovate    | **~50%** | Dependabot enabled; Renovate not configured                                             |

## Completed (this repo)

- [x] Central `aaron-howard/ci-templates` (public, reusable workflows)
- [x] `profile-page` uses shared `semgrep.yml`, `ci.yml`, `e2e.yml`
- [x] Semgrep custom rules (architecture, security, quality, SvelteKit)
- [x] OpenTelemetry instrumentation (routes, Prisma, email)
- [x] Dependabot (npm + github-actions)
- [x] Husky pre-commit / pre-push
- [x] AI workflow playbook and Cursor rule

## Remaining (blueprint)

- [ ] Grafana Cloud dashboards and alerts (import JSON in Grafana UI)
- [ ] Production OTLP env vars on Vercel
- [ ] Renovate (optional complement to Dependabot)
- [ ] Roll `ci-templates` + Semgrep pattern to other 16–17 repos
- [ ] Pin `ci-templates` to a release tag instead of `@main` (stability)

## Multi-repo

`ci-templates` README documents visibility rules (public caller → public templates). Private app repos may use a private `ci-templates` with Actions access enabled.
