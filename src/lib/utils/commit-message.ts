import type { CommitMessageOptions } from '$lib/types';

export function generateCommitMessage(opts: CommitMessageOptions): string {
	const { changeType, parsedIssue, scope } = opts;
	const title = parsedIssue.title.toLowerCase();
	const scopePart = scope.trim() ? `(${scope.trim()})` : '';
	const ticketSuffix = parsedIssue.ticketId ? `\n\nRefs: ${parsedIssue.ticketId}` : '';
	return `${changeType}${scopePart}: ${title}${ticketSuffix}`;
}
