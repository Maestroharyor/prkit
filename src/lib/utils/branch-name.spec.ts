import { describe, it, expect } from 'vitest';
import { generateBranchName } from './branch-name';
import type { ParsedIssue } from '$lib/types';

const issueWithTicket: ParsedIssue = {
	raw: 'ENG-245 Fix payment retry issue',
	ticketId: 'ENG-245',
	title: 'Fix payment retry issue'
};

const issueWithoutTicket: ParsedIssue = {
	raw: 'Fix payment retry issue',
	ticketId: null,
	title: 'Fix payment retry issue'
};

describe('generateBranchName', () => {
	it('generates conventional branch name with ticket', () => {
		expect(
			generateBranchName({
				changeType: 'fix',
				parsedIssue: issueWithTicket,
				preset: 'conventional'
			})
		).toBe('fix/eng-245-fix-payment-retry-issue');
	});

	it('generates gitflow branch name', () => {
		expect(
			generateBranchName({ changeType: 'fix', parsedIssue: issueWithTicket, preset: 'gitflow' })
		).toBe('hotfix/eng-245-fix-payment-retry-issue');
	});

	it('generates gitflow feature branch', () => {
		expect(
			generateBranchName({ changeType: 'feat', parsedIssue: issueWithTicket, preset: 'gitflow' })
		).toBe('feature/eng-245-fix-payment-retry-issue');
	});

	it('generates ticket-first branch name', () => {
		expect(
			generateBranchName({
				changeType: 'fix',
				parsedIssue: issueWithTicket,
				preset: 'ticket-first'
			})
		).toBe('ENG-245/fix-fix-payment-retry-issue');
	});

	it('falls back to conventional style without ticket for ticket-first', () => {
		expect(
			generateBranchName({
				changeType: 'feat',
				parsedIssue: issueWithoutTicket,
				preset: 'ticket-first'
			})
		).toBe('feat/fix-payment-retry-issue');
	});

	it('handles no ticket in conventional', () => {
		expect(
			generateBranchName({
				changeType: 'feat',
				parsedIssue: issueWithoutTicket,
				preset: 'conventional'
			})
		).toBe('feat/fix-payment-retry-issue');
	});

	it('generates custom pattern branch name', () => {
		expect(
			generateBranchName({
				changeType: 'fix',
				parsedIssue: issueWithTicket,
				preset: 'custom',
				customPattern: '{ticket}-{type}/{slug}'
			})
		).toBe('ENG-245-fix/fix-payment-retry-issue');
	});

	it('generates custom pattern with gitflow-type', () => {
		expect(
			generateBranchName({
				changeType: 'fix',
				parsedIssue: issueWithTicket,
				preset: 'custom',
				customPattern: '{gitflow-type}/{ticket-lower}-{slug}'
			})
		).toBe('hotfix/eng-245-fix-payment-retry-issue');
	});

	it('handles custom pattern without ticket', () => {
		expect(
			generateBranchName({
				changeType: 'feat',
				parsedIssue: issueWithoutTicket,
				preset: 'custom',
				customPattern: '{ticket}/{type}-{slug}'
			})
		).toBe('feat-fix-payment-retry-issue');
	});
});
