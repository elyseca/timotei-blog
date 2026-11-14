<script lang="ts">
	import WeddingContent, { metadata } from '$lib/content/wedding/index.md';
	import VideoEmbed from '$lib/components/VideoEmbed.svelte';
	import { formatDate } from '$lib/format';

	const photoLinks = [
		{
			title: 'Professional photos',
			text: 'The full gallery from our photographer: every ceremony, portrait and reception moment, ready to view and download.',
			cta: 'View gallery',
			href: 'https://galleries.vidflow.co/reuug9a1',
			bg: 'bg-teal'
		},
		{
			title: 'Guest photos',
			text: "The candid moments our guests captured on their phones. Browse them all, and add yours if you haven't already!",
			cta: 'View & upload',
			href: 'https://my.guestpix.com/guest/181465/access/3eWyEMXC',
			bg: 'bg-mustard'
		}
	];
</script>

<svelte:head>
	<title>{metadata.title} — timotei.blog</title>
</svelte:head>

<section class="grid-bg border-b-[2.5px] border-ink bg-teal">
	<div class="mx-auto max-w-6xl px-5 py-16 md:px-8">
		<span class="rise-in brutal-tag bg-cream">Our wedding</span>
		<h1 class="rise-in mt-5 font-display text-5xl font-black md:text-6xl" style="--delay: 80ms">
			{metadata.title}
		</h1>
		<p
			class="rise-in mt-4 font-mono text-sm font-bold tracking-wide text-ink/70 uppercase"
			style="--delay: 140ms"
		>
			{formatDate(metadata.date)}
			{#if metadata.location}
				· {metadata.location}
			{/if}
		</p>
		<p class="rise-in mt-4 max-w-xl text-lg text-ink/80" style="--delay: 200ms">
			{metadata.excerpt}
		</p>
	</div>
</section>

<article class="mx-auto max-w-3xl px-5 py-14 md:px-8">
	{#if metadata.cover}
		<div class="rise-in brutal-box mx-auto max-w-md overflow-hidden" style="--delay: 240ms">
			<img
				src={metadata.cover}
				alt="Gabe dipping Elyse for a kiss in the aisle after the ceremony"
				class="w-full"
			/>
		</div>
	{/if}

	<div class="rise-in post-prose prose prose-lg mt-10 max-w-none" style="--delay: 320ms">
		<WeddingContent />
	</div>

	{#if metadata.video}
		<div class="reveal mt-10">
			<h2 class="font-display text-2xl font-black">The video</h2>
			<div class="mt-4">
				<VideoEmbed src={metadata.video} />
			</div>
		</div>
	{/if}

	<div class="mt-12">
		<h2 class="font-display text-2xl font-black">Photos from the day</h2>
		<div class="mt-4 grid gap-5 sm:grid-cols-2">
			{#each photoLinks as link (link.href)}
				<div class="brutal-box reveal flex flex-col p-6 {link.bg}">
					<h3 class="font-display text-xl font-black">{link.title}</h3>
					<p class="mt-2 flex-1 text-ink/80">{link.text}</p>
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						class="brutal-btn mt-5 self-start">{link.cta} →</a
					>
				</div>
			{/each}
		</div>
	</div>

	<div class="brutal-box reveal mt-12 bg-cream-2 p-6">
		<h2 class="font-display text-2xl font-black">Our wedding website</h2>
		<p class="mt-2 text-ink/80">
			The story of our engagement, the registry, and everything else from the big day lives at our
			wedding site.
		</p>
		<a
			href="https://www.timotei.wedding"
			target="_blank"
			rel="noopener noreferrer"
			class="brutal-btn mt-5 inline-block">Visit timotei.wedding →</a
		>
	</div>
</article>
