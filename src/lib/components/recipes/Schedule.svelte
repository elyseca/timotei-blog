<script lang="ts">
	import { S, ui, toast } from '$lib/recipes/store.svelte';
	import {
		CDAYS,
		STRONG,
		TINT,
		layout,
		shortName,
		cookOf,
		dayDate,
		mealsOf
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

	/* ---- drag a cooking tile to another day (pointer events: mouse + touch) ---- */
	type Drag = {
		id: string;
		el: HTMLElement;
		x: number;
		y: number;
		on: boolean;
		ghost: HTMLElement | null;
		pid: number;
		day: number | null;
	};
	let drag: Drag | null = null;
	let overDay = $state<number | null>(null);
	let draggingId = $state('');

	function down(e: PointerEvent, id: string) {
		if (e.pointerType === 'mouse' && e.button !== 0) return;
		drag = {
			id,
			el: e.currentTarget as HTMLElement,
			x: e.clientX,
			y: e.clientY,
			on: false,
			ghost: null,
			pid: e.pointerId,
			day: null
		};
	}
	function move(e: PointerEvent) {
		if (!drag || e.pointerId !== drag.pid) return;
		if (!drag.on) {
			if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 6) return;
			drag.on = true;
			draggingId = drag.id;
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
			drag.ghost.style.top = e.clientY - 22 + 'px';
		}
		const t = document.elementFromPoint(e.clientX, e.clientY);
		const col = t?.closest<HTMLElement>('[data-day]');
		drag.day = col ? Number(col.dataset.day) : null;
		overDay = drag.day;
		e.preventDefault();
	}
	function end(commit: boolean) {
		if (!drag) return;
		const d = drag;
		drag = null;
		d.ghost?.remove();
		overDay = null;
		draggingId = '';
		if (d.on && commit && d.day != null && S.sched[d.id] && S.sched[d.id].day !== d.day) {
			S.sched[d.id].day = d.day;
			toast(`Moved to ${CDAYS[d.day]}`);
		}
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
		<label class="flex flex-col gap-1 font-mono text-xs font-bold tracking-wide uppercase">
			Cook at
			<input type="time" class="brutal-field" bind:value={S.cookTime} />
		</label>
		{#each S.cooks as c (c.id)}
			<label class="flex flex-col gap-1 font-mono text-xs font-bold tracking-wide uppercase">
				Chef
				<span class="flex items-center gap-2">
					<CookIcon kind={c.icon} size={30} />
					<input
						class="brutal-field w-32"
						bind:value={c.name}
						maxlength="14"
						aria-label="Chef name"
					/>
				</span>
			</label>
		{/each}
	</div>

	<div class="brutal-box mt-6 overflow-x-auto bg-white">
		<div class="min-w-[44rem] p-3" role="table" aria-label="Weekly schedule">
			<div class="grid grid-cols-[3.5rem_repeat(7,minmax(0,1fr))] gap-1.5">
				<span></span>
				{#each CDAYS as d, i (d)}
					<div
						class="rounded-md py-1 text-center font-mono text-xs font-bold uppercase {overDay === i
							? 'bg-lime'
							: ''}"
					>
						{d}
						<small class="block text-ink/50">{dayDate(i).getDate()}</small>
					</div>
				{/each}

				<span class="self-center font-mono text-xs font-bold uppercase">Cook</span>
				{#each CDAYS as d, i (d)}
					<div
						class="flex min-h-16 flex-col gap-1.5 rounded-md border-2 border-dashed p-1 {overDay ===
						i
							? 'border-ink bg-lime/50'
							: 'border-ink/25'}"
						data-day={i}
					>
						{#each items.filter((x) => S.sched[x.r.id] && S.sched[x.r.id].day === i) as x (x.r.id)}
							{@const chef = cookOf(S.sched[x.r.id].chef)}
							<div
								class="flex cursor-grab touch-none items-center gap-1 rounded-md border-2 border-ink px-1.5 py-1 text-xs leading-tight font-bold text-white select-none active:cursor-grabbing {draggingId ===
								x.r.id
									? 'opacity-30'
									: ''}"
								role="button"
								tabindex="-1"
								style="background:{STRONG[idx(x.r.id)]}"
								title="{chef.name} cooks {x.r.title}. Drag to another day."
								onpointerdown={(e) => down(e, x.r.id)}
							>
								<span class="shrink-0 rounded-full bg-white/90 p-0.5"
									><CookIcon kind={chef.icon} size={22} /></span
								>
								<span class="min-w-0 break-words">{shortName(x.r.title)}</span>
							</div>
						{/each}
					</div>
				{/each}

				{#each [['Lunch', 0], ['Dinner', 1]] as [label, off] (label)}
					<span class="self-center font-mono text-xs font-bold uppercase">{label}</span>
					{#each CDAYS as d, i (d)}
						{@const id = lay.slots[i * 2 + Number(off)]}
						{#if id}
							<div
								class="min-h-10 rounded-md border-l-[5px] px-1.5 py-1 text-[0.7rem] leading-tight font-semibold"
								data-day={i}
								style="background:{TINT[idx(id)]};border-color:{STRONG[idx(id)]}"
								title={title(id)}
							>
								{shortName(title(id))}
							</div>
						{:else}
							<div class="min-h-10 rounded-md bg-ink/5" data-day={i}></div>
						{/if}
					{/each}
				{/each}
			</div>
		</div>
	</div>

	<p class="mt-3 text-xs text-ink/60">
		Drag a cooking tile to another day to move it. The first serving is eaten the night it's cooked,
		then leftovers fill the next lunches and dinners.
	</p>
	{#if overIds.length}
		<p class="mt-2 font-mono text-xs font-bold text-ink/80 uppercase">
			Past Saturday: {overIds
				.map((id) => shortName(title(id)) + ' (' + lay.over[id] + ' meals)')
				.join(', ')}. Move a recipe earlier or lower the servings.
		</p>
	{/if}

	<div class="mt-6 flex flex-col gap-3">
		{#each items as x (x.r.id)}
			{@const sc = S.sched[x.r.id]}
			{#if sc}
				<div class="brutal-box flex flex-wrap items-center gap-x-5 gap-y-3 bg-white p-4">
					<span
						class="size-4 shrink-0 rounded-full border-2 border-ink"
						style="background:{STRONG[idx(x.r.id)]}"
					></span>
					<span class="min-w-48 flex-1 font-display text-lg font-black">
						{x.r.title}
						<small class="block font-mono text-xs font-bold tracking-wide text-ink/60 uppercase"
							>{mealsOf(x.servings)} meals</small
						>
					</span>
					<label
						class="flex items-center gap-2 font-mono text-xs font-bold tracking-wide uppercase"
					>
						Cook on
						<select
							class="brutal-field w-auto"
							value={sc.day}
							onchange={(e) => (S.sched[x.r.id].day = Number(e.currentTarget.value))}
						>
							{#each CDAYS as d, i (d)}<option value={i}>{d}</option>{/each}
						</select>
					</label>
					<div class="flex gap-2" role="group" aria-label="Chef">
						{#each S.cooks as c (c.id)}
							<button
								type="button"
								class="brutal-chip flex items-center gap-1.5"
								aria-pressed={sc.chef === c.id}
								onclick={() => (S.sched[x.r.id].chef = c.id)}
							>
								<CookIcon kind={c.icon} size={20} />{c.name}
							</button>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	</div>

	<CalendarPicker {items} />
</section>
