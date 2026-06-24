# Grafana assets — profile-page

Importable dashboard and alert recipes for **Grafana Cloud** (OpenTelemetry OTLP).

## Dashboard import

1. Open Grafana Cloud → **Dashboards** → **New** → **Import**
2. Upload `dashboard-profile-page.json` or paste its contents
3. Select your **Prometheus** (OTLP metrics) and **Tempo** (traces) data sources when prompted
4. Save — default UID: `profile-page-otel`

### Metric name notes

OTLP counters from this app use names like `app.http.requests`. Grafana Cloud Prometheus may expose them as:

- `app_http_requests_total`
- Labels: `service_name`, `http_method`, `route_id`, `http_status_code`

If panels show **No data**, open **Explore → Prometheus** and search `app_http` or `{service_name="profile-page"}` to confirm exact names, then edit panel queries.

Trace panel uses TraceQL:

```traceql
{ resource.service.name = "profile-page" }
```

## Recommended alerts

Create under **Alerting → Alert rules → New alert rule**. Use your Grafana Cloud Prometheus data source.

### 1. High HTTP error rate

- **Query A:** `sum(rate(app_http_errors_total{service_name="profile-page"}[5m]))`
- **Condition:** IS ABOVE `0.05` (adjust for traffic)
- **For:** 5m
- **Summary:** `profile-page elevated 5xx / handleError rate`

### 2. Contact form delivery failures

- **Query A:** `sum(rate(app_contact_submissions_total{service_name="profile-page", outcome="delivery_error"}[15m]))`
- **Condition:** IS ABOVE `0`
- **For:** 10m
- **Summary:** Contact form email delivery failing

### 3. No telemetry received

- **Query A:** `sum(rate(app_http_requests_total{service_name="profile-page"}[30m]))`
- **Condition:** IS BELOW `0.001`
- **For:** 1h
- **Summary:** No OTLP metrics from profile-page (check Vercel env vars)

### 4. Rate limit spike (optional)

- **Query A:** `sum(rate(app_rate_limit_exceeded_total{service_name="profile-page"}[5m]))`
- **Condition:** IS ABOVE `0.1`
- **For:** 5m

Route notifications to email, Slack, or PagerDuty in **Alerting → Contact points**.

## Related

- [docs/OBSERVABILITY.md](../../docs/OBSERVABILITY.md) — OTLP setup and Vercel env vars
