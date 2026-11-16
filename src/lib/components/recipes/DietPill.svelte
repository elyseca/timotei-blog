<script lang="ts">
	import { DIETS } from '$lib/recipes/engine';
	import { t } from '$lib/i18n.svelte';

	// A coloured dietary pill. With `onclick` it is a filter chip; without, a small tag.
	let {
		k,
		pressed = false,
		onclick
	}: { k: string; pressed?: boolean; onclick?: () => void } = $props();
	const d = $derived(DIETS.find((x) => x.key === k)!);
</script>

{#if onclick}
	<button
		type="button"
		class="brutal-chip"
		data-diet={k}
		style="--diet:var(--color-{d.color})"
		aria-pressed={pressed}
		{onclick}>{t(d.label)}</button
	>
{:else}
	<span class="brutal-tag diet-pill" style="--diet:var(--color-{d.color})">{t(d.label)}</span>
{/if}
