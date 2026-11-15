<script lang="ts">
	let { kind, size = 28 }: { kind: string; size?: number } = $props();
	// Jellyfish tentacles: where each starts, its curve, where it ends, and which way the shoe points.
	const LEGS = [
		{ d: 'M10 23.5 C6 27 12 30 8.5 34', ex: 8.5, ey: 34, dir: -1 },
		{ d: 'M16.5 24.5 C20 28 12 32 15.5 36', ex: 15.5, ey: 36, dir: -1 },
		{ d: 'M23.5 24.5 C20 28 28 32 25 35', ex: 25, ey: 35, dir: 1 },
		{ d: 'M30 23.5 C34 27 29 30 33 33.5', ex: 33, ey: 33.5, dir: 1 }
	];
	const TEETH = Array.from({ length: 10 }, (_, k) => k);
</script>

{#snippet hat(top: number)}
	<g
		transform="translate({20 * 0.15} {top + 1 - 12 * 0.85}) scale(0.85)"
		fill="#fff"
		stroke="#243447"
		stroke-width="1.1"
		stroke-linejoin="round"
	>
		<circle cx="15.5" cy="6" r="3" />
		<circle cx="20" cy="4.5" r="3.5" />
		<circle cx="24.5" cy="6" r="3" />
		<rect x="14" y="7.5" width="12" height="4.5" rx="1.2" />
	</g>
{/snippet}

{#if kind === 'shark'}
	<!-- Front view: fin and tail behind the head, angry brows, wide mouth of teeth -->
	<svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
		<g fill="#5B7FA6" stroke="#243447" stroke-width="1" stroke-linejoin="round">
			<path d="M23 12 L31 1.5 L32 16 Z" />
			<path d="M13 29 L1.5 37.5 L4.5 29.5 L1 21.5 L13 24 Z" />
			<path d="M33 26 L39 31 L32 32 Z" />
		</g>
		<ellipse cx="20" cy="22.5" rx="16.5" ry="14" fill="#8DB0D3" stroke="#243447" stroke-width="1" />
		<g stroke="#5B7FA6" stroke-width="1" stroke-linecap="round">
			<path d="M4.6 22 L5.2 26" />
			<path d="M6 21 L6.7 25.5" />
			<path d="M35.4 22 L34.8 26" />
			<path d="M34 21 L33.3 25.5" />
		</g>
		<g fill="#243447">
			<circle cx="12.5" cy="17" r="2.1" />
			<circle cx="27.5" cy="17" r="2.1" />
		</g>
		<g fill="#fff">
			<circle cx="13.2" cy="16.3" r="0.7" />
			<circle cx="28.2" cy="16.3" r="0.7" />
		</g>
		<g fill="#F5A3A3" opacity=".75">
			<circle cx="7.6" cy="21.8" r="1.7" />
			<circle cx="32.4" cy="21.8" r="1.7" />
		</g>
		<clipPath id="shark-mouth"><ellipse cx="20" cy="26" rx="11" ry="7" /></clipPath>
		<ellipse cx="20" cy="26" rx="11" ry="7" fill="#5A1F2B" />
		<g clip-path="url(#shark-mouth)" fill="#fff">
			{#each TEETH as k (k)}
				{@const x = 9 + k * 2.4}
				<path d="M{x} 19 L{x + 1.2} 23.4 L{x + 2.4} 19 Z" />
				<path d="M{x + 1.2} 33 L{x + 2.4} 28.6 L{x + 3.6} 33 Z" />
			{/each}
		</g>
		<ellipse cx="20" cy="26" rx="11" ry="7" fill="none" stroke="#243447" stroke-width="1.2" />
		<g fill="#fff" stroke="#243447" stroke-width="1.1" stroke-linejoin="round">
			<circle cx="15.5" cy="6" r="3" />
			<circle cx="20" cy="4.5" r="3.5" />
			<circle cx="24.5" cy="6" r="3" />
			<rect x="14" y="7.5" width="12" height="4.5" rx="1.2" />
		</g>
	</svg>
{:else if kind === 'octopus'}
	<svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
		<g fill="none" stroke="#C0587C" stroke-width="3.2" stroke-linecap="round">
			<path d="M9 26 C5 31 10 34 6 38" />
			<path d="M15 28 C13 33 18 34 15 38.5" />
			<path d="M25 28 C27 33 22 34 25 38.5" />
			<path d="M31 26 C35 31 30 34 34 38" />
		</g>
		<ellipse cx="20" cy="21" rx="13" ry="11.5" fill="#E58AA8" stroke="#8A3A55" stroke-width="1" />
		<g fill="#2A1A2E"><circle cx="14.5" cy="21" r="2" /><circle cx="25.5" cy="21" r="2" /></g>
		<g fill="#fff"><circle cx="15.1" cy="20.3" r="0.65" /><circle cx="26.1" cy="20.3" r="0.65" /></g
		>
		<g fill="#F5A3A3" opacity=".7"
			><circle cx="10.5" cy="24.5" r="1.8" /><circle cx="29.5" cy="24.5" r="1.8" /></g
		>
		<path
			d="M17.5 25 Q20 27.5 22.5 25"
			fill="none"
			stroke="#2A1A2E"
			stroke-width="1.2"
			stroke-linecap="round"
		/>
		{@render hat(9.5)}
	</svg>
{:else if kind === 'crab'}
	<svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
		<g stroke="#8C2A1E" stroke-width="2" stroke-linecap="round" fill="none">
			<path d="M9 30 L3.5 34 M11 33 L7 38 M31 30 L36.5 34 M29 33 L33 38" />
			<path d="M8 22 L4.5 14 M32 22 L35.5 14" />
		</g>
		<g fill="#E5533F" stroke="#8C2A1E" stroke-width="1" stroke-linejoin="round">
			<path d="M1.5 6 L7 11 L3 15 Q-0.5 11 1.5 6 Z" />
			<path d="M38.5 6 L33 11 L37 15 Q40.5 11 38.5 6 Z" />
			<ellipse cx="20" cy="26" rx="14.5" ry="10.5" />
		</g>
		<g fill="#2A1A1A"><circle cx="14.5" cy="24" r="2" /><circle cx="25.5" cy="24" r="2" /></g>
		<g fill="#fff"><circle cx="15.1" cy="23.3" r="0.65" /><circle cx="26.1" cy="23.3" r="0.65" /></g
		>
		<g fill="#F5A3A3" opacity=".7"
			><circle cx="10.5" cy="27.5" r="1.8" /><circle cx="29.5" cy="27.5" r="1.8" /></g
		>
		<path
			d="M17 28 Q20 31.5 23 28"
			fill="none"
			stroke="#2A1A1A"
			stroke-width="1.2"
			stroke-linecap="round"
		/>
		{@render hat(15)}
	</svg>
{:else if kind === 'pufferfish'}
	<svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
		<g fill="#E8A62E" stroke="#8A5A10" stroke-width="1" stroke-linejoin="round">
			<path d="M32 26 L39 20 L39 33 Z" />
			<path
				d="M20 10 L22.5 6 L25 11 Z M29 13.5 L33 11.5 L32.5 17 Z M10 13 L7.5 8.5 L14 11 Z M7 22 L2.5 20 L7.5 17 Z M8 31 L3.5 33.5 L5.5 27.5 Z M20 38.5 L17 34 L24 34 Z M31 33 L35 36 L29 36 Z"
			/>
			<circle cx="19" cy="24" r="13.5" fill="#F5CB6B" />
		</g>
		<ellipse cx="19" cy="31" rx="8.5" ry="5" fill="#FBE6B0" />
		<g fill="#2A1A08"><circle cx="13.5" cy="22" r="2.1" /><circle cx="24.5" cy="22" r="2.1" /></g>
		<g fill="#fff"><circle cx="14.1" cy="21.3" r="0.7" /><circle cx="25.1" cy="21.3" r="0.7" /></g>
		<g fill="#F5A3A3" opacity=".75"
			><circle cx="9.5" cy="26" r="1.8" /><circle cx="28.5" cy="26" r="1.8" /></g
		>
		<ellipse cx="19" cy="27.5" rx="2.2" ry="2.6" fill="#8A3A1A" />
		{@render hat(10.5)}
	</svg>
{:else if kind === 'whale'}
	<svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
		<g fill="#4F86C6" stroke="#1F3F6B" stroke-width="1" stroke-linejoin="round">
			<path d="M31 24 Q37 16 39 11 Q38 20 40 23 Q36 22 34 28 Z" />
			<path d="M3 26 C3 15 12 11 19 11 C29 11 33 18 33 25 C33 33 25 37 17 37 C8 37 3 32 3 26 Z" />
		</g>
		<path d="M4.5 28 C8 33.5 14 35 20 35 C27 35 31 32 32 28 C26 31 12 32 4.5 28 Z" fill="#CFE3F5" />
		<g fill="#2A1A2E"><circle cx="13" cy="24" r="2" /></g>
		<circle cx="13.6" cy="23.3" r="0.65" fill="#fff" />
		<circle cx="9" cy="28" r="1.7" fill="#F5A3A3" opacity=".7" />
		<path
			d="M11 30 Q15 33 19 30"
			fill="none"
			stroke="#1F3F6B"
			stroke-width="1.2"
			stroke-linecap="round"
		/>
		<g fill="none" stroke="#7FB5E8" stroke-width="1.6" stroke-linecap="round"
			><path d="M23 9 Q23 5 20.5 3.5 M23 9 Q23 5 25.5 3.5" /></g
		>
		{@render hat(11)}
	</svg>
{:else if kind === 'turtle'}
	<svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
		<g fill="#6FB36B" stroke="#245A28" stroke-width="1" stroke-linejoin="round">
			<ellipse cx="6" cy="31" rx="4" ry="3" /><ellipse cx="34" cy="31" rx="4" ry="3" />
		</g>
		<path
			d="M4.5 34 C4.5 22 11 18 20 18 C29 18 35.5 22 35.5 34 Z"
			fill="#3E8C4A"
			stroke="#245A28"
			stroke-width="1"
			stroke-linejoin="round"
		/>
		<g fill="none" stroke="#245A28" stroke-width="1" opacity=".7"
			><path d="M20 18 L20 34 M12 22 L10 34 M28 22 L30 34 M8 28 L32 28" /></g
		>
		<circle cx="20" cy="21" r="9" fill="#9AD58F" stroke="#245A28" stroke-width="1" />
		<g fill="#1F2A1F"><circle cx="16.5" cy="20" r="1.8" /><circle cx="23.5" cy="20" r="1.8" /></g>
		<g fill="#fff"><circle cx="17" cy="19.4" r="0.6" /><circle cx="24" cy="19.4" r="0.6" /></g>
		<g fill="#F5A3A3" opacity=".7"
			><circle cx="13.5" cy="23.5" r="1.5" /><circle cx="26.5" cy="23.5" r="1.5" /></g
		>
		<path
			d="M17.5 24 Q20 26.5 22.5 24"
			fill="none"
			stroke="#1F2A1F"
			stroke-width="1.2"
			stroke-linecap="round"
		/>
		{@render hat(12)}
	</svg>
{:else}
	<!-- Jellyfish: scalloped bell, trailing tentacles ending in yellow sneakers -->
	<svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
		{#each LEGS as leg (leg.d)}
			<path d={leg.d} fill="none" stroke="#B592DC" stroke-width="1.8" stroke-linecap="round" />
		{/each}
		<path
			d="M5.5 23 C5.5 13 11.5 8.5 20 8.5 C28.5 8.5 34.5 13 34.5 23 Q31 25.8 27.4 23.4 Q23.8 26.2 20 23.6 Q16.2 26.2 12.6 23.4 Q9 25.8 5.5 23 Z"
			fill="#CDB0EA"
			stroke="#8E6BC4"
			stroke-width="1"
			stroke-linejoin="round"
		/>
		<ellipse
			cx="13.5"
			cy="13.5"
			rx="3.6"
			ry="2"
			fill="#fff"
			opacity=".45"
			transform="rotate(-28 13.5 13.5)"
		/>
		<g fill="#B592DC" opacity=".55">
			<circle cx="26" cy="13" r="1" />
			<circle cx="29.5" cy="17" r="0.8" />
			<circle cx="23" cy="11.2" r="0.7" />
		</g>
		<circle cx="15" cy="17.2" r="1.7" fill="#3A2A55" />
		<circle cx="25" cy="17.2" r="1.7" fill="#3A2A55" />
		<circle cx="15.6" cy="16.6" r="0.55" fill="#fff" />
		<circle cx="25.6" cy="16.6" r="0.55" fill="#fff" />
		<circle cx="11.3" cy="19.8" r="1.6" fill="#F5A3C0" opacity=".7" />
		<circle cx="28.7" cy="19.8" r="1.6" fill="#F5A3C0" opacity=".7" />
		<path
			d="M18 19.4 Q20 21.4 22 19.4"
			fill="none"
			stroke="#3A2A55"
			stroke-width="1.3"
			stroke-linecap="round"
		/>
		{#each LEGS as leg (leg.d)}
			<g
				transform="translate({leg.ex} {leg.ey}) rotate({leg.dir * 14}) scale({leg.dir *
					0.55} 0.55) translate(-27.5 -33.2)"
			>
				<g stroke="#3A2A55" stroke-width="1.2" stroke-linejoin="round">
					<path
						d="M25.5 38 L25.5 33.8 Q25.5 33 26.4 33 L29.6 33 Q29.8 35.8 33 36.4 L36 37 Q37.2 37.4 37.2 38 Z"
						fill="#F7D02C"
					/>
					<rect x="24.6" y="37.8" width="13.4" height="2.2" rx="1.1" fill="#fff" />
				</g>
				<g stroke="#fff" stroke-width="1.3" stroke-linecap="round">
					<path d="M27 37 L28.4 34.6" />
					<path d="M28.7 37 L30.1 34.6" />
					<path d="M30.4 37.2 L31.8 35.6" />
				</g>
			</g>
		{/each}
		<g fill="#fff" stroke="#3A2A55" stroke-width="1.1" stroke-linejoin="round">
			<circle cx="15.5" cy="6" r="3" />
			<circle cx="20" cy="4.5" r="3.5" />
			<circle cx="24.5" cy="6" r="3" />
			<rect x="14" y="7.5" width="12" height="4.5" rx="1.2" />
		</g>
	</svg>
{/if}
