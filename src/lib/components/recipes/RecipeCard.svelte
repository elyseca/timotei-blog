<script lang="ts">
	import { S, ui } from '$lib/recipes/store.svelte';
	import { togglePlan } from '$lib/recipes/plan';
	import type { Recipe } from '$lib/recipes/types';
	import EffortBadge from './EffortBadge.svelte';
	import DietDot from './DietDot.svelte';
	import { diet, DIETS, swapRecipe } from '$lib/recipes/engine';
	import { t } from '$lib/i18n.svelte';
	import { localize, tTitle } from '$lib/recipes/localize';

	let { r, versions = 0 }: { r: Recipe; versions?: number } = $props();
	// Proteins, veggies and carbs are built into a meal; everything else goes straight to the plan.
	const builds = $derived(['Protein', 'Side', 'Carb'].includes(r.kind ?? ''));
	const sr = $derived(swapRecipe(r, S.filters));
	const dt = $derived(diet(sr));
	const blurb = $derived(localize(r).blurb);
	const inPlan = $derived(S.plan.some((p) => p.id === r.id));
</script>

<article
	class="brutal-box reveal flex flex-col overflow-hidden transition-[translate,box-shadow] duration-200 ease-out hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard-lg"
>
	<a href="/recipes/view#{r.id}" class="flex flex-1 flex-col gap-1.5 p-4">
		<h3 class="font-display text-xl font-black">{tTitle(r)}</h3>
		{#if versions > 1}
			<span
				class="inline-flex w-fit items-center gap-1 rounded-md border-2 border-ink bg-mustard px-1.5 py-0.5 font-mono text-[0.65rem] font-bold tracking-wide uppercase"
				title={t('Pick a version inside')}
			>
				<svg
					viewBox="0 0 16 16"
					class="size-3"
					fill="none"
					stroke="currentColor"
					stroke-width="1.8"
					aria-hidden="true"
					><rect x="5.5" y="1.5" width="9" height="9" rx="1.5" /><path
						d="M3.5 5.5h-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-1"
					/></svg
				>
				{t('{n} versions', { n: versions })}
			</span>
		{/if}
		{#if blurb}<p class="line-clamp-2 flex-1 text-sm text-ink/75 md:line-clamp-3">
				{blurb}
			</p>{:else}<span class="flex-1"></span>{/if}
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
				{r.freezer ? t('Freezes') : ''}
			</span>
		</span>
		{#if builds}
			<button type="button" class="brutal-chip" onclick={() => (ui.comboFrom = r.id)}
				>{t('+ Build')}</button
			>
		{:else}
			<button
				type="button"
				class="brutal-chip"
				aria-pressed={inPlan}
				onclick={() => togglePlan(r.id)}
			>
				{inPlan ? t('✓ In plan') : t('+ Plan')}
			</button>
		{/if}
	</div>
</article>
