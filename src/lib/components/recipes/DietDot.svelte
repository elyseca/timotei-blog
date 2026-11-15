<script lang="ts">
	import { DIETS } from '$lib/recipes/engine';

	// A small colour dot for a dietary flag. The Legend names the colours; the full pill is on the recipe.
	let { k }: { k: string } = $props();
	const d = $derived(DIETS.find((x) => x.key === k)!);
</script>

<span
	class="inline-block size-3 shrink-0 rounded-full border-[1.5px] border-ink"
	style="background:var(--color-{d.color})"
	title={d.label}
	role="img"
	aria-label={d.label}
></span>
