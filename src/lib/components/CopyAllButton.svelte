<script lang="ts">
	import { Check, ClipboardList } from 'lucide-svelte';
	import { copyToClipboard } from '$lib/utils/clipboard';

	let {
		branchName,
		prTitle,
		commitMessage,
		description
	}: {
		branchName: string;
		prTitle: string;
		commitMessage: string;
		description: string;
	} = $props();

	let copied = $state(false);

	async function handleCopy() {
		const text = [
			`Branch: ${branchName}`,
			`Title: ${prTitle}`,
			`Commit: ${commitMessage}`,
			'',
			'Description:',
			description
		].join('\n');

		const ok = await copyToClipboard(text);
		if (ok) {
			copied = true;
			setTimeout(() => (copied = false), 2000);
		}
	}

	let hasContent = $derived(branchName || prTitle || commitMessage);
</script>

{#if hasContent}
	<button
		type="button"
		onclick={handleCopy}
		class="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
		title="Copy all outputs (⌘+Shift+C)"
	>
		{#if copied}
			<Check class="size-3.5 text-green-500" />
			Copied!
		{:else}
			<ClipboardList class="size-3.5" />
			Copy All
		{/if}
	</button>
{/if}
