import type { ParsedIssue } from '$lib/types';

const TICKET_PATTERN = /^([A-Z][A-Z0-9]+-\d+)\s*/;

export function parseTicket(raw: string): ParsedIssue {
	const trimmed = raw.trim();
	const match = trimmed.match(TICKET_PATTERN);

	if (match) {
		return {
			raw: trimmed,
			ticketId: match[1],
			title: trimmed.slice(match[0].length).trim()
		};
	}

	return {
		raw: trimmed,
		ticketId: null,
		title: trimmed
	};
}
