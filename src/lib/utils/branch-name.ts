import type { BranchNameOptions } from '$lib/types';
import { slugify } from './slugify';

const GITFLOW_MAP: Record<string, string> = {
	feat: 'feature',
	fix: 'hotfix',
	refactor: 'feature',
	docs: 'feature',
	chore: 'feature',
	test: 'feature',
	perf: 'feature',
	style: 'feature'
};

export const DEFAULT_CUSTOM_PATTERN = '{ticket}-{type}/{slug}';

function applyPattern(pattern: string, vars: Record<string, string>): string {
	let result = pattern;
	for (const [key, val] of Object.entries(vars)) {
		result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), val);
	}
	// Clean up double slashes and leading/trailing slashes or dashes
	return result.replace(/\/+/g, '/').replace(/^[-/]+|[-/]+$/g, '');
}

export function generateBranchName(opts: BranchNameOptions): string {
	const { changeType, parsedIssue, preset, customPattern } = opts;
	const slug = slugify(parsedIssue.title);
	const ticketLower = parsedIssue.ticketId?.toLowerCase() ?? '';
	const ticket = parsedIssue.ticketId ?? '';

	if (preset === 'custom') {
		const pattern = customPattern || DEFAULT_CUSTOM_PATTERN;
		return applyPattern(pattern, {
			type: changeType,
			ticket,
			'ticket-lower': ticketLower,
			slug,
			'gitflow-type': GITFLOW_MAP[changeType] ?? 'feature'
		});
	}

	const slugPart = ticketLower ? `${ticketLower}-${slug}` : slug;

	switch (preset) {
		case 'conventional':
			return `${changeType}/${slugPart}`;
		case 'gitflow':
			return `${GITFLOW_MAP[changeType] ?? 'feature'}/${slugPart}`;
		case 'ticket-first': {
			if (parsedIssue.ticketId) {
				return `${parsedIssue.ticketId}/${changeType}-${slug}`;
			}
			return `${changeType}/${slug}`;
		}
	}
}
