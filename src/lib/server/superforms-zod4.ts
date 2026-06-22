/**
 * zod4 adapter without the `sveltekit-superforms/adapters` barrel (SSR bundling).
 * Runtime load uses package resolution; see superforms-zod4.adapter.cjs.
 */
import adapters from './superforms-zod4.adapter.cjs';

export const zod4 = adapters.zod4;
export const zod4Client = adapters.zod4Client;
