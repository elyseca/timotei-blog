<script lang="ts">
	let { size = 96 }: { size?: number } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 100 100"
	role="img"
	aria-label="Plate: half vegetables, a quarter carbs, a quarter protein"
>
	<circle cx="50" cy="50" r="48" fill="white" stroke="#141414" stroke-width="3" />
	<path d="M50 8 A42 42 0 0 0 50 92 Z" fill="var(--color-teal)" />
	<path d="M50 50 L50 8 A42 42 0 0 1 92 50 Z" fill="var(--color-mustard)" />
	<path d="M50 50 L92 50 A42 42 0 0 1 50 92 Z" fill="var(--color-coral)" />
	<path d="M50 8 V92 M50 50 H92" stroke="#141414" stroke-width="2.5" />
	<circle cx="50" cy="50" r="42" fill="none" stroke="#141414" stroke-width="2.5" />
</svg>
