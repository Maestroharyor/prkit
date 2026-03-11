<script lang="ts">
	import { Dialog } from '@skeletonlabs/skeleton-svelte';
	import { X } from 'lucide-svelte';

	let {
		open = $bindable(false)
	}: {
		open: boolean;
	} = $props();

	const shortcuts = [
		{ keys: ['⌘', 'Shift', 'C'], description: 'Copy all outputs' },
		{ keys: ['⌘', 'D'], description: 'Toggle dark mode' },
		{ keys: ['?'], description: 'Show keyboard shortcuts' },
		{ keys: ['H'], description: 'Toggle history sidebar' }
	];
</script>

<Dialog
	{open}
	onOpenChange={(details: { open: boolean }) => (open = details.open)}
	closeOnInteractOutside={true}
	closeOnEscape={true}
>
	<Dialog.Backdrop class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
	<Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center p-4">
		<Dialog.Content
			class="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
		>
			<div class="mb-4 flex items-center justify-between">
				<Dialog.Title class="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
					>Keyboard Shortcuts</Dialog.Title
				>
				<Dialog.CloseTrigger
					class="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
				>
					<X class="size-4" />
				</Dialog.CloseTrigger>
			</div>

			<div class="space-y-3">
				{#each shortcuts as shortcut (shortcut.description)}
					<div class="flex items-center justify-between">
						<span class="text-sm text-zinc-600 dark:text-zinc-400">{shortcut.description}</span>
						<div class="flex items-center gap-1">
							{#each shortcut.keys as key (key)}
								<kbd
									class="inline-flex min-w-[1.5rem] items-center justify-center rounded border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 text-xs font-medium text-zinc-700 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
								>
									{key}
								</kbd>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</Dialog.Content>
	</Dialog.Positioner>
</Dialog>
