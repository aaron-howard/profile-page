import { createRequire } from 'node:module';
import { PrismaClient } from '@prisma/client';

const require = createRequire(import.meta.url);

try {
	require('dotenv/config');
} catch {
	// dotenv is optional (transitive dev dep); DATABASE_URL may already be in process.env
}
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString =
	process.env.DATABASE_URL || 'postgresql://localhost:5432/postgres?schema=public';

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

/** Prisma client for Node scripts — matches `src/lib/server/db` (Prisma 7 + adapter-pg). */
export const prisma = new PrismaClient({ adapter });

export async function disconnectPrisma() {
	await prisma.$disconnect();
	await pool.end();
}
