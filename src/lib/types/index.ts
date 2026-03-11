export type ChangeType = string;

export type BranchPreset = 'conventional' | 'gitflow' | 'ticket-first' | 'custom';

export interface ParsedIssue {
	raw: string;
	ticketId: string | null;
	title: string;
}

export interface BranchNameOptions {
	changeType: ChangeType;
	parsedIssue: ParsedIssue;
	preset: BranchPreset;
	customPattern?: string;
}

export interface CommitMessageOptions {
	changeType: ChangeType;
	parsedIssue: ParsedIssue;
	scope: string;
}

export interface PrTemplate {
	id: string;
	name: string;
	content: string;
	builtin: boolean;
}

export interface ChangeTypeInfo {
	type: string;
	label: string;
	description: string;
	color: string;
}

export interface HistoryEntry {
	id: string;
	timestamp: number;
	issueText: string;
	issueLink: string;
	changeType: string;
	branchName: string;
	prTitle: string;
	commitMessage: string;
}
