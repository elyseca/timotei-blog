<script lang="ts">
	import { onMount } from 'svelte';
	import RecipeView from '$lib/components/recipes/RecipeView.svelte';

	// The recipe id lives in the URL hash (/recipes/view#chili) so the page can stay a static file,
	// and so recipes you add in the browser work too.
	let id = $state('');
	const read = () => {
		id = decodeURIComponent(location.hash.slice(1));
		window.scrollTo(0, 0);
	};
	onMount(read);
</script>

<svelte:head>
	<title>Recipe — timotei.blog</title>
</svelte:head>

<svelte:window onhashchange={read} />

{#key id}
	<RecipeView {id} />
{/key}
