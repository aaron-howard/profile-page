import 'dotenv/config';
import { defineConfig } from 'prisma/config';
import { resolveCliDatabaseUrl } from './src/lib/server/db/connection-string';

export default defineConfig({
	schema: 'prisma/schema.prisma',
	migrations: {
		path: 'prisma/migrations'
	},
	datasource: {
		// Prefer direct URL for CLI; fall back through Vercel Postgres / manual env names.
		url: resolveCliDatabaseUrl()
	}
});
