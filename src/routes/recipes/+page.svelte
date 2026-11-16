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

<SectionHero title="What are we cooking?" />
<Browse />
