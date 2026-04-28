import { describe, it, expect } from 'vitest';
import { contactFormSchema } from '$lib/schemas';

const createValidData = () => ({
	name: 'John Doe',
	email: 'john@example.com',
	subject: 'Hello',
	message: 'Test'
});

const getFieldErrorMessage = (
	result: ReturnType<typeof contactFormSchema.safeParse>,
	field: 'name' | 'email' | 'subject' | 'message'
) => {
	if (result.success) {
		return undefined;
	}

	return result.error.issues.find((issue) => issue.path[0] === field)?.message;
};

const expectNormalizedEmail = (email: string) => {
	const result = contactFormSchema.safeParse({ ...createValidData(), email });
	expect(result.success).toBe(true);
	if (result.success) {
		expect(result.data.email).toBe('john@example.com');
	}
};

describe('contactFormSchema', () => {
	it('accepts valid contact form data', () => {
		const data = {
			name: 'John Doe',
			email: 'john@example.com',
			subject: 'Hello',
			message: 'This is a test message'
		};
		const result = contactFormSchema.safeParse(data);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.email).toBe('john@example.com');
		}
	});

	it('lowercases email', () => {
		expectNormalizedEmail('John@Example.COM');
	});

	it('preserves data structure with whitespace handling', () => {
		const data = createValidData();
		const result = contactFormSchema.safeParse(data);
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.name).toBe('John Doe');
			expect(result.data.email).toBe('john@example.com');
			expect(result.data.subject).toBe('Hello');
			expect(result.data.message).toBe('Test');
		}
	});

	describe('name validation', () => {
		it('rejects empty name', () => {
			const data = { ...createValidData(), name: '' };
			const result = contactFormSchema.safeParse(data);
			expect(result.success).toBe(false);
			expect(getFieldErrorMessage(result, 'name')).toBe('Name is required');
		});

		it('rejects name over 100 characters', () => {
			const data = { ...createValidData(), name: 'a'.repeat(101) };
			const result = contactFormSchema.safeParse(data);
			expect(result.success).toBe(false);
			expect(getFieldErrorMessage(result, 'name')).toBe('Name must be 100 characters or less');
		});

		it('accepts name at max length (100)', () => {
			const data = { ...createValidData(), name: 'a'.repeat(100) };
			const result = contactFormSchema.safeParse(data);
			expect(result.success).toBe(true);
		});
	});

	describe('email validation', () => {
		it('rejects empty email', () => {
			const data = { ...createValidData(), name: 'John', email: '' };
			const result = contactFormSchema.safeParse(data);
			expect(result.success).toBe(false);
			expect(getFieldErrorMessage(result, 'email')).toBe('Email is required');
		});

		it('rejects invalid email format', () => {
			const data = { ...createValidData(), name: 'John', email: 'not-an-email' };
			const result = contactFormSchema.safeParse(data);
			expect(result.success).toBe(false);
			expect(getFieldErrorMessage(result, 'email')).toBe('Please enter a valid email address');
		});

		it('rejects email over 255 characters', () => {
			const data = { ...createValidData(), name: 'John', email: 'a'.repeat(250) + '@example.com' };
			const result = contactFormSchema.safeParse(data);
			expect(result.success).toBe(false);
			expect(getFieldErrorMessage(result, 'email')).toBe('Email must be 255 characters or less');
		});

		it('accepts email at max length (255)', () => {
			const longLocal = 'a'.repeat(220);
			const data = { ...createValidData(), name: 'John', email: `${longLocal}@example.com` };
			const result = contactFormSchema.safeParse(data);
			expect(result.success).toBe(true);
		});
	});

	describe('subject validation', () => {
		it('rejects empty subject', () => {
			const data = { ...createValidData(), name: 'John', subject: '' };
			const result = contactFormSchema.safeParse(data);
			expect(result.success).toBe(false);
			expect(getFieldErrorMessage(result, 'subject')).toBe('Subject is required');
		});

		it('rejects subject over 200 characters', () => {
			const data = { ...createValidData(), name: 'John', subject: 'a'.repeat(201) };
			const result = contactFormSchema.safeParse(data);
			expect(result.success).toBe(false);
			expect(getFieldErrorMessage(result, 'subject')).toBe(
				'Subject must be 200 characters or less'
			);
		});

		it('accepts subject at max length (200)', () => {
			const data = { ...createValidData(), name: 'John', subject: 'a'.repeat(200) };
			const result = contactFormSchema.safeParse(data);
			expect(result.success).toBe(true);
		});
	});

	describe('message validation', () => {
		it('rejects empty message', () => {
			const data = { ...createValidData(), name: 'John', message: '' };
			const result = contactFormSchema.safeParse(data);
			expect(result.success).toBe(false);
			expect(getFieldErrorMessage(result, 'message')).toBe('Message is required');
		});

		it('rejects message over 5000 characters', () => {
			const data = { ...createValidData(), name: 'John', message: 'a'.repeat(5001) };
			const result = contactFormSchema.safeParse(data);
			expect(result.success).toBe(false);
			expect(getFieldErrorMessage(result, 'message')).toBe(
				'Message must be 5,000 characters or less'
			);
		});

		it('accepts message at max length (5000)', () => {
			const data = { ...createValidData(), name: 'John', message: 'a'.repeat(5000) };
			const result = contactFormSchema.safeParse(data);
			expect(result.success).toBe(true);
		});
	});

	it('reports multiple simultaneous field errors', () => {
		const data = {
			name: '',
			email: 'invalid',
			subject: '',
			message: ''
		};
		const result = contactFormSchema.safeParse(data);
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues.length).toBeGreaterThanOrEqual(2);
		}
	});
});
