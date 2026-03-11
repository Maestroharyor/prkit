import { describe, it, expect } from 'vitest';
import { generatePrTitle } from './pr-title';
import type { ParsedIssue } from '$lib/types';

describe('generatePrTitle', () => {
	it('generates title with ticket ID', () => {
		const issue: ParsedIssue = {
			raw: 'ENG-245 Fix payment retry issue',
			ticketId: 'ENG-245',
			title: 'Fix payment retry issue'
		};
		expect(generatePrTitle('fix', issue)).toBe('fix: fix payment retry issue (ENG-245)');
	});

	it('generates title without ticket ID', () => {
		const issue: ParsedIssue = {
			raw: 'Add dark mode support',
			ticketId: null,
			title: 'Add dark mode support'
		};
		expect(generatePrTitle('feat', issue)).toBe('feat: add dark mode support');
	});
});
