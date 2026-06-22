/** Direct zod4 adapter import — avoids barrel `sveltekit-superforms/adapters` pulling optional adapters into SSR. */
export {
	zod as zod4,
	zodClient as zod4Client
} from '../../../node_modules/sveltekit-superforms/dist/adapters/zod4.js';
