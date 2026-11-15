<script lang="ts">
	import { S } from '$lib/recipes/store.svelte';
	import { planItems } from '$lib/recipes/plan';
	import SectionHero from '$lib/components/recipes/SectionHero.svelte';
	import PlanSteps from '$lib/components/recipes/PlanSteps.svelte';
	import GroceryList from '$lib/components/recipes/GroceryList.svelte';

	const items = $derived(planItems());
</script>

<svelte:head>
	<title>Grocery List — timotei.blog</title>
</svelte:head>

<SectionHero tag="Meal plan" title="Grocery list" bg="bg-mustard" />
<PlanSteps step={3} />

<div class="mx-auto max-w-6xl px-5 pt-10 md:px-8">
	<a
		href="/recipes/plan"
		class="font-mono text-sm font-bold tracking-wide uppercase underline decoration-2 underline-offset-4"
	>
		← Back to the plan
	</a>
</div>

{#if S.plan.length}
	<GroceryList {items} />
{:else}
	<section class="mx-auto max-w-6xl px-5 py-8 md:px-8">
		<p class="text-lg">Nothing planned yet. Pick a plan first and the list will build itself.</p>
		<a href="/recipes/plan" class="brutal-btn mt-5 inline-block">Plan the week →</a>
	</section>
{/if}
