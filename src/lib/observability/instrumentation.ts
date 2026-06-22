import { isOtelEnabled, sdk } from '../../../config/otel/otel-config';

let started = false;

/** Start OpenTelemetry when OTLP endpoints are configured. Safe to call on every request. */
export function startInstrumentation(): void {
	if (started || process.env.OTEL_SDK_STARTED || !isOtelEnabled()) {
		return;
	}

	sdk?.start();
	started = true;
}
