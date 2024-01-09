import { writable } from 'svelte/store';
export let loadedAssetsNumber = writable(0)
export let netData = writable()
export let net = writable()