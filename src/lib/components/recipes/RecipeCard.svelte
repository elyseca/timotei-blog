<script lang="ts">
	import { S, ui } from '$lib/recipes/store.svelte';
	import { togglePlan } from '$lib/recipes/plan';
	import type { Recipe } from '$lib/recipes/types';
	import EffortBadge from './EffortBadge.svelte';
	import { diet, DIET_LABEL } from '$lib/recipes/engine';

	let { r }: { r: Recipe } = $props();
	// Proteins, veggies and carbs are built into a meal; everything else goes straight to the plan.
	const builds = $derived(['Protein', 'Side', 'Carb'].includes(r.kind ?? ''));
	const dt = $derived(diet(r));
	const inPlan = $derived(S.plan.some((p) => p.id === r.id));
	const note = $derived(
		[r.freezer ? 'Freezes' : '', r.by && r.by !== 'Elyse' ? r.by : ''].filter(Boolean).join(' · ')
	);
</script>

<article
	class="brutal-box reveal flex flex-col overflow-hidden transition-[translate,box-shadow] duration-200 ease-out hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard-lg"
>
	<a href="/recipes/view#{r.id}" class="flex flex-1 flex-col gap-2 p-5">
		<h3 class="font-display text-xl font-black">{r.title}</h3>
		{#if r.blurb}<p class="line-clamp-3 flex-1 text-sm text-ink/75">{r.blurb}</p>{:else}<span
				class="flex-1"
			></span>{/if}
		{#if r.mins}<EffortBadge {r} />{/if}
		<div class="flex flex-wrap gap-1.5">
			{#each ['gf', 'nf', 'df'] as k (k)}
				{#if dt[k as 'gf' | 'nf' | 'df']}<span class="brutal-tag bg-lime"
						>{DIET_LABEL[k as 'gf' | 'nf' | 'df']}</span
					>{/if}
			{/each}
		</div>
	</a>
	<div
		class="flex items-center justify-between gap-3 border-t-[2.5px] border-ink bg-cream-2 px-5 py-3"
	>
		<span class="font-mono text-xs font-bold tracking-wide text-ink/60 uppercase">
			{note}
		</span>
		{#if builds}
			<button type="button" class="brutal-chip" onclick={() => (ui.comboFrom = r.id)}
				>+ Build</button
			>
		{:else}
			<button
				type="button"
				class="brutal-chip"
				aria-pressed={inPlan}
				onclick={() => togglePlan(r.id)}
			>
				{inPlan ? '✓ In plan' : '+ Plan'}
			</button>
		{/if}
	</div>
</article>
