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
	import { t } from '$lib/i18n.svelte';
	import { tTitle } from '$lib/recipes/localize';
	import { tIng } from '$lib/recipes/words';
	import Controls from './Controls.svelte';
	import EffortBadge from './EffortBadge.svelte';
	import DietPill from './DietPill.svelte';
	import Legend from './Legend.svelte';

	const MEATS = [
		{ key: 'Chicken', label: 'No chicken' },
		{ key: 'Turkey', label: 'No turkey' },
		{ key: 'Beef', label: 'No beef' },
		{ key: 'Pork', label: 'No pork' },
		{ key: 'Fish', label: 'No fish' }
	];

	// Suggested plans. The rules live in engine.ts (buildPlans): never three soups or stews, plus these filters.
	const plans = $derived(
		buildPlans(allRecipes(), S.perPlan, S.shuffle, {
			exclude: [...S.filters.exclude],
			plant: S.filters.plant,
			fresh: S.filters.fresh,
			easy: S.filters.easy,
			veg: S.filters.veg,
			gf: S.filters.gf,
			nf: S.filters.nf,
			df: S.filters.df,
			occasion: S.filters.occasion,
			have: [...S.filters.have]
		}) as { name: string; why: string; ids: string[]; shared: string[]; uses: string[] }[]
	);
	// The everyday / special occasion switch appears once there are special-occasion recipes to plan from.
	const showOccasion = $derived(hasSpecial(allRecipes()));
	let showFilters = $state(false);
	const activeCount = $derived(
		(['easy', 'veg', 'gf', 'nf', 'df', 'plant', 'fresh'] as const).filter((k) => S.filters[k])
			.length +
			S.filters.exclude.length +
			S.filters.have.length
	);
	const short = $derived(plans.length > 0 && plans[0].ids.length < S.perPlan);
	// Ingredients already in the kitchen: plans lean towards recipes that use them.
	const options = $derived(haveOptions(allRecipes()) as string[]);
	let q = $state('');
	let open = $state(false);
	const found = $derived(
		options
			.filter(
				(o) =>
					!S.filters.have.includes(o) &&
					(o.includes(q.trim().toLowerCase()) ||
						tIng(o).toLowerCase().includes(q.trim().toLowerCase()))
			)
			.slice(0, 8)
	);
	function add(name: string) {
		toggleHave(name);
		q = '';
		open = false;
	}
	const accents = ['bg-mustard', 'bg-blue text-cream', 'bg-teal'];
</script>

<section class="mx-auto max-w-6xl px-5 pt-6 md:px-8">
	<div class="brutal-box bg-white p-6">
		<Controls withCount={true} />
		<button
			type="button"
			class="brutal-btn mt-4 bg-white md:hidden"
			aria-expanded={showFilters}
			onclick={() => (showFilters = !showFilters)}
		>
			{t('Filters')}{activeCount ? ` · ${activeCount}` : ''}
		</button>
		<div class="{showFilters ? 'block' : 'hidden'} md:block">
			{#if showOccasion}
				<div class="mt-5 flex flex-wrap gap-2" role="group" aria-label={t('Occasion')}>
					<button
						type="button"
						class="brutal-chip"
						aria-pressed={S.filters.occasion === 'everyday'}
						onclick={() => setOccasion('everyday')}>{t('Everyday')}</button
					>
					<button
						type="button"
						class="brutal-chip"
						aria-pressed={S.filters.occasion === 'special'}
						onclick={() => setOccasion('special')}>{t('Special occasion')}</button
					>
				</div>
			{/if}
			<div class="mt-5 flex flex-wrap gap-2" role="group" aria-label={t('Plan filters')}>
				<button
					type="button"
					class="brutal-chip"
					aria-pressed={S.filters.easy}
					onclick={() => toggleFilter('easy')}>{t('Quick & easy')}</button
				>
				{#each ['veg', 'gf', 'nf', 'df'] as const as k (k)}
					<DietPill {k} pressed={S.filters[k]} onclick={() => toggleFilter(k)} />
				{/each}
				{#each MEATS as m (m.key)}
					<button
						type="button"
						class="brutal-chip"
						aria-pressed={S.filters.exclude.includes(m.key)}
						onclick={() => toggleExclude(m.key)}
					>
						{t(m.label)}
					</button>
				{/each}
				<button
					type="button"
					class="brutal-chip"
					aria-pressed={S.filters.plant}
					onclick={() => toggleFilter('plant')}>{t('Plant-based')}</button
				>
				<button
					type="button"
					class="brutal-chip"
					aria-pressed={S.filters.fresh}
					onclick={() => toggleFilter('fresh')}>{t('Fresh ingredients only')}</button
				>
			</div>
			<div class="mt-5 flex flex-wrap items-center gap-2">
				<span class="font-mono text-xs font-bold tracking-wide uppercase">{t('Have on hand')}</span>
				{#each S.filters.have as h (h)}
					<button
						type="button"
						class="brutal-chip"
						aria-pressed="true"
						onclick={() => toggleHave(h)}
					>
						{tIng(h)} ×
					</button>
				{/each}
				<div class="relative">
					<input
						type="search"
						class="brutal-field w-56"
						placeholder={t('Search ingredients')}
						aria-label={t('Search ingredients you have')}
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
										{tIng(o)}
									</button>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

<section class="mx-auto max-w-6xl px-5 py-6 md:px-8">
	<div class="mb-4"><Legend /></div>
	<h2 class="font-display text-3xl font-black">{t('Pick a plan')}</h2>
	{#if plans.length}
		{#if short}
			<p class="mt-3 font-mono text-xs font-bold text-ink/70 uppercase">
				{plans[0].ids.length === 1
					? t('Only 1 recipe matches these filters.')
					: t('Only {n} recipes match these filters.', { n: plans[0].ids.length })}
			</p>
		{/if}
		<div class="mt-6 grid gap-6 md:grid-cols-3">
			{#each plans as p, i (p.ids.join('|'))}
				<article class="brutal-box reveal flex flex-col overflow-hidden bg-white">
					<div class="border-b-[2.5px] border-ink p-5 {accents[i % accents.length]}">
						<h3 class="font-display text-xl font-black">{t(p.name)}</h3>
					</div>
					<ol class="flex flex-1 flex-col gap-3 p-5">
						{#each p.ids.map(byId).filter((r): r is Recipe => !!r) as r (r.id)}
							<li>
								<a
									href="/recipes/view#{r.id}"
									class="font-display text-lg font-black underline decoration-2 underline-offset-4"
								>
									{tTitle(r)}
								</a>
								<p class="font-mono text-xs font-bold tracking-wide text-ink/60 uppercase">
									{t(proteinOf(r))}{r.freezer ? ' · ' + t('freezes well') : ''}
								</p>
								<div class="mt-1"><EffortBadge {r} /></div>
							</li>
						{/each}
					</ol>
					<div class="flex flex-col gap-3 border-t-[2.5px] border-ink bg-cream-2 p-5">
						{#if p.uses.length}
							<p class="text-xs text-ink/70">
								{t('Uses: {list}', { list: p.uses.map(tIng).join(', ') })}
							</p>
						{/if}
						{#if p.shared.length}
							<p class="text-xs text-ink/70">
								{t('Shared ingredients: {list}', { list: p.shared.map(tIng).join(', ') })}
							</p>
						{/if}
						<button
							type="button"
							class="brutal-btn justify-center"
							onclick={() => choosePlan(p.ids)}
						>
							{t('Use this plan')}
						</button>
					</div>
				</article>
			{/each}
		</div>
	{:else}
		<div class="brutal-box mt-6 bg-white p-10 text-center text-ink/60">
			<p class="font-mono text-sm uppercase">
				{t('No recipes match these filters. Try removing one.')}
			</p>
		</div>
	{/if}
	<div class="mt-8 flex flex-wrap items-center gap-4">
		<button type="button" class="brutal-btn bg-white" onclick={() => S.shuffle++}>
			{t('Show different options')}
		</button>
		<a
			href="/recipes"
			class="font-mono text-sm font-bold tracking-wide uppercase underline decoration-2 underline-offset-4"
		>
			{t('Or browse recipes')}
		</a>
	</div>
</section>
