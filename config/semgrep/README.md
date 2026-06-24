# Semgrep — Quality & Security

Unified static analysis for this repo. Implements **AI Engineering Blueprint §2**.

## Layout

```
config/semgrep/
  README.md           ← this file
  rules/
    architecture.yml  ← DB boundaries, server-only imports
    security.yml      ← secrets, PII logging, XSS
    quality.yml       ← logging conventions, autofix hints
    sveltekit.yml     ← SvelteKit route patterns
```

## CI

- Reusable workflow: [aaron-howard/ci-templates `.github/workflows/semgrep.yml`](https://github.com/aaron-howard/ci-templates/blob/main/.github/workflows/semgrep.yml)
- Invoked from [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) on every PR and push to `main`
- Findings upload as SARIF → GitHub **Security → Code scanning** when enabled on the repo
- If code scanning is not enabled, SARIF is attached as a workflow **artifact** (`semgrep-sarif`) instead

## Run locally

```bash
pip install semgrep
semgrep scan --config p/ci --config p/typescript --config p/nodejs --config config/semgrep/rules
```

Fix violations in Cursor; design new rules with Claude — see [docs/AI-WORKFLOW-PLAYBOOK.md](../../docs/AI-WORKFLOW-PLAYBOOK.md).

## Optional: GitHub Code Scanning dashboard

Enable **Settings → Security → Code scanning** on the repo to show Semgrep SARIF in the Security tab. Without it, download `semgrep-sarif` from the workflow run artifacts.

## Optional: PR comments via Semgrep Cloud

Add a [Semgrep Cloud](https://semgrep.dev) token as `SEMGREP_APP_TOKEN` in GitHub Actions secrets for inline PR review comments.

## Custom rules to add next

- No `fetch` to external APIs without timeout in `$lib/server/**`
- Enforce `escapeHtml` before any future `{@html}` usage
- Block `$lib/server/**` imports from `$lib/components/**`
