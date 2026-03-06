import { describe, it, expect } from 'vitest';
import {
	escapeHtml,
	sanitizeText,
	sanitizeHtml,
	sanitizeEmail,
	sanitizeUrl
} from '$lib/server/sanitize-utils';

describe('escapeHtml', () => {
	it('escapes ampersand', () => {
		expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
	});

	it('escapes less-than', () => {
		expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
	});

	it('escapes greater-than', () => {
		expect(escapeHtml('a > b')).toBe('a &gt; b');
	});

	it('escapes double quotes', () => {
		expect(escapeHtml('Say "hello"')).toBe('Say &quot;hello&quot;');
	});

	it('escapes single quotes', () => {
		expect(escapeHtml("It's mine")).toBe('It&#039;s mine');
	});

	it('escapes multiple special characters', () => {
		expect(escapeHtml('<script src="x" data=\'y\'>'))
			.toBe('&lt;script src=&quot;x&quot; data=&#039;y&#039;&gt;');
	});

	it('returns empty string unchanged', () => {
		expect(escapeHtml('')).toBe('');
	});

	it('handles plain text without special characters', () => {
		expect(escapeHtml('Hello World')).toBe('Hello World');
	});
});

describe('sanitizeText', () => {
	it('removes HTML tags and escapes remaining text', () => {
		expect(sanitizeText('<b>Hello</b>')).toBe('Hello');
	});

	it('removes entire img tags with onerror handler', () => {
		expect(sanitizeText('<img src=x onerror=alert(1)>')).toBe('');
	});

	it('removes script tags and escapes remaining text', () => {
		expect(sanitizeText('<script>alert("xss")</script>')).toBe('alert(&quot;xss&quot;)');
	});

	it('preserves text outside tags', () => {
		expect(sanitizeText('<p>Hello</p> World')).toBe('Hello World');
	});

	it('escapes special characters in text after tag removal', () => {
		expect(sanitizeText('<p>Tom & Jerry</p>')).toBe('Tom &amp; Jerry');
	});

	it('handles multiple tags', () => {
		expect(sanitizeText('<div><span>test</span></div>')).toBe('test');
	});

	it('removes tags with attributes', () => {
		expect(sanitizeText('<a href="javascript:alert(1)">click</a>')).toBe('click');
	});

	it('returns empty string when input is empty', () => {
		expect(sanitizeText('')).toBe('');
	});
});

describe('sanitizeHtml', () => {
	it('removes script tags with content', () => {
		expect(sanitizeHtml('<p>Hello</p><script>alert("xss")</script>'))
			.toBe('<p>Hello</p>');
	});

	it('removes script tags case-insensitively', () => {
		expect(sanitizeHtml('<SCRIPT>alert("xss")</SCRIPT>'))
			.toBe('');
	});

	it('removes event handler attributes', () => {
		expect(sanitizeHtml('<img onclick="alert(1)" src="x">'))
			.toBe('<img  src="x">');
	});

	it('removes multiple event handlers', () => {
		expect(sanitizeHtml('<button onmouseover="x" onclick="y">Click</button>'))
			.toBe('<button  >Click</button>');
	});

	it('removes javascript: URLs', () => {
		expect(sanitizeHtml('<a href="javascript:alert(1)">click</a>'))
			.toBe('<a href="alert(1)">click</a>');
	});

	it('removes data:text/html URLs after script tag removal', () => {
		// Script tag is removed first, leaving data:text/html, then data: prefix is removed
		expect(sanitizeHtml('<img src="data:text/html,<script>alert(1)</script>">'))
			.toBe('<img src=",">');
	});

	it('removes iframe tags completely', () => {
		expect(sanitizeHtml('<iframe src="evil.com"></iframe>'))
			.toBe('');
	});

	it('preserves safe HTML tags', () => {
		expect(sanitizeHtml('<p><b>Bold</b> and <i>italic</i></p>'))
			.toBe('<p><b>Bold</b> and <i>italic</i></p>');
	});

	it('handles complex script tags with nested content', () => {
		expect(sanitizeHtml('<div><script>var x = "<script>alert(1)</script>";</script></div>'))
			.toBe('<div>";</script></div>');
	});

	it('returns empty string when input is empty', () => {
		expect(sanitizeHtml('')).toBe('');
	});
});

describe('sanitizeEmail', () => {
	it('accepts valid email', () => {
		expect(sanitizeEmail('user@example.com')).toBe('user@example.com');
	});

	it('lowercases email', () => {
		expect(sanitizeEmail('User@Example.COM')).toBe('user@example.com');
	});

	it('trims whitespace', () => {
		expect(sanitizeEmail('  user@example.com  ')).toBe('user@example.com');
	});

	it('removes HTML tags before validation', () => {
		expect(sanitizeEmail('<script>user@example.com</script>')).toBe('user@example.com');
	});

	it('rejects invalid format', () => {
		expect(sanitizeEmail('not-an-email')).toBe('');
	});

	it('rejects email missing @ symbol', () => {
		expect(sanitizeEmail('userexample.com')).toBe('');
	});

	it('rejects email with space', () => {
		expect(sanitizeEmail('user @example.com')).toBe('');
	});

	it('accepts plus-addressing', () => {
		expect(sanitizeEmail('user+tag@example.com')).toBe('user+tag@example.com');
	});

	it('accepts subdomain email', () => {
		expect(sanitizeEmail('user@mail.example.co.uk')).toBe('user@mail.example.co.uk');
	});

	it('returns empty string when input is empty', () => {
		expect(sanitizeEmail('')).toBe('');
	});
});

describe('sanitizeUrl', () => {
	it('allows http URLs', () => {
		expect(sanitizeUrl('http://example.com')).toBe('http://example.com');
	});

	it('allows https URLs', () => {
		expect(sanitizeUrl('https://example.com')).toBe('https://example.com');
	});

	it('allows relative URLs', () => {
		expect(sanitizeUrl('/page')).toBe('/page');
	});

	it('blocks javascript: protocol', () => {
		expect(sanitizeUrl('javascript:alert(1)')).toBe('');
	});

	it('blocks javascript: protocol case-insensitively', () => {
		expect(sanitizeUrl('JavaScript:alert(1)')).toBe('');
	});

	it('blocks data: protocol', () => {
		expect(sanitizeUrl('data:text/html,<script>alert(1)</script>')).toBe('');
	});

	it('blocks vbscript: protocol', () => {
		expect(sanitizeUrl('vbscript:alert(1)')).toBe('');
	});

	it('trims whitespace but preserves original casing for non-dangerous URLs', () => {
		expect(sanitizeUrl('  https://Example.COM  ')).toBe('https://Example.COM');
	});

	it('returns empty string when input is empty after trim', () => {
		expect(sanitizeUrl('   ')).toBe('');
	});

	it('allows URL with hash', () => {
		expect(sanitizeUrl('#section')).toBe('#section');
	});
});
