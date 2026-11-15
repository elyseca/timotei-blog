<script lang="ts">
	import { page } from '$app/state';
	import { S } from '$lib/recipes/store.svelte';

	// In the order people use them: browse, plan the week, shop, then give back, with the method last.
	const tabs = [
		{ href: '/recipes', label: 'Recipes' },
		{ href: '/recipes/plan', label: 'Meal Plan' },
		{ href: '/recipes/groceries', label: 'Grocery List' },
		{ href: '/recipes/add', label: 'Add a Recipe' },
		{ href: '/recipes/approach', label: 'Our Method' }
	];
	let bar = $state<HTMLElement>();
	// On a phone the tabs scroll sideways: bring the current one into view.
	$effect(() => {
		page.url.pathname;
		const el = bar?.querySelector<HTMLElement>('[aria-current="page"]');
		if (bar && el) bar.scrollLeft = el.offsetLeft - (bar.clientWidth - el.offsetWidth) / 2;
	});

	function isActive(href: string) {
		const p = page.url.pathname.replace(/\/$/, '');
		if (href === '/recipes') return p === '/recipes' || p === '/recipes/view';
		return p === href;
	}
</script>

<div class="border-b-[2.5px] border-ink bg-cream-2">
	<nav
		bind:this={bar}
		class="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-3 md:px-8"
		aria-label="Recipe book"
	>
		{#each tabs as tab (tab.href)}
			<a
				href={tab.href}
				aria-current={isActive(tab.href) ? 'page' : undefined}
				class="shrink-0 rounded-lg border-2 px-3.5 py-1.5 font-mono text-xs font-bold tracking-wide uppercase transition-[color,background-color,border-color,translate,box-shadow] duration-150 {isActive(
					tab.href
				)
					? 'border-ink bg-ink text-cream'
					: 'border-ink bg-white hover:-translate-y-0.5 hover:shadow-hard-sm'}"
			>
				{tab.label}
				{#if tab.href === '/recipes/plan' && S.plan.length}
					<span class="ml-1 rounded-full bg-lime px-1.5 text-ink">{S.plan.length}</span>
				{/if}
			</a>
		{/each}
	</nav>
</div>
