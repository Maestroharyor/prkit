<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	let {
		value,
		oninput
	}: {
		value: string;
		oninput?: HTMLTextareaAttributes['oninput'];
	} = $props();
</script>

<div class="flex min-h-0 flex-1 flex-col space-y-1">
	<label for="md-editor" class="text-sm font-medium text-zinc-600 dark:text-zinc-400"
		>PR description</label
	>
	<textarea
		id="md-editor"
		{value}
		{oninput}
		rows={12}
		class="min-h-0 flex-1 resize-none rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-sm text-zinc-800 placeholder-zinc-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200 dark:placeholder-zinc-500"
	></textarea>
</div>
