<script lang="ts">
	import { t } from '$lib/i18n.svelte';
	let {
		value,
		label = '',
		ondec,
		oninc
	}: { value: number; label?: string; ondec: () => void; oninc: () => void } = $props();
</script>

<div
	class="inline-flex items-stretch overflow-hidden rounded-lg border-2 border-ink bg-white"
	role="group"
	aria-label={label}
>
	<button
		type="button"
		class="px-3 font-mono text-lg font-bold transition-colors hover:bg-lime"
		onclick={ondec}
		aria-label={t('Fewer')}
	>
		−
	</button>
	<output class="grid min-w-11 place-items-center border-x-2 border-ink px-2 font-mono font-bold">
		{value}
	</output>
	<button
		type="button"
		class="px-3 font-mono text-lg font-bold transition-colors hover:bg-lime"
		onclick={oninc}
		aria-label={t('More')}
	>
		+
	</button>
</div>
