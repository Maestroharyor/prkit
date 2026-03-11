import { describe, it, expect } from 'vitest';
import { slugify } from './slugify';

describe('slugify', () => {
	it('converts text to lowercase kebab-case', () => {
		expect(slugify('Fix payment retry issue')).toBe('fix-payment-retry-issue');
	});

	it('removes special characters', () => {
		expect(slugify('Add login (OAuth2) support!')).toBe('add-login-oauth2-support');
	});

	it('collapses multiple spaces and dashes', () => {
		expect(slugify('fix   multiple---dashes')).toBe('fix-multiple-dashes');
	});

	it('trims leading and trailing dashes', () => {
		expect(slugify('  --hello world--  ')).toBe('hello-world');
	});

	it('handles empty string', () => {
		expect(slugify('')).toBe('');
	});

	it('handles underscores', () => {
		expect(slugify('some_snake_case')).toBe('some-snake-case');
	});
});
