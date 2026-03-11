<script lang="ts">
	import type { BranchPreset } from '$lib/types';
	import { BRANCH_PRESETS } from '$lib/data/branch-presets';
	import SearchableSelect from './SearchableSelect.svelte';

	let {
		value = $bindable(),
		customPattern = $bindable()
	}: {
		value: BranchPreset;
		customPattern: string;
	} = $props();

	let selectItems = $derived(
		BRANCH_PRESETS.map((bp) => ({
			value: bp.preset,
			label: `${bp.label} — ${bp.example}`
		}))
	);
</script>

<div class="space-y-2">
	<span class="text-sm font-medium text-zinc-600 dark:text-zinc-400">Branch format</span>
	<SearchableSelect items={selectItems} bind:value placeholder="Select format..." />
	{#if value === 'custom'}
		<div class="space-y-1">
			<label for="custom-pattern" class="text-xs text-zinc-500 dark:text-zinc-400"
				>Pattern — use <code class="rounded bg-zinc-100 px-1 dark:bg-zinc-800">{'{type}'}</code>,
				<code class="rounded bg-zinc-100 px-1 dark:bg-zinc-800">{'{ticket}'}</code>,
				<code class="rounded bg-zinc-100 px-1 dark:bg-zinc-800">{'{slug}'}</code>,
				<code class="rounded bg-zinc-100 px-1 dark:bg-zinc-800">{'{gitflow-type}'}</code></label
			>
			<input
				id="custom-pattern"
				type="text"
				bind:value={customPattern}
				placeholder={'{ticket}-{type}/{slug}'}
				class="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-sm text-zinc-800 placeholder-zinc-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200 dark:placeholder-zinc-500"
			/>
		</div>
	{/if}
</div>
