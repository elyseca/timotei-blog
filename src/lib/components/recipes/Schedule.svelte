<script lang="ts">
	import { S, toast } from '$lib/recipes/store.svelte';
	import {
		CDAYS,
		STRONG,
		TINT,
		layout,
		shortName,
		cookOf,
		dayDate,
		moveCook,
		moveEat,
		moveShop,
		nextChef,
		slotName,
		weekOf,
		MAX_WEEKS
	} from '$lib/recipes/plan';
	import type { PlanItem } from '$lib/recipes/types';
	import CookIcon from './CookIcon.svelte';
	import CalendarPicker from './CalendarPicker.svelte';

	let { items }: { items: PlanItem[] } = $props();

	const lay = $derived(layout(items));
	const idx = (id: string) =>
		Math.max(
			0,
			items.findIndex((x) => x.r.id === id)
		) % STRONG.length;
	const title = (id: string) => items.find((x) => x.r.id === id)?.r.title ?? '';
	const overIds = $derived(Object.keys(lay.over));
	// The week on screen (0 = the week that starts on "Week of"). Not saved.
	let week = $state(0);
	const lastUsed = $derived(
		Math.max(
			0,
			...items.flatMap((x) => {
				const sc = S.sched[x.r.id];
				return sc ? [weekOf(sc.slot), ...sc.eats.map(weekOf)] : [];
			})
		)
	);
	// One empty week past the last used one, so things can be moved forward.
	const maxWeek = $derived(Math.min(MAX_WEEKS - 1, lastUsed + 1));
	const shownWeek = $derived(Math.min(week, maxWeek));
	const base = $derived(shownWeek * 7);
	const fmt = (d: Date) => d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
	const rangeText = $derived(`${fmt(dayDate(base))} – ${fmt(dayDate(base + 6))}`);
	const ROWS = [
		{ label: 'Lunch', offset: 0 },
		{ label: 'Dinner', offset: 1 }
	];

	/* ---- drag a tile to another lunch or dinner (pointer events: mouse + touch) ----
	 * Cook tiles move when the recipe is cooked; meal tiles move where a serving is eaten. */
	type Drag = {
		kind: 'cook' | 'eat' | 'shop';
		id: string;
		from: number;
		el: HTMLElement;
		x: number;
		y: number;
		on: boolean;
		ghost: HTMLElement | null;
		pid: number;
		slot: number | null;
	};
	let drag: Drag | null = null;
	let navTimer: ReturnType<typeof setTimeout> | undefined;
	let navDir = 0;
	/** Holding a dragged tile over the arrows flips the week. */
	function hoverNav(dir: number) {
		if (dir === navDir) return;
		navDir = dir;
		clearTimeout(navTimer);
		if (!dir) return;
		const tick = () => {
			week = Math.max(0, Math.min(maxWeek, shownWeek + dir));
			navTimer = setTimeout(tick, 700);
		};
		navTimer = setTimeout(tick, 500);
	}
	let overSlot = $state<number | null>(null);
	let dragging = $state('');

	function down(e: PointerEvent, kind: 'cook' | 'eat' | 'shop', id: string, from: number) {
		if (e.pointerType === 'mouse' && e.button !== 0) return;
		drag = {
			kind,
			id,
			from,
			el: e.currentTarget as HTMLElement,
			x: e.clientX,
			y: e.clientY,
			on: false,
			ghost: null,
			pid: e.pointerId,
			slot: null
		};
	}
	function move(e: PointerEvent) {
		if (!drag || e.pointerId !== drag.pid) return;
		if (!drag.on) {
			if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 6) return;
			drag.on = true;
			dragging = drag.kind + drag.id + drag.from;
			const g = drag.el.cloneNode(true) as HTMLElement;
			g.style.cssText +=
				';position:fixed;z-index:60;pointer-events:none;opacity:.92;rotate:3deg;' +
				'box-shadow:5px 5px 0 0 #141414;width:' +
				drag.el.offsetWidth +
				'px';
			document.body.appendChild(g);
			drag.ghost = g;
		}
		if (drag.ghost) {
			drag.ghost.style.left = e.clientX - drag.ghost.offsetWidth / 2 + 'px';
			drag.ghost.style.top = e.clientY - 18 + 'px';
		}
		const t = document.elementFromPoint(e.clientX, e.clientY);
		const nav = t?.closest<HTMLElement>('[data-weeknav]');
		hoverNav(nav ? Number(nav.dataset.weeknav) : 0);
		const cell = t?.closest<HTMLElement>('[data-slot]');
		drag.slot = cell ? Number(cell.dataset.slot) : null;
		overSlot = drag.slot;
		e.preventDefault();
	}
	function end(commit: boolean) {
		if (!drag) return;
		const d = drag;
		drag = null;
		hoverNav(0);
		d.ghost?.remove();
		overSlot = null;
		dragging = '';
		if (!commit) return;
		if (!d.on) {
			// A tap on a cook tile hands the cooking to the other chef.
			if (d.kind === 'cook') nextChef(d.id);
			return;
		}
		if (d.slot == null || d.slot === d.from) return;
		const note =
			d.kind === 'cook'
				? moveCook(d.id, d.slot)
				: d.kind === 'shop'
					? moveShop(d.slot)
					: moveEat(d.id, d.from, d.slot);
		const refused = note?.startsWith("Can't");
		toast(
			note ??
				`Moved to ${CDAYS[Math.floor(d.slot / 2) % 7]} ${slotName(d.slot).toLowerCase()}, week ${weekOf(d.slot) + 1}`
		);
		if (!refused) week = weekOf(d.slot);
	}
</script>

<svelte:window
	onpointermove={move}
	onpointerup={() => end(true)}
	onpointercancel={() => end(false)}
/>

<section class="mx-auto max-w-6xl px-5 py-8 md:px-8">
	<h2 class="font-display text-3xl font-black">Schedule</h2>

	<div class="mt-5 flex flex-wrap items-end gap-x-6 gap-y-3">
		<label class="flex flex-col gap-1 font-mono text-xs font-bold tracking-wide uppercase">
			Week of
			<input type="date" class="brutal-field" bind:value={S.weekStart} />
		</label>
		{#each S.cooks as c (c.id)}
			<span
				class="flex items-center gap-2 pb-2 font-mono text-xs font-bold tracking-wide uppercase"
			>
				<CookIcon kind={c.icon} size={30} />
				{c.name}
			</span>
		{/each}
	</div>

	<div class="mt-6 flex flex-wrap items-center justify-between gap-3">
		<button
			type="button"
			class="brutal-btn bg-white"
			data-weeknav="-1"
			disabled={shownWeek === 0}
			onclick={() => (week = shownWeek - 1)}>← Earlier</button
		>
		<p class="text-center font-mono text-xs font-bold tracking-wide uppercase">
			Week {shownWeek + 1}
			<span class="block text-ink/60">{rangeText}</span>
		</p>
		<button
			type="button"
			class="brutal-btn bg-white"
			data-weeknav="1"
			disabled={shownWeek >= maxWeek}
			onclick={() => (week = shownWeek + 1)}>Later →</button
		>
	</div>
	<p class="mt-3 text-sm text-ink/70">
		Shop, then cook, then eat: the grocery run comes on or before the first cook, and meal tiles can
		only sit on or after their cooking day. Drag a tile onto Earlier or Later to carry it to another
		week.
	</p>

	<div class="brutal-box mt-4 overflow-x-auto bg-white">
		<div class="min-w-[44rem] p-3" role="table" aria-label="Weekly schedule">
			<div class="grid grid-cols-[3.5rem_repeat(7,minmax(0,1fr))] gap-1.5">
				<span></span>
				{#each CDAYS as d, i (d)}
					<div class="py-1 text-center font-mono text-xs font-bold uppercase">
						{d}
						<small class="block text-ink/50">{dayDate(base + i).getDate()}</small>
					</div>
				{/each}

				{#each ROWS as row (row.label)}
					<span class="self-center font-mono text-xs font-bold uppercase">{row.label}</span>
					{#each CDAYS as d, i (d)}
						{@const slot = (base + i) * 2 + row.offset}
						{@const eatId = lay.eat[slot]}
						<div
							class="flex min-h-20 flex-col gap-1.5 rounded-md border-2 border-dashed p-1 {overSlot ===
							slot
								? 'border-ink bg-lime/50'
								: 'border-ink/25'}"
							data-slot={slot}
						>
							{#if lay.shop === slot}
								<div
									class="flex cursor-grab touch-none items-center gap-1 rounded-md border-2 border-ink bg-lime px-1.5 py-1 text-xs leading-tight font-bold select-none active:cursor-grabbing {dragging ===
									'shop' + 'shop' + slot
										? 'opacity-30'
										: ''}"
									role="button"
									tabindex="-1"
									title="Grocery run. Drag to move; it has to come on or before the first cook."
									onpointerdown={(e) => down(e, 'shop', 'shop', slot)}
								>
									<span class="shrink-0" aria-hidden="true">
										<svg
											width="18"
											height="18"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2.4"
											stroke-linecap="round"
											stroke-linejoin="round"
											><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path
												d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 7H6"
											/></svg
										>
									</span>
									<span class="min-w-0 break-words">Grocery run</span>
								</div>
							{/if}
							{#each lay.cook[slot] as id (id)}
								{@const chef = cookOf(S.sched[id].chef)}
								<div
									class="flex cursor-grab touch-none items-center gap-1 rounded-md border-2 border-ink px-1.5 py-1 text-xs leading-tight font-bold select-none active:cursor-grabbing {dragging ===
									'cook' + id + slot
										? 'opacity-30'
										: ''}"
									role="button"
									tabindex="-1"
									style="background:{STRONG[idx(id)]}"
									title="{chef.name} cooks {title(id)}. Drag to move, tap to switch chef."
									onpointerdown={(e) => down(e, 'cook', id, slot)}
								>
									<span class="shrink-0 rounded-full bg-white/90 p-0.5"
										><CookIcon kind={chef.icon} size={22} /></span
									>
									<span class="min-w-0 break-words">{shortName(title(id))}</span>
								</div>
							{/each}
							{#if eatId}
								<div
									class="min-h-9 cursor-grab touch-none rounded-md border-l-[5px] px-1.5 py-1 text-[0.7rem] leading-tight font-semibold text-ink select-none active:cursor-grabbing {dragging ===
									'eat' + eatId + slot
										? 'opacity-30'
										: ''}"
									role="button"
									tabindex="-1"
									style="background:{TINT[idx(eatId)]};border-color:{STRONG[idx(eatId)]}"
									title="{title(eatId)}. Drag to move."
									onpointerdown={(e) => down(e, 'eat', eatId, slot)}
								>
									{shortName(title(eatId))}
								</div>
							{/if}
						</div>
					{/each}
				{/each}
			</div>
		</div>
	</div>

	{#if overIds.length}
		<p class="mt-2 font-mono text-xs font-bold text-ink/80 uppercase">
			Doesn't fit in {MAX_WEEKS} weeks: {overIds
				.map((id) => shortName(title(id)) + ' (' + lay.over[id] + ')')
				.join(', ')}
		</p>
	{/if}

	<CalendarPicker {items} />
</section>
