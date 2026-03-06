import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
	logError,
	getUserFriendlyMessage,
	createAppError,
	handleFormError,
	handleOperationError,
	notFoundError,
	internalServerError,
	validationError
} from '$lib/server/error-handler';

describe('error-handler - production mode (dev=false)', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('logError', () => {
		it('logs error with sanitized info in production', () => {
			const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			const error = new Error('Database connection failed');
			logError(error, 'database operation');
			expect(consoleSpy).toHaveBeenCalledWith(
				expect.stringMatching(/Error in database operation: Database connection failed/)
			);
			consoleSpy.mockRestore();
		});
	});

	describe('getUserFriendlyMessage', () => {
		it('returns default message for Error instances in production', () => {
			const error = new Error('Sensitive database info');
			const result = getUserFriendlyMessage(error);
			expect(result).toBe('An unexpected error occurred. Please try again.');
		});

		it('returns default message for non-Error values', () => {
			const result = getUserFriendlyMessage('some error string');
			expect(result).toBe('An unexpected error occurred. Please try again.');
		});

		it('returns custom default message when provided', () => {
			const error = new Error('Sensitive info');
			const result = getUserFriendlyMessage(error, 'Custom error message');
			expect(result).toBe('Custom error message');
		});
	});

	describe('createAppError', () => {
		it('creates error with correct shape', () => {
			const error = createAppError('TEST_ERROR', 'Test message', 400);
			expect(error).toEqual({
				code: 'TEST_ERROR',
				message: 'Test message',
				statusCode: 400,
				timestamp: expect.any(String)
			});
		});

		it('uses default statusCode of 500', () => {
			const error = createAppError('TEST_ERROR', 'Test message');
			expect(error.statusCode).toBe(500);
		});

		it('does not include details property in production even when provided', () => {
			const error = createAppError('TEST_ERROR', 'Test message', 400, { sensitive: 'data' });
			expect(error).not.toHaveProperty('details');
		});

		it('includes timestamp', () => {
			const error = createAppError('TEST_ERROR', 'Test message');
			expect(error.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
		});
	});

	describe('handleFormError', () => {
		it('returns generic production message', () => {
			const error = new Error('Sensitive database error');
			const result = handleFormError(error, 'contactForm');
			expect(result.error).toBe('Unable to process your request. Please try again.');
		});

		it('calls logError', () => {
			const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			const error = new Error('Test error');
			handleFormError(error, 'contactForm');
			expect(consoleSpy).toHaveBeenCalled();
			consoleSpy.mockRestore();
		});

		it('handles non-Error values', () => {
			const result = handleFormError('some string error', 'contactForm');
			expect(result.error).toBe('Unable to process your request. Please try again.');
		});
	});

	describe('handleOperationError', () => {
		it('returns "not found" message for 404-like errors', () => {
			const error = new Error('Resource not found');
			const result = handleOperationError(error, 'fetchUser');
			expect(result).toBe('The requested resource was not found.');
		});

		it('returns "unauthorized" message for auth errors', () => {
			const error = new Error('Unauthorized access');
			const result = handleOperationError(error, 'deleteUser');
			expect(result).toBe('You do not have permission to perform this action.');
		});

		it('returns "timeout" message for timeout errors', () => {
			const error = new Error('Request timeout');
			const result = handleOperationError(error, 'queryDB');
			expect(result).toBe('Request timed out. Please try again.');
		});

		it('returns "network" message for network errors', () => {
			const error = new Error('Network connection failed');
			const result = handleOperationError(error, 'fetchAPI');
			expect(result).toBe('Network error. Please check your connection.');
		});

		it('returns generic message for unrecognized errors in production', () => {
			const error = new Error('Some random error');
			const result = handleOperationError(error, 'operation');
			expect(result).toBe('An error occurred. Please try again.');
		});

		it('handles non-Error values', () => {
			const result = handleOperationError('string error', 'operation');
			expect(result).toBe('An unexpected error occurred. Please try again.');
		});

		it('calls logError', () => {
			const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
			const error = new Error('Test');
			handleOperationError(error, 'operation');
			expect(consoleSpy).toHaveBeenCalled();
			consoleSpy.mockRestore();
		});
	});

	describe('notFoundError', () => {
		it('creates 404 error', () => {
			const error = notFoundError();
			expect(error.statusCode).toBe(404);
			expect(error.code).toBe('NOT_FOUND');
			expect(error.message).toBe('Page not found');
		});

		it('uses custom message', () => {
			const error = notFoundError('User not found');
			expect(error.message).toBe('User not found');
		});
	});

	describe('internalServerError', () => {
		it('creates 500 error with default message', () => {
			const error = internalServerError();
			expect(error.statusCode).toBe(500);
			expect(error.code).toBe('INTERNAL_SERVER_ERROR');
		});

		it('uses custom message', () => {
			const error = internalServerError('Database unavailable');
			expect(error.message).toBe('Database unavailable');
		});

		it('does not include details in production', () => {
			const error = internalServerError('Message', { stack: 'trace' });
			expect(error).not.toHaveProperty('details');
		});
	});

	describe('validationError', () => {
		it('creates 400 validation error', () => {
			const error = validationError('Invalid email');
			expect(error.statusCode).toBe(400);
			expect(error.code).toBe('VALIDATION_ERROR');
			expect(error.message).toBe('Invalid email');
		});
	});
});

describe('error-handler - development mode (dev=true)', () => {
	beforeEach(() => {
		vi.resetModules();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('shows actual error message in dev mode', async () => {
		vi.doMock('$app/environment', () => ({
			dev: true,
			browser: false,
			building: false,
			version: 'test'
		}));

		const { getUserFriendlyMessage: getUserFriendlyMessageDev } =
			await import('$lib/server/error-handler');
		const error = new Error('Sensitive database info');
		const result = getUserFriendlyMessageDev(error);
		expect(result).toBe('Sensitive database info');
	});

	it('includes details in createAppError in dev mode', async () => {
		vi.doMock('$app/environment', () => ({
			dev: true,
			browser: false,
			building: false,
			version: 'test'
		}));

		const { createAppError: createAppErrorDev } = await import('$lib/server/error-handler');
		const error = createAppErrorDev('TEST_ERROR', 'Test message', 400, { sensitive: 'data' });
		expect(error).toHaveProperty('details');
		expect(error.details).toEqual({ sensitive: 'data' });
	});

	it('returns actual error message in handleFormError in dev mode', async () => {
		vi.doMock('$app/environment', () => ({
			dev: true,
			browser: false,
			building: false,
			version: 'test'
		}));

		const { handleFormError: handleFormErrorDev } = await import('$lib/server/error-handler');
		const error = new Error('Database constraint violation');
		const result = handleFormErrorDev(error, 'contactForm');
		expect(result.error).toBe('Database constraint violation');
	});

	it('returns actual error message in handleOperationError for unrecognized errors in dev', async () => {
		vi.doMock('$app/environment', () => ({
			dev: true,
			browser: false,
			building: false,
			version: 'test'
		}));

		const { handleOperationError: handleOperationErrorDev } =
			await import('$lib/server/error-handler');
		const error = new Error('Some random error');
		const result = handleOperationErrorDev(error, 'operation');
		expect(result).toBe('Some random error');
	});
});
