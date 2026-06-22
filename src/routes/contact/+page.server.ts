import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms/server';
import { zod4 } from '$lib/server/superforms-zod4';
import { env } from '$env/dynamic/private';
import { sendEmail, formatContactEmail } from '$lib/server/email';
import { contactFormSchema } from '$lib/schemas';
import { logError, handleFormError } from '$lib/server/error-handler';

function normalizeTextInput(value: string): string {
	return value.replace(/<[^>]*>/g, '').trim();
}

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(contactFormSchema));
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod4(contactFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const raw = form.data as {
				name: string;
				email: string;
				subject: string;
				message: string;
			};

			const name = normalizeTextInput(raw.name);
			const email = normalizeTextInput(raw.email);
			const subject = normalizeTextInput(raw.subject);
			const messageText = normalizeTextInput(raw.message);

			const recipientEmail = env.CONTACT_EMAIL || env.EMAIL_TO || 'admin@example.com';
			const emailContent = formatContactEmail({
				name,
				email,
				subject,
				message: messageText
			});

			const emailResult = await sendEmail({
				to: recipientEmail,
				subject: `Contact Form: ${subject.replace(/[\r\n]/g, ' ')}`,
				html: emailContent.html,
				text: emailContent.text
			});

			if (!emailResult.success) {
				console.error('Failed to send contact email:', emailResult.error);
				return message(form, 'Message delivery failed. Please try again later.');
			}

			return message(form, "Thank you! I'll get back to you soon.");
		} catch (error) {
			logError(error, 'contact form submission');
			const errorMessage = handleFormError(error, 'contact').error;
			return fail(400, { form, message: errorMessage });
		}
	}
};
