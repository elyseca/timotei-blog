<script lang="ts">
	let { src }: { src?: string } = $props();

	function toEmbedUrl(url: string): string {
		try {
			const u = new URL(url);
			if (u.hostname.includes('youtube.com') && u.searchParams.get('v')) {
				return `https://www.youtube.com/embed/${u.searchParams.get('v')}`;
			}
			if (u.hostname === 'youtu.be') {
				return `https://www.youtube.com/embed${u.pathname}`;
			}
			return url;
		} catch {
			return url;
		}
	}
</script>

{#if src}
	<div class="brutal-box overflow-hidden">
		<div class="relative aspect-video">
			<iframe
				class="absolute inset-0 h-full w-full"
				src={toEmbedUrl(src)}
				title="Trip video"
				loading="lazy"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
	</div>
{:else}
	<div class="brutal-box grid aspect-video place-items-center bg-cream-2 text-center">
		<p class="font-mono text-sm font-bold tracking-wide text-ink/50 uppercase">Video coming soon</p>
	</div>
{/if}
