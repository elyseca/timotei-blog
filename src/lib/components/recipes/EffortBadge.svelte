<script lang="ts">
	import { effort, effortLevel, EFFORT_SCALE } from '$lib/recipes/engine';
	import { t } from '$lib/i18n.svelte';
	import type { Recipe } from '$lib/recipes/types';

	// Dots only; the Legend explains them. Pass `label` on a recipe's own page to name the level.
	let { r, label = false }: { r: Recipe; label?: boolean } = $props();
	const level = $derived(effortLevel(effort(r).score));
	const name = $derived(EFFORT_SCALE[level - 1].name);
</script>

<span
	class="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-wide uppercase"
	title={t('Effort {level} of 5: {name}', { level, name: t(name) })}
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
	{#if label}<span>{t(name)}</span>{:else}<span class="sr-only"
			>{t('Effort {level} of 5, {name}', { level, name: t(name) })}</span
		>{/if}
</span>
