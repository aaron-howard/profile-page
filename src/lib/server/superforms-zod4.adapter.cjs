'use strict';

const { createRequire } = require('node:module');
const path = require('node:path');

const projectRequire = createRequire(path.join(process.cwd(), 'package.json'));
const pkgDir = path.resolve(path.dirname(projectRequire.resolve('sveltekit-superforms')), '..');
const { zod, zodClient } = projectRequire(path.join(pkgDir, 'dist/adapters/zod4.js'));

module.exports = { zod4: zod, zod4Client: zodClient };
