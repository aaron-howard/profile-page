import { z } from 'zod';

/**
 * Contact form validation schema
 * Validates name, email, subject, and message fields
 */
export const contactFormSchema = z.object({
	name: z
		.string()
		.min(1, 'Name is required')
		.max(100, 'Name must be 100 characters or less')
		.trim(),
	email: z
		.string()
		.min(1, 'Email is required')
		.email('Please enter a valid email address')
		.max(255, 'Email must be 255 characters or less')
		.trim()
		.toLowerCase(),
	subject: z
		.string()
		.min(1, 'Subject is required')
		.max(200, 'Subject must be 200 characters or less')
		.trim(),
	message: z
		.string()
		.min(1, 'Message is required')
		.max(5000, 'Message must be 5,000 characters or less')
		.trim()
});

export type ContactFormSchema = typeof contactFormSchema;
