<script lang="ts">
	import type { Post } from '$lib/posts';

	let { data } = $props();

	const sectionHref: Record<Post['category'], string> = {
		travel: 'travel',
		gabe: 'blog',
		elyse: 'blog'
	};

	const explore: {
		href: string;
		num: string;
		title: string;
		blurb: string;
		bg: string;
		post: Post | undefined;
	}[] = $derived([
		{
			href: '/travel',
			num: '01',
			title: 'Travel',
			blurb: 'Trips, written up and filmed.',
			bg: 'bg-mustard',
			post: data.travel
		},
		{
			href: '/blog',
			num: '02',
			title: 'Blog',
			blurb: 'Whatever is on our minds lately.',
			bg: 'bg-blue',
			post: data.blog
		},
		{
			href: '/wedding',
			num: '03',
			title: 'Wedding',
			blurb: 'Photos, video, and the story of our day.',
			bg: 'bg-teal',
			post: undefined
		}
	]);
</script>

<svelte:head>
	<title>timotei.blog</title>
	<meta
		name="description"
		content="A personal blog for Gabe and Elyse — travels, everyday life, and everything in between."
	/>
</svelte:head>

<!-- Hero -->
<section class="grid-bg border-b-[2.5px] border-ink bg-purple">
	<div
		class="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-8 md:py-24"
	>
		<div>
			<h1 class="font-display text-5xl font-black text-cream md:text-6xl">
				Hi, we're Gabe &amp; Elyse.
			</h1>
			<p class="mt-5 max-w-md text-lg text-cream/90">
				This is our little corner of the internet — trips we've taken, the everyday stuff in
				between, and whatever else is on our minds. No feed, no algorithm, just us.
			</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<a href="/travel" class="brutal-btn bg-lime">See our travels</a>
				<a href="/blog" class="brutal-btn bg-cream">Read the blog</a>
			</div>
		</div>

		<div class="relative mx-auto w-full max-w-sm">
			<span
				class="absolute -top-5 -left-5 rotate-[-8deg] font-display text-3xl text-lime select-none"
				aria-hidden="true">✦</span
			>
			<span
				class="absolute -right-4 -bottom-6 rotate-[10deg] font-display text-4xl text-mustard select-none"
				aria-hidden="true">✦</span
			>
			<div class="brutal-box rotate-[-2deg] overflow-hidden bg-white p-3">
				<img
					src="/images/placeholder-couple.svg"
					alt="Gabe and Elyse"
					class="aspect-[4/3] w-full rounded-sm object-cover"
				/>
			</div>
		</div>
	</div>
</section>

<!-- Where to start -->
<section class="mx-auto max-w-6xl px-5 py-16 md:px-8">
	<h2 class="font-display text-3xl font-black">Where to start</h2>
	<div class="mt-8 grid gap-5 md:grid-cols-3">
		{#each explore as item (item.href)}
			<div class="brutal-box flex flex-col gap-6 p-6 {item.bg}">
				<span class="font-mono text-sm font-bold">{item.num}</span>
				<div>
					<h3 class="font-display text-2xl font-black">{item.title}</h3>
					<p class="mt-1 text-sm text-ink/80">{item.blurb}</p>
				</div>

				{#if item.href !== '/wedding'}
					<div class="mt-auto border-t-2 border-ink/20 pt-4">
						<p class="font-mono text-xs font-bold tracking-wide text-ink/60 uppercase">Latest</p>
						{#if item.post}
							<a
								href="/{sectionHref[item.post.category]}/{item.post.slug}"
								class="mt-1 block font-display text-lg font-black underline decoration-2 underline-offset-4"
							>
								{item.post.meta.title} →
							</a>
						{:else}
							<p class="mt-1 font-mono text-sm text-ink/50 uppercase">Nothing posted yet</p>
						{/if}
					</div>
				{:else}
					<div class="mt-auto"></div>
				{/if}

				<a
					href={item.href}
					class="font-mono text-sm font-bold tracking-wide uppercase underline decoration-2 underline-offset-4"
				>
					{item.href === '/wedding' ? 'View the wedding →' : 'Browse all →'}
				</a>
			</div>
		{/each}
	</div>
</section>
