<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { themeState } from '$lib/state/theme.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class={themeState.resolved === 'dark' ? 'dark' : ''}>
	<main class="min-h-screen bg-zinc-50 dark:bg-zinc-900">
		{@render children()}
	</main>
</div>
