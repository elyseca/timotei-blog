<script lang="ts">
	import { S } from '$lib/recipes/store.svelte';
	import { setHousehold, setPerPlan, mealsOf } from '$lib/recipes/plan';
	import { WEEK_MEALS } from '$lib/recipes/engine';
	import Stepper from './Stepper.svelte';

	// withCount: show the "Recipes" stepper (the pick-a-plan screen) and the summary line under it.
	let { withCount = false }: { withCount?: boolean } = $props();

	const total = $derived(S.perPlan * S.servingsPer);
	const meals = $derived(mealsOf(total));
</script>

<div class="flex flex-wrap gap-x-8 gap-y-3">
	<div class="flex items-center gap-3">
		<span class="font-mono text-xs font-bold tracking-wide uppercase">Who's eating</span>
		<Stepper
			value={S.household}
			label="People"
			ondec={() => setHousehold(-1)}
			oninc={() => setHousehold(1)}
		/>
	</div>
	{#if withCount}
		<div class="flex items-center gap-3">
			<span class="font-mono text-xs font-bold tracking-wide uppercase">Recipes</span>
			<Stepper
				value={S.perPlan}
				label="Recipes per plan"
				ondec={() => setPerPlan(-1)}
				oninc={() => setPerPlan(1)}
			/>
		</div>
	{/if}
</div>
{#if withCount}
	<p class="mt-4 font-mono text-xs font-bold tracking-wide uppercase">
		{total} servings · {meals} meals each{meals > WEEK_MEALS ? ' (over a week)' : ''}
	</p>
{/if}
