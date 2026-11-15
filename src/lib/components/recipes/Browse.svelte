<script lang="ts">
	import { ui, allRecipes } from '$lib/recipes/store.svelte';
	import { SECTIONS } from '$lib/recipes/data';
	import { hasGarlic, diet, DIET_LABEL } from '$lib/recipes/engine';
	import type { Recipe } from '$lib/recipes/types';
	import RecipeCard from './RecipeCard.svelte';

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

	function matches(r: Recipe) {
		if (F.meal && !(r.meal ?? []).includes(F.meal)) return false;
		if (F.by && r.by !== F.by) return false;
		if (F.equip && !(r.equip ?? []).includes(F.equip)) return false;
		if (F.freezer && !r.freezer) return false;
		if (F.veg && !r.veg) return false;
		if (F.garlicFree && hasGarlic(r)) return false;
		const d = diet(r);
		if ((F.gf && !d.gf) || (F.nf && !d.nf) || (F.df && !d.df)) return false;
		if (F.q) {
			const hay = [
				r.title,
				r.blurb,
				r.by,
				(r.tags ?? []).join(' '),
				r.ing.map((x) => x.name).join(' ')
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

	const list = $derived(allRecipes().filter(matches));
	const sections = $derived(
		SECTIONS.concat([...new Set(list.map((r) => r.section))].filter((s) => !SECTIONS.includes(s)))
	);
</script>

<section class="mx-auto max-w-6xl px-5 pt-12 md:px-8">
	<div class="brutal-box bg-white p-6">
		<div class="mb-4 flex flex-wrap items-center gap-2" role="group" aria-label="Dietary needs">
			<span class="font-mono text-xs font-bold tracking-wide uppercase">Dietary</span>
			{#each ['gf', 'nf', 'df'] as k (k)}
				<button
					type="button"
					class="brutal-chip"
					aria-pressed={F[k as 'gf' | 'nf' | 'df']}
					onclick={() => (F[k as 'gf' | 'nf' | 'df'] = !F[k as 'gf' | 'nf' | 'df'])}
				>
					{DIET_LABEL[k as 'gf' | 'nf' | 'df']}
				</button>
			{/each}
		</div>
		<p class="mb-4 text-xs text-ink/60">
			Flags come from the ingredient names. Check the labels on packaged foods like broth, soy sauce
			and oats.
		</p>
		<input
			type="search"
			class="brutal-field"
			placeholder="Search recipes or ingredients"
			bind:value={F.q}
			aria-label="Search recipes"
		/>
		<div class="mt-4 flex flex-wrap gap-2" role="group" aria-label="Meal type">
			{#each chips as c (c[0])}
				<button
					type="button"
					class="brutal-chip"
					aria-pressed={F.meal === c[0]}
					onclick={() => (F.meal = c[0])}
				>
					{c[1]}
				</button>
			{/each}
		</div>
		<div class="mt-4 flex flex-wrap items-end gap-x-6 gap-y-3">
			<label class="flex flex-col gap-1 font-mono text-xs font-bold tracking-wide uppercase">
				Contributor
				<select class="brutal-field w-auto" bind:value={F.by}>
					<option value="">Anyone</option>
					{#each contributors as b (b)}<option value={b}>{b}</option>{/each}
				</select>
			</label>
			<label class="flex flex-col gap-1 font-mono text-xs font-bold tracking-wide uppercase">
				Equipment
				<select class="brutal-field w-auto" bind:value={F.equip}>
					<option value="">Any</option>
					{#each equipment as b (b)}<option value={b}>{b}</option>{/each}
				</select>
			</label>
			<label class="flex items-center gap-2 pb-2 text-sm">
				<input type="checkbox" class="brutal-check" bind:checked={F.freezer} /> Freezer-friendly
			</label>
			<label class="flex items-center gap-2 pb-2 text-sm">
				<input type="checkbox" class="brutal-check" bind:checked={F.veg} /> Vegetarian
			</label>
			<label class="flex items-center gap-2 pb-2 text-sm">
				<input type="checkbox" class="brutal-check" bind:checked={F.garlicFree} /> Garlic-free
			</label>
		</div>
	</div>
</section>

<section class="mx-auto max-w-6xl px-5 py-12 md:px-8">
	{#if !list.length}
		<div class="brutal-box bg-white p-12 text-center text-ink/60">
			<p class="font-mono text-sm uppercase">No recipes match.</p>
		</div>
	{:else}
		{#each sections as sec (sec)}
			{@const rs = list.filter((r) => r.section === sec)}
			{#if rs.length}
				<div class="mb-12 last:mb-0">
					<h2 class="flex items-baseline gap-3 font-display text-3xl font-black">
						{sec}
						<span class="brutal-tag bg-lime">{rs.length}</span>
					</h2>
					<div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{#each rs as r (r.id)}<RecipeCard {r} />{/each}
					</div>
				</div>
			{/if}
		{/each}
	{/if}
</section>
