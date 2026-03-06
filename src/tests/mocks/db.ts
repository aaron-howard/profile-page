import { vi } from 'vitest';

export const db = {
	bio: {
		findFirst: vi.fn(),
		findUnique: vi.fn(),
		create: vi.fn(),
		update: vi.fn(),
		upsert: vi.fn()
	},
	blogPost: {
		findMany: vi.fn(),
		findFirst: vi.fn(),
		findUnique: vi.fn(),
		count: vi.fn()
	},
	project: {
		findMany: vi.fn(),
		findFirst: vi.fn(),
		findUnique: vi.fn(),
		count: vi.fn()
	},
	$disconnect: vi.fn(),
	$connect: vi.fn(),
	$transaction: vi.fn()
};
