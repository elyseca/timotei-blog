<script lang="ts">
	import { S, ui, allRecipes } from '$lib/recipes/store.svelte';
	import { SECTIONS } from '$lib/recipes/data';
	import { diet, DIETS, swapRecipe, effort, effortLevel, EFFORT_SCALE } from '$lib/recipes/engine';
	import DietPill from './DietPill.svelte';
	import type { Recipe } from '$lib/recipes/types';
	import RecipeCard from './RecipeCard.svelte';
	import { t } from '$lib/i18n.svelte';
	import { localize } from '$lib/recipes/localize';

	const F = ui.F;
	const chips = [
		['', 'All'],
		['everyday', 'Everyday meals'],
		['breakfast', 'Breakfast'],
		['dessert', 'Dessert'],
		['special', 'Special occasions']
	];

	const contributors = $derived([
		...new Set(
			allRecipes()
				.map((r) => r.by)
				.filter(Boolean)
		)
	]);
	const equipment = $derived([...new Set(allRecipes().flatMap((r) => r.equip ?? []))].sort());

	// Dietary choices are shared with the meal planner; garlic-free is only for browsing.
	const on = (k: string) =>
		k === 'garlic' ? F.garlic : S.filters[k as 'gf' | 'nf' | 'df' | 'veg'];
	function flip(k: string) {
		if (k === 'garlic') F.garlic = !F.garlic;
		else S.filters[k as 'gf' | 'nf' | 'df' | 'veg'] = !S.filters[k as 'gf' | 'nf' | 'df' | 'veg'];
	}

	let showFilters = $state(false);
	const activeCount = $derived(
		DIETS.filter((x) => on(x.key)).length +
			F.effort.length +
			(F.meal ? 1 : 0) +
			(F.by ? 1 : 0) +
			(F.equip ? 1 : 0) +
			(F.freezer ? 1 : 0)
	);
	function clearFilters() {
		for (const x of DIETS) if (on(x.key)) flip(x.key);
		F.effort = [];
		F.meal = '';
		F.by = '';
		F.equip = '';
		F.freezer = false;
	}
	const flipEffort = (n: number) =>
		(F.effort = F.effort.includes(n) ? F.effort.filter((x) => x !== n) : [...F.effort, n]);

	function matches(r: Recipe) {
		if (F.effort.length && !(r.mins && F.effort.includes(effortLevel(effort(r).score))))
			return false;
		if (F.meal && !(r.meal ?? []).includes(F.meal)) return false;
		if (F.by && r.by !== F.by) return false;
		if (F.equip && !(r.equip ?? []).includes(F.equip)) return false;
		if (F.freezer && !r.freezer) return false;
		const d = diet(swapRecipe(r, S.filters));
		for (const x of DIETS) if (on(x.key) && !d[x.key as keyof typeof d]) return false;
		if (F.q) {
			// Match the English text and the Spanish text, so either language finds the recipe.
			const lr = localize(r);
			const hay = [
				r.title,
				r.blurb,
				r.by,
				(r.tags ?? []).join(' '),
				r.ing.map((x) => x.name).join(' '),
				lr.title,
				lr.blurb,
				lr.ing.map((x) => x.name).join(' ')
			]
				.join(' ')
				.toLowerCase();
			if (
				!F.q
					.toLowerCase()
					.split(/\s+/)
					.every((w) => hay.includes(w))
			)
				return false;
		}
		return true;
	}

	// Versions of one dish show as a single card: the first that matches, with a count of versions.
	const list = $derived.by(() => {
		const seen = new Set<string>();
		return allRecipes()
			.filter(matches)
			.filter((r) => {
				if (!r.family) return true;
				if (seen.has(r.family)) return false;
				seen.add(r.family);
				return true;
			});
	});
	const versionCount = (r: Recipe) =>
		r.family ? allRecipes().filter((x) => x.family === r.family).length : 0;
	const sections = $derived(
		SECTIONS.concat([...new Set(list.map((r) => r.section))].filter((s) => !SECTIONS.includes(s)))
	);
</script>

<section class="mx-auto max-w-6xl px-5 pt-6 md:px-8">
	<div class="brutal-box bg-white p-4">
		<div class="flex gap-2">
			<input
				type="search"
				class="brutal-field"
				placeholder={t('Search recipes')}
				bind:value={F.q}
				aria-label={t('Search recipes')}
			/>
			<button
				type="button"
				class="brutal-btn shrink-0 bg-white md:hidden"
				aria-expanded={showFilters}
				onclick={() => (showFilters = !showFilters)}
			>
				{t('Filters')}{activeCount ? ` · ${activeCount}` : ''}
			</button>
		</div>
		<div class="mt-3 {showFilters ? 'block' : 'hidden'} md:block">
			<div class="mb-3" role="group" aria-label={t('Dietary needs')}>
				<span class="font-mono text-xs font-bold tracking-wide uppercase">{t('Dietary')}</span>
				<div class="mt-1.5 flex flex-wrap gap-2">
					{#each DIETS as x (x.key)}
						{@const k = x.key as 'gf' | 'nf' | 'df' | 'veg' | 'garlic'}
						<DietPill {k} pressed={on(k)} onclick={() => flip(k)} />
					{/each}
				</div>
			</div>
			<div class="mb-3" role="group" aria-label={t('Effort')}>
				<span class="font-mono text-xs font-bold tracking-wide uppercase">{t('Effort')}</span>
				<div class="mt-1.5 flex flex-wrap gap-2">
					{#each EFFORT_SCALE as l (l.level)}
						<button
							type="button"
							class="brutal-chip inline-flex items-center gap-2"
							aria-pressed={F.effort.includes(l.level)}
							onclick={() => flipEffort(l.level)}
						>
							<span class="inline-flex gap-px" aria-hidden="true">
								{#each [1, 2, 3, 4, 5] as n (n)}
									<span
										class="h-1.5 w-1.5 rounded-full border border-current {n <= l.level
											? 'bg-current'
											: 'bg-transparent'}"
									></span>
								{/each}
							</span>
							{t(l.name)}
						</button>
					{/each}
				</div>
			</div>
			<p class="mb-3 text-xs text-ink/60">
				{t(
					'Vegetarian swaps in vegetable broth and gluten-free swaps in chickpea pasta. Flags come from ingredient names, so check packaged labels.'
				)}
			</p>
			<div class="mt-3 flex flex-wrap gap-2" role="group" aria-label={t('Meal type')}>
				{#each chips as c (c[0])}
					<button
						type="button"
						class="brutal-chip"
						aria-pressed={F.meal === c[0]}
						onclick={() => (F.meal = c[0])}
					>
						{t(c[1])}
					</button>
				{/each}
			</div>
			<div class="mt-3 flex flex-wrap items-end gap-x-5 gap-y-2">
				<label class="flex flex-col gap-1 font-mono text-xs font-bold tracking-wide uppercase">
					{t('Contributor')}
					<select class="brutal-field w-auto" bind:value={F.by}>
						<option value="">{t('Anyone')}</option>
						{#each contributors as b (b)}<option value={b}>{b}</option>{/each}
					</select>
				</label>
				<label class="flex flex-col gap-1 font-mono text-xs font-bold tracking-wide uppercase">
					{t('Equipment')}
					<select class="brutal-field w-auto" bind:value={F.equip}>
						<option value="">{t('Any')}</option>
						{#each equipment as b (b)}<option value={b}>{t(b)}</option>{/each}
					</select>
				</label>
				<label class="flex items-center gap-2 pb-2 text-sm">
					<input type="checkbox" class="brutal-check" bind:checked={F.freezer} />
					{t('Freezer-friendly')}
				</label>
			</div>
			{#if activeCount}
				<button
					type="button"
					class="mt-3 font-mono text-xs font-bold tracking-wide uppercase underline decoration-2 underline-offset-4"
					onclick={clearFilters}
				>
					{t('Clear filters')}
				</button>
			{/if}
		</div>
	</div>
</section>

<section class="mx-auto max-w-6xl px-5 py-6 md:px-8">
	{#if !list.length}
		<div class="brutal-box bg-white p-12 text-center text-ink/60">
			<p class="font-mono text-sm uppercase">{t('No recipes match.')}</p>
		</div>
	{:else}
		{#each sections as sec (sec)}
			{@const rs = list.filter((r) => r.section === sec)}
			{#if rs.length}
				<div class="mb-8 last:mb-0">
					<h2 class="flex items-baseline gap-3 font-display text-3xl font-black">
						{t(sec)}
						<span class="brutal-tag bg-lime">{rs.length}</span>
					</h2>
					<div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{#each rs as r (r.id)}<RecipeCard {r} versions={versionCount(r)} />{/each}
					</div>
				</div>
			{/if}
		{/each}
	{/if}
</section>
