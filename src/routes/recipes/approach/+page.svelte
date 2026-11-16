<script lang="ts">
	import { t } from '$lib/i18n.svelte';
	import SectionHero from '$lib/components/recipes/SectionHero.svelte';
	import ApproachContent from '$lib/components/recipes/ApproachContent.svelte';
</script>

<svelte:head>
	<title>{t('Our Method')} — timotei.blog</title>
</svelte:head>

<SectionHero tag={t('Our method')} title={t('One plate, every everyday meal')} bg="bg-blue" />
<ApproachContent />
