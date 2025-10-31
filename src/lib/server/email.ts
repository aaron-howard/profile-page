import { env } from '$env/dynamic/private';

interface EmailData {
	to: string;
	subject: string;
	html: string;
	text?: string;
}

/**
 * Send email using environment-configured service
 * Supports SMTP or external services like SendGrid, Resend, etc.
 */
export async function sendEmail(data: EmailData): Promise<{ success: boolean; error?: string }> {
	const emailService = env.EMAIL_SERVICE || 'console'; // console, smtp, resend, sendgrid

	try {
		switch (emailService) {
			case 'console':
				// Development: log to console
				console.log('=== EMAIL ===');
				console.log('To:', data.to);
				console.log('Subject:', data.subject);
				console.log('Body:', data.text || data.html);
				console.log('=============');
				return { success: true };

			case 'smtp':
				return await sendViaSMTP(data);

			case 'resend':
				return await sendViaResend(data);

			case 'sendgrid':
				return await sendViaSendGrid(data);

			default:
				console.warn(`Unknown email service: ${emailService}, falling back to console`);
				return await sendEmail({ ...data, to: 'console' });
		}
	} catch (error) {
		console.error('Error sending email:', error);
		return { success: false, error: 'Failed to send email' };
	}
}

async function sendViaSMTP(data: EmailData) {
	// Implement SMTP sending using nodemailer or similar
	// For now, return error suggesting configuration
	throw new Error('SMTP email service not implemented. Please configure EMAIL_SERVICE environment variable.');
}

async function sendViaResend(data: EmailData) {
	const apiKey = env.RESEND_API_KEY;
	if (!apiKey) {
		throw new Error('RESEND_API_KEY environment variable is not set');
	}

	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${apiKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			from: env.EMAIL_FROM || 'onboarding@resend.dev',
			to: data.to,
			subject: data.subject,
			html: data.html,
			text: data.text
		})
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`Resend API error: ${error}`);
	}

	return { success: true };
}

async function sendViaSendGrid(data: EmailData) {
	const apiKey = env.SENDGRID_API_KEY;
	if (!apiKey) {
		throw new Error('SENDGRID_API_KEY environment variable is not set');
	}

	const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${apiKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			personalizations: [{
				to: [{ email: data.to }]
			}],
			from: { email: env.EMAIL_FROM || 'noreply@example.com' },
			subject: data.subject,
			content: [
				{ type: 'text/html', value: data.html },
				...(data.text ? [{ type: 'text/plain', value: data.text }] : [])
			]
		})
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`SendGrid API error: ${error}`);
	}

	return { success: true };
}

export function formatContactEmail(data: {
	name: string;
	email: string;
	subject: string;
	message: string;
}): { html: string; text: string } {
	const html = `
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<style>
				body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
				.container { max-width: 600px; margin: 0 auto; padding: 20px; }
				.header { background-color: #4f46e5; color: white; padding: 20px; text-align: center; }
				.content { background-color: #f9fafb; padding: 20px; margin-top: 20px; }
				.field { margin-bottom: 15px; }
				.label { font-weight: bold; color: #4f46e5; }
				.message { background-color: white; padding: 15px; border-left: 4px solid #4f46e5; margin-top: 10px; }
			</style>
		</head>
		<body>
			<div class="container">
				<div class="header">
					<h1>New Contact Form Submission</h1>
				</div>
				<div class="content">
					<div class="field">
						<span class="label">Name:</span> ${escapeHtml(data.name)}
					</div>
					<div class="field">
						<span class="label">Email:</span> ${escapeHtml(data.email)}
					</div>
					<div class="field">
						<span class="label">Subject:</span> ${escapeHtml(data.subject)}
					</div>
					<div class="message">
						<span class="label">Message:</span><br>
						${escapeHtml(data.message).replace(/\n/g, '<br>')}
					</div>
				</div>
			</div>
		</body>
		</html>
	`;

	const text = `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}
	`.trim();

	return { html, text };
}

function escapeHtml(text: string): string {
	const map: Record<string, string> = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};
	return text.replace(/[&<>"']/g, (m) => map[m]);
}
