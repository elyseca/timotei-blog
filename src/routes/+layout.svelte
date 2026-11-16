<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { initPrefs } from '$lib/i18n.svelte';
	import { prefersReducedMotion } from 'svelte/motion';

	let { children } = $props();
	onMount(initPrefs);

	// Cross-fade between pages where the browser supports view transitions.
	onNavigate((navigation) => {
		if (!document.startViewTransition || prefersReducedMotion.current) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen flex-col">
	<Nav />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
