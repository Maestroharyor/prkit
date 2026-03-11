<script lang="ts">
	import { Ticket, Link2 } from 'lucide-svelte';
	import { parseTicket } from '$lib/utils/ticket-parser';

	let { value = $bindable(), link = $bindable() }: { value: string; link: string } = $props();

	let parsed = $derived(parseTicket(value));
</script>

<div class="space-y-3">
	<div class="space-y-1">
		<label for="issue-input" class="text-sm font-medium text-zinc-600 dark:text-zinc-400"
			>Ticket title</label
		>
		<input
			id="issue-input"
			type="text"
			bind:value
			placeholder="e.g. ENG-245 Fix payment retry issue"
			class="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-800 placeholder-zinc-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200 dark:placeholder-zinc-500"
		/>
		{#if parsed.ticketId}
			<div class="flex items-center gap-1.5">
				<Ticket class="size-3.5 text-indigo-600 dark:text-indigo-400" />
				<span
					class="rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300"
					>{parsed.ticketId}</span
				>
			</div>
		{/if}
	</div>

	<div class="space-y-1">
		<label for="issue-link" class="text-sm font-medium text-zinc-600 dark:text-zinc-400"
			>Card / Issue link</label
		>
		<div class="relative">
			<div
				class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 dark:text-zinc-500"
			>
				<Link2 class="size-3.5" />
			</div>
			<input
				id="issue-link"
				type="url"
				bind:value={link}
				placeholder="e.g. https://linear.app/team/ENG-245"
				class="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pr-3 pl-9 text-sm text-zinc-800 placeholder-zinc-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200 dark:placeholder-zinc-500"
			/>
		</div>
	</div>
</div>
