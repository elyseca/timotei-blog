<script lang="ts">
	import { L, t, setLang, setUnits } from '$lib/i18n.svelte';

	// `lang` = the language switch (site-wide, lives in the top bar); `units` = US/metric (recipes only).
	let { show = 'lang' }: { show?: 'lang' | 'units' } = $props();

	const seg =
		'px-2 py-1 font-mono text-xs font-bold tracking-wide uppercase transition-colors aria-pressed:bg-ink aria-pressed:text-cream';
</script>

{#if show === 'lang'}
	<div
		class="flex overflow-hidden rounded-lg border-2 border-ink bg-white"
		role="group"
		aria-label={t('Language')}
	>
		<button type="button" class={seg} aria-pressed={L.lang === 'en'} onclick={() => setLang('en')}
			>EN</button
		>
		<button type="button" class={seg} aria-pressed={L.lang === 'es'} onclick={() => setLang('es')}
			>ES</button
		>
	</div>
{:else}
	<div
		class="flex overflow-hidden rounded-lg border-2 border-ink bg-white"
		role="group"
		aria-label={t('Measurement units')}
	>
		<button
			type="button"
			class={seg}
			aria-pressed={L.units === 'us'}
			title={t('Cups, ounces, °F')}
			onclick={() => setUnits('us')}>US</button
		>
		<button
			type="button"
			class={seg}
			aria-pressed={L.units === 'metric'}
			title={t('Grams, millilitres, °C')}
			onclick={() => setUnits('metric')}>{t('Metric')}</button
		>
	</div>
{/if}
