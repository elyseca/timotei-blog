<script lang="ts">
	import { S, byId, allRecipes } from '$lib/recipes/store.svelte';
	import { buildPlans, proteinOf } from '$lib/recipes/engine';
	import { choosePlan, toggleExclude, toggleFilter } from '$lib/recipes/plan';
	import type { Recipe } from '$lib/recipes/types';
	import Controls from './Controls.svelte';

	const MEATS = ['Chicken', 'Turkey', 'Beef', 'Pork', 'Fish'];

	// Suggested plans. The rules live in engine.ts (buildPlans): never three soups or stews, plus these filters.
	const plans = $derived(
		buildPlans(allRecipes(), S.perPlan, S.shuffle, {
			exclude: [...S.filters.exclude],
			plant: S.filters.plant,
			fresh: S.filters.fresh
		}) as { name: string; why: string; ids: string[]; shared: string[] }[]
	);
	const short = $derived(plans.length > 0 && plans[0].ids.length < S.perPlan);
	const accents = ['bg-mustard', 'bg-blue text-cream', 'bg-teal'];
</script>

<section class="mx-auto max-w-6xl px-5 pt-12 md:px-8">
	<div class="brutal-box bg-white p-6">
		<Controls withCount={true} />
		<div class="mt-5 flex flex-wrap gap-2" role="group" aria-label="Plan filters">
			{#each MEATS as m (m)}
				<button
					type="button"
					class="brutal-chip"
					aria-pressed={S.filters.exclude.includes(m)}
					onclick={() => toggleExclude(m)}
				>
					No {m.toLowerCase()}
				</button>
			{/each}
			<button
				type="button"
				class="brutal-chip"
				aria-pressed={S.filters.plant}
				onclick={() => toggleFilter('plant')}>Plant-based</button
			>
			<button
				type="button"
				class="brutal-chip"
				aria-pressed={S.filters.fresh}
				onclick={() => toggleFilter('fresh')}>Fresh ingredients only</button
			>
		</div>
		<p class="mt-3 text-xs text-ink/60">
			Plans never include three soups or stews. Fresh ingredients means no frozen items.
		</p>
	</div>
</section>

<section class="mx-auto max-w-6xl px-5 py-12 md:px-8">
	<h2 class="font-display text-3xl font-black">Pick a plan</h2>
	{#if plans.length}
		{#if short}
			<p class="mt-3 font-mono text-xs font-bold text-ink/70 uppercase">
				Only {plans[0].ids.length}
				{plans[0].ids.length === 1 ? 'recipe matches' : 'recipes match'} these filters.
			</p>
		{/if}
		<div class="mt-6 grid gap-6 md:grid-cols-3">
			{#each plans as p, i (p.ids.join('|'))}
				<article class="brutal-box reveal flex flex-col overflow-hidden bg-white">
					<div class="border-b-[2.5px] border-ink p-5 {accents[i % accents.length]}">
						<h3 class="font-display text-xl font-black">{p.name}</h3>
						<p class="mt-1 text-sm opacity-85">{p.why}</p>
					</div>
					<ol class="flex flex-1 flex-col gap-3 p-5">
						{#each p.ids.map(byId).filter((r): r is Recipe => !!r) as r (r.id)}
							<li>
								<a
									href="/recipes/view#{r.id}"
									class="font-display text-lg font-black underline decoration-2 underline-offset-4"
								>
									{r.title}
								</a>
								<p class="font-mono text-xs font-bold tracking-wide text-ink/60 uppercase">
									{proteinOf(r)}{r.freezer ? ' · freezes well' : ''}
								</p>
							</li>
						{/each}
					</ol>
					<div class="flex flex-col gap-3 border-t-[2.5px] border-ink bg-cream-2 p-5">
						{#if p.shared.length}
							<p class="text-xs text-ink/70">Shared ingredients: {p.shared.join(', ')}</p>
						{/if}
						<button
							type="button"
							class="brutal-btn justify-center"
							onclick={() => choosePlan(p.ids)}
						>
							Use this plan
						</button>
					</div>
				</article>
			{/each}
		</div>
	{:else}
		<div class="brutal-box mt-6 bg-white p-10 text-center text-ink/60">
			<p class="font-mono text-sm uppercase">No recipes match these filters. Try removing one.</p>
		</div>
	{/if}
	<div class="mt-8 flex flex-wrap items-center gap-4">
		<button type="button" class="brutal-btn bg-white" onclick={() => S.shuffle++}>
			Show different options
		</button>
		<a
			href="/recipes"
			class="font-mono text-sm font-bold tracking-wide uppercase underline decoration-2 underline-offset-4"
		>
			Or browse recipes
		</a>
	</div>
</section>
