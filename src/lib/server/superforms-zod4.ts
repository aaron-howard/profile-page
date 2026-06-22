import { createRequire } from 'node:module';
import path from 'node:path';
import type {
	zod4 as superformsZod4,
	zod4Client as superformsZod4Client
} from 'sveltekit-superforms/adapters';

type Zod4AdapterModule = {
	zod: typeof superformsZod4;
	zodClient: typeof superformsZod4Client;
};

const projectRequire = createRequire(import.meta.url);
const packageRoot = path.resolve(
	path.dirname(projectRequire.resolve('sveltekit-superforms')),
	'..'
);
const zod4Adapter = projectRequire(
	path.join(packageRoot, 'dist/adapters/zod4.js')
) as Zod4AdapterModule;

export const zod4 = zod4Adapter.zod;
export const zod4Client = zod4Adapter.zodClient;
