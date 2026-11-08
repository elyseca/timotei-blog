<script lang="ts">
	import { goto } from '$app/navigation';
	import { S, byId, allRecipes, toast } from '$lib/recipes/store.svelte';
	import { MEALS } from '$lib/recipes/data';
	import { lineText, fmtQty, fatTbsp, hasGarlic, similar } from '$lib/recipes/engine';
	import { togglePlan, ppl, daysText } from '$lib/recipes/plan';
	import Stepper from './Stepper.svelte';

	let { id }: { id: string } = $props();

	const r = $derived(byId(id));
	// The page re-creates this component for each recipe ({#key}), so reading the starting value once is fine.
	// svelte-ignore state_referenced_locally
	let viewServ = $state(byId(id)?.servings ?? 1);
	let pendingDelete = $state(false);

	const f = $derived(r ? viewServ / r.servings : 1);
	const inPlan = $derived(S.plan.some((p) => p.id === id));
	const sim = $derived(
		r
			? (similar([r.id], allRecipes(), 3) as {
					r: { id: string; title: string };
					shared: string[];
				}[])
			: []
	);
	const fat = $derived(r ? (fatTbsp(r) as number) : 0);
	const tags = $derived(
		r
			? [
					...(r.meal ?? []).map((m) => (MEALS as Record<string, string>)[m] ?? m),
					...(r.veg ? ['Vegetarian'] : []),
					...(r.freezer ? ['Freezer-friendly'] : []),
					...(r.equip ?? []),
					...(r.tags ?? [])
				]
			: []
	);

	function remove() {
		if (!pendingDelete) {
			pendingDelete = true;
			return;
		}
		S.user = S.user.filter((x) => x.id !== id);
		S.plan = S.plan.filter((p) => p.id !== id);
		toast('Recipe deleted');
		goto('/recipes');
	}
</script>

{#if !r}
	<div class="mx-auto max-w-3xl px-5 py-16 md:px-8">
		<div class="brutal-box bg-white p-10 text-center">
			<p class="font-mono text-sm uppercase">
				That recipe isn't here.
				<a href="/recipes" class="underline decoration-2 underline-offset-4">Back to all recipes</a>
			</p>
		</div>
	</div>
{:else}
	<section class="grid-bg border-b-[2.5px] border-ink bg-coral">
		<div class="mx-auto max-w-6xl px-5 py-12 md:px-8">
			<a
				href="/recipes"
				class="rise-in font-mono text-sm font-bold tracking-wide uppercase underline decoration-2 underline-offset-4"
			>
				← All recipes
			</a>
			<h1
				class="rise-in mt-5 max-w-3xl font-display text-4xl font-black md:text-6xl"
				style="--delay: 80ms"
			>
				{r.title}
			</h1>
			<p class="rise-in mt-4 max-w-2xl text-lg text-ink/80" style="--delay: 140ms">{r.blurb}</p>
			<div class="rise-in mt-5 flex flex-wrap gap-2" style="--delay: 200ms">
				{#each tags as t (t)}<span class="brutal-tag">{t}</span>{/each}
				{#if hasGarlic(r)}<span class="brutal-tag bg-mustard">Contains garlic</span>{/if}
			</div>
			<p
				class="rise-in mt-4 font-mono text-xs font-bold tracking-wide text-ink/70 uppercase"
				style="--delay: 240ms"
			>
				{r.by ? 'From ' + r.by : ''}
				{#if r.source}
					· Adapted from
					<a
						href={r.source.url}
						target="_blank"
						rel="noopener"
						class="underline decoration-2 underline-offset-4">{r.source.name}</a
					>
				{/if}
			</p>
			<div class="rise-in mt-6 flex flex-wrap gap-3" style="--delay: 280ms">
				<button
					type="button"
					class="brutal-btn {inPlan ? 'bg-white' : ''}"
					onclick={() => togglePlan(id)}
				>
					{inPlan ? '✓ In meal plan' : '+ Add to meal plan'}
				</button>
				{#if r.user}
					<button type="button" class="brutal-btn bg-white" onclick={remove}>
						{pendingDelete ? 'Tap again to delete' : 'Delete recipe'}
					</button>
				{/if}
			</div>
		</div>
	</section>

	<div class="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:px-8 lg:grid-cols-[22rem_1fr]">
		<aside class="flex flex-col gap-6">
			<div class="brutal-box bg-white p-5">
				<div class="flex items-center justify-between gap-3">
					<span class="font-mono text-xs font-bold tracking-wide uppercase">Servings</span>
					<Stepper
						value={viewServ}
						label="Servings"
						ondec={() => (viewServ = Math.max(1, viewServ - 1))}
						oninc={() => (viewServ = Math.min(48, viewServ + 1))}
					/>
				</div>
				<p class="mt-3 text-xs text-ink/70">
					{viewServ} servings = {fmtQty(viewServ / S.household)} meals each for {ppl(S.household)},
					about {daysText(viewServ / S.household)}.
				</p>
				{#if f !== 1}
					<p class="mt-1 text-xs text-ink/70">
						Scaled from {r.servings}. Amounts written inside the method are for the full recipe.
					</p>
				{/if}
				<ul class="mt-4 flex flex-col">
					{#each r.ing as x, i (i)}
						<li
							class="flex flex-wrap justify-between gap-x-3 border-b border-ink/10 py-2 text-sm last:border-0"
						>
							<span>{lineText(x, f)}</span>
							{#if x.note}<em class="text-ink/50">{x.note}</em>{/if}
						</li>
					{/each}
				</ul>
			</div>
			{#if (r.meal ?? []).includes('everyday')}
				<div class="brutal-box bg-white p-5">
					<div class="flex items-baseline justify-between gap-3">
						<span class="font-mono text-xs font-bold tracking-wide uppercase"
							>Added fat per serving</span
						>
						<strong class="font-display text-xl font-black">{Math.round(fat * 10) / 10} tbsp</strong
						>
					</div>
					<div
						class="mt-3 h-3 overflow-hidden rounded-full border-2 border-ink bg-cream"
						aria-hidden="true"
					>
						<div
							class="h-full {fat >= 2 ? 'bg-coral' : 'bg-teal'}"
							style="width:{Math.min(100, (fat / 2) * 100)}%"
						></div>
					</div>
					<p class="mt-2 text-xs text-ink/70">
						Guideline: under 2 tbsp. Counts added oil and butter only.
					</p>
				</div>
			{/if}
		</aside>

		<div class="min-w-0">
			<h2 class="font-display text-3xl font-black">Method</h2>
			<ol class="mt-5 flex flex-col gap-4">
				{#each r.steps as s, i (i)}
					<li class="flex gap-4">
						<span
							class="grid size-8 shrink-0 place-items-center rounded-full border-2 border-ink bg-lime font-mono text-sm font-bold"
							>{i + 1}</span
						>
						<p class="pt-0.5 text-[1.02rem] leading-relaxed">
							{#if Array.isArray(s)}<strong>{s[0]}.</strong> {s[1]}{:else}{s}{/if}
						</p>
					</li>
				{/each}
			</ol>

			{#if r.flavors}
				<h2 class="mt-12 font-display text-3xl font-black">Flavors</h2>
				<div class="brutal-box mt-5 overflow-x-auto bg-white">
					<table class="w-full text-left text-sm">
						<thead class="border-b-[2.5px] border-ink bg-cream-2 font-mono text-xs uppercase">
							<tr
								><th class="p-3">Flavor</th><th class="p-3">Stir in</th><th class="p-3"
									>Sweetener</th
								><th class="p-3">Top with</th></tr
							>
						</thead>
						<tbody>
							{#each r.flavors as x (x.name)}
								<tr class="border-b border-ink/10 last:border-0">
									<th class="p-3 font-bold">{x.name}</th>
									<td class="p-3">{x.add}</td>
									<td class="p-3">{x.sweet || '—'}</td>
									<td class="p-3">{x.top || '—'}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}

			{#if r.notes?.length}
				<h2 class="mt-12 font-display text-3xl font-black">Notes</h2>
				<ul class="mt-5 list-disc space-y-2 pl-6">
					{#each r.notes as n, i (i)}<li>{n}</li>{/each}
				</ul>
			{/if}

			{#if sim.length}
				<h2 class="mt-12 font-display text-3xl font-black">Shares ingredients with</h2>
				<div class="mt-5 grid gap-4 sm:grid-cols-3">
					{#each sim as s (s.r.id)}
						<a
							href="/recipes/view#{s.r.id}"
							class="brutal-box flex flex-col gap-1 bg-white p-4 transition-[translate,box-shadow] duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard-lg"
						>
							<strong class="font-display text-lg font-black">{s.r.title}</strong>
							<span class="text-xs text-ink/60">{s.shared.slice(0, 4).join(', ')}</span>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}
