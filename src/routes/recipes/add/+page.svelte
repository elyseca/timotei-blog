<script lang="ts">
	import SectionHero from '$lib/components/recipes/SectionHero.svelte';
	import AddRecipeForm from '$lib/components/recipes/AddRecipeForm.svelte';
</script>

<svelte:head>
	<title>Add a recipe — timotei.blog</title>
</svelte:head>

<SectionHero tag="Recipe book" title="Add a recipe" bg="bg-teal" />
<AddRecipeForm />
