<script lang="ts">
	import { t } from '$lib/i18n.svelte';
	// Same hero band the Travel / Wedding pages use, so the recipe pages feel like part of the site.
	let {
		tag,
		title,
		blurb = '',
		bg = 'bg-coral'
	}: { tag: string; title: string; blurb?: string; bg?: string } = $props();
</script>

<section class="grid-bg border-b-[2.5px] border-ink {bg}">
	<div class="mx-auto max-w-6xl px-5 py-5 md:px-8 md:py-8">
		<span class="rise-in brutal-tag bg-cream">{t(tag)}</span>
		<h1
			class="rise-in mt-2 font-display text-3xl font-black md:mt-3 md:text-5xl"
			style="--delay: 80ms"
		>
			{t(title)}
		</h1>
		{#if blurb}
			<p class="rise-in mt-4 max-w-xl text-lg text-ink/80" style="--delay: 160ms">{t(blurb)}</p>
		{/if}
	</div>
</section>
