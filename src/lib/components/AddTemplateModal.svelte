<script lang="ts">
	import { Dialog } from '@skeletonlabs/skeleton-svelte';
	import { X } from 'lucide-svelte';

	let {
		open = $bindable(false),
		onSave
	}: {
		open: boolean;
		onSave: (name: string, content: string) => void;
	} = $props();

	let name = $state('');
	let content = $state(
		'## Summary\n\n{{TITLE}}\n\n## Changes\n\n-\n\n## Related Issue\n\n{{TICKET_ID}}\nLink: {{LINK}}'
	);

	function handleSave() {
		if (!name.trim()) return;
		onSave(name.trim(), content);
		name = '';
		content =
			'## Summary\n\n{{TITLE}}\n\n## Changes\n\n-\n\n## Related Issue\n\n{{TICKET_ID}}\nLink: {{LINK}}';
		open = false;
	}

	function handleCancel() {
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
			class="w-full max-w-lg rounded-xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
		>
			<div class="mb-4 flex items-center justify-between">
				<Dialog.Title class="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
					>New Template</Dialog.Title
				>
				<Dialog.CloseTrigger
					class="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
				>
					<X class="size-4" />
				</Dialog.CloseTrigger>
			</div>

			<div class="space-y-4">
				<div class="space-y-1">
					<label for="template-name" class="text-sm font-medium text-zinc-600 dark:text-zinc-400"
						>Template name</label
					>
					<input
						id="template-name"
						type="text"
						bind:value={name}
						placeholder="e.g. My Team Template"
						class="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 placeholder-zinc-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:placeholder-zinc-500"
					/>
				</div>

				<div class="space-y-1">
					<label for="template-content" class="text-sm font-medium text-zinc-600 dark:text-zinc-400"
						>Template content</label
					>
					<p class="text-xs text-zinc-400 dark:text-zinc-500">
						Use placeholders: <code class="rounded bg-zinc-100 px-1 dark:bg-zinc-800"
							>{'{{TITLE}}'}</code
						>,
						<code class="rounded bg-zinc-100 px-1 dark:bg-zinc-800">{'{{TICKET_ID}}'}</code>,
						<code class="rounded bg-zinc-100 px-1 dark:bg-zinc-800">{'{{CHANGE_TYPE}}'}</code>,
						<code class="rounded bg-zinc-100 px-1 dark:bg-zinc-800">{'{{BRANCH}}'}</code>,
						<code class="rounded bg-zinc-100 px-1 dark:bg-zinc-800">{'{{LINK}}'}</code>
					</p>
					<textarea
						id="template-content"
						bind:value={content}
						rows={10}
						class="w-full resize-none rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm text-zinc-800 placeholder-zinc-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:placeholder-zinc-500"
					></textarea>
				</div>
			</div>

			<div class="mt-6 flex justify-end gap-2">
				<button
					type="button"
					onclick={handleCancel}
					class="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
				>
					Cancel
				</button>
				<button
					type="button"
					onclick={handleSave}
					disabled={!name.trim()}
					class="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
				>
					Create Template
				</button>
			</div>
		</Dialog.Content>
	</Dialog.Positioner>
</Dialog>
