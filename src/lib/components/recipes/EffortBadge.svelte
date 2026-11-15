<script lang="ts">
	import { effort, effortLevel } from '$lib/recipes/engine';
	import type { Recipe } from '$lib/recipes/types';

	// Shows the effort level only. The minutes behind it live in the Method tab's scale.
	let { r }: { r: Recipe } = $props();
	const e = $derived(effort(r));
	const level = $derived(effortLevel(e.score));
</script>

<span
	class="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-xs font-bold tracking-wide uppercase"
	title="Effort {level} of 5"
>
	<span class="inline-flex gap-0.5" aria-hidden="true">
		{#each [1, 2, 3, 4, 5] as n (n)}
			<span
				class="h-2 w-2 rounded-full border-[1.5px] border-ink {n <= level
					? 'bg-ink'
					: 'bg-transparent'}"
			></span>
		{/each}
	</span>
	<span>{e.label}</span>
</span>
