<script lang="ts">
	import VideoEmbed from '$lib/components/VideoEmbed.svelte';
	import { formatDate } from '$lib/format';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title} — timotei.blog</title>
</svelte:head>

<article class="mx-auto max-w-3xl px-5 py-14 md:px-8">
	<a
		href="/travel"
		class="group font-mono text-sm font-bold tracking-wide uppercase underline decoration-2 underline-offset-4"
	>
		<span class="inline-block transition-[translate] duration-200 group-hover:-translate-x-1"
			>←</span
		> All travel
	</a>

	<header class="rise-in mt-6">
		<p class="font-mono text-xs font-bold tracking-wide text-ink/60 uppercase">
			{formatDate(data.meta.date)}
			{#if data.meta.location}
				· {data.meta.location}
			{/if}
		</p>
		<h1 class="mt-2 font-display text-4xl font-black md:text-5xl">{data.meta.title}</h1>
	</header>

	{#if data.meta.cover}
		<div class="rise-in brutal-box mt-8 overflow-hidden" style="--delay: 100ms">
			<img src={data.meta.cover} alt="" class="aspect-video w-full object-cover" />
		</div>
	{/if}

	<div class="rise-in post-prose prose prose-lg mt-10 max-w-none" style="--delay: 180ms">
		<data.content />
	</div>

	<div class="reveal mt-10">
		<h2 class="font-display text-2xl font-black">The video</h2>
		<div class="mt-4">
			<VideoEmbed src={data.meta.video} />
		</div>
	</div>
</article>
