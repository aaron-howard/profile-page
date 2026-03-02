import { PrismaClient } from '@prisma/client';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

/**
 * PrismaClient singleton instance with connection pooling support
 *
 * Connection Pooling Strategy:
 * - Vercel Postgres: Built-in connection pooling (automatic, no configuration needed)
 * - Other providers (Neon, Supabase, Railway): Add pooling parameters to DATABASE_URL
 *   Example: postgresql://user:password@host/db?connection_limit=20&statement_cache_size=20
 *
 * For self-hosted PostgreSQL, use an external pooler like PgBouncer:
 * 1. Set up PgBouncer on your server
 * 2. Point DATABASE_URL to PgBouncer (localhost:6432 by default)
 * 3. PgBouncer forwards connections to PostgreSQL with efficient pooling
 *
 * Logging Configuration:
 * - Development: Shows queries, errors, and warnings
 * - Production: Only errors (for performance)
 */
export const db = globalForPrisma.prisma ?? new PrismaClient({
	log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = db;
}
