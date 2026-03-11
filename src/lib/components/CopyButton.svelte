<script lang="ts">
	import { Check, Copy } from 'lucide-svelte';
	import { copyToClipboard } from '$lib/utils/clipboard';

	let { text }: { text: string } = $props();

	let copied = $state(false);

	async function handleCopy() {
		const ok = await copyToClipboard(text);
		if (ok) {
			copied = true;
			setTimeout(() => (copied = false), 2000);
		}
	}
</script>

<button
	onclick={handleCopy}
	class="inline-flex shrink-0 cursor-pointer items-center rounded p-1.5 text-zinc-400 transition-colors hover:bg-zinc-200 hover:text-zinc-600 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
	title="Copy to clipboard"
	type="button"
>
	{#if copied}
		<Check class="size-4 text-green-500" />
	{:else}
		<Copy class="size-4" />
	{/if}
</button>
