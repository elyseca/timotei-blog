<script lang="ts">
	// Same hero band the Travel / Wedding pages use, so the recipe pages feel like part of the site.
	let {
		tag,
		title,
		blurb = '',
		bg = 'bg-coral'
	}: { tag: string; title: string; blurb?: string; bg?: string } = $props();
</script>

<section class="grid-bg border-b-[2.5px] border-ink {bg}">
	<div class="mx-auto max-w-6xl px-5 py-14 md:px-8">
		<span class="rise-in brutal-tag bg-cream">{tag}</span>
		<h1 class="rise-in mt-5 font-display text-5xl font-black md:text-6xl" style="--delay: 80ms">
			{title}
		</h1>
		{#if blurb}
			<p class="rise-in mt-4 max-w-xl text-lg text-ink/80" style="--delay: 160ms">{blurb}</p>
		{/if}
	</div>
</section>
