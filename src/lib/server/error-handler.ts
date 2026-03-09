/**
 * Centralized error handling utilities
 * Provides consistent error logging and user-friendly error messages
 */

import { dev } from '$app/environment';

export interface AppError {
	code: string;
	message: string;
	statusCode: number;
	details?: unknown;
	timestamp: string;
}

/**
 * Log an error with appropriate context
 * In development: logs full details to console
 * In production: logs sanitized info (no sensitive data)
 *
 * @param error - The error to log
 * @param context - Additional context (function name, action, etc.)
 */
export function logError(error: unknown, context: string): void {
	const timestamp = new Date().toISOString();

	if (dev) {
		// Development: log everything for debugging
		console.error(`[${timestamp}] Error in ${context}:`, error);
	} else {
		// Production: log sanitized version
		const errorMessage = error instanceof Error ? error.message : String(error);
		console.error(`[${timestamp}] Error in ${context}: ${errorMessage}`);
	}
}

/**
 * Create a user-friendly error message from an unknown error
 * Sanitizes sensitive information in production
 *
 * @param error - The error object
 * @param defaultMessage - Fallback message if error can't be determined
 * @returns User-friendly error message
 */
export function getUserFriendlyMessage(
	error: unknown,
	defaultMessage: string = 'An unexpected error occurred. Please try again.'
): string {
	if (error instanceof Error) {
		// In development, show the actual error
		if (dev) {
			return error.message;
		}

		// In production, show generic message for security
		return defaultMessage;
	}

	return defaultMessage;
}

/**
 * Create a standardized error object
 *
 * @param code - Error code (e.g., 'FORM_VALIDATION_ERROR')
 * @param message - User-friendly message
 * @param statusCode - HTTP status code
 * @param details - Optional error details (only in dev)
 * @returns Standardized error object
 */
export function createAppError(
	code: string,
	message: string,
	statusCode: number = 500,
	details?: unknown
): AppError {
	const base: AppError = {
		code,
		message,
		statusCode,
		timestamp: new Date().toISOString()
	};
	if (dev && details !== undefined) {
		base.details = details;
	}
	return base;
}

/**
 * Handle form submission errors
 * Returns appropriate response format for SvelteKit forms
 *
 * @param error - The error that occurred
 * @param formName - Name of the form (for logging)
 * @returns Object with user-friendly error message
 */
export function handleFormError(error: unknown, formName: string): { error: string } {
	logError(error, `form: ${formName}`);

	const message =
		error instanceof Error && dev
			? error.message
			: 'Unable to process your request. Please try again.';

	return { error: message };
}

/**
 * Handle API/database errors
 * Provides different messaging for different error types
 *
 * @param error - The error that occurred
 * @param operation - What operation was being performed
 * @returns User-friendly error message
 */
export function handleOperationError(error: unknown, operation: string): string {
	logError(error, operation);

	if (error instanceof Error) {
		const msg = error.message.toLowerCase();

		// Handle common error patterns
		if (msg.includes('not found')) {
			return 'The requested resource was not found.';
		}
		if (msg.includes('unauthorized')) {
			return 'You do not have permission to perform this action.';
		}
		if (msg.includes('timeout')) {
			return 'Request timed out. Please try again.';
		}
		if (msg.includes('network')) {
			return 'Network error. Please check your connection.';
		}

		return dev ? error.message : 'An error occurred. Please try again.';
	}

	return 'An unexpected error occurred. Please try again.';
}

/**
 * Create a 404 error response
 *
 * @param message - Custom 404 message
 * @returns Error object
 */
export function notFoundError(message = 'Page not found'): AppError {
	return createAppError('NOT_FOUND', message, 404);
}

/**
 * Create a 500 error response
 *
 * @param message - Custom 500 message
 * @param details - Error details (only shown in dev)
 * @returns Error object
 */
export function internalServerError(
	message = 'An unexpected error occurred',
	details?: unknown
): AppError {
	return createAppError('INTERNAL_SERVER_ERROR', message, 500, details);
}

/**
 * Create a validation error response
 *
 * @param message - Validation error message
 * @returns Error object
 */
export function validationError(message: string): AppError {
	return createAppError('VALIDATION_ERROR', message, 400);
}
