import { createRequire } from 'node:module';
import { NodeSDK } from '@opentelemetry/sdk-node';

const require = createRequire(import.meta.url);
const { createSdkOptions, isOtelEnabled } = require('./create-sdk.cjs');

export const sdk = isOtelEnabled() ? new NodeSDK(createSdkOptions()) : null;
