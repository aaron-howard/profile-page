import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('contact form action', () => {
	beforeEach(() => {
		vi.resetModules();
	});

	it('validation fails with empty fields', async () => {
		vi.doMock('sveltekit-superforms', () => ({
			superValidate: vi.fn().mockResolvedValue({
				valid: false,
				data: { name: '', email: '', subject: '', message: '' },
				errors: {},
				constraints: {}
			}),
			message: vi.fn((form, msg, opts) => ({ form, message: msg, status: opts?.status }))
		}));

		vi.doMock('sveltekit-superforms/adapters', () => ({
			zod: vi.fn((schema) => schema),
			zod4: vi.fn((schema) => schema)
		}));

		vi.doMock('$lib/server/email', () => ({
			sendEmail: vi.fn(),
			formatContactEmail: vi.fn()
		}));

		const { actions } = await import('../../routes/contact/+page.server');

		const mockRequest = {
			method: 'POST',
			json: vi.fn().mockResolvedValue({})
		};

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const result = await actions.default({ request: mockRequest } as any);

		// Should return fail(400, { form })
		expect(result).toBeDefined();
	});

	it('sends email successfully with valid data', async () => {
		const mockSendEmail = vi.fn().mockResolvedValue({ success: true });

		vi.doMock('sveltekit-superforms', () => ({
			superValidate: vi.fn().mockResolvedValue({
				valid: true,
				data: {
					name: 'John Doe',
					email: 'john@example.com',
					subject: 'Test',
					message: 'Test message'
				},
				errors: {},
				constraints: {}
			}),
			message: vi.fn((form, msg, opts) => ({ form, message: msg, status: opts?.status }))
		}));

		vi.doMock('sveltekit-superforms/adapters', () => ({
			zod: vi.fn((schema) => schema),
			zod4: vi.fn((schema) => schema)
		}));

		vi.doMock('$lib/server/email', () => ({
			sendEmail: mockSendEmail,
			formatContactEmail: vi.fn().mockReturnValue({
				html: '<p>Test</p>',
				text: 'Test'
			})
		}));

		const { actions } = await import('../../routes/contact/+page.server');

		const mockRequest = {
			method: 'POST',
			json: vi.fn().mockResolvedValue({})
		};

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const result = await actions.default({ request: mockRequest } as any);

		expect(mockSendEmail).toHaveBeenCalled();
		expect(result).toBeDefined();
	});

	it('handles email failure gracefully', async () => {
		const mockSendEmail = vi.fn().mockResolvedValue({ success: false, error: 'SMTP error' });

		vi.doMock('sveltekit-superforms', () => ({
			superValidate: vi.fn().mockResolvedValue({
				valid: true,
				data: {
					name: 'John Doe',
					email: 'john@example.com',
					subject: 'Test',
					message: 'Test message'
				},
				errors: {},
				constraints: {}
			}),
			message: vi.fn((form, msg, opts) => ({ form, message: msg, status: opts?.status }))
		}));

		vi.doMock('sveltekit-superforms/adapters', () => ({
			zod: vi.fn((schema) => schema),
			zod4: vi.fn((schema) => schema)
		}));

		vi.doMock('$lib/server/email', () => ({
			sendEmail: mockSendEmail,
			formatContactEmail: vi.fn().mockReturnValue({
				html: '<p>Test</p>',
				text: 'Test'
			})
		}));

		const { actions } = await import('../../routes/contact/+page.server');

		const mockRequest = {
			method: 'POST',
			json: vi.fn().mockResolvedValue({})
		};

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const result = await actions.default({ request: mockRequest } as any);

		expect(mockSendEmail).toHaveBeenCalled();
		expect(result).toBeDefined();
	});

	it('handles email service exception', async () => {
		const mockSendEmail = vi.fn().mockRejectedValue(new Error('Service unavailable'));

		vi.doMock('sveltekit-superforms', () => ({
			superValidate: vi.fn().mockResolvedValue({
				valid: true,
				data: {
					name: 'John Doe',
					email: 'john@example.com',
					subject: 'Test',
					message: 'Test message'
				},
				errors: {},
				constraints: {}
			}),
			message: vi.fn((form, msg, opts) => ({ form, message: msg, status: opts?.status }))
		}));

		vi.doMock('sveltekit-superforms/adapters', () => ({
			zod: vi.fn((schema) => schema),
			zod4: vi.fn((schema) => schema)
		}));

		vi.doMock('$lib/server/email', () => ({
			sendEmail: mockSendEmail,
			formatContactEmail: vi.fn().mockReturnValue({
				html: '<p>Test</p>',
				text: 'Test'
			})
		}));

		const { actions } = await import('../../routes/contact/+page.server');

		const mockRequest = {
			method: 'POST',
			json: vi.fn().mockResolvedValue({})
		};

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const result = await actions.default({ request: mockRequest } as any);

		expect(mockSendEmail).toHaveBeenCalled();
		expect(result).toBeDefined();
	});
});
