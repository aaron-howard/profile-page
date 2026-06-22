import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const env = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8');

function get(key) {
	const match = env.match(new RegExp(`^${key}="([^"]*)"`, 'm'));
	return match?.[1] ?? '';
}

function parseAuth(headersEnv) {
	const value = headersEnv.split('=').slice(1).join('=');
	return decodeURIComponent(value);
}

const auth = parseAuth(get('OTEL_EXPORTER_OTLP_TRACES_HEADERS'));

const gateways = [
	'https://otlp-gateway-smallcinnamon1585.grafana.net/otlp/v1/traces',
	'https://otlp-gateway-prod-us-east-3.grafana.net/otlp/v1/traces',
	'https://otlp-gateway-prod-us-east-0.grafana.net/otlp/v1/traces'
];

const tracePayload = {
	resourceSpans: [
		{
			resource: {
				attributes: [{ key: 'service.name', value: { stringValue: 'profile-page-verify' } }]
			},
			scopeSpans: [
				{
					scope: { name: 'verify-script', version: '1.0.0' },
					spans: [
						{
							traceId: '5B8EFFF7A039173D269B63381E532F41',
							spanId: 'EEE19B7EC3C1B174',
							name: 'verify-span',
							startTimeUnixNano: String(Date.now() * 1_000_000),
							endTimeUnixNano: String((Date.now() + 1000) * 1_000_000),
							kind: 1
						}
					]
				}
			]
		}
	]
};

for (const url of gateways) {
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: auth
			},
			body: JSON.stringify(tracePayload)
		});
		const body = await response.text();
		console.log(`${url}`);
		console.log(`  -> ${response.status} ${response.statusText}`);
		if (body && body.length < 200) console.log(`  -> ${body}`);
	} catch (error) {
		console.log(`${url}`);
		console.log(`  -> ERROR ${error.message}`);
	}
}
