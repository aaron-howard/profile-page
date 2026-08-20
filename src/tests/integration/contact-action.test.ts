import { describe, it, expect, vi } from 'vitest';
import { submitContact } from '../../routes/contact/+page.server';

function contactRequest(fields: {
	name?: string;
	email?: string;
	subject?: string;
	message?: string;
}): Request {
	const formData = new FormData();
	if (fields.name !== undefined) formData.set('name', fields.name);
	if (fields.email !== undefined) formData.set('email', fields.email);
	if (fields.subject !== undefined) formData.set('subject', fields.subject);
	if (fields.message !== undefined) formData.set('message', fields.message);
	return new Request('http://localhost/contact', { method: 'POST', body: formData });
}

const validFields = {
	name: 'John Doe',
	email: 'john@example.com',
	subject: 'Test',
	message: 'Test message'
};

describe('contact form action', () => {
	it('validation fails with empty fields', async () => {
		const result = await submitContact(contactRequest({}));
		expect(result).toBeDefined();
		if (!('status' in result)) {
			throw new Error('expected a failed contact action');
		}
		expect(result.status).toBe(400);
	});

	it('sends email successfully with valid data', async () => {
		const sendEmail = vi.fn().mockResolvedValue({ success: true });
		const formatContactEmail = vi.fn().mockReturnValue({
			html: '<p>Test</p>',
			text: 'Test'
		});

		const result = await submitContact(contactRequest(validFields), {
			sendEmail,
			formatContactEmail
		});

		expect(sendEmail).toHaveBeenCalled();
		expect(result).toBeDefined();
	});

	it('handles email failure gracefully', async () => {
		const sendEmail = vi.fn().mockResolvedValue({ success: false, error: 'SMTP error' });
		const formatContactEmail = vi.fn().mockReturnValue({
			html: '<p>Test</p>',
			text: 'Test'
		});

		const result = await submitContact(contactRequest(validFields), {
			sendEmail,
			formatContactEmail
		});

		expect(sendEmail).toHaveBeenCalled();
		expect(result).toBeDefined();
	});

	it('handles email service exception', async () => {
		const sendEmail = vi.fn().mockRejectedValue(new Error('Service unavailable'));
		const formatContactEmail = vi.fn().mockReturnValue({
			html: '<p>Test</p>',
			text: 'Test'
		});

		const result = await submitContact(contactRequest(validFields), {
			sendEmail,
			formatContactEmail
		});

		expect(sendEmail).toHaveBeenCalled();
		expect(result).toBeDefined();
	});
});
