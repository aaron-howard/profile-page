import { describe, it, expect, vi, beforeEach } from 'vitest';

const validContactData = {
	name: 'John Doe',
	email: 'john@example.com',
	subject: 'Test',
	message: 'Test message'
};

const messageMock = vi.fn((form, msg, opts) => ({ form, message: msg, status: opts?.status }));

const setupSuperformsMock = (valid: boolean, data = validContactData) => {
	vi.doMock('sveltekit-superforms', () => ({
		superValidate: vi.fn().mockResolvedValue({
			valid,
			data,
			errors: {},
			constraints: {}
		}),
		message: messageMock
	}));
};

const setupAdaptersMock = () => {
	vi.doMock('sveltekit-superforms/adapters', () => ({
		zod: vi.fn((schema) => schema),
		zod4: vi.fn((schema) => schema)
	}));
};

const setupEmailMock = (sendEmailImpl: ReturnType<typeof vi.fn>) => {
	vi.doMock('$lib/server/email', () => ({
		sendEmail: sendEmailImpl,
		formatContactEmail: vi.fn().mockReturnValue({
			html: '<p>Test</p>',
			text: 'Test'
		})
	}));
};

const runDefaultAction = async () => {
	const { actions } = await import('../../routes/contact/+page.server');
	const mockRequest = {
		method: 'POST',
		json: vi.fn().mockResolvedValue({})
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return actions.default({ request: mockRequest } as any);
};

const runEmailScenario = async (sendEmailImpl: ReturnType<typeof vi.fn>) => {
	setupSuperformsMock(true);
	setupAdaptersMock();
	setupEmailMock(sendEmailImpl);
	const result = await runDefaultAction();

	expect(sendEmailImpl).toHaveBeenCalled();
	expect(result).toBeDefined();
};

describe('contact form action', () => {
	beforeEach(() => {
		vi.resetModules();
		vi.clearAllMocks();
	});

	it('validation fails with empty fields', async () => {
		setupSuperformsMock(false, { name: '', email: '', subject: '', message: '' });
		setupAdaptersMock();
		setupEmailMock(vi.fn());
		const result = await runDefaultAction();

		// Should return fail(400, { form })
		expect(result).toBeDefined();
	});

	it('sends email successfully with valid data', async () => {
		const mockSendEmail = vi.fn().mockResolvedValue({ success: true });
		await runEmailScenario(mockSendEmail);
	});

	it('handles email failure gracefully', async () => {
		const mockSendEmail = vi.fn().mockResolvedValue({ success: false, error: 'SMTP error' });
		await runEmailScenario(mockSendEmail);
	});

	it('handles email service exception', async () => {
		const mockSendEmail = vi.fn().mockRejectedValue(new Error('Service unavailable'));
		await runEmailScenario(mockSendEmail);
	});
});
