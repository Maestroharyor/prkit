import { describe, it, expect } from 'vitest';
import { generateCommitMessage } from './commit-message';
import type { ParsedIssue } from '$lib/types';

describe('generateCommitMessage', () => {
	it('generates message with scope and ticket', () => {
		const issue: ParsedIssue = {
			raw: 'ENG-245 Fix payment retry issue',
			ticketId: 'ENG-245',
			title: 'Fix payment retry issue'
		};
		expect(generateCommitMessage({ changeType: 'fix', parsedIssue: issue, scope: 'payment' })).toBe(
			'fix(payment): fix payment retry issue\n\nRefs: ENG-245'
		);
	});

	it('generates message without scope', () => {
		const issue: ParsedIssue = {
			raw: 'Add dark mode',
			ticketId: null,
			title: 'Add dark mode'
		};
		expect(generateCommitMessage({ changeType: 'feat', parsedIssue: issue, scope: '' })).toBe(
			'feat: add dark mode'
		);
	});

	it('trims scope whitespace', () => {
		const issue: ParsedIssue = { raw: 'Fix bug', ticketId: null, title: 'Fix bug' };
		expect(generateCommitMessage({ changeType: 'fix', parsedIssue: issue, scope: '  api  ' })).toBe(
			'fix(api): fix bug'
		);
	});
});
