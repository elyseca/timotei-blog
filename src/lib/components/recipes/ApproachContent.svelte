<script lang="ts">
	import { ui } from '$lib/recipes/store.svelte';
	import { CDAYS } from '$lib/recipes/plan';
	import PlateSVG from './PlateSVG.svelte';

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

	<div class="flex flex-wrap gap-3">
		<a href="/recipes/plan" class="brutal-btn">Build a meal plan</a>
		<a href="/recipes" class="brutal-btn bg-white">Browse recipes</a>
	</div>
</div>
