<script lang="ts">
	import { S, ui } from '$lib/recipes/store.svelte';
	import { eventFor, shopEventFor, googleCalendarUrl, type CalEvent } from '$lib/recipes/calendar';
	import { shortName } from '$lib/recipes/plan';
	import type { PlanItem } from '$lib/recipes/types';

	let { items }: { items: PlanItem[] } = $props();

	// The grocery run first, then each cooking session.
	const events = $derived.by(() => {
		const out: { label: string; ev: CalEvent }[] = [];
		const shop = shopEventFor(items);
		if (shop) out.push({ label: 'Grocery run', ev: shop });
		items.forEach((x) => {
			const ev = eventFor(x);
			if (ev) out.push({ label: shortName(x.r.title), ev });
		});
		return out;
	});

	// Start over whenever anything that changes the events changes.
	const sig = $derived(
		JSON.stringify([items.map((x) => [x.r.id, x.servings, S.sched[x.r.id]]), S.weekStart, S.shop])
	);
	let lastSig = '';
	$effect(() => {
		if (sig !== lastSig) {
			lastSig = sig;
			ui.calStep = 0;
		}
	});

	const next = $derived(events[ui.calStep]);
	const nextUrl = $derived(next ? googleCalendarUrl(next.ev) : '#');

	// Let the click open the link that is on the button right now, then move to the next recipe.
	const afterOpen = () => setTimeout(() => ui.calStep++, 0);
</script>

<div class="mt-6">
	{#if next}
		<a class="brutal-btn" href={nextUrl} target="_blank" rel="noopener" onclick={afterOpen}>
			{ui.calStep === 0
				? 'Add to GCal'
				: `Add next: ${next.label} (${ui.calStep + 1}/${events.length})`}
		</a>
	{:else if events.length}
		<button type="button" class="brutal-btn bg-white" onclick={() => (ui.calStep = 0)}>
			Added · start over
		</button>
	{/if}
</div>
