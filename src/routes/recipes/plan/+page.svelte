<script lang="ts">
	import { S } from '$lib/recipes/store.svelte';
	import SectionHero from '$lib/components/recipes/SectionHero.svelte';
	import Wizard from '$lib/components/recipes/Wizard.svelte';
	import PlanSteps from '$lib/components/recipes/PlanSteps.svelte';
	import Chosen from '$lib/components/recipes/Chosen.svelte';
	import { t } from '$lib/i18n.svelte';
</script>

<svelte:head>
	<title>{t('Meal Plan')} — timotei.blog</title>
</svelte:head>

<SectionHero tag={t('Meal plan')} title={t('Plan the week')} bg="bg-mustard" />
<PlanSteps step={S.plan.length ? 2 : 1} />
{#if S.plan.length}
	<Chosen />
{:else}
	<Wizard />
{/if}
