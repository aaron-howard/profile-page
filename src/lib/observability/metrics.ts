import { metrics } from '@opentelemetry/api';

export const meter = metrics.getMeter('profile-page');
