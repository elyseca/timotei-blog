<script lang="ts">
	import { S } from '$lib/recipes/store.svelte';
	import { t } from '$lib/i18n.svelte';

	// The three steps of planning a week, so people always know where they are.
	let { step }: { step: 1 | 2 | 3 } = $props();
	const steps = [
		{ n: 1, label: 'Pick a plan', href: '/recipes/plan' },
		{ n: 2, label: 'Schedule', href: '/recipes/plan' },
		{ n: 3, label: 'Groceries', href: '/recipes/groceries' }
	];
	const reachable = (n: number) => n === 1 || S.plan.length > 0;
</script>

<nav class="border-b-[2.5px] border-ink bg-white" aria-label={t('Planning steps')}>
	<ol class="mx-auto flex max-w-6xl gap-x-5 gap-y-1 overflow-x-auto px-5 py-2 md:px-8">
		{#each steps as s (s.n)}
			<li class="shrink-0 font-mono text-[0.7rem] font-bold tracking-wide uppercase">
				{#if s.n === step}
					<span class="flex items-center gap-1.5">
						<span class="grid size-5 place-items-center rounded-full bg-ink text-cream">{s.n}</span>
						{t(s.label)}
					</span>
				{:else if reachable(s.n)}
					<a href={s.href} class="flex items-center gap-1.5 text-ink/70 hover:text-ink">
						<span class="grid size-5 place-items-center rounded-full border-2 border-ink"
							>{s.n}</span
						>
						{t(s.label)}
					</a>
				{:else}
					<span class="flex items-center gap-1.5 text-ink/35">
						<span class="grid size-5 place-items-center rounded-full border-2 border-ink/35"
							>{s.n}</span
						>
						{t(s.label)}
					</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
