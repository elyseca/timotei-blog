<script lang="ts">
	import { S, ui, toast } from '$lib/recipes/store.svelte';
	import {
		CALENDARS,
		eventFor,
		webCalendarUrl,
		downloadIcs,
		type CalEvent
	} from '$lib/recipes/calendar';
	import { shortName } from '$lib/recipes/plan';
	import type { CalendarId, PlanItem } from '$lib/recipes/types';

	let { items }: { items: PlanItem[] } = $props();

	const cal = $derived(CALENDARS.find((c) => c.id === S.calendar) ?? CALENDARS[0]);
	const events = $derived(
		items
			.map((x) => ({ x, ev: eventFor(x) }))
			.filter((o): o is { x: PlanItem; ev: CalEvent } => !!o.ev)
	);

	// Start over whenever anything that changes the events changes.
	const sig = $derived(
		JSON.stringify([
			items.map((x) => [x.r.id, x.servings, S.sched[x.r.id]]),
			S.weekStart,
			S.cookTime,
			S.calendar,
			S.cooks.map((c) => c.name)
		])
	);
	let lastSig = '';
	$effect(() => {
		if (sig !== lastSig) {
			lastSig = sig;
			ui.calStep = 0;
		}
	});

	const next = $derived(events[ui.calStep]);
	const nextUrl = $derived(next && cal.id !== 'ics' ? webCalendarUrl(cal.id, next.ev) : '#');

	function afterOpen() {
		// Let the click open the link that is on the button right now, then move to the next recipe.
		setTimeout(() => ui.calStep++, 0);
	}
	function download() {
		downloadIcs(events.map((o) => o.ev));
		toast(`Downloaded ${events.length} ${events.length === 1 ? 'event' : 'events'}`);
	}
	const pick = (id: CalendarId) => (S.calendar = id);
</script>

<div class="brutal-box mt-6 bg-lime/40 p-5">
	<h3 class="font-display text-xl font-black">Add the cooking days to your calendar</h3>
	<p class="mt-1 text-sm text-ink/80">
		Each event has the full recipe in its description. It goes into your own calendar, so nothing
		here needs your email address.
	</p>

	<div class="mt-4 flex flex-wrap gap-2" role="group" aria-label="Which calendar">
		{#each CALENDARS as c (c.id)}
			<button
				type="button"
				class="brutal-chip"
				aria-pressed={S.calendar === c.id}
				onclick={() => pick(c.id)}
			>
				{c.label}
			</button>
		{/each}
	</div>

	<div class="mt-5 flex flex-wrap items-center gap-4">
		{#if cal.id === 'ics'}
			<button type="button" class="brutal-btn" onclick={download} disabled={!events.length}>
				Download calendar file
			</button>
		{:else if next}
			<a class="brutal-btn" href={nextUrl} target="_blank" rel="noopener" onclick={afterOpen}>
				{ui.calStep === 0
					? 'Add to ' + cal.label
					: `Add next: ${shortName(next.x.r.title)} (${ui.calStep + 1} of ${events.length})`}
			</a>
		{:else if events.length}
			<button type="button" class="brutal-btn bg-white" onclick={() => (ui.calStep = 0)}>
				All {events.length} added · start over
			</button>
		{/if}
		<p class="min-w-48 flex-1 text-xs text-ink/70">
			{cal.hint}
			{#if cal.id !== 'ics' && ui.calStep > 0 && next}
				{ui.calStep} of {events.length} added.
			{/if}
		</p>
	</div>
</div>
