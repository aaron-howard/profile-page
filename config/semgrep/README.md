# Semgrep — Quality & Security

Unified static analysis for this repo. Implements **AI Engineering Blueprint §2**.

## Layout

```
config/semgrep/
  README.md           ← this file
  rules/
    architecture.yml  ← DB boundaries, server-only imports, component boundaries
    security.yml      ← PII logging, XSS / {@html}
    quality.yml       ← logging conventions, autofix hints
    sveltekit.yml     ← SvelteKit route patterns
.semgrepignore        ← paths excluded from scans
```

**Shared baseline** (hardcoded secrets, fetch timeouts) lives in [aaron-howard/ci-templates/rules](https://github.com/aaron-howard/ci-templates/tree/main/rules) and is loaded automatically in CI.

## CI

- Reusable workflow: [aaron-howard/ci-templates `.github/workflows/semgrep.yml`](https://github.com/aaron-howard/ci-templates/blob/main/.github/workflows/semgrep.yml)
- Loads registry packs (`p/ci`, `p/typescript`, `p/nodejs`), **ci-templates/rules**, and **config/semgrep/rules**
- Invoked from [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) on every PR and push to `main`
- Findings upload as SARIF → GitHub **Security → Code scanning** when enabled
- Otherwise download artifact `semgrep-sarif` from the workflow run

## Run locally

Requires [Semgrep](https://semgrep.dev/docs/getting-started/) (`pip install semgrep` or `py -m pip install semgrep`):

```bash
npm run semgrep:scan
```

CI also applies shared rules from `ci-templates`; for a full parity scan, clone `ci-templates` alongside this repo and add `--config ../ci-templates/rules`.

Fix violations in Cursor; design new rules with Claude — see [docs/AI-WORKFLOW-PLAYBOOK.md](../../docs/AI-WORKFLOW-PLAYBOOK.md).

## Rule summary

| Rule ID                            | Severity | Purpose                                      |
| ---------------------------------- | -------- | -------------------------------------------- |
| `no-direct-prisma-in-routes`       | ERROR    | Routes use `$lib/server/db`                  |
| `no-server-import-in-components`   | ERROR    | No `$lib/server/**` in components            |
| `no-env-private-outside-server`    | ERROR    | Private env only in server code              |
| `no-unsafe-html-in-svelte`         | ERROR    | Blocks `{@html` without sanitization plan    |
| `baseline-no-fetch-without-signal` | WARNING  | Fetch timeouts in server code (ci-templates) |
| `no-console-log-in-routes`         | WARNING  | Autofix hint → `console.error`               |

## Optional: GitHub Code Scanning dashboard

Enable **Settings → Security → Code scanning** on the repo to show Semgrep SARIF in the Security tab.

## Optional: PR comments via Semgrep Cloud

Add [Semgrep Cloud](https://semgrep.dev) token `SEMGREP_APP_TOKEN` in GitHub Actions secrets for inline PR review comments.
