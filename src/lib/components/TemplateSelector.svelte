<script lang="ts">
	import type { PrTemplate } from '$lib/types';
	import { Plus, Trash2, Download, Upload } from 'lucide-svelte';
	import SearchableSelect from './SearchableSelect.svelte';

	let {
		templates,
		selectedId = $bindable(),
		onAdd,
		onDelete,
		onExport,
		onImport
	}: {
		templates: PrTemplate[];
		selectedId: string;
		onAdd: () => void;
		onDelete: (id: string) => void;
		onExport?: () => void;
		onImport?: (json: string) => void;
	} = $props();

	let selected = $derived(templates.find((t) => t.id === selectedId));

	let selectItems = $derived(
		templates.map((t) => ({
			value: t.id,
			label: t.builtin ? t.name : `${t.name} (custom)`
		}))
	);

	let fileInput: HTMLInputElement | undefined = $state();

	function handleImportClick() {
		fileInput?.click();
	}

	function handleFileChange(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === 'string') {
				onImport?.(reader.result);
			}
		};
		reader.readAsText(file);
		input.value = '';
	}
</script>

<div class="space-y-1">
	<span class="text-sm font-medium text-zinc-600 dark:text-zinc-400">PR template</span>
	<div class="flex items-center gap-2">
		<div class="min-w-0 flex-1">
			<SearchableSelect
				items={selectItems}
				bind:value={selectedId}
				placeholder="Select template..."
			/>
		</div>
		<button
			type="button"
			onclick={onAdd}
			class="rounded-lg border border-zinc-200 p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
			title="Add custom template"
		>
			<Plus class="size-4" />
		</button>
		{#if selected && !selected.builtin}
			<button
				type="button"
				onclick={() => onDelete(selectedId)}
				class="rounded-lg border border-zinc-200 p-2 text-zinc-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-red-900/50 dark:hover:text-red-400"
				title="Delete custom template"
			>
				<Trash2 class="size-4" />
			</button>
		{/if}
		{#if onExport}
			<button
				type="button"
				onclick={onExport}
				class="rounded-lg border border-zinc-200 p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
				title="Export custom templates"
			>
				<Download class="size-4" />
			</button>
		{/if}
		{#if onImport}
			<button
				type="button"
				onclick={handleImportClick}
				class="rounded-lg border border-zinc-200 p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
				title="Import templates"
			>
				<Upload class="size-4" />
			</button>
			<input
				bind:this={fileInput}
				type="file"
				accept=".json"
				class="hidden"
				onchange={handleFileChange}
			/>
		{/if}
	</div>
</div>
