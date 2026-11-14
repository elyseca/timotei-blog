<script lang="ts">
	import { effort, fmtMins } from '$lib/recipes/engine';
	import type { Recipe } from '$lib/recipes/types';

	// full: label, hands-on and total time. short: label and total time. label: just the label.
	let { r, mode = 'full' }: { r: Recipe; mode?: 'full' | 'short' | 'label' } = $props();
	const e = $derived(effort(r));
</script>

<span
	class="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-xs font-bold tracking-wide uppercase"
	title="Effort {e.score} of 5: {fmtMins(e.active)} hands-on, {fmtMins(
		e.total
	)} start to finish, {e.items} ingredients, {e.steps} steps"
>
	<span class="inline-flex gap-0.5" aria-hidden="true">
		{#each [1, 2, 3, 4, 5] as n (n)}
			<span
				class="h-2 w-2 rounded-full border-[1.5px] border-ink {n <= Math.round(e.score)
					? 'bg-ink'
					: 'bg-transparent'}"
			></span>
		{/each}
	</span>
	<span>{e.label}</span>
	{#if mode === 'full'}
		<span class="font-medium text-ink/60 normal-case">
			{fmtMins(e.active)} hands-on · {fmtMins(e.total)} total
		</span>
	{:else if mode === 'short'}
		<span class="font-medium text-ink/60 normal-case">{fmtMins(e.total)}</span>
	{/if}
</span>
