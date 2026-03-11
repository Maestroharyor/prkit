<script lang="ts">
	import { appState } from '$lib/state/app-state.svelte';
	import { themeState } from '$lib/state/theme.svelte';
	import { parseTicket } from '$lib/utils/ticket-parser';
	import { generateBranchName } from '$lib/utils/branch-name';
	import { generatePrTitle } from '$lib/utils/pr-title';
	import { generateCommitMessage } from '$lib/utils/commit-message';
	import { generatePrDescription } from '$lib/utils/pr-description';
	import { detectChangeType } from '$lib/utils/auto-detect-type';
	import { copyToClipboard } from '$lib/utils/clipboard';
	import { loadFromStorage, saveToStorage } from '$lib/utils/local-storage.svelte';

	import AppHeader from '$lib/components/AppHeader.svelte';
	import IssueInput from '$lib/components/IssueInput.svelte';
	import ChangeTypeSelector from '$lib/components/ChangeTypeSelector.svelte';
	import BranchPresetSelector from '$lib/components/BranchPresetSelector.svelte';
	import OutputField from '$lib/components/OutputField.svelte';
	import TemplateSelector from '$lib/components/TemplateSelector.svelte';
	import MarkdownEditor from '$lib/components/MarkdownEditor.svelte';
	import MarkdownPreview from '$lib/components/MarkdownPreview.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import CopyAllButton from '$lib/components/CopyAllButton.svelte';
	import AddTemplateModal from '$lib/components/AddTemplateModal.svelte';
	import AddCustomTypeModal from '$lib/components/AddCustomTypeModal.svelte';
	import KeyboardShortcutsModal from '$lib/components/KeyboardShortcutsModal.svelte';
	import HistoryPanel from '$lib/components/HistoryPanel.svelte';
	import { FileInput, FileOutput, Check, Clock } from 'lucide-svelte';
	import type { HistoryEntry } from '$lib/types';

	let parsedIssue = $derived(parseTicket(appState.issueText));

	// Generated values (auto-computed)
	let generatedBranch = $derived(
		parsedIssue.title
			? generateBranchName({
					changeType: appState.changeType,
					parsedIssue,
					preset: appState.branchPreset,
					customPattern: appState.customBranchPattern
				})
			: ''
	);

	let generatedTitle = $derived(
		parsedIssue.title ? generatePrTitle(appState.changeType, parsedIssue) : ''
	);

	let generatedCommit = $derived(
		parsedIssue.title
			? generateCommitMessage({
					changeType: appState.changeType,
					parsedIssue,
					scope: appState.scope
				})
			: ''
	);

	let generatedDescription = $derived(
		parsedIssue.title
			? generatePrDescription({
					template: appState.selectedTemplate.content,
					parsedIssue,
					changeType: appState.changeType,
					branchName: generatedBranch,
					issueLink: appState.issueLink
				})
			: appState.selectedTemplate.content
	);

	// Editable output values (user can override)
	let branchValue = $state('');
	let titleValue = $state('');
	let commitValue = $state('');
	let displayDescription = $state('');

	// Sync generated values to editable values when inputs change
	let lastInputKey = $state('');
	$effect(() => {
		const key = `${appState.issueText}::${appState.changeType}::${appState.branchPreset}::${appState.customBranchPattern}::${appState.scope}::${appState.selectedTemplateId}::${appState.issueLink}`;
		if (key !== lastInputKey) {
			lastInputKey = key;
			branchValue = generatedBranch;
			titleValue = generatedTitle;
			commitValue = generatedCommit;
			displayDescription = generatedDescription;
		}
	});

	// Auto-detect change type from issue text
	let userManuallySelectedType = $state(false);
	let lastAutoDetectText = $state('');

	$effect(() => {
		const text = appState.issueText;
		if (!userManuallySelectedType && text !== lastAutoDetectText) {
			lastAutoDetectText = text;
			const detected = detectChangeType(text);
			if (detected) {
				appState.changeType = detected;
			}
		}
	});

	// Save to history when generating outputs
	let lastHistoryKey = $state('');
	$effect(() => {
		if (parsedIssue.title && generatedBranch) {
			const historyKey = `${appState.issueText}::${appState.changeType}`;
			if (historyKey !== lastHistoryKey) {
				lastHistoryKey = historyKey;
				appState.addToHistory({
					issueText: appState.issueText,
					issueLink: appState.issueLink,
					changeType: appState.changeType,
					branchName: generatedBranch,
					prTitle: generatedTitle,
					commitMessage: generatedCommit
				});
			}
		}
	});

	function handleDescriptionChange(newVal: string) {
		displayDescription = newVal;
	}

	// Modal states
	let showAddTemplate = $state(false);
	let showAddCustomType = $state(false);
	let showShortcutsModal = $state(false);

	// Sidebar state
	let sidebarOpen = $state(loadFromStorage('sidebarOpen', false));

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
		saveToStorage('sidebarOpen', sidebarOpen);
	}

	// Toast state
	let toastMessage = $state('');
	let toastVisible = $state(false);

	function showToast(message: string) {
		toastMessage = message;
		toastVisible = true;
		setTimeout(() => (toastVisible = false), 2000);
	}

	function handleSaveTemplate(name: string, content: string) {
		appState.addCustomTemplate(name, content);
	}

	function handleDeleteTemplate(id: string) {
		if (confirm('Delete this custom template?')) {
			appState.deleteCustomTemplate(id);
		}
	}

	function handleAddCustomType(label: string, color: string) {
		appState.addCustomChangeType(label, color);
	}

	function handleExportTemplates() {
		const json = appState.exportTemplates();
		const blob = new Blob([json], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'prkit-templates.json';
		a.click();
		URL.revokeObjectURL(url);
		showToast('Templates exported');
	}

	function handleImportTemplates(json: string) {
		appState.importTemplates(json);
		showToast('Templates imported');
	}

	function handleRestoreHistory(entry: HistoryEntry) {
		appState.issueText = entry.issueText;
		appState.issueLink = entry.issueLink ?? '';
		appState.changeType = entry.changeType;
		userManuallySelectedType = true;
	}

	async function copyAll() {
		const text = [
			`Branch: ${branchValue}`,
			`Title: ${titleValue}`,
			`Commit: ${commitValue}`,
			'',
			'Description:',
			displayDescription
		].join('\n');

		const ok = await copyToClipboard(text);
		if (ok) {
			showToast('All outputs copied');
		}
	}

	// Keyboard shortcuts
	function handleKeydown(e: KeyboardEvent) {
		const target = e.target as HTMLElement;
		const isInput =
			target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

		// Cmd+Shift+C — copy all
		if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'C') {
			e.preventDefault();
			copyAll();
			return;
		}

		// Cmd+D — toggle dark mode
		if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
			e.preventDefault();
			themeState.toggle();
			return;
		}

		// ? — open keyboard shortcuts (when not in input)
		if (e.key === '?' && !isInput) {
			e.preventDefault();
			showShortcutsModal = true;
			return;
		}

		// H — toggle history sidebar (when not in input)
		if (e.key === 'h' && !isInput) {
			e.preventDefault();
			toggleSidebar();
		}
	}

	let hasOutputs = $derived(
		generatedBranch !== '' || generatedTitle !== '' || generatedCommit !== ''
	);
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="flex min-h-screen">
	<!-- Sidebar backdrop (mobile) -->
	{#if sidebarOpen}
		<button
			type="button"
			class="fixed inset-0 z-30 bg-black/30 lg:hidden"
			onclick={() => {
				sidebarOpen = false;
				saveToStorage('sidebarOpen', false);
			}}
			aria-label="Close sidebar"
		></button>
	{/if}

	<!-- Left sidebar -->
	{#if sidebarOpen}
		<aside
			class="animate-slide-in fixed inset-y-0 left-0 z-40 bg-white lg:sticky lg:top-0 lg:z-auto lg:h-screen dark:bg-zinc-900"
		>
			<HistoryPanel
				history={appState.history}
				customTypes={appState.customChangeTypes}
				onRestore={handleRestoreHistory}
				onClear={() => appState.clearHistory()}
				onClose={() => {
					sidebarOpen = false;
					saveToStorage('sidebarOpen', false);
				}}
			/>
		</aside>
	{/if}

	<!-- Main content -->
	<div class="min-w-0 flex-1">
		<div class="mx-auto max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
			<div class="flex items-center gap-3">
				<button
					type="button"
					onclick={toggleSidebar}
					class="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
					title="Toggle history (H)"
				>
					<Clock class="size-5" />
				</button>
				<div class="flex-1">
					<AppHeader />
				</div>
			</div>

			<div class="grid gap-6 lg:grid-cols-2">
				<!-- Left column: Input -->
				<div
					class="space-y-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
				>
					<div
						class="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300"
					>
						<FileInput class="size-4" />
						Inputs
					</div>

					<IssueInput bind:value={appState.issueText} bind:link={appState.issueLink} />

					<ChangeTypeSelector
						bind:value={appState.changeType}
						customTypes={appState.customChangeTypes}
						onAddCustom={() => (showAddCustomType = true)}
					/>

					<div class="grid gap-4 sm:grid-cols-2">
						<BranchPresetSelector
							bind:value={appState.branchPreset}
							bind:customPattern={appState.customBranchPattern}
						/>
						<div class="space-y-1">
							<label for="scope" class="text-sm font-medium text-zinc-600 dark:text-zinc-400"
								>Scope (optional)</label
							>
							<input
								id="scope"
								type="text"
								bind:value={appState.scope}
								placeholder="e.g. payment, auth"
								class="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-800 placeholder-zinc-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200 dark:placeholder-zinc-500"
							/>
						</div>
					</div>
				</div>

				<!-- Right column: Generated outputs -->
				<div
					class="space-y-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
				>
					<div class="flex items-center justify-between">
						<div
							class="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300"
						>
							<FileOutput class="size-4" />
							Generated Outputs
						</div>
						<CopyAllButton
							branchName={branchValue}
							prTitle={titleValue}
							commitMessage={commitValue}
							description={displayDescription}
						/>
					</div>

					{#if hasOutputs}
						<div class="animate-fade-in space-y-4">
							<OutputField
								label="Branch name"
								bind:value={branchValue}
								generatedValue={generatedBranch}
							/>
							<OutputField
								label="PR title"
								bind:value={titleValue}
								generatedValue={generatedTitle}
							/>
							<OutputField
								label="Commit message"
								bind:value={commitValue}
								generatedValue={generatedCommit}
								multiline
							/>
						</div>
					{:else}
						<div class="flex flex-col items-center justify-center py-12 text-center">
							<p class="text-sm text-zinc-400 dark:text-zinc-500">
								Enter an issue description to generate outputs
							</p>
						</div>
					{/if}
				</div>
			</div>

			<!-- PR Description section -->
			<div
				class="space-y-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
			>
				<div class="flex items-end justify-between gap-4">
					<div class="flex-1">
						<TemplateSelector
							templates={appState.allTemplates}
							bind:selectedId={appState.selectedTemplateId}
							onAdd={() => (showAddTemplate = true)}
							onDelete={handleDeleteTemplate}
							onExport={appState.customTemplates.length > 0 ? handleExportTemplates : undefined}
							onImport={handleImportTemplates}
						/>
					</div>
					<CopyButton text={displayDescription} />
				</div>

				<div class="grid min-h-[300px] gap-4 md:grid-cols-2">
					<MarkdownEditor
						value={displayDescription}
						oninput={(e) => handleDescriptionChange((e.target as HTMLTextAreaElement).value)}
					/>
					<MarkdownPreview markdown={displayDescription} />
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Modals -->
<AddTemplateModal bind:open={showAddTemplate} onSave={handleSaveTemplate} />
<AddCustomTypeModal bind:open={showAddCustomType} onSave={handleAddCustomType} />
<KeyboardShortcutsModal bind:open={showShortcutsModal} />

<!-- Toast notification -->
{#if toastVisible}
	<div
		class="animate-fade-in fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
	>
		<Check class="size-4 text-green-500" />
		<span class="text-sm text-zinc-700 dark:text-zinc-300">{toastMessage}</span>
	</div>
{/if}
