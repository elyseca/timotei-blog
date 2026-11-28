<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import SectionHero from '$lib/components/recipes/SectionHero.svelte';
	import { t } from '$lib/i18n.svelte';
	import { chapters as oldestFirst } from './story';
	import StoryVideos from './StoryVideos.svelte';

	// Newest at the top.
	const chapters = [...oldestFirst].reverse();

	// Which photo each chapter is showing.
	let shown = $state(chapters.map(() => 0));

	function step(i: number, by: number) {
		const n = chapters[i].photos.length;
		shown[i] = (shown[i] + by + n) % n;
	}

	function jump(id: string) {
		document
			.getElementById(id)
			?.scrollIntoView({ behavior: prefersReducedMotion.current ? 'auto' : 'smooth' });
	}
</script>

<svelte:head>
	<title>{t('Our Story')} — timotei.blog</title>
</svelte:head>

<div id="story-top" class="scroll-mt-24">
	<SectionHero
		tag="Gabe & Elyse"
		title="Our Story"
		blurb="Every love story is beautiful, but ours is our favorite. Here's how our journey began and where it's taking us."
		bg="bg-purple"
	/>
</div>

<div class="mx-auto max-w-4xl px-5 pt-8 md:px-8">
	<button
		class="brutal-btn group flex items-center gap-2 bg-lime"
		onclick={() => jump('the-beginning')}
	>
		<span>{t('Rewind to where it all began')}</span>
		<span class="inline-block motion-safe:animate-bounce" aria-hidden="true">↓</span>
	</button>
</div>

<ol class="relative mx-auto max-w-4xl px-5 py-10 md:px-8 md:py-14">
	<!-- timeline spine -->
	<span
		class="absolute top-10 bottom-10 left-[1.9rem] w-[3px] bg-ink md:left-1/2 md:-translate-x-1/2"
		aria-hidden="true"
	></span>

	{#each chapters as ch, i (ch.title)}
		{@const photo = ch.photos[shown[i]]}
		<li
			id={i === chapters.length - 1 ? 'the-beginning' : undefined}
			class="reveal relative mb-10 scroll-mt-24 pl-10 last:mb-0 md:mb-14 md:grid md:grid-cols-2 md:gap-x-12 md:pl-0"
		>
			<span
				class="absolute top-5 left-[1.9rem] h-4 w-4 -translate-x-1/2 rotate-45 border-[2.5px] border-ink {ch.bg} md:left-1/2"
				aria-hidden="true"
			></span>

			<div class={i % 2 ? 'md:col-start-2' : 'md:col-start-1 md:text-right'}>
				<span class="brutal-tag {ch.bg}">{t(ch.when)}</span>
				<h2 class="mt-3 font-display text-2xl font-black md:text-3xl">{t(ch.title)}</h2>
				<p class="mt-3 text-ink/80">{t(ch.text)}</p>
				{#if ch.link}
					<a href={ch.link.href} class="brutal-btn mt-4 inline-block {ch.bg}"
						>{t(ch.link.label)} →</a
					>
				{/if}
			</div>

			{#if photo}
				<figure
					class="brutal-box mt-4 overflow-hidden bg-white md:row-start-1 md:mt-0 {i % 2
						? 'md:col-start-1'
						: 'md:col-start-2'}"
				>
					<div class="relative aspect-[4/3] bg-cream-2">
						{#key photo.src}
							<img
								src={photo.src}
								alt={t(photo.alt)}
								loading="lazy"
								class="h-full w-full object-cover"
							/>
						{/key}
					</div>
					<figcaption
						class="flex min-h-11 items-center justify-between gap-2 border-t-[2.5px] border-ink px-3 py-1.5 text-sm"
					>
						<span class="font-mono font-bold">{t(photo.alt)}</span>
						{#if ch.photos.length > 1}
							<span class="flex shrink-0 items-center gap-2">
								<button
									class="brutal-chip tap"
									onclick={() => step(i, -1)}
									aria-label={t('Previous photo')}>←</button
								>
								<span class="font-mono text-xs">{shown[i] + 1} / {ch.photos.length}</span>
								<button
									class="brutal-chip tap"
									onclick={() => step(i, 1)}
									aria-label={t('Next photo')}>→</button
								>
							</span>
						{/if}
					</figcaption>
				</figure>
			{/if}

			{#if ch.videos?.length}
				<StoryVideos videos={ch.videos} />
			{/if}
		</li>
	{/each}
</ol>

<div class="mx-auto max-w-4xl px-5 pb-14 md:px-8">
	<button class="brutal-btn flex items-center gap-2 bg-mustard" onclick={() => jump('story-top')}>
		<span class="inline-block motion-safe:animate-bounce" aria-hidden="true">↑</span>
		<span>{t('Fast-forward to today')}</span>
	</button>
</div>
