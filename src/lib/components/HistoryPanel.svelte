<script lang="ts">
	import type { HistoryEntry, ChangeTypeInfo } from '$lib/types';
	import { CHANGE_TYPES } from '$lib/data/change-types';
	import { Clock, Trash2, X } from 'lucide-svelte';

	let {
		history,
		customTypes = [],
		onRestore,
		onClear,
		onClose
	}: {
		history: HistoryEntry[];
		customTypes?: ChangeTypeInfo[];
		onRestore: (entry: HistoryEntry) => void;
		onClear: () => void;
		onClose: () => void;
	} = $props();

	let allTypes = $derived([...CHANGE_TYPES, ...customTypes]);

	const COLOR_CLASSES: Record<string, string> = {
		green: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
		red: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
		amber: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
		blue: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
		zinc: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-500/20 dark:text-zinc-400',
		purple: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400',
		orange: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400',
		pink: 'bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-400'
	};

	function getBadgeClass(changeType: string): string {
		const info = allTypes.find((t) => t.type === changeType);
		return COLOR_CLASSES[info?.color ?? ''] ?? COLOR_CLASSES.zinc;
	}

	function formatTime(ts: number): string {
		const d = new Date(ts);
		const now = new Date();
		const diffMs = now.getTime() - d.getTime();
		const diffMin = Math.floor(diffMs / 60000);
		if (diffMin < 1) return 'just now';
		if (diffMin < 60) return `${diffMin}m ago`;
		const diffHours = Math.floor(diffMin / 60);
		if (diffHours < 24) return `${diffHours}h ago`;
		return d.toLocaleDateString();
	}
</script>

<div class="flex h-full w-72 flex-col border-r border-zinc-200 dark:border-zinc-800">
	<div class="flex items-center justify-between px-4 py-3">
		<div class="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
			<Clock class="size-4" />
			History
		</div>
		<button
			type="button"
			onclick={onClose}
			class="rounded-lg p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
		>
			<X class="size-4" />
		</button>
	</div>

	{#if history.length === 0}
		<div class="flex flex-1 items-center justify-center px-4">
			<p class="text-sm text-zinc-400 dark:text-zinc-500">No history yet</p>
		</div>
	{:else}
		<div class="flex-1 overflow-y-auto">
			{#each history as entry (entry.id)}
				<button
					type="button"
					onclick={() => onRestore(entry)}
					class="flex w-full flex-col gap-1 border-b border-zinc-100 px-4 py-2.5 text-left transition-colors hover:bg-zinc-50 dark:border-zinc-800/50 dark:hover:bg-zinc-800/50"
				>
					<div class="flex items-center gap-2">
						<span
							class="rounded px-1.5 py-0.5 text-xs font-medium {getBadgeClass(entry.changeType)}"
						>
							{entry.changeType}
						</span>
						<span class="shrink-0 text-xs text-zinc-400 dark:text-zinc-500">
							{formatTime(entry.timestamp)}
						</span>
					</div>
					<span class="truncate text-sm text-zinc-700 dark:text-zinc-300">
						{entry.branchName}
					</span>
				</button>
			{/each}
		</div>
		<div class="border-t border-zinc-100 px-4 py-2 dark:border-zinc-800">
			<button
				type="button"
				onclick={onClear}
				class="flex items-center gap-1.5 text-xs text-zinc-400 transition-colors hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400"
			>
				<Trash2 class="size-3" />
				Clear history
			</button>
		</div>
	{/if}
</div>
