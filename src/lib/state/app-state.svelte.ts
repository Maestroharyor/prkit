import type { BranchPreset, PrTemplate, ChangeTypeInfo, HistoryEntry } from '$lib/types';
import { BUILTIN_TEMPLATES } from '$lib/data/templates';
import { DEFAULT_CUSTOM_PATTERN } from '$lib/utils/branch-name';
import { loadFromStorage, saveToStorage } from '$lib/utils/local-storage.svelte';

const MAX_HISTORY = 20;

function createAppState() {
	let issueText = $state('');
	let issueLink = $state(loadFromStorage('issueLink', ''));
	let changeType = $state<string>(loadFromStorage('changeType', 'feat'));
	let branchPreset = $state<BranchPreset>(
		loadFromStorage('branchPreset', 'conventional' as BranchPreset)
	);
	let customBranchPattern = $state(loadFromStorage('customBranchPattern', DEFAULT_CUSTOM_PATTERN));
	let scope = $state(loadFromStorage('scope', ''));
	let selectedTemplateId = $state(loadFromStorage('selectedTemplateId', 'simple'));
	let customTemplates = $state<PrTemplate[]>(loadFromStorage('templates', []));
	let customChangeTypes = $state<ChangeTypeInfo[]>(loadFromStorage('customChangeTypes', []));
	let history = $state<HistoryEntry[]>(loadFromStorage('history', []));

	const allTemplates = $derived([...BUILTIN_TEMPLATES, ...customTemplates]);
	const selectedTemplate = $derived(
		allTemplates.find((t) => t.id === selectedTemplateId) ?? BUILTIN_TEMPLATES[0]
	);

	function addCustomTemplate(name: string, content: string): void {
		const id = `custom-${Date.now()}`;
		customTemplates = [...customTemplates, { id, name, content, builtin: false }];
		saveToStorage('templates', customTemplates);
		selectedTemplateId = id;
		saveToStorage('selectedTemplateId', id);
	}

	function deleteCustomTemplate(id: string): void {
		customTemplates = customTemplates.filter((t) => t.id !== id);
		saveToStorage('templates', customTemplates);
		if (selectedTemplateId === id) {
			selectedTemplateId = BUILTIN_TEMPLATES[0].id;
			saveToStorage('selectedTemplateId', selectedTemplateId);
		}
	}

	function addCustomChangeType(label: string, color: string): void {
		const type = label.toLowerCase().replace(/\s+/g, '-');
		if (
			customChangeTypes.some((ct) => ct.type === type) ||
			['feat', 'fix', 'refactor', 'docs', 'chore', 'test', 'perf', 'style'].includes(type)
		) {
			return;
		}
		customChangeTypes = [...customChangeTypes, { type, label, description: label, color }];
		saveToStorage('customChangeTypes', customChangeTypes);
		changeType = type;
		saveToStorage('changeType', type);
	}

	function addToHistory(entry: Omit<HistoryEntry, 'id' | 'timestamp'>): void {
		const newEntry: HistoryEntry = {
			...entry,
			id: `hist-${Date.now()}`,
			timestamp: Date.now()
		};
		history = [newEntry, ...history].slice(0, MAX_HISTORY);
		saveToStorage('history', history);
	}

	function clearHistory(): void {
		history = [];
		saveToStorage('history', history);
	}

	function exportTemplates(): string {
		return JSON.stringify(customTemplates, null, 2);
	}

	function importTemplates(json: string): void {
		try {
			const parsed = JSON.parse(json) as PrTemplate[];
			if (!Array.isArray(parsed)) return;
			const valid = parsed.filter((t) => t.id && t.name && t.content && typeof t.name === 'string');
			const existingIds = new Set(customTemplates.map((t) => t.id));
			const newTemplates = valid.map((t) => ({
				...t,
				id: existingIds.has(t.id)
					? `import-${Date.now()}-${Math.random().toString(36).slice(2)}`
					: t.id,
				builtin: false
			}));
			customTemplates = [...customTemplates, ...newTemplates];
			saveToStorage('templates', customTemplates);
		} catch {
			// Invalid JSON — silently ignore
		}
	}

	return {
		get issueText() {
			return issueText;
		},
		set issueText(v: string) {
			issueText = v;
		},
		get issueLink() {
			return issueLink;
		},
		set issueLink(v: string) {
			issueLink = v;
			saveToStorage('issueLink', v);
		},
		get changeType() {
			return changeType;
		},
		set changeType(v: string) {
			changeType = v;
			saveToStorage('changeType', v);
		},
		get branchPreset() {
			return branchPreset;
		},
		set branchPreset(v: BranchPreset) {
			branchPreset = v;
			saveToStorage('branchPreset', v);
		},
		get customBranchPattern() {
			return customBranchPattern;
		},
		set customBranchPattern(v: string) {
			customBranchPattern = v;
			saveToStorage('customBranchPattern', v);
		},
		get scope() {
			return scope;
		},
		set scope(v: string) {
			scope = v;
			saveToStorage('scope', v);
		},
		get selectedTemplateId() {
			return selectedTemplateId;
		},
		set selectedTemplateId(v: string) {
			selectedTemplateId = v;
			saveToStorage('selectedTemplateId', v);
		},
		get customTemplates() {
			return customTemplates;
		},
		get customChangeTypes() {
			return customChangeTypes;
		},
		get allTemplates() {
			return allTemplates;
		},
		get selectedTemplate() {
			return selectedTemplate;
		},
		get history() {
			return history;
		},
		addCustomTemplate,
		deleteCustomTemplate,
		addCustomChangeType,
		addToHistory,
		clearHistory,
		exportTemplates,
		importTemplates
	};
}

export const appState = createAppState();
