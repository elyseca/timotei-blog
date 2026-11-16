<script lang="ts">
	import { S, allRecipes, byId } from '$lib/recipes/store.svelte';
	import { fmtAmount, comboParts, suggestCombos, pairOk, WEEK_MEALS } from '$lib/recipes/engine';
	import {
		planItems,
		backToPlans,
		setServ,
		removeFromPlan,
		addCombo,
		mealsOf
	} from '$lib/recipes/plan';
	import type { Recipe } from '$lib/recipes/types';
	import { t } from '$lib/i18n.svelte';
	import { tTitle } from '$lib/recipes/localize';
	import { tIng } from '$lib/recipes/words';
	import Stepper from './Stepper.svelte';
	import Controls from './Controls.svelte';
	import EffortBadge from './EffortBadge.svelte';
	import Legend from './Legend.svelte';
	import Schedule from './Schedule.svelte';

	const items = $derived(planItems());
	const total = $derived(items.reduce((sum, x) => sum + x.servings, 0));
	const meals = $derived(mealsOf(total));

	/* ---- combos: protein + veg + carb as one meal ---- */
	const all = $derived(allRecipes());
	const options = $derived(comboParts(all) as Record<'protein' | 'veg' | 'carb', Recipe[]>);
	const suggestions = $derived(
		suggestCombos(
			all,
			items.map((x) => x.r),
			[...S.filters.have],
			3
		) as { r: Recipe; shared: string[] }[]
	);
	let pick = $state({ protein: '', veg: '', carb: '' });
	// Only offer parts that go with what is already picked.
	const chosen = $derived(
		[pick.protein, pick.veg, pick.carb].map((id) => all.find((r) => r.id === id))
	);
	const fits = (role: 'protein' | 'veg' | 'carb') =>
		options[role].filter((r) =>
			pairOk(chosen.filter((c): c is Recipe => !!c && c.kind !== r.kind).concat(r))
		);
	const picked = $derived([pick.protein, pick.veg, pick.carb].filter(Boolean));
	const names = (r: Recipe) => (r.parts ?? []).map((id) => tTitle(byId(id)) || id).join(' · ');
	function addPicked() {
		addCombo(picked);
		pick = { protein: '', veg: '', carb: '' };
	}
</script>

<div class="mx-auto max-w-6xl px-5 pt-5 md:px-8">
	<button
		type="button"
		class="font-mono text-sm font-bold tracking-wide uppercase underline decoration-2 underline-offset-4"
		onclick={backToPlans}
	>
		{t('← Back to plans')}
	</button>
</div>

<section class="mx-auto max-w-6xl px-5 py-5 md:px-8">
	<div class="brutal-box bg-white p-4">
		<Controls />
	</div>

	<h2 class="mt-6 font-display text-3xl font-black">{t('Plan')}</h2>
	<p class="mt-3 max-w-2xl text-ink/80">
		{t(
			'Change the servings on any recipe to make more or less. The calendar below and the grocery list update to match, so set the quantities however suits you.'
		)}
	</p>
	<p class="mt-3 font-mono text-xs font-bold tracking-wide uppercase">
		{t('{total} servings · {meals} meals each', { total, meals })}{meals > WEEK_MEALS
			? ' ' + t('(over a week)')
			: ''}
	</p>
	<div class="mt-4"><Legend /></div>
	<div class="brutal-box mt-2 flex flex-col bg-white">
		{#each items as x (x.r.id)}
			<div
				class="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink/15 p-3 last:border-0"
			>
				<div>
					<a
						href="/recipes/view#{x.r.id}"
						class="font-display text-lg font-black underline decoration-2 underline-offset-4"
					>
						{tTitle(x.r)}
					</a>
					<p class="font-mono text-xs font-bold tracking-wide text-ink/60 uppercase">
						{t('{n} meals each', { n: fmtAmount(x.servings / S.household, '') })}
					</p>
					{#if x.r.mins}<div class="mt-1"><EffortBadge r={x.r} /></div>{/if}
				</div>
				<div class="flex items-center gap-4">
					<Stepper
						value={x.servings}
						label={t('Servings')}
						ondec={() => setServ(x.r.id, -1)}
						oninc={() => setServ(x.r.id, 1)}
					/>
					<button
						type="button"
						class="font-mono text-xs font-bold tracking-wide uppercase underline decoration-2 underline-offset-4"
						onclick={() => removeFromPlan(x.r.id)}
					>
						{t('Remove')}
					</button>
				</div>
			</div>
		{/each}
	</div>

	<div class="brutal-box mt-4 bg-white p-4">
		<h3 class="font-mono text-xs font-bold tracking-wide uppercase">{t('Add a combo')}</h3>
		{#if suggestions.length}
			<div class="mt-3 flex flex-wrap gap-2">
				{#each suggestions as s (s.r.id)}
					<button
						type="button"
						class="brutal-chip normal-case"
						title={s.shared.slice(0, 4).map(tIng).join(', ')}
						onclick={() => addCombo(s.r.parts ?? [])}
					>
						+ {names(s.r)}
					</button>
				{/each}
			</div>
		{/if}
		<div class="mt-4 flex flex-wrap items-center gap-3">
			<select class="brutal-field w-auto" aria-label={t('Protein')} bind:value={pick.protein}>
				<option value="">{t('Protein')}</option>
				{#each fits('protein') as r (r.id)}<option value={r.id}>{tTitle(r)}</option>{/each}
			</select>
			<select class="brutal-field w-auto" aria-label={t('Veg')} bind:value={pick.veg}>
				<option value="">{t('Veg')}</option>
				{#each fits('veg') as r (r.id)}<option value={r.id}>{tTitle(r)}</option>{/each}
			</select>
			<select class="brutal-field w-auto" aria-label={t('Carb')} bind:value={pick.carb}>
				<option value="">{t('Carb')}</option>
				{#each fits('carb') as r (r.id)}<option value={r.id}>{tTitle(r)}</option>{/each}
			</select>
			<button type="button" class="brutal-btn" disabled={picked.length < 2} onclick={addPicked}>
				{t('Add')}
			</button>
		</div>
	</div>
</section>

<Schedule {items} />

<div class="mx-auto flex max-w-6xl justify-end px-5 pb-6 md:px-8">
	<a href="/recipes/groceries" class="brutal-btn">{t('Next: grocery list →')}</a>
</div>
