import { PrismaClient } from '@prisma/client';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

/**
 * PrismaClient singleton instance
 * 
 * For serverless environments, consider adding connection pool configuration:
 * DATABASE_URL="postgresql://user:password@host:5432/db?connection_limit=10&pool_timeout=20"
 * 
 * For production with multiple instances, use an external connection pooler like PgBouncer
 */
export const db = globalForPrisma.prisma ?? new PrismaClient({
	log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = db;
}
