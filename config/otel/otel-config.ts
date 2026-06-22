import { NodeSDK } from '@opentelemetry/sdk-node';
import { createSdkOptions, isOtelEnabled } from './sdk-options';

export { isOtelEnabled } from './sdk-options';

export const sdk = isOtelEnabled() ? new NodeSDK(createSdkOptions()) : null;
