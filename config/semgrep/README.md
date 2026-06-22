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

- Reusable workflow: [`.github/workflows/semgrep.yml`](../../.github/workflows/semgrep.yml)
- Invoked from the main [`ci.yml`](../../.github/workflows/ci.yml) on every PR and push to `main`
- Findings upload as SARIF → GitHub **Security → Code scanning** (and PR checks)

## Run locally

```bash
pip install semgrep
semgrep scan --config p/ci --config p/typescript --config config/semgrep/rules
```

## Optional: PR comments via Semgrep Cloud

Add a [Semgrep Cloud](https://semgrep.dev) token as `SEMGREP_APP_TOKEN` in GitHub Actions secrets for inline PR review comments.

## Multi-repo rollout (blueprint Step 1)

Copy `config/semgrep/rules/` into a central `aaron-howard/ci-templates` repo, then in each project:

```yaml
jobs:
  semgrep:
    uses: aaron-howard/ci-templates/.github/workflows/semgrep.yml@main
```

## Custom rules to add next

- No `fetch` to external APIs without timeout in `$lib/server/**`
- Enforce `escapeHtml` before any future `{@html}` usage
- Block `$lib/server/**` imports from `$lib/components/**`
