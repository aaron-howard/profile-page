import { sdk } from '../../../config/otel/otel-config';

let started = false;

/** Start OpenTelemetry when OTLP endpoints are configured. Safe to call on every request. */
export function startInstrumentation(): void {
	if (
		started ||
		process.env.OTEL_SDK_STARTED ||
		(!process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT &&
			!process.env.OTEL_EXPORTER_OTLP_METRICS_ENDPOINT)
	) {
		return;
	}

	sdk?.start();
	started = true;
}
