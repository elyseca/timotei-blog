<script lang="ts">
	import { S, toast } from '$lib/recipes/store.svelte';
	import { t } from '$lib/i18n.svelte';
	import { tTitle } from '$lib/recipes/localize';
	import {
		CDAYS,
		dayShort,
		dateLoc,
		STRONG,
		TINT,
		layout,
		shortName,
		cookOf,
		dayDate,
		moveCook,
		moveEat,
		moveShop,
		addChef,
		removeChef,
		setChefIcon,
		MAX_CHEFS,
		nextChef,
		slotName,
		weekOf,
		MAX_WEEKS
	} from '$lib/recipes/plan';
	import type { PlanItem } from '$lib/recipes/types';
	import CookIcon from './CookIcon.svelte';
	import { COOK_ICONS } from '$lib/recipes/cookIcons';
	import CalendarPicker from './CalendarPicker.svelte';

	let { items }: { items: PlanItem[] } = $props();

	const lay = $derived(layout(items));
	const idx = (id: string) =>
		Math.max(
			0,
			items.findIndex((x) => x.r.id === id)
		) % STRONG.length;
	const title = (id: string) => tTitle(items.find((x) => x.r.id === id)?.r);
	const overIds = $derived(Object.keys(lay.over));
	// The week on screen (0 = the week that starts on "Week of"). Not saved.
	let week = $state(0);
	let editChefs = $state(false);
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
	const fmt = (d: Date) => d.toLocaleDateString(dateLoc(), { month: 'short', day: 'numeric' });
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
	// Holding a tile near the top or bottom of the screen scrolls the page, so a long phone
	// layout can still be dragged across.
	let scrollTimer: ReturnType<typeof setInterval> | undefined;
	let lastY = 0;
	function autoScroll(on: boolean) {
		clearInterval(scrollTimer);
		scrollTimer = undefined;
		if (!on) return;
		scrollTimer = setInterval(() => {
			const edge = 90;
			if (lastY < edge) window.scrollBy(0, -(edge - lastY) / 4);
			else if (lastY > window.innerHeight - edge)
				window.scrollBy(0, (lastY - (window.innerHeight - edge)) / 4);
		}, 16);
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
			autoScroll(true);
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
		lastY = e.clientY;
		if (drag.ghost) {
			drag.ghost.style.left = e.clientX - drag.ghost.offsetWidth / 2 + 'px';
			drag.ghost.style.top = e.clientY - 18 + 'px';
		}
		const under = document.elementFromPoint(e.clientX, e.clientY);
		const nav = under?.closest<HTMLElement>('[data-weeknav]');
		hoverNav(nav ? Number(nav.dataset.weeknav) : 0);
		const cell = under?.closest<HTMLElement>('[data-slot]');
		drag.slot = cell ? Number(cell.dataset.slot) : null;
		overSlot = drag.slot;
		e.preventDefault();
	}
	function end(commit: boolean) {
		if (!drag) return;
		const d = drag;
		drag = null;
		hoverNav(0);
		autoScroll(false);
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
		// Only shop and eat moves can be refused; cook moves just report what shifted.
		const refused = d.kind !== 'cook' && !!note;
		toast(
			note ??
				t('Moved to {day} {meal}, week {n}', {
					day: dayShort(Math.floor(d.slot / 2) % 7),
					meal: slotName(d.slot).toLowerCase(),
					n: weekOf(d.slot) + 1
				})
		);
		if (!refused) week = weekOf(d.slot);
	}
</script>

<svelte:window
	onpointermove={move}
	onpointerup={() => end(true)}
	onpointercancel={() => end(false)}
/>

{#snippet cell(slot: number, min: string)}
	{@const eatId = lay.eat[slot]}
	<div
		class="flex {min} flex-col gap-1.5 rounded-md border-2 border-dashed p-1 {overSlot === slot
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
				title={t('Grocery run. Drag to move; it has to come on or before the first cook.')}
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
				<span class="min-w-0 break-words">{t('Grocery run')}</span>
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
				title={S.cooks.length > 1
					? t('{chef} cooks {title}. Drag to move, tap to switch chef.', {
							chef: chef.name,
							title: title(id)
						})
					: t('{chef} cooks {title}. Drag to move.', { chef: chef.name, title: title(id) })}
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
				title={t('{title}. Drag to move.', { title: title(eatId) })}
				onpointerdown={(e) => down(e, 'eat', eatId, slot)}
			>
				{shortName(title(eatId))}
			</div>
		{/if}
	</div>
{/snippet}

<section class="mx-auto max-w-6xl px-5 py-5 md:px-8">
	<h2 class="font-display text-3xl font-black">{t('Schedule')}</h2>

	<div class="mt-5 flex flex-wrap items-end gap-x-6 gap-y-3">
		<label class="flex flex-col gap-1 font-mono text-xs font-bold tracking-wide uppercase">
			{t('Week of')}
			<input type="date" class="brutal-field" bind:value={S.weekStart} />
		</label>
		<div class="flex flex-col gap-0.5 pb-0.5">
			<div class="flex flex-wrap items-center gap-x-3 gap-y-1">
				{#each S.cooks as c (c.id)}
					<span class="flex items-center gap-1 font-mono text-xs font-bold tracking-wide uppercase">
						<CookIcon kind={c.icon} size={26} />{c.name}
					</span>
				{/each}
			</div>
			<button
				type="button"
				class="tap self-start font-mono text-[0.7rem] tracking-wide text-ink/60 uppercase underline underline-offset-2 hover:text-ink"
				aria-expanded={editChefs}
				onclick={() => (editChefs = !editChefs)}
			>
				{editChefs ? t('Done') : t('Edit chefs')}
			</button>
		</div>
	</div>

	{#if editChefs}
		<div class="brutal-box mt-4 flex flex-col gap-4 bg-white p-4">
			<p class="text-sm text-ink/70">
				{t(
					'Add everyone who cooks in your household, up to {max}. Each gets a name and their own face, shown on the calendar and in the events you add to your calendar.',
					{ max: MAX_CHEFS }
				)}
				{#if S.cooks.length > 1}{t('Tap a cooking tile to hand it to the next chef.')}{/if}
			</p>
			{#each S.cooks as c (c.id)}
				<div class="flex flex-wrap items-center gap-3">
					<CookIcon kind={c.icon} size={34} />
					<input
						class="brutal-field w-44"
						aria-label={t('Chef name')}
						maxlength="20"
						bind:value={c.name}
					/>
					<div
						class="flex flex-wrap gap-1.5"
						role="group"
						aria-label={t('{name} icon', { name: c.name })}
					>
						{#each COOK_ICONS as k (k)}
							{@const taken = S.cooks.some((o) => o.id !== c.id && o.icon === k)}
							<button
								type="button"
								class="rounded-lg border-2 p-0.5 {c.icon === k
									? 'border-ink bg-lime'
									: 'border-transparent bg-cream-2'} {taken
									? 'opacity-25'
									: c.icon === k
										? ''
										: 'hover:border-ink'}"
								aria-label={taken ? t('{name} (taken)', { name: t(k) }) : t(k)}
								aria-pressed={c.icon === k}
								disabled={taken}
								onclick={() => setChefIcon(c.id, k)}
							>
								<CookIcon kind={k} size={30} />
							</button>
						{/each}
					</div>
					{#if S.cooks.length > 1}
						<button
							type="button"
							class="tap font-mono text-xs font-bold uppercase underline decoration-2 underline-offset-4"
							onclick={() => removeChef(c.id)}
						>
							{t('Remove')}
						</button>
					{/if}
				</div>
			{/each}
			{#if S.cooks.length < MAX_CHEFS}
				<button type="button" class="brutal-btn self-start bg-white" onclick={addChef}>
					{t('+ Add a chef')}
				</button>
			{/if}
		</div>
	{/if}

	<div class="mt-4 flex items-center justify-between gap-2">
		<button
			type="button"
			class="brutal-btn bg-white px-3! text-xs! sm:px-5! sm:text-sm!"
			data-weeknav="-1"
			disabled={shownWeek === 0}
			onclick={() => (week = shownWeek - 1)}>{t('← Earlier')}</button
		>
		<p class="text-center font-mono text-xs font-bold tracking-wide uppercase">
			{t('Week {n}', { n: shownWeek + 1 })}
			<span class="block text-ink/60">{rangeText}</span>
		</p>
		<button
			type="button"
			class="brutal-btn bg-white px-3! text-xs! sm:px-5! sm:text-sm!"
			data-weeknav="1"
			disabled={shownWeek >= maxWeek}
			onclick={() => (week = shownWeek + 1)}>{t('Later →')}</button
		>
	</div>
	<p class="mt-3 text-sm text-ink/70">
		{t(
			'Shop, then cook, then eat: the grocery run comes on or before the first cook, and meal tiles can only sit on or after their cooking day. Drag a tile onto Earlier or Later to carry it to another week.'
		)}
	</p>

	<!-- Phones: one card per day, lunch and dinner stacked, so tiles stay readable. -->
	<div class="mt-4 flex flex-col gap-3 md:hidden" role="table" aria-label={t('Weekly schedule')}>
		{#each CDAYS as d, i (d)}
			<div class="brutal-box bg-white p-2.5">
				<p class="mb-1.5 font-mono text-xs font-bold uppercase">
					{dayShort(i)}
					<span class="text-ink/50"
						>{dayDate(base + i).toLocaleDateString(dateLoc(), {
							month: 'short',
							day: 'numeric'
						})}</span
					>
				</p>
				<div class="grid grid-cols-[4rem_1fr] items-stretch gap-x-2 gap-y-1.5">
					{#each ROWS as row (row.label)}
						<span class="self-center font-mono text-[0.7rem] font-bold uppercase"
							>{t(row.label)}</span
						>
						{@render cell((base + i) * 2 + row.offset, 'min-h-11')}
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<div class="brutal-box mt-4 hidden overflow-x-auto bg-white md:block">
		<div class="min-w-[44rem] p-3" role="table" aria-label={t('Weekly schedule')}>
			<div class="grid grid-cols-[3.5rem_repeat(7,minmax(0,1fr))] gap-1.5">
				<span></span>
				{#each CDAYS as d, i (d)}
					<div class="py-1 text-center font-mono text-xs font-bold uppercase">
						{dayShort(i)}
						<small class="block text-ink/50">{dayDate(base + i).getDate()}</small>
					</div>
				{/each}

				{#each ROWS as row (row.label)}
					<span class="self-center font-mono text-xs font-bold uppercase">{t(row.label)}</span>
					{#each CDAYS as d, i (d)}
						{@render cell((base + i) * 2 + row.offset, 'min-h-20')}
					{/each}
				{/each}
			</div>
		</div>
	</div>

	{#if overIds.length}
		<p class="mt-2 font-mono text-xs font-bold text-ink/80 uppercase">
			{t("Doesn't fit in {n} weeks:", { n: MAX_WEEKS })}
			{overIds.map((id) => shortName(title(id)) + ' (' + lay.over[id] + ')').join(', ')}
		</p>
	{/if}

	<CalendarPicker {items} />
</section>
