/** Env keys that may hold a Postgres URL depending on host (Vercel Postgres, Prisma Postgres, manual). */
const RUNTIME_URL_KEYS = [
	'DATABASE_URL',
	'POSTGRES_PRISMA_URL',
	'POSTGRES_URL',
	'PRISMA_DATABASE_URL'
] as const;

const CLI_DIRECT_URL_KEYS = [
	'POSTGRES_URL_NON_POOLING',
	'DIRECT_URL',
	'DATABASE_URL',
	'POSTGRES_PRISMA_URL',
	'POSTGRES_URL'
] as const;

const LOCAL_DEV_FALLBACK = 'postgresql://localhost:5432/postgres?schema=public';

type EnvRecord = Record<string, string | undefined>;

/** First defined Postgres URL from known runtime env var names. */
export function resolveRuntimeDatabaseUrl(
	env: EnvRecord,
	options: { allowLocalFallback?: boolean } = {}
): string | undefined {
	const { allowLocalFallback = process.env.NODE_ENV !== 'production' } = options;

	for (const key of RUNTIME_URL_KEYS) {
		const value = env[key]?.trim();
		if (value) return value;
	}

	return allowLocalFallback ? LOCAL_DEV_FALLBACK : undefined;
}

/** URL for Prisma CLI (migrations, db push) — prefers a direct/non-pooled connection when available. */
export function resolveCliDatabaseUrl(env: EnvRecord = process.env): string {
	for (const key of CLI_DIRECT_URL_KEYS) {
		const value = env[key]?.trim();
		if (value) return value;
	}

	return LOCAL_DEV_FALLBACK;
}

/** Whether the connection string expects SSL (common on Vercel/Neon/Supabase). */
export function databaseUrlNeedsSsl(connectionString: string): boolean {
	return /(?:^|[?&])(?:sslmode=require|ssl=true)(?:&|$)/i.test(connectionString);
}
