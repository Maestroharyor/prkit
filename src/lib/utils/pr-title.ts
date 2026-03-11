import type { ParsedIssue } from '$lib/types';

export function generatePrTitle(changeType: string, parsedIssue: ParsedIssue): string {
	const title = parsedIssue.title.toLowerCase();
	const ticketSuffix = parsedIssue.ticketId ? ` (${parsedIssue.ticketId})` : '';
	return `${changeType}: ${title}${ticketSuffix}`;
}
