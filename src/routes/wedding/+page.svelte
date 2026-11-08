<script lang="ts">
	import WeddingContent, { metadata } from '$lib/content/wedding/index.md';
	import VideoEmbed from '$lib/components/VideoEmbed.svelte';
	import { formatDate } from '$lib/format';
</script>

<svelte:head>
	<title>{metadata.title} — timotei.blog</title>
</svelte:head>

<section class="grid-bg border-b-[2.5px] border-ink bg-teal">
	<div class="mx-auto max-w-6xl px-5 py-16 md:px-8">
		<span class="brutal-tag bg-cream">Our wedding</span>
		<h1 class="mt-5 font-display text-5xl font-black md:text-6xl">{metadata.title}</h1>
		<p class="mt-4 font-mono text-sm font-bold tracking-wide text-ink/70 uppercase">
			{formatDate(metadata.date)}
			{#if metadata.location}
				· {metadata.location}
			{/if}
		</p>
		<p class="mt-4 max-w-xl text-lg text-ink/80">{metadata.excerpt}</p>
	</div>
</section>

<article class="mx-auto max-w-3xl px-5 py-14 md:px-8">
	{#if metadata.cover}
		<div class="brutal-box overflow-hidden">
			<img src={metadata.cover} alt="" class="aspect-video w-full object-cover" />
		</div>
	{/if}

	<div class="post-prose prose prose-lg mt-10 max-w-none">
		<WeddingContent />
	</div>

	<div class="mt-10">
		<h2 class="font-display text-2xl font-black">The video</h2>
		<div class="mt-4">
			<VideoEmbed src={metadata.video} />
		</div>
	</div>

	{#if metadata.gallery?.length}
		<div class="mt-10">
			<h2 class="font-display text-2xl font-black">Photos</h2>
			<div class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
				{#each metadata.gallery as photo, i (photo + i)}
					<div class="brutal-box overflow-hidden">
						<img src={photo} alt="" class="aspect-square w-full object-cover" />
					</div>
				{/each}
			</div>
		</div>
	{/if}
</article>
