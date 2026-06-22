'use strict';

const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-http');
const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

/** @param {string | undefined} headerEnv */
function parseOtlpHeaders(headerEnv) {
	if (!headerEnv) {
		return {};
	}

	/** @type {Record<string, string>} */
	const headers = {};

	for (const part of headerEnv.split(',')) {
		const separator = part.indexOf('=');
		if (separator === -1) {
			continue;
		}

		const key = part.slice(0, separator).trim();
		let value = part
			.slice(separator + 1)
			.trim()
			.replace(/^["']|["']$/g, '');
		headers[key] = decodeURIComponent(value);
	}

	return headers;
}

function isOtelEnabled() {
	return Boolean(
		process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT ||
		process.env.OTEL_EXPORTER_OTLP_METRICS_ENDPOINT
	);
}

function createSdkOptions() {
	/** @type {import('@opentelemetry/sdk-node').NodeSDKConfiguration} */
	const options = {
		serviceName: 'profile-page',
		instrumentations: [getNodeAutoInstrumentations()]
	};

	if (process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT) {
		options.traceExporter = new OTLPTraceExporter({
			url: process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
			headers: parseOtlpHeaders(process.env.OTEL_EXPORTER_OTLP_TRACES_HEADERS)
		});
	}

	if (process.env.OTEL_EXPORTER_OTLP_METRICS_ENDPOINT) {
		options.metricReaders = [
			new PeriodicExportingMetricReader({
				exporter: new OTLPMetricExporter({
					url: process.env.OTEL_EXPORTER_OTLP_METRICS_ENDPOINT,
					headers: parseOtlpHeaders(process.env.OTEL_EXPORTER_OTLP_METRICS_HEADERS)
				})
			})
		];
	}

	return options;
}

/** @type {import('@opentelemetry/sdk-node').NodeSDK | undefined} */
let sdk;

function startSdk() {
	if (!isOtelEnabled()) {
		return undefined;
	}

	if (!sdk) {
		sdk = new NodeSDK(createSdkOptions());
	}

	sdk.start();
	return sdk;
}

module.exports = { createSdkOptions, isOtelEnabled, parseOtlpHeaders, startSdk };
