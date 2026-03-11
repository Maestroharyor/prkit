<script lang="ts">
	import { renderMarkdown } from '$lib/utils/markdown';

	let { markdown }: { markdown: string } = $props();

	let html = $derived(renderMarkdown(markdown));
</script>

<div class="flex min-h-0 flex-1 flex-col space-y-1">
	<span class="text-sm font-medium text-zinc-600 dark:text-zinc-400">Preview</span>
	<div
		class="prose prose-sm min-h-0 flex-1 overflow-auto rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 prose-zinc dark:border-zinc-700 dark:bg-zinc-800/50 dark:prose-invert"
	>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- sanitized via DOMPurify -->
		{@html html}
	</div>
</div>
