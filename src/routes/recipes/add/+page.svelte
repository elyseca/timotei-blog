<script lang="ts">
	import SectionHero from '$lib/components/recipes/SectionHero.svelte';
	import AddRecipe from '$lib/components/recipes/AddRecipe.svelte';
</script>

<svelte:head>
	<title>Add a Recipe — timotei.blog</title>
</svelte:head>

<SectionHero tag="Recipe book" title="Add a recipe" bg="bg-teal" />
<AddRecipe />
