<script lang="ts">
	import { page } from '$app/state';
	import { slide, fly } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
	import PrefsBar from './PrefsBar.svelte';
	import { t } from '$lib/i18n.svelte';

	// Home and Travel are paused for now (not linked here); their pages are still in the project.
	const links = [
		{ href: '/our-story', label: 'Our Story' },
		{ href: '/wedding', label: 'Wedding' },
		{ href: '/recipes', label: 'Recipes' }
	];

	let open = $state(false);

	const ms = (duration: number) => (prefersReducedMotion.current ? 0 : duration);

	function isActive(href: string) {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

<header
	class="sticky top-0 z-40 border-b-[2.5px] border-ink bg-cream [view-transition-name:site-header]"
>
	<div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
		<a href="/" class="font-display text-2xl font-black tracking-tight lowercase">
			timotei<span class="text-purple">.</span>blog
		</a>

		<nav class="hidden items-center gap-1 md:flex">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="rounded-lg border-2 px-3.5 py-1.5 font-mono text-sm font-bold tracking-wide uppercase transition-[color,background-color,border-color,translate,box-shadow] duration-150 {isActive(
						link.href
					)
						? 'border-ink bg-ink text-cream'
						: 'border-transparent hover:-translate-y-0.5 hover:border-ink hover:bg-white hover:shadow-hard-sm'}"
				>
					{t(link.label)}
				</a>
			{/each}
			<span class="ml-2"><PrefsBar /></span>
		</nav>

		<button
			class="brutal-btn grid w-[4.5rem] place-items-center overflow-hidden bg-white px-3 py-2 md:hidden"
			onclick={() => (open = !open)}
			aria-expanded={open}
			aria-label={t('Toggle menu')}
		>
			{#key open}
				<span
					class="col-start-1 row-start-1"
					in:fly={{ y: 10, duration: ms(160) }}
					out:fly={{ y: -10, duration: ms(160) }}
				>
					{open ? t('Close') : t('Menu')}
				</span>
			{/key}
		</button>
	</div>

	{#if open}
		<nav
			transition:slide={{ duration: ms(220) }}
			class="flex flex-col gap-2 border-t-[2.5px] border-ink bg-cream px-5 py-4 md:hidden"
		>
			{#each links as link, i (link.href)}
				<a
					href={link.href}
					onclick={() => (open = false)}
					in:fly|global={{ x: -16, duration: ms(220), delay: ms(60 + i * 40) }}
					class="rounded-lg border-2 px-3.5 py-2 font-mono text-sm font-bold tracking-wide uppercase {isActive(
						link.href
					)
						? 'border-ink bg-ink text-cream'
						: 'border-ink bg-white'}"
				>
					{t(link.label)}
				</a>
			{/each}
			<div class="pt-1 [&_button]:flex-1 [&_button]:text-center [&>div]:w-full"><PrefsBar /></div>
		</nav>
	{/if}
</header>
