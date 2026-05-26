import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
	schema: 'prisma/schema.prisma',
	migrations: {
		path: 'prisma/migrations'
	},
	datasource: {
		// Allow local type-check/generate without env set; real deployments should set DATABASE_URL.
		url: process.env.DATABASE_URL ?? 'postgresql://localhost:5432/postgres?schema=public'
	}
});
