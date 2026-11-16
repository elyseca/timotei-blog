<script lang="ts">
	import { S } from '$lib/recipes/store.svelte';
	import { eventFor, shopEventFor, googleCalendarUrl, type CalEvent } from '$lib/recipes/calendar';
	import { shortName, dateLoc } from '$lib/recipes/plan';
	import { t } from '$lib/i18n.svelte';
	import { tTitle } from '$lib/recipes/localize';
	import type { PlanItem } from '$lib/recipes/types';

	let { items }: { items: PlanItem[] } = $props();

	// The grocery run first, then each cooking session.
	const events = $derived.by(() => {
		const out: { label: string; ev: CalEvent; grocery?: boolean }[] = [];
		const shop = shopEventFor(items);
		if (shop) out.push({ label: 'Grocery run', ev: shop, grocery: true });
		items.forEach((x) => {
			const ev = eventFor(x);
			if (ev) out.push({ label: shortName(tTitle(x.r)), ev });
		});
		return out;
	});

	// Which events have been sent to Google Calendar. Starts over whenever the plan or schedule changes.
	let added = $state<boolean[]>([]);
	const sig = $derived(
		JSON.stringify([items.map((x) => [x.r.id, x.servings, S.sched[x.r.id]]), S.weekStart, S.shop])
	);
	let lastSig = '';
	$effect(() => {
		if (sig !== lastSig) {
			lastSig = sig;
			added = [];
		}
	});

	const count = $derived(events.filter((_, i) => added[i]).length);
	const nextIndex = $derived(events.findIndex((_, i) => !added[i]));
	const nextLabel = $derived(
		nextIndex < 0 ? '' : events[nextIndex].grocery ? t('Grocery run') : events[nextIndex].label
	);
	// The click opens the link that is on the button right now; then we mark that event as added.
	const mark = (i: number) => setTimeout(() => (added[i] = true), 0);

	const when = (d: Date) =>
		d.toLocaleString(dateLoc(), {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit'
		});
</script>

{#if events.length}
	<div class="brutal-box mt-6 bg-white p-4" aria-live="polite">
		<h3 class="font-display text-xl font-black">{t('Add to Google Calendar')}</h3>
		<p class="mt-1 text-sm text-ink/70">
			{t(
				'Google Calendar takes one event at a time. Each button opens it in a new tab: press Save there, then come back for the next. Nothing is added until you save it.'
			)}
		</p>

		<p class="mt-3 font-mono text-xs font-bold tracking-wide uppercase">
			{t('{n} of {m} added', { n: count, m: events.length })}
		</p>
		<div
			class="mt-1 h-2 overflow-hidden rounded-full border-2 border-ink bg-cream-2"
			aria-hidden="true"
		>
			<div
				class="h-full bg-lime transition-[width]"
				style="width:{(count / events.length) * 100}%"
			></div>
		</div>

		<ul class="mt-3 flex flex-col">
			{#each events as e, i (i)}
				<li
					class="flex flex-wrap items-center justify-between gap-2 border-b border-ink/15 py-2 last:border-0"
				>
					<div class="min-w-0">
						<p class="font-semibold">{e.grocery ? t('Grocery run') : e.label}</p>
						<p class="font-mono text-xs text-ink/60">{when(e.ev.start)}</p>
					</div>
					{#if added[i]}
						<span class="flex items-center gap-2">
							<span class="brutal-tag bg-lime">{t('✓ Opened')}</span>
							<a
								class="font-mono text-xs font-bold uppercase underline decoration-2 underline-offset-4"
								href={googleCalendarUrl(e.ev)}
								target="_blank"
								rel="noopener">{t('Open again')}</a
							>
						</span>
					{:else}
						<a
							class="brutal-btn {i === nextIndex ? '' : 'bg-white'}"
							href={googleCalendarUrl(e.ev)}
							target="_blank"
							rel="noopener"
							onclick={() => mark(i)}
						>
							{t('Add to calendar')}
						</a>
					{/if}
				</li>
			{/each}
		</ul>

		{#if nextIndex === -1}
			<p class="mt-3 text-sm font-semibold">
				{t('All {n} events have been opened. Make sure you pressed Save on each.', {
					n: events.length
				})}
			</p>
			<button type="button" class="brutal-btn mt-2 bg-white" onclick={() => (added = [])}>
				{t('Start over')}
			</button>
		{:else}
			<a
				class="brutal-btn mt-3"
				href={googleCalendarUrl(events[nextIndex].ev)}
				target="_blank"
				rel="noopener"
				onclick={() => mark(nextIndex)}
			>
				{count === 0
					? t('Add all, one at a time: start with {name}', { name: nextLabel })
					: t('Add next: {name} ({n}/{m})', { name: nextLabel, n: count + 1, m: events.length })}
			</a>
		{/if}
	</div>
{/if}
