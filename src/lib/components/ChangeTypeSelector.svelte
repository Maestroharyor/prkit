<script lang="ts">
	import { CHANGE_TYPES } from '$lib/data/change-types';
	import type { ChangeTypeInfo } from '$lib/types';
	import SearchableSelect from './SearchableSelect.svelte';

	let {
		value = $bindable(),
		customTypes = [],
		onAddCustom
	}: {
		value: string;
		customTypes?: ChangeTypeInfo[];
		onAddCustom?: () => void;
	} = $props();

	let allTypes = $derived([...CHANGE_TYPES, ...customTypes]);

	let selectItems = $derived(
		allTypes.map((ct) => ({
			value: ct.type,
			label: ct.label,
			badge: ct.type,
			color: ct.color
		}))
	);
</script>

<div class="space-y-1">
	<span class="text-sm font-medium text-zinc-600 dark:text-zinc-400">Change type</span>
	<SearchableSelect
		items={selectItems}
		bind:value
		placeholder="Select type..."
		onAdd={onAddCustom}
	/>
</div>
