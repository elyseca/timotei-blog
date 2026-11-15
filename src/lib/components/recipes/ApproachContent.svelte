<script lang="ts">
	import { ui, allRecipes } from '$lib/recipes/store.svelte';
	import { effort, effortLevel, planPool, EFFORT_SCALE } from '$lib/recipes/engine';
	import { CDAYS } from '$lib/recipes/plan';
	import type { Recipe } from '$lib/recipes/types';
	import PlateSVG from './PlateSVG.svelte';

	// Example dishes for each level, taken from the everyday mains the planner uses.
	const examples = $derived(
		EFFORT_SCALE.map((l) =>
			planPool(allRecipes(), 'everyday')
				.filter((r: Recipe) => r.mins && effortLevel(effort(r).score) === l.level)
				.map((r: Recipe) => r.title)
		)
	);

	const rows = [
		{
			dot: 'bg-teal',
			head: '½ Vegetables',
			text: 'Roasted, steamed, or cooked into the soup. Broccoli, asparagus, zucchini, fennel, arugula.'
		},
		{
			dot: 'bg-mustard',
			head: '¼ Carbs',
			text: 'Quinoa, farro, potatoes, sweet potatoes, rice, couscous.'
		},
		{ dot: 'bg-coral', head: '¼ Protein', text: 'Chicken, turkey, salmon, beans, lentils, tofu.' },
		{
			dot: 'bg-white',
			head: 'Under 2 tbsp fat',
			text: 'Added oil or butter per serving.'
		}
	];
</script>

<div class="mx-auto flex max-w-4xl flex-col gap-8 px-5 py-12 md:px-8">
	<p class="brutal-box reveal bg-cream-2 p-5 font-semibold text-ink/90">
		This method is for our everyday healthy meals, the ones listed in the recipe book and the meal
		planner. It does not apply to special-occasion cooking.
	</p>

	<section
		class="brutal-box reveal grid gap-8 bg-white p-6 md:grid-cols-[auto_1fr] md:items-center"
	>
		<div class="mx-auto"><PlateSVG size={190} /></div>
		<div class="flex flex-col gap-4">
			{#each rows as row (row.head)}
				<div class="flex gap-3">
					<span class="mt-1.5 size-4 shrink-0 rounded-full border-2 border-ink {row.dot}"></span>
					<div>
						<strong class="font-display text-lg font-black">{row.head}</strong>
						<p class="text-sm text-ink/75">{row.text}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="brutal-box reveal bg-mustard p-6">
		<h2 class="font-display text-3xl font-black">Breakfast</h2>
		<div class="mt-4 flex flex-wrap items-center gap-6">
			<div class="brutal-box bg-white px-6 py-4 text-center">
				<div class="font-display text-4xl font-black">≈ 12 g</div>
				<div class="font-mono text-xs font-bold tracking-wide uppercase">protein</div>
			</div>
			<p class="min-w-60 flex-1 text-ink/85">
				Breakfasts are built around about 12 g of protein, which is roughly two large eggs. Add a
				carb alongside, aiming for about 30 g (a suggestion, so adjust it to taste): oats, toast, or
				fruit.
			</p>
		</div>
		<p class="mt-4 font-mono text-sm font-bold tracking-wide uppercase">
			<a
				href="/recipes"
				class="underline decoration-2 underline-offset-4"
				onclick={() => (ui.F.meal = 'breakfast')}
			>
				See breakfast recipes →
			</a>
		</p>
	</section>

	<section class="brutal-box reveal bg-white p-6">
		<h2 class="font-display text-3xl font-black">Lunch and dinner</h2>
		<p class="mt-3 text-ink/85">The other two meals of the day follow the plate above.</p>
		<div class="mt-5 overflow-x-auto">
			<div
				class="grid min-w-[30rem] grid-cols-[5rem_repeat(7,minmax(0,1fr))] gap-1.5 text-center font-mono text-xs font-bold uppercase"
				role="img"
				aria-label="A week: breakfast every day, plus lunch and dinner on the plate method"
			>
				<span></span>
				{#each CDAYS as d (d)}<span>{d}</span>{/each}
				<span class="self-center text-left">Breakfast</span>
				{#each CDAYS as d (d)}<span class="h-8 rounded-md border-2 border-ink bg-mustard"
					></span>{/each}
				<span class="self-center text-left">Lunch</span>
				{#each CDAYS as d (d)}<span class="h-8 rounded-md border-2 border-ink bg-teal"
					></span>{/each}
				<span class="self-center text-left">Dinner</span>
				{#each CDAYS as d (d)}<span class="h-8 rounded-md border-2 border-ink bg-teal"
					></span>{/each}
			</div>
		</div>
	</section>

	<section class="brutal-box reveal bg-white p-6">
		<h2 class="font-display text-3xl font-black">How much effort a meal is</h2>
		<p class="mt-3 text-ink/85">
			Every everyday meal gets an effort level from 1 to 5, shown as dots on the recipe and in the
			planner. It comes from the hands-on time, the time start to table, and how many ingredients
			and steps there are. Use Quick &amp; easy in the planner to keep to levels 1 and 2.
		</p>
		<div class="mt-5 flex flex-col">
			{#each EFFORT_SCALE as l, i (l.level)}
				<div
					class="grid gap-x-4 gap-y-1 border-t-2 border-ink/15 py-3 first:border-0 md:grid-cols-[7rem_1fr_1fr]"
				>
					<div class="flex items-center gap-2 font-mono text-xs font-bold tracking-wide uppercase">
						<span class="inline-flex gap-0.5" aria-hidden="true">
							{#each [1, 2, 3, 4, 5] as n (n)}
								<span
									class="h-2 w-2 rounded-full border-[1.5px] border-ink {n <= l.level
										? 'bg-ink'
										: 'bg-transparent'}"
								></span>
							{/each}
						</span>
						{l.level}
					</div>
					<div>
						<strong class="font-display text-lg font-black">{l.name}</strong>
						<p class="text-sm text-ink/75">{l.feel}</p>
						{#if examples[i].length}
							<p class="mt-1 text-xs text-ink/60">e.g. {examples[i].slice(0, 4).join(', ')}</p>
						{/if}
					</div>
					<p class="font-mono text-xs font-bold tracking-wide uppercase">
						{l.active} hands-on
						<span class="block text-ink/60">{l.total} total</span>
					</p>
				</div>
			{/each}
		</div>
	</section>

	<div class="flex flex-wrap gap-3">
		<a href="/recipes/plan" class="brutal-btn">Build a meal plan</a>
		<a href="/recipes" class="brutal-btn bg-white">Browse recipes</a>
	</div>
</div>
