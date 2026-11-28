<script lang="ts">
	import { t } from '$lib/i18n.svelte';
	import type { Video } from './story';

	let { videos }: { videos: Video[] } = $props();
	let picked = $state(0);
	const v = $derived(videos[picked]);

	let box: HTMLDivElement | undefined = $state();
	let seen = $state(false); // YouTube iframe only loads once scrolled near

	// YouTube embeds accept play/pause/mute commands by postMessage when enablejsapi=1.
	function ytCommand(frame: HTMLIFrameElement, func: string) {
		frame.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args: [] }), '*');
	}

	// Play (muted, as browsers require for autoplay) while at least half the video is on screen,
	// pause when it scrolls away. Videos start muted with controls, so visitors can stop them.
	$effect(() => {
		if (!box) return;
		const io = new IntersectionObserver(
			([entry]) => {
				const visible = entry.intersectionRatio >= 0.5;
				// First time: mounting the iframe with autoplay=1 starts it; later visits use commands.
				if (visible && !seen) {
					seen = true;
					if (v.kind === 'youtube') return;
				}
				const video = box?.querySelector('video');
				const frame = box?.querySelector('iframe');
				if (video) {
					if (visible) {
						video.play().catch(() => {});
					} else video.pause();
				}
				if (frame) {
					if (visible) {
						ytCommand(frame, 'playVideo');
					} else ytCommand(frame, 'pauseVideo');
				}
			},
			{ threshold: [0, 0.5] }
		);
		io.observe(box);
		return () => io.disconnect();
	});

	function embedSrc(src: string) {
		return `${src}?enablejsapi=1&mute=1&playsinline=1&autoplay=1`;
	}
</script>

<div class="mt-6 md:col-span-2 md:mt-8">
	{#if videos.length > 1}
		<div class="mb-3 flex flex-wrap gap-2">
			{#each videos as video, i (video.src)}
				<button class="brutal-chip tap" aria-pressed={picked === i} onclick={() => (picked = i)}
					>{t(video.label)}</button
				>
			{/each}
		</div>
	{/if}

	<div
		bind:this={box}
		class="brutal-box overflow-hidden bg-ink {v.vertical ? 'mx-auto max-w-[18rem]' : ''}"
	>
		{#key v.src}
			{#if v.kind === 'youtube'}
				<div class="relative aspect-video">
					{#if seen}
						<iframe
							class="absolute inset-0 h-full w-full"
							src={embedSrc(v.src)}
							title={t(v.label)}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						></iframe>
					{/if}
				</div>
			{:else}
				<!-- svelte-ignore a11y_media_has_caption -->
				<video
					class="block w-full {v.vertical ? 'aspect-[9/16]' : 'aspect-video'}"
					src={v.src}
					poster={v.poster}
					controls
					muted
					loop
					playsinline
					preload="none"
					aria-label={t(v.label)}
				></video>
			{/if}
		{/key}
	</div>
</div>
