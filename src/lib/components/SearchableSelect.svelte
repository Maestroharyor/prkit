<script lang="ts">
	import { ChevronDown, Search } from 'lucide-svelte';

	interface SelectItem {
		value: string;
		label: string;
		badge?: string;
		color?: string;
	}

	let {
		items,
		value = $bindable(),
		placeholder = 'Select...',
		onAdd
	}: {
		items: SelectItem[];
		value: string;
		placeholder?: string;
		onAdd?: () => void;
	} = $props();

	let open = $state(false);
	let query = $state('');
	let highlightIndex = $state(0);
	let containerEl: HTMLDivElement | undefined = $state();
	let inputEl: HTMLInputElement | undefined = $state();

	let filtered = $derived(
		query ? items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase())) : items
	);

	let selected = $derived(items.find((i) => i.value === value));

	const COLOR_CLASSES: Record<string, string> = {
		green: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
		red: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
		amber: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
		blue: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
		zinc: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-500/20 dark:text-zinc-400',
		purple: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400',
		orange: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400',
		pink: 'bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-400',
		indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400',
		teal: 'bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-400',
		cyan: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-400',
		yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400'
	};

	function getBadgeClass(color?: string): string {
		return COLOR_CLASSES[color ?? ''] ?? COLOR_CLASSES.zinc;
	}

	function select(item: SelectItem) {
		value = item.value;
		open = false;
		query = '';
	}

	function toggle() {
		open = !open;
		if (open) {
			query = '';
			highlightIndex = 0;
			requestAnimationFrame(() => inputEl?.focus());
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			highlightIndex = Math.min(highlightIndex + 1, filtered.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			highlightIndex = Math.max(highlightIndex - 1, 0);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (filtered[highlightIndex]) {
				select(filtered[highlightIndex]);
			}
		} else if (e.key === 'Escape') {
			open = false;
			query = '';
		}
	}

	function handleClickOutside(e: MouseEvent) {
		if (containerEl && !containerEl.contains(e.target as Node)) {
			open = false;
			query = '';
		}
	}

	$effect(() => {
		if (open) {
			highlightIndex = 0;
		}
	});
</script>

<svelte:window onclick={handleClickOutside} />

<div class="relative" bind:this={containerEl}>
	<button
		type="button"
		onclick={toggle}
		class="flex w-full items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-left text-sm transition-colors hover:border-zinc-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:border-zinc-600"
	>
		{#if selected}
			{#if selected.color}
				<span class="rounded px-1.5 py-0.5 text-xs font-medium {getBadgeClass(selected.color)}">
					{selected.badge ?? selected.label}
				</span>
			{/if}
			<span class="min-w-0 flex-1 truncate text-zinc-800 dark:text-zinc-200">{selected.label}</span>
		{:else}
			<span class="min-w-0 flex-1 truncate text-zinc-400 dark:text-zinc-500">{placeholder}</span>
		{/if}
		<ChevronDown
			class="size-4 shrink-0 text-zinc-400 transition-transform {open ? 'rotate-180' : ''}"
		/>
	</button>

	{#if open}
		<div
			class="absolute z-50 mt-1 w-full rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
		>
			<div class="flex items-center gap-2 border-b border-zinc-100 px-3 py-2 dark:border-zinc-700">
				<Search class="size-4 text-zinc-400" />
				<input
					bind:this={inputEl}
					bind:value={query}
					onkeydown={handleKeydown}
					type="text"
					placeholder="Search..."
					class="min-w-0 flex-1 bg-transparent text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none dark:text-zinc-200 dark:placeholder-zinc-500"
				/>
			</div>
			<ul class="max-h-56 overflow-auto py-1" role="listbox">
				{#each filtered as item, i (item.value)}
					<li role="option" aria-selected={item.value === value}>
						<button
							type="button"
							onclick={() => select(item)}
							class="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm transition-colors {i ===
							highlightIndex
								? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300'
								: 'text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-700/50'} {item.value ===
							value
								? 'font-medium'
								: ''}"
						>
							{#if item.color}
								<span class="rounded px-1.5 py-0.5 text-xs font-medium {getBadgeClass(item.color)}">
									{item.badge ?? item.label}
								</span>
							{/if}
							<span class="min-w-0 flex-1 truncate">{item.label}</span>
						</button>
					</li>
				{/each}
				{#if filtered.length === 0}
					<li class="px-3 py-2 text-sm text-zinc-400 dark:text-zinc-500">No results found</li>
				{/if}
				{#if onAdd}
					<li class="border-t border-zinc-100 dark:border-zinc-700">
						<button
							type="button"
							onclick={() => {
								open = false;
								query = '';
								onAdd?.();
							}}
							class="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-indigo-500 transition-colors hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-500/10"
						>
							+ Add custom...
						</button>
					</li>
				{/if}
			</ul>
		</div>
	{/if}
</div>
