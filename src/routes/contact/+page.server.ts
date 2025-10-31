import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { sendEmail, formatContactEmail } from '$lib/server/email';
import { sanitizeText } from '$lib/server/sanitize';

export const actions: Actions = {
  default: async ({ request }) => {
    try {
      const data = await request.formData();
      const name = sanitizeText(String(data.get('name') ?? '').trim());
      const email = String(data.get('email') ?? '').trim();
      const subject = sanitizeText(String(data.get('subject') ?? '').trim());
      const message = sanitizeText(String(data.get('message') ?? '').trim());

      // Validation
      if (!name || !email || !subject || !message) {
        return fail(400, { error: 'All fields are required' });
      }

      if (name.length > 100) {
        return fail(400, { error: 'Name must be 100 characters or less' });
      }

      if (email.length > 255) {
        return fail(400, { error: 'Email must be 255 characters or less' });
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return fail(400, { error: 'Invalid email address' });
      }

      if (subject.length > 200) {
        return fail(400, { error: 'Subject must be 200 characters or less' });
      }

      if (message.length > 5000) {
        return fail(400, { error: 'Message must be 5,000 characters or less' });
      }

      // Send email
      const recipientEmail = env.CONTACT_EMAIL || env.EMAIL_TO || 'admin@example.com';
      const emailContent = formatContactEmail({ name, email, subject, message });

      const emailResult = await sendEmail({
        to: recipientEmail,
        subject: `Contact Form: ${subject}`,
        html: emailContent.html,
        text: emailContent.text
      });

      if (!emailResult.success) {
        console.error('Failed to send contact email:', emailResult.error);
        // Still return success to user, but log the error
        // In production, you might want to save to database as fallback
      }

      return { 
        success: true, 
        message: "Thank you for your message! I'll get back to you soon." 
      };
    } catch (error) {
      console.error('Error processing contact form:', error);
      return fail(500, { error: 'Failed to send message. Please try again later.' });
    }
  }
};
