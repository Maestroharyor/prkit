const KEYWORD_MAP: [RegExp, string][] = [
	[/\b(fix|bug|issue|error|crash|broken|wrong)\b/i, 'fix'],
	[/\b(doc|docs|readme|guide|documentation)\b/i, 'docs'],
	[/\b(tests?|spec|coverage|testing)\b/i, 'test'],
	[/\b(perf|speed|optimize|slow|fast|performance|latency)\b/i, 'perf'],
	[/\b(refactor|restructure|clean|reorganize|simplify)\b/i, 'refactor'],
	[/\b(add|new|feature|implement|create|introduce)\b/i, 'feat']
];

export function detectChangeType(text: string): string | null {
	const lower = text.toLowerCase();
	for (const [pattern, type] of KEYWORD_MAP) {
		if (pattern.test(lower)) {
			return type;
		}
	}
	return null;
}
