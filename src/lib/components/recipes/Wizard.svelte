<script lang="ts">
	import { S, byId, allRecipes } from '$lib/recipes/store.svelte';
	import { buildPlans, haveOptions, proteinOf, hasSpecial } from '$lib/recipes/engine';
	import {
		choosePlan,
		toggleExclude,
		toggleFilter,
		toggleHave,
		setOccasion
	} from '$lib/recipes/plan';
	import type { Recipe } from '$lib/recipes/types';
	import Controls from './Controls.svelte';
	import EffortBadge from './EffortBadge.svelte';

	const MEATS = ['Chicken', 'Turkey', 'Beef', 'Pork', 'Fish'];

	// Suggested plans. The rules live in engine.ts (buildPlans): never three soups or stews, plus these filters.
	const plans = $derived(
		buildPlans(allRecipes(), S.perPlan, S.shuffle, {
			exclude: [...S.filters.exclude],
			plant: S.filters.plant,
			fresh: S.filters.fresh,
			easy: S.filters.easy,
			occasion: S.filters.occasion,
			have: [...S.filters.have]
		}) as { name: string; why: string; ids: string[]; shared: string[]; uses: string[] }[]
	);
	// The everyday / special occasion switch appears once there are special-occasion recipes to plan from.
	const showOccasion = $derived(hasSpecial(allRecipes()));
	const short = $derived(plans.length > 0 && plans[0].ids.length < S.perPlan);
	// Ingredients already in the kitchen: plans lean towards recipes that use them.
	const options = $derived(haveOptions(allRecipes()) as string[]);
	let q = $state('');
	let open = $state(false);
	const found = $derived(
		options
			.filter((o) => !S.filters.have.includes(o) && o.includes(q.trim().toLowerCase()))
			.slice(0, 8)
	);
	function add(name: string) {
		toggleHave(name);
		q = '';
		open = false;
	}
	const accents = ['bg-mustard', 'bg-blue text-cream', 'bg-teal'];
</script>

<section class="mx-auto max-w-6xl px-5 pt-12 md:px-8">
	<div class="brutal-box bg-white p-6">
		<Controls withCount={true} />
		{#if showOccasion}
			<div class="mt-5 flex flex-wrap gap-2" role="group" aria-label="Occasion">
				<button
					type="button"
					class="brutal-chip"
					aria-pressed={S.filters.occasion === 'everyday'}
					onclick={() => setOccasion('everyday')}>Everyday</button
				>
				<button
					type="button"
					class="brutal-chip"
					aria-pressed={S.filters.occasion === 'special'}
					onclick={() => setOccasion('special')}>Special occasion</button
				>
			</div>
		{/if}
		<div class="mt-5 flex flex-wrap gap-2" role="group" aria-label="Plan filters">
			<button
				type="button"
				class="brutal-chip"
				aria-pressed={S.filters.easy}
				onclick={() => toggleFilter('easy')}>Quick &amp; easy</button
			>
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
		<div class="mt-5 flex flex-wrap items-center gap-2">
			<span class="font-mono text-xs font-bold tracking-wide uppercase">Have on hand</span>
			{#each S.filters.have as h (h)}
				<button type="button" class="brutal-chip" aria-pressed="true" onclick={() => toggleHave(h)}>
					{h} ×
				</button>
			{/each}
			<div class="relative">
				<input
					type="search"
					class="brutal-field w-56"
					placeholder="Search ingredients"
					aria-label="Search ingredients you have"
					autocomplete="off"
					bind:value={q}
					oninput={() => (open = true)}
					onfocus={() => (open = true)}
					onblur={() => (open = false)}
					onkeydown={(e) => {
						if (e.key === 'Enter' && found.length) {
							e.preventDefault();
							add(found[0]);
						}
					}}
				/>
				{#if open && found.length}
					<ul
						class="brutal-box absolute top-full left-0 z-20 mt-1 max-h-60 w-full overflow-y-auto bg-white"
					>
						{#each found as o (o)}
							<li>
								<button
									type="button"
									class="w-full px-3 py-1.5 text-left text-sm hover:bg-lime"
									onmousedown={(e) => e.preventDefault()}
									onclick={() => add(o)}
								>
									{o}
								</button>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
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
								<div class="mt-1"><EffortBadge {r} /></div>
							</li>
						{/each}
					</ol>
					<div class="flex flex-col gap-3 border-t-[2.5px] border-ink bg-cream-2 p-5">
						{#if p.uses.length}
							<p class="text-xs text-ink/70">Uses: {p.uses.join(', ')}</p>
						{/if}
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
