import type { ChangeTypeInfo } from '$lib/types';

export const CHANGE_TYPES: ChangeTypeInfo[] = [
	{ type: 'feat', label: 'Feature', description: 'A new feature', color: 'green' },
	{ type: 'fix', label: 'Fix', description: 'A bug fix', color: 'red' },
	{ type: 'refactor', label: 'Refactor', description: 'Code restructuring', color: 'amber' },
	{ type: 'docs', label: 'Docs', description: 'Documentation changes', color: 'blue' },
	{ type: 'chore', label: 'Chore', description: 'Maintenance tasks', color: 'zinc' },
	{ type: 'test', label: 'Test', description: 'Adding or updating tests', color: 'purple' },
	{ type: 'perf', label: 'Perf', description: 'Performance improvements', color: 'orange' },
	{ type: 'style', label: 'Style', description: 'Code style / formatting', color: 'pink' }
];
