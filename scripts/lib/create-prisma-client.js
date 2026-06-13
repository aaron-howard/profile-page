import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const CLI_DIRECT_URL_KEYS = [
	'POSTGRES_URL_NON_POOLING',
	'DIRECT_URL',
	'DATABASE_URL',
	'POSTGRES_PRISMA_URL',
	'POSTGRES_URL',
	'PRISMA_DATABASE_URL'
];

const LOCAL_DEV_FALLBACK = 'postgresql://localhost:5432/postgres?schema=public';

function resolveCliDatabaseUrl(env = process.env) {
	for (const key of CLI_DIRECT_URL_KEYS) {
		const value = env[key]?.trim();
		if (value) return value;
	}
	return LOCAL_DEV_FALLBACK;
}

function databaseUrlNeedsSsl(connectionString) {
	return /(?:^|[?&])(?:sslmode=require|ssl=true)(?:&|$)/i.test(connectionString);
}

/** Prisma 7 client for CLI scripts (seeds, one-off tasks). Prefers a direct DB URL when set. */
export function createPrismaClient() {
	const connectionString = resolveCliDatabaseUrl();
	const pool = new Pool({
		connectionString,
		...(databaseUrlNeedsSsl(connectionString) ? { ssl: { rejectUnauthorized: false } } : {})
	});
	const adapter = new PrismaPg(pool);
	return new PrismaClient({ adapter });
}
