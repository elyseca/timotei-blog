<script lang="ts">
	import { DIETS, EFFORT_SCALE } from '$lib/recipes/engine';
	import DietDot from './DietDot.svelte';
	import { t } from '$lib/i18n.svelte';

	// One small key for the effort dots and the dietary colours, so neither is spelled out on every card.
	let { diet = false }: { diet?: boolean } = $props();
</script>

<div
	class="flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[0.7rem] font-bold tracking-wide text-ink/70 uppercase"
	aria-label={t('Key')}
>
	<span class="flex flex-wrap items-center gap-x-3 gap-y-1">
		<span class="text-ink">{t('Effort')}</span>
		{#each EFFORT_SCALE as l (l.level)}
			<span class="inline-flex items-center gap-1">
				<span class="inline-flex gap-px" aria-hidden="true">
					{#each [1, 2, 3, 4, 5] as n (n)}
						<span
							class="h-1.5 w-1.5 rounded-full border border-ink {n <= l.level
								? 'bg-ink'
								: 'bg-transparent'}"
						></span>
					{/each}
				</span>
				{t(l.name)}
			</span>
		{/each}
	</span>
	{#if diet}
		<span class="flex flex-wrap items-center gap-x-3 gap-y-1">
			<span class="text-ink">{t('Diet')}</span>
			{#each DIETS as x (x.key)}
				<span class="inline-flex items-center gap-1"><DietDot k={x.key} />{t(x.label)}</span>
			{/each}
		</span>
	{/if}
</div>
