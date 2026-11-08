<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Travel — timotei.blog</title>
</svelte:head>

<section class="grid-bg border-b-[2.5px] border-ink bg-mustard">
	<div class="mx-auto max-w-6xl px-5 py-16 md:px-8">
		<span class="brutal-tag bg-cream">Trip log</span>
		<h1 class="mt-5 font-display text-5xl font-black">Travel</h1>
		<p class="mt-4 max-w-xl text-lg text-ink/80">
			Everywhere we've gone together, written up and filmed — mostly so future us remembers it
			right.
		</p>
	</div>
</section>

<section class="mx-auto max-w-6xl px-5 py-16 md:px-8">
	{#if data.posts.length}
		<div class="grid gap-6 md:grid-cols-3">
			{#each data.posts as post (post.slug)}
				<PostCard {post} />
			{/each}
		</div>
	{:else}
		<div class="brutal-box grid place-items-center bg-white p-16 text-center text-ink/50">
			<p class="font-mono text-sm uppercase">No trips posted yet</p>
		</div>
	{/if}
</section>
