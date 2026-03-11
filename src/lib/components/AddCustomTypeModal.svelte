<script lang="ts">
	import { Dialog } from '@skeletonlabs/skeleton-svelte';
	import { X } from 'lucide-svelte';

	let {
		open = $bindable(false),
		onSave
	}: {
		open: boolean;
		onSave: (label: string, color: string) => void;
	} = $props();

	let label = $state('');
	let color = $state('indigo');

	const COLORS = [
		{ value: 'green', label: 'Green' },
		{ value: 'red', label: 'Red' },
		{ value: 'amber', label: 'Amber' },
		{ value: 'blue', label: 'Blue' },
		{ value: 'zinc', label: 'Zinc' },
		{ value: 'purple', label: 'Purple' },
		{ value: 'orange', label: 'Orange' },
		{ value: 'pink', label: 'Pink' },
		{ value: 'indigo', label: 'Indigo' },
		{ value: 'teal', label: 'Teal' },
		{ value: 'cyan', label: 'Cyan' },
		{ value: 'yellow', label: 'Yellow' }
	];

	const COLOR_RING: Record<string, string> = {
		green: 'ring-green-500',
		red: 'ring-red-500',
		amber: 'ring-amber-500',
		blue: 'ring-blue-500',
		zinc: 'ring-zinc-500',
		purple: 'ring-purple-500',
		orange: 'ring-orange-500',
		pink: 'ring-pink-500',
		indigo: 'ring-indigo-500',
		teal: 'ring-teal-500',
		cyan: 'ring-cyan-500',
		yellow: 'ring-yellow-500'
	};

	const COLOR_BG: Record<string, string> = {
		green: 'bg-green-500',
		red: 'bg-red-500',
		amber: 'bg-amber-500',
		blue: 'bg-blue-500',
		zinc: 'bg-zinc-500',
		purple: 'bg-purple-500',
		orange: 'bg-orange-500',
		pink: 'bg-pink-500',
		indigo: 'bg-indigo-500',
		teal: 'bg-teal-500',
		cyan: 'bg-cyan-500',
		yellow: 'bg-yellow-500'
	};

	function handleSave() {
		if (!label.trim()) return;
		onSave(label.trim(), color);
		label = '';
		color = 'indigo';
		open = false;
	}
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
					>Add Custom Type</Dialog.Title
				>
				<Dialog.CloseTrigger
					class="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
				>
					<X class="size-4" />
				</Dialog.CloseTrigger>
			</div>

			<div class="space-y-4">
				<div class="space-y-1">
					<label for="type-label" class="text-sm font-medium text-zinc-600 dark:text-zinc-400"
						>Type name</label
					>
					<input
						id="type-label"
						type="text"
						bind:value={label}
						placeholder="e.g. ci, build, revert"
						class="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 placeholder-zinc-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:placeholder-zinc-500"
					/>
				</div>

				<div class="space-y-1">
					<span class="text-sm font-medium text-zinc-600 dark:text-zinc-400">Color</span>
					<div class="flex flex-wrap gap-2">
						{#each COLORS as c (c.value)}
							<button
								type="button"
								onclick={() => (color = c.value)}
								class="size-7 rounded-full {COLOR_BG[c.value]} {color === c.value
									? `ring-2 ring-offset-2 ${COLOR_RING[c.value]} dark:ring-offset-zinc-900`
									: ''}"
								title={c.label}
							></button>
						{/each}
					</div>
				</div>
			</div>

			<div class="mt-6 flex justify-end gap-2">
				<button
					type="button"
					onclick={() => (open = false)}
					class="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
				>
					Cancel
				</button>
				<button
					type="button"
					onclick={handleSave}
					disabled={!label.trim()}
					class="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
				>
					Add Type
				</button>
			</div>
		</Dialog.Content>
	</Dialog.Positioner>
</Dialog>
