<script lang="ts">
	import { onMount } from 'svelte';
	import { ui, hydrate, persist } from '$lib/recipes/store.svelte';
	import { ensureSched } from '$lib/recipes/plan';
	import RecipeTabs from '$lib/components/recipes/RecipeTabs.svelte';

	let { children } = $props();

	// Saved plans and recipes live in this browser only. Load them after the page has mounted.
	onMount(() => {
		hydrate();
		ensureSched();
	});

	$effect(() => {
		persist();
	});
</script>

<RecipeTabs />
{@render children()}

<div
	class="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-5 transition-[opacity,translate] duration-200 {ui.toast
		? 'translate-y-0 opacity-100'
		: 'translate-y-3 opacity-0'}"
	role="status"
	aria-live="polite"
>
	<span class="brutal-box bg-ink px-4 py-2 font-mono text-sm font-bold text-cream">{ui.toast}</span>
</div>
