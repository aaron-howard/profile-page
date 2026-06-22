import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');

dotenv.config({ path: path.join(root, '.env') });
dotenv.config({ path: path.join(root, '.env.local'), override: true });

const { isOtelEnabled, sdk } = await import('./otel-config.ts');

if (isOtelEnabled() && !process.env.OTEL_SDK_STARTED) {
	sdk?.start();
	process.env.OTEL_SDK_STARTED = '1';
}
