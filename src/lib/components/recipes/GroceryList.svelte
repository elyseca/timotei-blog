<script lang="ts">
	import { S, toast } from '$lib/recipes/store.svelte';
	import { DEPTS } from '$lib/recipes/data';
	import { groceryList, lineText } from '$lib/recipes/engine';
	import { GORDER, groceryText, shortName } from '$lib/recipes/plan';
	import type { PlanItem } from '$lib/recipes/types';

	let { items }: { items: PlanItem[] } = $props();

	type Row = {
		key: string;
		core: string;
		name: string;
		qty: number | null;
		unit: string;
		dept: string;
		from: string[];
	};

	// Salt and pepper stay off the list; they're a reminder at the bottom instead.
	const list = $derived(groceryList(items, { hideStaples: true }) as Row[]);
	const checked = $derived(list.filter((e) => S.checks[e.key]));
	const visible = $derived(list.filter((e) => !S.checks[e.key]));

	const deptLabel = (k: string) => (DEPTS.find((d) => d[0] === k) ?? [k, k])[1];
	const depts = $derived(
		GORDER.map((k) => ({
			k,
			rows: visible.filter((e) => e.dept === k).sort((a, b) => a.name.localeCompare(b.name))
		})).filter((d) => d.rows.length)
	);
	const rowText = (e: Row) =>
		e.qty == null ? e.name : lineText({ qty: e.qty, unit: e.unit, name: e.name });

	let showChecked = $state(false);
	let showBox = $state(false);
	let copyText = $state('');
	let boxEl = $state<HTMLTextAreaElement | null>(null);

	function copyList() {
		const text = groceryText(items, visible, deptLabel);
		const fallback = () => {
			copyText = text;
			showBox = true;
			toast('Copy the list');
			setTimeout(() => {
				boxEl?.focus();
				boxEl?.select();
			}, 0);
		};
		try {
			navigator.clipboard.writeText(text).then(() => toast('List copied'), fallback);
		} catch {
			fallback();
		}
	}
</script>

<section class="mx-auto max-w-6xl px-5 py-8 md:px-8">
	<div class="flex flex-wrap items-center justify-end gap-3">
		<button type="button" class="brutal-btn" onclick={copyList}>Copy list</button>
	</div>
	{#if showBox}
		<textarea readonly rows="8" class="brutal-field mt-4" bind:this={boxEl} value={copyText}
		></textarea>
	{/if}
	<div class="brutal-box mt-4 columns-1 gap-x-8 bg-white p-4 sm:columns-2">
		{#each depts as d (d.k)}
			<section class="mb-6 break-inside-avoid">
				<h3 class="border-b-2 border-ink pb-1 font-mono text-sm font-bold tracking-wide uppercase">
					{deptLabel(d.k)}
				</h3>
				<ul class="mt-2 flex flex-col">
					{#each d.rows as e (e.key)}
						<li class="border-b border-ink/10 last:border-0">
							<label class="flex cursor-pointer items-start gap-3 py-2">
								<input type="checkbox" class="brutal-check mt-0.5" bind:checked={S.checks[e.key]} />
								<span class="text-sm">
									{rowText(e)}{#if e.qty == null}
										<em class="text-ink/50"> to taste</em>{/if}
									<small class="block text-xs text-ink/50">{e.from.map(shortName).join(', ')}</small
									>
								</span>
							</label>
						</li>
					{/each}
				</ul>
			</section>
		{:else}
			<p class="font-mono text-sm font-bold uppercase">All checked off</p>
		{/each}
	</div>
	<div class="mt-3 flex flex-wrap items-center justify-between gap-3">
		<p class="text-xs text-ink/60">Salt and pepper</p>
		{#if checked.length}
			<button
				type="button"
				class="font-mono text-xs font-bold tracking-wide uppercase underline decoration-2 underline-offset-4"
				aria-expanded={showChecked}
				onclick={() => (showChecked = !showChecked)}
			>
				Checked off ({checked.length})
			</button>
		{/if}
	</div>
	{#if showChecked && checked.length}
		<ul class="brutal-box mt-3 flex flex-col bg-cream-2 px-5 py-2">
			{#each checked as e (e.key)}
				<li class="border-b border-ink/10 last:border-0">
					<label class="flex cursor-pointer items-center gap-3 py-2">
						<input type="checkbox" class="brutal-check" bind:checked={S.checks[e.key]} />
						<span class="text-sm text-ink/60">{rowText(e)}</span>
					</label>
				</li>
			{/each}
		</ul>
	{/if}
</section>
