import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { env } from '$env/dynamic/private';
import { sendEmail, formatContactEmail } from '$lib/server/email';
import { contactFormSchema } from '$lib/schemas';
import { logError, handleFormError } from '$lib/server/error-handler';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(contactFormSchema));
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(contactFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { name, email, subject, message: messageText } = form.data;

			// Send email
			const recipientEmail = env.CONTACT_EMAIL || env.EMAIL_TO || 'admin@example.com';
			const emailContent = formatContactEmail({
				name,
				email,
				subject,
				message: messageText
			});

			const emailResult = await sendEmail({
				to: recipientEmail,
				subject: `Contact Form: ${subject}`,
				html: emailContent.html,
				text: emailContent.text
			});

			if (!emailResult.success) {
				console.error('Failed to send contact email:', emailResult.error);
				return message(form, 'Email sent but delivery may have failed');
			}

			return message(form, "Thank you! I'll get back to you soon.");
		} catch (error) {
			logError(error, 'contact form submission');
			const errorMessage = handleFormError(error, 'contact').error;
			return fail(400, { form, message: errorMessage });
		}
	}
};
