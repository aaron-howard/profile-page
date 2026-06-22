import { metrics, trace } from '@opentelemetry/api';
import { sdk } from '../../../config/otel/otel-config';

/** Flush pending traces and metrics before a serverless function freezes. */
export async function flushOtel(): Promise<void> {
	const tracerProvider = trace.getTracerProvider();
	if (tracerProvider && 'forceFlush' in tracerProvider) {
		await (tracerProvider as { forceFlush: () => Promise<void> }).forceFlush();
	}

	const meterProvider = metrics.getMeterProvider();
	if (meterProvider && 'forceFlush' in meterProvider) {
		await (meterProvider as { forceFlush: () => Promise<void> }).forceFlush();
	}
}

export async function shutdownOtel(): Promise<void> {
	await flushOtel();
	await sdk?.shutdown();
}
