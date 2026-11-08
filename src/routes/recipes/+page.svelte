<script lang="ts">
	import SectionHero from '$lib/components/recipes/SectionHero.svelte';
	import Browse from '$lib/components/recipes/Browse.svelte';
</script>

<svelte:head>
	<title>Recipes — timotei.blog</title>
	<meta
		name="description"
		content="Our recipe book: everyday plate-method meals, breakfasts, and treats."
	/>
</svelte:head>

<SectionHero
	tag="Recipe book"
	title="What are we cooking?"
	blurb="Everyday meals built on one plate, plus breakfasts and treats. Search, filter, or add them to a meal plan."
/>
<Browse />
