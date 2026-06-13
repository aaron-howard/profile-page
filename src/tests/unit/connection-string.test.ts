import { describe, expect, it } from 'vitest';
import {
	databaseUrlNeedsSsl,
	resolveCliDatabaseUrl,
	resolveRuntimeDatabaseUrl
} from '$lib/server/db/connection-string';

describe('resolveRuntimeDatabaseUrl', () => {
	it('prefers DATABASE_URL when set', () => {
		expect(
			resolveRuntimeDatabaseUrl(
				{
					DATABASE_URL: 'postgres://primary',
					POSTGRES_PRISMA_URL: 'postgres://pooled'
				},
				{ allowLocalFallback: false }
			)
		).toBe('postgres://primary');
	});

	it('falls back to POSTGRES_PRISMA_URL (Vercel Postgres pooled)', () => {
		expect(
			resolveRuntimeDatabaseUrl(
				{ POSTGRES_PRISMA_URL: 'postgres://pooled' },
				{ allowLocalFallback: false }
			)
		).toBe('postgres://pooled');
	});

	it('falls back to POSTGRES_URL', () => {
		expect(
			resolveRuntimeDatabaseUrl(
				{ POSTGRES_URL: 'postgres://vercel' },
				{ allowLocalFallback: false }
			)
		).toBe('postgres://vercel');
	});

	it('returns undefined in production mode when no URL is configured', () => {
		expect(resolveRuntimeDatabaseUrl({}, { allowLocalFallback: false })).toBeUndefined();
	});

	it('uses local fallback in development when no URL is configured', () => {
		expect(resolveRuntimeDatabaseUrl({}, { allowLocalFallback: true })).toContain('localhost');
	});
});

describe('resolveCliDatabaseUrl', () => {
	it('prefers POSTGRES_URL_NON_POOLING for migrations', () => {
		expect(
			resolveCliDatabaseUrl({
				POSTGRES_URL_NON_POOLING: 'postgres://direct',
				DATABASE_URL: 'postgres://pooled'
			})
		).toBe('postgres://direct');
	});
});

describe('databaseUrlNeedsSsl', () => {
	it('detects sslmode=require', () => {
		expect(databaseUrlNeedsSsl('postgres://host/db?sslmode=require')).toBe(true);
	});

	it('returns false for local URLs without ssl params', () => {
		expect(databaseUrlNeedsSsl('postgresql://localhost:5432/postgres')).toBe(false);
	});
});
