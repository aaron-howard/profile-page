'use strict';

const path = require('path');
const dotenv = require('dotenv');
const { isOtelEnabled, startSdk } = require('./create-sdk.cjs');

const root = path.resolve(__dirname, '../..');

dotenv.config({ path: path.join(root, '.env') });
dotenv.config({ path: path.join(root, '.env.local'), override: true });

if (isOtelEnabled() && !process.env.OTEL_SDK_STARTED) {
	startSdk();
	process.env.OTEL_SDK_STARTED = '1';
}
