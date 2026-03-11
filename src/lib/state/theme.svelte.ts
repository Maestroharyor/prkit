import { MediaQuery } from 'svelte/reactivity';
import { loadFromStorage, saveToStorage } from '$lib/utils/local-storage.svelte';

export type Theme = 'light' | 'dark' | 'system';

const prefersDark = new MediaQuery('prefers-color-scheme: dark', false);

function createThemeState() {
	let theme = $state<Theme>(loadFromStorage('theme', 'system' as Theme));

	const resolved = $derived(theme === 'system' ? (prefersDark.current ? 'dark' : 'light') : theme);

	return {
		get theme() {
			return theme;
		},
		set theme(v: Theme) {
			theme = v;
			saveToStorage('theme', v);
		},
		get resolved() {
			return resolved;
		},
		toggle() {
			this.theme = resolved === 'dark' ? 'light' : 'dark';
		}
	};
}

export const themeState = createThemeState();
