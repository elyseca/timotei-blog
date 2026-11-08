<script lang="ts">
	import { S } from '$lib/recipes/store.svelte';
	import { togglePlan } from '$lib/recipes/plan';
	import type { Recipe } from '$lib/recipes/types';

	let { r }: { r: Recipe } = $props();
	const inPlan = $derived(S.plan.some((p) => p.id === r.id));
	const note = $derived(
		[r.freezer ? 'Freezes' : '', r.by && r.by !== 'Elyse' ? r.by : ''].filter(Boolean).join(' · ')
	);
</script>

<article
	class="brutal-box reveal flex flex-col overflow-hidden transition-[translate,box-shadow] duration-200 ease-out hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard-lg"
>
	<a href="/recipes/view#{r.id}" class="flex flex-1 flex-col gap-2 p-5">
		<h3 class="font-display text-xl font-black">{r.title}</h3>
		<p class="line-clamp-3 flex-1 text-sm text-ink/75">{r.blurb}</p>
	</a>
	<div
		class="flex items-center justify-between gap-3 border-t-[2.5px] border-ink bg-cream-2 px-5 py-3"
	>
		<span class="font-mono text-xs font-bold tracking-wide text-ink/60 uppercase">
			{note}
		</span>
		<button
			type="button"
			class="brutal-chip"
			aria-pressed={inPlan}
			onclick={() => togglePlan(r.id)}
		>
			{inPlan ? '✓ In plan' : '+ Plan'}
		</button>
	</div>
</article>
