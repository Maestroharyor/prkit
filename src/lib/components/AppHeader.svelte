<script lang="ts">
	import { GitBranch, Moon, Sun } from 'lucide-svelte';
	import { Switch } from '@skeletonlabs/skeleton-svelte';
	import { themeState } from '$lib/state/theme.svelte';
</script>

<header class="flex items-center gap-3 border-b border-zinc-200 pb-4 dark:border-zinc-800">
	<div
		class="flex items-center justify-center rounded-lg bg-indigo-500/15 p-2 dark:bg-indigo-500/20"
	>
		<GitBranch class="size-5 text-indigo-600 dark:text-indigo-400" />
	</div>
	<div class="flex-1">
		<h1 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100">prkit</h1>
		<p class="text-sm text-zinc-500">Generate branch names, PR titles, commits & descriptions</p>
	</div>
	<div class="flex items-center gap-2">
		<Sun class="size-4 text-zinc-400 dark:text-zinc-500" />
		<Switch
			checked={themeState.resolved === 'dark'}
			onCheckedChange={(details: { checked: boolean }) => {
				themeState.theme = details.checked ? 'dark' : 'light';
			}}
		>
			<Switch.Control
				class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-zinc-300 transition-colors dark:bg-indigo-500"
			>
				<Switch.Thumb
					class="pointer-events-none block size-5 rounded-full bg-white shadow-sm ring-0 transition-transform {themeState.resolved ===
					'dark'
						? 'translate-x-5'
						: 'translate-x-0'}"
				/>
			</Switch.Control>
			<Switch.HiddenInput />
		</Switch>
		<Moon class="size-4 text-zinc-400 dark:text-zinc-300" />
	</div>
</header>
