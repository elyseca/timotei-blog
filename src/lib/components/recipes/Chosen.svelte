<script lang="ts">
	import { S, toast } from '$lib/recipes/store.svelte';
	import { DEPTS } from '$lib/recipes/data';
	import { groceryList, lineText, fmtQty, WEEK_MEALS } from '$lib/recipes/engine';
	import {
		planItems,
		GORDER,
		groceryText,
		backToPlans,
		setServ,
		removeFromPlan,
		mealsOf,
		daysText,
		ppl
	} from '$lib/recipes/plan';
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
	const list = $derived(groceryList(items, {}) as Row[]);

	const deptLabel = (k: string) => (DEPTS.find((d) => d[0] === k) ?? [k, k])[1];
	// Salt and pepper first in each section, so they're easy to tick off if the kitchen has them.
	const rank = (e: Row) => (e.core === 'salt' ? 0 : e.core === 'black pepper' ? 1 : 2);
	const rowsFor = (k: string) =>
		list
			.filter((e) => e.dept === k)
			.sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name));
	const depts = $derived(GORDER.map((k) => ({ k, rows: rowsFor(k) })).filter((d) => d.rows.length));

	let showBox = $state(false);
	let copyText = $state('');
	let boxEl = $state<HTMLTextAreaElement | null>(null);

	function copyList() {
		const text = groceryText(items, list, deptLabel);
		const fallback = () => {
			copyText = text;
			showBox = true;
			toast('Select and copy the list');
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
	<div class="flex flex-wrap items-center justify-between gap-3">
		<h2 class="font-display text-3xl font-black">Grocery list</h2>
		<button type="button" class="brutal-btn" onclick={copyList}>Copy list</button>
	</div>
	{#if showBox}
		<div class="mt-4">
			<p class="text-sm text-ink/70">Select the text below and copy it.</p>
			<textarea readonly rows="8" class="brutal-field mt-2" bind:this={boxEl} value={copyText}
			></textarea>
		</div>
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
								<span class="text-sm {S.checks[e.key] ? 'text-ink/40 line-through' : ''}">
									{#if e.qty == null}{e.name} <em class="text-ink/50">to taste</em>{:else}{lineText(
											{
												qty: e.qty,
												unit: e.unit,
												name: e.name
											}
										)}{/if}
									<small class="block text-xs text-ink/50">{e.from.join(', ')}</small>
								</span>
							</label>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</section>

<Schedule {items} />

<section class="mx-auto max-w-6xl px-5 py-8 md:px-8">
	<h2 class="font-display text-3xl font-black">Alter your plan</h2>
	<p class="mt-3 text-sm text-ink/80">
		{items.length}
		{items.length === 1 ? 'recipe' : 'recipes'} · {total} servings ÷ {ppl(S.household)} =
		<strong>{meals} meals each</strong>, about {daysText(meals)} of lunch and dinner{meals >
		WEEK_MEALS
			? ' (more than a week)'
			: ''}.
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
		<Controls />
	</div>
</section>
