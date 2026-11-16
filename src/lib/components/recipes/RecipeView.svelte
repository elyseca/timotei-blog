<script lang="ts">
	import { S, byId, allRecipes } from '$lib/recipes/store.svelte';
	import { t } from '$lib/i18n.svelte';
	import { localize, tTitle } from '$lib/recipes/localize';
	import { MEALS } from '$lib/recipes/data';
	import { lineText, similar, diet, DIETS, swapRecipe } from '$lib/recipes/engine';
	import { togglePlan } from '$lib/recipes/plan';
	import EffortBadge from './EffortBadge.svelte';
	import type { Recipe } from '$lib/recipes/types';
	import PhotoForm from './PhotoForm.svelte';
	import DietPill from './DietPill.svelte';

	import { tIng } from '$lib/recipes/words';
	import PrefsBar from '$lib/components/PrefsBar.svelte';
	let { id }: { id: string } = $props();

	const r = $derived(localize(swapRecipe(byId(id), S.filters)) as Recipe | undefined);

	// A combo's amounts are per serving: show them for a standard plan serving count.
	const f = $derived(r?.parts ? S.servingsPer / r.servings : 1);
	const inPlan = $derived(S.plan.some((p) => p.id === id));
	const sim = $derived(
		r
			? (similar([r.id], allRecipes(), 3) as {
					r: { id: string; title: string };
					shared: string[];
				}[])
			: []
	);
	let showPhotoForm = $state(false);
	// Other versions of this dish (e.g. the two buffalo macs).
	const variants = $derived(
		r?.family ? allRecipes().filter((x) => x.family === r.family && x.id !== r.id) : []
	);
	const planSibling = $derived(
		r?.family ? S.plan.find((p) => p.id !== id && byId(p.id)?.family === r.family) : undefined
	);
	const dt = $derived(r ? diet(r) : null);
	const tags = $derived(
		r
			? [
					...(r.meal ?? []).map((m) => (MEALS as Record<string, string>)[m] ?? m),
					...(r.freezer ? ['Freezer-friendly'] : []),
					...(r.equip ?? []),
					...(r.tags ?? [])
				]
			: []
	);
</script>

{#if !r}
	<div class="mx-auto max-w-3xl px-5 py-16 md:px-8">
		<div class="brutal-box bg-white p-10 text-center">
			<p class="font-mono text-sm uppercase">
				{t("That recipe isn't here.")}
				<a href="/recipes" class="underline decoration-2 underline-offset-4"
					>{t('Back to all recipes')}</a
				>
			</p>
		</div>
	</div>
{:else}
	<section class="grid-bg border-b-[2.5px] border-ink bg-coral">
		<div class="mx-auto max-w-6xl px-5 py-5 md:px-8 md:py-7">
			<a
				href="/recipes"
				class="tap rise-in font-mono text-sm font-bold tracking-wide uppercase underline decoration-2 underline-offset-4"
			>
				{t('← All recipes')}
			</a>
			<h1
				class="rise-in mt-3 max-w-3xl font-display text-3xl font-black md:mt-5 md:text-5xl"
				style="--delay: 80ms"
			>
				{r.title}
			</h1>
			{#if r.blurb}<p
					class="rise-in mt-3 max-w-2xl text-base text-ink/80 md:mt-4 md:text-lg"
					style="--delay: 140ms"
				>
					{r.blurb}
				</p>{/if}
			{#if r.family}
				<div class="rise-in mt-4 flex flex-wrap items-center gap-2" style="--delay: 160ms">
					<span class="font-mono text-xs font-bold tracking-wide uppercase">{t('Versions:')}</span>
					<span class="brutal-chip" aria-pressed="true">{r.variant ?? r.title}</span>
					{#each variants as v (v.id)}
						<a class="brutal-chip" href="/recipes/view#{v.id}">{localize(v).variant ?? tTitle(v)}</a
						>
					{/each}
				</div>
			{/if}
			{#if r.mins}
				<div class="rise-in mt-5" style="--delay: 180ms"><EffortBadge {r} label /></div>
			{/if}
			<div class="rise-in mt-5 flex flex-col gap-2" style="--delay: 200ms">
				{#if dt}
					<div class="flex flex-wrap gap-2">
						{#each DIETS.filter((x) => dt[x.key as keyof typeof dt]) as x (x.key)}<DietPill
								k={x.key}
							/>{/each}
					</div>
				{/if}
				<div class="flex flex-wrap gap-2">
					{#each tags as tg (tg)}<span class="brutal-tag">{t(tg)}</span>{/each}
				</div>
			</div>
			<p
				class="rise-in mt-4 font-mono text-xs font-bold tracking-wide text-ink/70 uppercase"
				style="--delay: 240ms"
			>
				{r.by ? t('From {name}', { name: r.by }) : ''}
				{#if r.source}
					· {t('Adapted from')}
					<a
						href={r.source.url}
						target="_blank"
						rel="noopener"
						class="underline decoration-2 underline-offset-4">{r.source.name}</a
					>
				{/if}
			</p>
			{#if r.story}
				<blockquote
					class="rise-in mt-4 max-w-2xl border-l-4 border-ink pl-4 text-lg text-ink/80 italic"
					style="--delay: 260ms"
				>
					“{r.story}”
				</blockquote>
			{/if}
			<div class="rise-in mt-6 flex flex-wrap gap-3" style="--delay: 280ms">
				<button
					type="button"
					class="brutal-btn {inPlan ? 'bg-white' : ''}"
					onclick={() => togglePlan(id)}
				>
					{inPlan
						? t('✓ In meal plan')
						: planSibling
							? t('Swap in for the other version')
							: t('+ Add to meal plan')}
				</button>
			</div>
		</div>
	</section>

	<div class="mx-auto grid max-w-6xl gap-6 px-5 py-7 md:px-8 lg:grid-cols-[22rem_1fr]">
		<aside class="flex flex-col gap-4">
			<div class="brutal-box bg-white p-5">
				<div class="mb-3 flex items-center justify-between gap-3">
					<h2 class="font-display text-xl font-black">{t('Ingredients')}</h2>
					<PrefsBar show="units" />
				</div>
				{#if r.swaps?.length}
					<p class="mb-2 rounded-md bg-lime/40 px-2 py-1 text-xs font-semibold">
						{t('Swapped for your diet:')}
						{r.swaps.map((x) => `${x.from} → ${x.to}`).join(', ')}
					</p>
				{/if}
				<ul class="flex flex-col">
					{#each r.ing as x, i (i)}
						<li
							class="flex flex-wrap justify-between gap-x-3 border-b border-ink/10 py-2 text-sm last:border-0"
						>
							<span>{lineText(x, f)}</span>
							{#if x.note}<em class="text-ink/50">{x.note}</em>{/if}
						</li>
					{/each}
				</ul>
			</div>
		</aside>

		<div class="min-w-0">
			<h2 class="font-display text-3xl font-black">{t('Method')}</h2>
			<ol class="mt-5 flex flex-col gap-4">
				{#each r.steps as s, i (i)}
					<li class="flex gap-4">
						<span
							class="grid size-8 shrink-0 place-items-center rounded-full border-2 border-ink bg-lime font-mono text-sm font-bold"
							>{i + 1}</span
						>
						<p class="pt-0.5 text-[1.02rem] leading-relaxed">
							{#if Array.isArray(s)}<strong>{s[0]}.</strong> {s[1]}{:else}{s}{/if}
						</p>
					</li>
				{/each}
			</ol>

			{#if r.flavors}
				<h2 class="mt-12 font-display text-3xl font-black">{t('Flavors')}</h2>
				<div class="brutal-box mt-5 overflow-x-auto bg-white">
					<table class="w-full text-left text-sm">
						<thead class="border-b-[2.5px] border-ink bg-cream-2 font-mono text-xs uppercase">
							<tr
								><th class="p-3">{t('Flavor')}</th><th class="p-3">{t('Stir in')}</th><th
									class="p-3">{t('Sweetener')}</th
								><th class="p-3">{t('Top with')}</th></tr
							>
						</thead>
						<tbody>
							{#each r.flavors as x (x.name)}
								<tr class="border-b border-ink/10 last:border-0">
									<th class="p-3 font-bold">{x.name}</th>
									<td class="p-3">{x.add}</td>
									<td class="p-3">{x.sweet || '—'}</td>
									<td class="p-3">{x.top || '—'}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}

			{#if r.notes?.length}
				<h2 class="mt-12 font-display text-3xl font-black">{t('Notes')}</h2>
				<ul class="mt-5 list-disc space-y-2 pl-6">
					{#each r.notes as n, i (i)}<li>{n}</li>{/each}
				</ul>
			{/if}

			<div class="mt-12 flex items-baseline justify-between gap-3">
				<h2 class="font-display text-3xl font-black">{t('Photos')}</h2>
				{#if !showPhotoForm}
					<button
						type="button"
						class="tap font-mono text-[0.7rem] font-bold tracking-wide uppercase underline decoration-2 underline-offset-4"
						onclick={() => (showPhotoForm = true)}>{t('+ Add photo')}</button
					>
				{/if}
			</div>
			{#if r.photos?.length}
				<div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
					{#each r.photos as ph (ph.src)}
						<figure class="m-0">
							<a
								href={ph.src}
								target="_blank"
								rel="noopener"
								class="brutal-box block overflow-hidden"
							>
								<img
									src={ph.src}
									alt="{r.title}, {ph.kind === 'dish' ? t('the finished dish') : t('being made')}"
									loading="lazy"
									class="aspect-square w-full object-cover"
								/>
							</a>
							<figcaption class="mt-1 font-mono text-[0.65rem] tracking-wide text-ink/70 uppercase">
								{ph.kind === 'dish' ? t('The dish') : t('Making it')}{ph.by ? ' · ' + ph.by : ''}
								{#if ph.caption}<span class="block normal-case">{ph.caption}</span>{/if}
							</figcaption>
						</figure>
					{/each}
				</div>
			{:else if !showPhotoForm}
				<p class="mt-2 text-sm text-ink/60">{t('No photos yet.')}</p>
			{/if}
			{#if showPhotoForm}
				<PhotoForm id={r.id} title={r.title} onclose={() => (showPhotoForm = false)} />
			{/if}

			{#if sim.length}
				<h2 class="mt-12 font-display text-3xl font-black">{t('Shares ingredients with')}</h2>
				<div class="mt-5 grid gap-4 sm:grid-cols-3">
					{#each sim as s (s.r.id)}
						<a
							href="/recipes/view#{s.r.id}"
							class="brutal-box flex flex-col gap-1 bg-white p-4 transition-[translate,box-shadow] duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard-lg"
						>
							<strong class="font-display text-lg font-black">{tTitle(byId(s.r.id))}</strong>
							<span class="text-xs text-ink/60"
								>{s.shared
									.slice(0, 4)
									.map((n) => tIng(n))
									.join(', ')}</span
							>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}
