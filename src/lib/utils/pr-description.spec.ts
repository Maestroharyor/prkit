import { describe, it, expect } from 'vitest';
import { generatePrDescription } from './pr-description';

describe('generatePrDescription', () => {
	it('replaces all placeholders', () => {
		const template =
			'## {{TITLE}}\nTicket: {{TICKET_ID}}\nType: {{CHANGE_TYPE}}\nBranch: {{BRANCH}}';
		const result = generatePrDescription({
			template,
			parsedIssue: {
				raw: 'ENG-100 Add login',
				ticketId: 'ENG-100',
				title: 'Add login'
			},
			changeType: 'feat',
			branchName: 'feat/eng-100-add-login',
			issueLink: ''
		});
		expect(result).toBe(
			'## Add login\nTicket: ENG-100\nType: feat\nBranch: feat/eng-100-add-login'
		);
	});

	it('uses N/A when no ticket ID', () => {
		const template = 'Refs: {{TICKET_ID}}';
		const result = generatePrDescription({
			template,
			parsedIssue: { raw: 'Fix bug', ticketId: null, title: 'Fix bug' },
			changeType: 'fix',
			branchName: 'fix/fix-bug',
			issueLink: ''
		});
		expect(result).toBe('Refs: N/A');
	});

	it('replaces {{RAW_INPUT}}', () => {
		const template = 'Input: {{RAW_INPUT}}';
		const result = generatePrDescription({
			template,
			parsedIssue: { raw: 'ENG-1 test', ticketId: 'ENG-1', title: 'test' },
			changeType: 'feat',
			branchName: 'feat/test',
			issueLink: ''
		});
		expect(result).toBe('Input: ENG-1 test');
	});

	it('replaces {{LINK}} with issue link', () => {
		const template = 'Link: {{LINK}}';
		const result = generatePrDescription({
			template,
			parsedIssue: { raw: 'ENG-1 test', ticketId: 'ENG-1', title: 'test' },
			changeType: 'feat',
			branchName: 'feat/test',
			issueLink: 'https://linear.app/team/ENG-1'
		});
		expect(result).toBe('Link: https://linear.app/team/ENG-1');
	});

	it('replaces {{LINK}} with N/A when empty', () => {
		const template = 'Link: {{LINK}}';
		const result = generatePrDescription({
			template,
			parsedIssue: { raw: 'ENG-1 test', ticketId: 'ENG-1', title: 'test' },
			changeType: 'feat',
			branchName: 'feat/test',
			issueLink: ''
		});
		expect(result).toBe('Link: N/A');
	});
});
