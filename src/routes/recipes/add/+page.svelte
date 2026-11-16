<script lang="ts">
	import { t } from '$lib/i18n.svelte';
	import SectionHero from '$lib/components/recipes/SectionHero.svelte';
	import AddRecipe from '$lib/components/recipes/AddRecipe.svelte';
</script>

<svelte:head>
	<title>{t('Add a Recipe')} — timotei.blog</title>
</svelte:head>

<SectionHero title={t('Add a recipe')} bg="bg-teal" />
<AddRecipe />
