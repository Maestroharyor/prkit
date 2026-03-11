import type { ParsedIssue } from '$lib/types';

interface PrDescriptionOptions {
	template: string;
	parsedIssue: ParsedIssue;
	changeType: string;
	branchName: string;
	issueLink?: string;
}

export function generatePrDescription(opts: PrDescriptionOptions): string {
	const { template, parsedIssue, changeType, branchName } = opts;

	return template
		.replace(/\{\{TICKET_ID\}\}/g, parsedIssue.ticketId ?? 'N/A')
		.replace(/\{\{TITLE\}\}/g, parsedIssue.title)
		.replace(/\{\{CHANGE_TYPE\}\}/g, changeType)
		.replace(/\{\{BRANCH\}\}/g, branchName)
		.replace(/\{\{RAW_INPUT\}\}/g, parsedIssue.raw)
		.replace(/\{\{LINK\}\}/g, opts.issueLink || 'N/A');
}
