<script lang="ts">
	import { S, toast, allRecipes, byId } from '$lib/recipes/store.svelte';
	import { DEPTS } from '$lib/recipes/data';
	import {
		groceryList,
		lineText,
		fmtQty,
		comboParts,
		suggestCombos,
		pairOk,
		WEEK_MEALS
	} from '$lib/recipes/engine';
	import {
		planItems,
		GORDER,
		groceryText,
		shortName,
		backToPlans,
		setServ,
		removeFromPlan,
		addCombo,
		mealsOf
	} from '$lib/recipes/plan';
	import type { Recipe } from '$lib/recipes/types';
	import Stepper from './Stepper.svelte';
	import Controls from './Controls.svelte';
	import Schedule from './Schedule.svelte';

	type Row = {
		key: string;
		core: string;
		name: string;
		qty: number | null;
		unit: string;
		dept: string;
		from: string[];
	};

	const items = $derived(planItems());
	const total = $derived(items.reduce((t, x) => t + x.servings, 0));
	const meals = $derived(mealsOf(total));
	// Salt and pepper stay off the list; they're a reminder at the bottom instead.
	const list = $derived(groceryList(items, { hideStaples: true }) as Row[]);
	const checked = $derived(list.filter((e) => S.checks[e.key]));
	const visible = $derived(list.filter((e) => !S.checks[e.key]));

	const deptLabel = (k: string) => (DEPTS.find((d) => d[0] === k) ?? [k, k])[1];
	const depts = $derived(
		GORDER.map((k) => ({
			k,
			rows: visible.filter((e) => e.dept === k).sort((a, b) => a.name.localeCompare(b.name))
		})).filter((d) => d.rows.length)
	);
	const rowText = (e: Row) =>
		e.qty == null ? e.name : lineText({ qty: e.qty, unit: e.unit, name: e.name });

	let showChecked = $state(false);
	let showBox = $state(false);
	let copyText = $state('');
	let boxEl = $state<HTMLTextAreaElement | null>(null);

	function copyList() {
		const text = groceryText(items, visible, deptLabel);
		const fallback = () => {
			copyText = text;
			showBox = true;
			toast('Copy the list');
			setTimeout(() => {
				boxEl?.focus();
				boxEl?.select();
			}, 0);
		};
		try {
			navigator.clipboard.writeText(text).then(() => toast('List copied'), fallback);
		} catch {
			fallback();
		}
	}

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
	const names = (r: Recipe) => (r.parts ?? []).map((id) => byId(id)?.title ?? id).join(' · ');
	function addPicked() {
		addCombo(picked);
		pick = { protein: '', veg: '', carb: '' };
	}
</script>

<div class="mx-auto max-w-6xl px-5 pt-10 md:px-8">
	<button
		type="button"
		class="font-mono text-sm font-bold tracking-wide uppercase underline decoration-2 underline-offset-4"
		onclick={backToPlans}
	>
		← Back to plans
	</button>
</div>

<section class="mx-auto max-w-6xl px-5 py-8 md:px-8">
	<h2 class="font-display text-3xl font-black">Plan</h2>
	<p class="mt-3 max-w-2xl text-ink/80">
		Change the servings on any recipe to make more or less. The grocery list and calendar below
		update to match, so set the quantities however suits you.
	</p>
	<p class="mt-3 font-mono text-xs font-bold tracking-wide uppercase">
		{total} servings · {meals} meals each{meals > WEEK_MEALS ? ' (over a week)' : ''}
	</p>
	<div class="brutal-box mt-6 flex flex-col bg-white">
		{#each items as x (x.r.id)}
			<div
				class="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink/15 p-4 last:border-0"
			>
				<div>
					<a
						href="/recipes/view#{x.r.id}"
						class="font-display text-lg font-black underline decoration-2 underline-offset-4"
					>
						{x.r.title}
					</a>
					<p class="font-mono text-xs font-bold tracking-wide text-ink/60 uppercase">
						{fmtQty(x.servings / S.household)} meals each
					</p>
				</div>
				<div class="flex items-center gap-4">
					<Stepper
						value={x.servings}
						label="Servings"
						ondec={() => setServ(x.r.id, -1)}
						oninc={() => setServ(x.r.id, 1)}
					/>
					<button
						type="button"
						class="font-mono text-xs font-bold tracking-wide uppercase underline decoration-2 underline-offset-4"
						onclick={() => removeFromPlan(x.r.id)}
					>
						Remove
					</button>
				</div>
			</div>
		{/each}
	</div>

	<div class="brutal-box mt-6 bg-white p-6">
		<h3 class="font-mono text-xs font-bold tracking-wide uppercase">Add a combo</h3>
		{#if suggestions.length}
			<div class="mt-3 flex flex-wrap gap-2">
				{#each suggestions as s (s.r.id)}
					<button
						type="button"
						class="brutal-chip normal-case"
						title={s.shared.slice(0, 4).join(', ')}
						onclick={() => addCombo(s.r.parts ?? [])}
					>
						+ {names(s.r)}
					</button>
				{/each}
			</div>
		{/if}
		<div class="mt-4 flex flex-wrap items-center gap-3">
			<select class="brutal-field w-auto" aria-label="Protein" bind:value={pick.protein}>
				<option value="">Protein</option>
				{#each fits('protein') as r (r.id)}<option value={r.id}>{r.title}</option>{/each}
			</select>
			<select class="brutal-field w-auto" aria-label="Veg" bind:value={pick.veg}>
				<option value="">Veg</option>
				{#each fits('veg') as r (r.id)}<option value={r.id}>{r.title}</option>{/each}
			</select>
			<select class="brutal-field w-auto" aria-label="Carb" bind:value={pick.carb}>
				<option value="">Carb</option>
				{#each fits('carb') as r (r.id)}<option value={r.id}>{r.title}</option>{/each}
			</select>
			<button type="button" class="brutal-btn" disabled={picked.length < 2} onclick={addPicked}>
				Add
			</button>
		</div>
	</div>

	<div class="brutal-box mt-6 bg-white p-6">
		<Controls />
	</div>
</section>

<section class="mx-auto max-w-6xl px-5 py-8 md:px-8">
	<div class="flex flex-wrap items-center justify-between gap-3">
		<h2 class="font-display text-3xl font-black">Grocery list</h2>
		<button type="button" class="brutal-btn" onclick={copyList}>Copy list</button>
	</div>
	{#if showBox}
		<textarea readonly rows="8" class="brutal-field mt-4" bind:this={boxEl} value={copyText}
		></textarea>
	{/if}
	<div class="brutal-box mt-6 columns-1 gap-x-10 bg-white p-6 sm:columns-2">
		{#each depts as d (d.k)}
			<section class="mb-6 break-inside-avoid">
				<h3 class="border-b-2 border-ink pb-1 font-mono text-sm font-bold tracking-wide uppercase">
					{deptLabel(d.k)}
				</h3>
				<ul class="mt-2 flex flex-col">
					{#each d.rows as e (e.key)}
						<li class="border-b border-ink/10 last:border-0">
							<label class="flex cursor-pointer items-start gap-3 py-2">
								<input type="checkbox" class="brutal-check mt-0.5" bind:checked={S.checks[e.key]} />
								<span class="text-sm">
									{rowText(e)}{#if e.qty == null}
										<em class="text-ink/50"> to taste</em>{/if}
									<small class="block text-xs text-ink/50">{e.from.map(shortName).join(', ')}</small
									>
								</span>
							</label>
						</li>
					{/each}
				</ul>
			</section>
		{:else}
			<p class="font-mono text-sm font-bold uppercase">All checked off</p>
		{/each}
	</div>
	<div class="mt-3 flex flex-wrap items-center justify-between gap-3">
		<p class="text-xs text-ink/60">Salt and pepper</p>
		{#if checked.length}
			<button
				type="button"
				class="font-mono text-xs font-bold tracking-wide uppercase underline decoration-2 underline-offset-4"
				aria-expanded={showChecked}
				onclick={() => (showChecked = !showChecked)}
			>
				Checked off ({checked.length})
			</button>
		{/if}
	</div>
	{#if showChecked && checked.length}
		<ul class="brutal-box mt-3 flex flex-col bg-cream-2 px-5 py-2">
			{#each checked as e (e.key)}
				<li class="border-b border-ink/10 last:border-0">
					<label class="flex cursor-pointer items-center gap-3 py-2">
						<input type="checkbox" class="brutal-check" bind:checked={S.checks[e.key]} />
						<span class="text-sm text-ink/60">{rowText(e)}</span>
					</label>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<Schedule {items} />
