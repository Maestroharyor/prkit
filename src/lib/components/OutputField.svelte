<script lang="ts">
	import CopyButton from './CopyButton.svelte';
	import { RotateCcw } from 'lucide-svelte';

	let {
		label,
		value = $bindable(),
		generatedValue,
		multiline = false
	}: {
		label: string;
		value: string;
		generatedValue: string;
		multiline?: boolean;
	} = $props();

	let hasContent = $derived(generatedValue !== '');
	let isOverridden = $derived(value !== generatedValue && generatedValue !== '');

	function reset() {
		value = generatedValue;
	}
</script>

<div class="space-y-1">
	<div class="flex items-center justify-between">
		<span class="text-sm font-medium text-zinc-600 dark:text-zinc-400">{label}</span>
		{#if isOverridden}
			<button
				type="button"
				onclick={reset}
				class="flex items-center gap-1 text-xs text-indigo-500 transition-colors hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
				title="Reset to generated value"
			>
				<RotateCcw class="size-3" />
				Reset
			</button>
		{/if}
	</div>
	{#if hasContent}
		<div
			class="flex {multiline
				? 'items-start'
				: 'items-center'} gap-2 rounded-lg border px-3 py-2 transition-colors focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500
			{isOverridden
				? 'border-indigo-300 bg-indigo-50/50 dark:border-indigo-500/30 dark:bg-indigo-500/5'
				: 'border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/50'}"
		>
			{#if multiline}
				<textarea
					bind:value
					rows={2}
					class="min-w-0 flex-1 resize-none border-0 bg-transparent text-sm text-zinc-800 outline-none focus:border-0 focus:ring-0 focus:outline-none dark:text-zinc-200"
					aria-label={label}
				></textarea>
			{:else}
				<input
					type="text"
					bind:value
					class="min-w-0 flex-1 border-0 bg-transparent text-sm text-zinc-800 outline-none focus:ring-0 focus:outline-none dark:text-zinc-200"
					aria-label={label}
				/>
			{/if}
			{#if value}
				<CopyButton text={value} />
			{/if}
		</div>
	{:else}
		<div
			class="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-500"
		>
			Waiting for input...
		</div>
	{/if}
</div>
