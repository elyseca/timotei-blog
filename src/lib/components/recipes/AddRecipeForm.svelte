<script lang="ts">
	import { goto } from '$app/navigation';
	import { S, toast } from '$lib/recipes/store.svelte';
	import { KINDS, MEALS, DEPTS } from '$lib/recipes/data';
	import { parseLine, lineText, fatTbsp, hasGarlic } from '$lib/recipes/engine';
	import type { Recipe } from '$lib/recipes/types';

	const kinds = KINDS as Record<string, string>;
	const meals = MEALS as Record<string, string>;

	let title = $state('');
	let blurb = $state('');
	let kind = $state('Main');
	let by = $state('Elyse');
	let servings = $state(2);
	let meal = $state<Record<string, boolean>>({
		everyday: true,
		breakfast: false,
		dessert: false,
		special: false
	});
	let equip = $state('');
	let tags = $state('');
	let freezer = $state(false);
	let veg = $state(false);
	let ings = $state('');
	let steps = $state('');
	let notes = $state('');

	const csv = (v: string) =>
		v
			.split(',')
			.map((s) => s.trim())
			.filter(Boolean);
	const deptLabel = (k: string) => (DEPTS.find((d) => d[0] === k) ?? [k, ''])[1];

	// The recipe as the form stands now: used for the live preview and when saving.
	const draft = $derived<Recipe>({
		id: '',
		title: title.trim(),
		blurb: blurb.trim(),
		kind,
		section: kinds[kind],
		meal: Object.keys(meal).filter((k) => meal[k]),
		by: by.trim(),
		servings: Math.max(1, Number(servings) || 2),
		equip: csv(equip),
		tags: csv(tags),
		freezer,
		veg,
		ing: ings.split('\n').map(parseLine).filter(Boolean),
		steps: steps
			.split('\n')
			.map((s) => s.trim().replace(/^\d+[.)]\s*/, ''))
			.filter(Boolean),
		notes: notes
			.split('\n')
			.map((s) => s.trim())
			.filter(Boolean),
		user: true
	});
	const fat = $derived(fatTbsp(draft) as number);

	function save(e: SubmitEvent) {
		e.preventDefault();
		if (!draft.title || !draft.ing.length || !draft.steps.length) {
			toast('Add a title, ingredients, and method');
			return;
		}
		const r: Recipe = {
			...draft,
			id: 'u-' + Date.now().toString(36),
			blurb: draft.blurb || 'Added by you.'
		};
		S.user.push(r);
		toast(hasGarlic(r) ? 'Saved. Note: it lists garlic.' : 'Recipe saved');
		goto('/recipes/view#' + r.id);
	}

	const label = 'flex flex-col gap-1 font-mono text-xs font-bold tracking-wide uppercase';
</script>

<form class="mx-auto max-w-3xl px-5 py-12 md:px-8" autocomplete="off" onsubmit={save}>
	<div class="brutal-box flex flex-col gap-5 bg-white p-6">
		<label class={label}
			>Title
			<input
				class="brutal-field font-sans text-base normal-case"
				bind:value={title}
				required
				placeholder="e.g. Turkey Taco Bowls"
			/>
		</label>
		<label class={label}
			>One-line description
			<input
				class="brutal-field font-sans text-base normal-case"
				bind:value={blurb}
				placeholder="What makes it good?"
			/>
		</label>
		<div class="grid gap-5 sm:grid-cols-3">
			<label class={label}
				>Category
				<select class="brutal-field font-sans text-base normal-case" bind:value={kind}>
					{#each Object.keys(kinds) as k (k)}<option value={k}>{kinds[k]}</option>{/each}
				</select>
			</label>
			<label class={label}
				>Contributor
				<input class="brutal-field font-sans text-base normal-case" bind:value={by} />
			</label>
			<label class={label}
				>Serves
				<input
					class="brutal-field font-sans text-base normal-case"
					type="number"
					min="1"
					max="24"
					bind:value={servings}
				/>
			</label>
		</div>
		<fieldset>
			<legend class="font-mono text-xs font-bold tracking-wide uppercase">Good for</legend>
			<div class="mt-2 flex flex-wrap gap-x-6 gap-y-2">
				{#each Object.keys(meals) as k (k)}
					<label class="flex items-center gap-2 text-sm"
						><input type="checkbox" class="brutal-check" bind:checked={meal[k]} /> {meals[k]}</label
					>
				{/each}
			</div>
		</fieldset>
		<div class="grid gap-5 sm:grid-cols-2">
			<label class={label}
				>Equipment
				<input
					class="brutal-field font-sans text-base normal-case"
					bind:value={equip}
					placeholder="Oven, Instant Pot"
				/>
			</label>
			<label class={label}
				>Extra tags
				<input
					class="brutal-field font-sans text-base normal-case"
					bind:value={tags}
					placeholder="spicy, weeknight"
				/>
			</label>
		</div>
		<div class="flex flex-wrap gap-x-6 gap-y-2">
			<label class="flex items-center gap-2 text-sm"
				><input type="checkbox" class="brutal-check" bind:checked={freezer} /> Freezer-friendly</label
			>
			<label class="flex items-center gap-2 text-sm"
				><input type="checkbox" class="brutal-check" bind:checked={veg} /> Vegetarian</label
			>
		</div>
		<label class={label}
			>Ingredients <span class="font-sans font-normal tracking-normal text-ink/60 normal-case"
				>one per line, e.g. “2 cups chopped onion”</span
			>
			<textarea
				class="brutal-field font-sans text-base normal-case"
				rows="7"
				required
				bind:value={ings}></textarea>
		</label>
		<label class={label}
			>Method <span class="font-sans font-normal tracking-normal text-ink/60 normal-case"
				>one step per line</span
			>
			<textarea
				class="brutal-field font-sans text-base normal-case"
				rows="6"
				required
				bind:value={steps}></textarea>
		</label>
		<label class={label}
			>Notes <span class="font-sans font-normal tracking-normal text-ink/60 normal-case"
				>optional</span
			>
			<textarea class="brutal-field font-sans text-base normal-case" rows="2" bind:value={notes}
			></textarea>
		</label>
	</div>

	{#if draft.ing.length}
		<div class="brutal-box mt-8 bg-cream-2 p-6">
			<h3 class="font-display text-xl font-black">How I read your ingredients</h3>
			<ul class="mt-3 flex flex-col">
				{#each draft.ing as x, i (i)}
					<li
						class="flex justify-between gap-3 border-b border-ink/10 py-1.5 text-sm last:border-0"
					>
						<span>{lineText(x)}</span>
						<em class="font-mono text-xs text-ink/50 uppercase not-italic">{deptLabel(x.dept)}</em>
					</li>
				{/each}
			</ul>
			{#if hasGarlic(draft)}<p class="mt-3 font-mono text-xs font-bold uppercase">
					This recipe lists garlic.
				</p>{/if}
			<p class="mt-3 text-xs text-ink/70">
				Added fat: {Math.round(fat * 10) / 10} tbsp per serving{fat >= 2
					? ' (over the 2 tbsp guideline)'
					: ''}.
			</p>
		</div>
	{/if}

	<div class="mt-8 flex flex-wrap items-center gap-4">
		<button class="brutal-btn" type="submit">Save recipe</button>
		<p class="text-xs text-ink/60">Recipes you add are saved in this browser only.</p>
	</div>
</form>
