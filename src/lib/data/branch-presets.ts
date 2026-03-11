import type { BranchPreset } from '$lib/types';

export const BRANCH_PRESETS: { preset: BranchPreset; label: string; example: string }[] = [
	{ preset: 'conventional', label: 'Conventional', example: 'feat/add-login-page' },
	{ preset: 'gitflow', label: 'Gitflow', example: 'feature/add-login-page' },
	{ preset: 'ticket-first', label: 'Ticket-first', example: 'ENG-123/feat-add-login-page' },
	{ preset: 'custom', label: 'Custom pattern', example: '{ticket}-{type}/{slug}' }
];
