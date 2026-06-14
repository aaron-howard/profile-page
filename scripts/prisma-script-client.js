import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
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
