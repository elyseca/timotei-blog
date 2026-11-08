<script lang="ts">
	import { page } from '$app/state';
	import { slide, fly } from 'svelte/transition';

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/wedding', label: 'Wedding' },
		{ href: '/travel', label: 'Travel' },
		{ href: '/blog', label: 'Blog' }
	];

	let open = $state(false);

	function isActive(href: string) {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

<header class="sticky top-0 z-40 border-b-[2.5px] border-ink bg-cream">
	<div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
		<a href="/" class="font-display text-2xl font-black tracking-tight lowercase">
			timotei<span class="text-purple">.</span>blog
		</a>

		<nav class="hidden items-center gap-1 md:flex">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="rounded-lg border-2 px-3.5 py-1.5 font-mono text-sm font-bold tracking-wide uppercase transition-colors {isActive(
						link.href
					)
						? 'border-ink bg-ink text-cream'
						: 'border-transparent hover:border-ink hover:bg-white'}"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<button
			class="brutal-btn grid w-[4.5rem] place-items-center overflow-hidden bg-white px-3 py-2 md:hidden"
			onclick={() => (open = !open)}
			aria-expanded={open}
			aria-label="Toggle menu"
		>
			{#key open}
				<span
					class="col-start-1 row-start-1"
					in:fly={{ y: 10, duration: 160 }}
					out:fly={{ y: -10, duration: 160 }}
				>
					{open ? 'Close' : 'Menu'}
				</span>
			{/key}
		</button>
	</div>

	{#if open}
		<nav
			transition:slide={{ duration: 220 }}
			class="flex flex-col gap-2 border-t-[2.5px] border-ink bg-cream px-5 py-4 md:hidden"
		>
			{#each links as link (link.href)}
				<a
					href={link.href}
					onclick={() => (open = false)}
					class="rounded-lg border-2 px-3.5 py-2 font-mono text-sm font-bold tracking-wide uppercase {isActive(
						link.href
					)
						? 'border-ink bg-ink text-cream'
						: 'border-ink bg-white'}"
				>
					{link.label}
				</a>
			{/each}
		</nav>
	{/if}
</header>
