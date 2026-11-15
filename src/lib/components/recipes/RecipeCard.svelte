<script lang="ts">
	import { S, ui } from '$lib/recipes/store.svelte';
	import { togglePlan } from '$lib/recipes/plan';
	import type { Recipe } from '$lib/recipes/types';
	import EffortBadge from './EffortBadge.svelte';
	import DietDot from './DietDot.svelte';
	import { diet, DIETS, swapRecipe } from '$lib/recipes/engine';

	let { r }: { r: Recipe } = $props();
	// Proteins, veggies and carbs are built into a meal; everything else goes straight to the plan.
	const builds = $derived(['Protein', 'Side', 'Carb'].includes(r.kind ?? ''));
	const sr = $derived(swapRecipe(r, S.filters));
	const dt = $derived(diet(sr));
	const inPlan = $derived(S.plan.some((p) => p.id === r.id));
	const note = $derived(
		[r.freezer ? 'Freezes' : '', r.by && r.by !== 'Elyse' ? r.by : ''].filter(Boolean).join(' · ')
	);
</script>

<article
	class="brutal-box reveal flex flex-col overflow-hidden transition-[translate,box-shadow] duration-200 ease-out hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard-lg"
>
	<a href="/recipes/view#{r.id}" class="flex flex-1 flex-col gap-1.5 p-4">
		<h3 class="font-display text-xl font-black">{r.title}</h3>
		{#if r.blurb}<p class="line-clamp-3 flex-1 text-sm text-ink/75">{r.blurb}</p>{:else}<span
				class="flex-1"
			></span>{/if}
		{#if r.mins}<EffortBadge {r} />{/if}
	</a>
	<div
		class="flex items-center justify-between gap-3 border-t-[2.5px] border-ink bg-cream-2 px-4 py-2"
	>
		<span class="flex min-w-0 items-center gap-2">
			<span class="flex gap-1">
				{#each DIETS.filter((x) => dt[x.key as keyof typeof dt]) as x (x.key)}<DietDot
						k={x.key}
					/>{/each}
			</span>
			<span class="truncate font-mono text-xs font-bold tracking-wide text-ink/60 uppercase">
				{note}
			</span>
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
