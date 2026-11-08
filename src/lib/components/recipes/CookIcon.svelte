<script lang="ts">
	let { kind, size = 28 }: { kind: string; size?: number } = $props();
</script>

{#if kind === 'shark'}
	<svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
		<path d="M33 22 L39 14 L39 31 Z" fill="#6E93BA" />
		<path d="M16 15 L21 4 L28 16 Z" fill="#6E93BA" />
		<ellipse cx="19" cy="23" rx="15" ry="10" fill="#8DB0D3" />
		<path d="M6 25 Q19 35 33 26 Q19 31 6 25 Z" fill="#E8F1F8" />
		<circle cx="11" cy="21" r="1.9" fill="#243447" />
		<circle cx="8.5" cy="25" r="1.8" fill="#F5A3A3" opacity=".75" />
		<path
			d="M12.5 26.5 Q15 28.5 18 26.5"
			fill="none"
			stroke="#243447"
			stroke-width="1.4"
			stroke-linecap="round"
		/>
		<g fill="#fff" stroke="#243447" stroke-width="1.1" stroke-linejoin="round">
			<circle cx="6.5" cy="9.5" r="3" />
			<circle cx="10.5" cy="7" r="3.5" />
			<circle cx="14.5" cy="9.5" r="3" />
			<rect x="4.5" y="10.5" width="12" height="4.5" rx="1.2" />
		</g>
	</svg>
{:else}
	<svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
		<g fill="none" stroke="#B592DC" stroke-width="2.4" stroke-linecap="round">
			<path d="M12 22 q-3 5 0 9 t0 6" />
			<path d="M17.5 22 q-3 5 0 9 t0 5" />
			<path d="M23 22 q3 5 0 9 t0 5" />
			<path d="M28 22 q3 5 0 9 t0 6" />
		</g>
		<path d="M6 22 A14 14 0 0 1 34 22 Z" fill="#CDB0EA" />
		<circle cx="15" cy="16" r="1.8" fill="#3A2A55" />
		<circle cx="25" cy="16" r="1.8" fill="#3A2A55" />
		<circle cx="11.5" cy="19" r="1.8" fill="#F5A3C0" opacity=".75" />
		<circle cx="28.5" cy="19" r="1.8" fill="#F5A3C0" opacity=".75" />
		<path
			d="M18 18.5 Q20 20.5 22 18.5"
			fill="none"
			stroke="#3A2A55"
			stroke-width="1.4"
			stroke-linecap="round"
		/>
		<g fill="#fff" stroke="#3A2A55" stroke-width="1.1" stroke-linejoin="round">
			<circle cx="15.5" cy="6" r="3" />
			<circle cx="20" cy="4.5" r="3.5" />
			<circle cx="24.5" cy="6" r="3" />
			<rect x="14" y="7.5" width="12" height="4.5" rx="1.2" />
		</g>
	</svg>
{/if}
