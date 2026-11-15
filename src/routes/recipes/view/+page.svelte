<script lang="ts">
	import { onMount } from 'svelte';
	import RecipeView from '$lib/components/recipes/RecipeView.svelte';

	// The recipe id lives in the URL hash (/recipes/view#chili) so the page can stay a static file,
	// and so recipes you add in the browser work too.
	let id = $state('');
	// Nothing is shown until the hash has been read, so a shared link never flashes "not here".
	let loaded = $state(false);
	const read = () => {
		id = decodeURIComponent(location.hash.slice(1));
		loaded = true;
		window.scrollTo(0, 0);
	};
	onMount(read);
</script>

<svelte:head>
	<title>Recipe — timotei.blog</title>
</svelte:head>

<svelte:window onhashchange={read} />

{#if loaded}
	{#key id}
		<RecipeView {id} />
	{/key}
{:else}
	<div class="min-h-[60vh]"></div>
{/if}
