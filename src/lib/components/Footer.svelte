<script lang="ts">
	import { t } from '$lib/i18n.svelte';
	const year = 2026;
</script>

<footer class="mt-24 border-t-[2.5px] border-ink bg-cream-2">
	<div class="mx-auto max-w-6xl px-5 py-10 text-center md:text-left">
		<p class="font-display text-lg font-black lowercase">
			timotei<span class="text-purple">.</span>blog
		</p>
		<p class="font-mono text-xs tracking-wide text-ink/60 uppercase">
			{t('Gabe & Elyse, since {year}', { year })}
		</p>
	</div>
</footer>
