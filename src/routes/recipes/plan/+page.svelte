<script lang="ts">
	import { S } from '$lib/recipes/store.svelte';
	import SectionHero from '$lib/components/recipes/SectionHero.svelte';
	import Wizard from '$lib/components/recipes/Wizard.svelte';
	import Chosen from '$lib/components/recipes/Chosen.svelte';
</script>

<svelte:head>
	<title>Meal Plan — timotei.blog</title>
</svelte:head>

<SectionHero
	tag="Meal plan"
	title="Plan the week"
	blurb="Pick a plan, get one grocery list, then schedule who cooks what."
	bg="bg-mustard"
/>
{#if S.plan.length}
	<Chosen />
{:else}
	<Wizard />
{/if}
