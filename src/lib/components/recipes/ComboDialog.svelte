<script lang="ts">
	import { ui, allRecipes } from '$lib/recipes/store.svelte';
	import { comboParts, pairOk, pairFit } from '$lib/recipes/engine';
	import { addCombo } from '$lib/recipes/plan';
	import type { Recipe } from '$lib/recipes/types';
	import { t } from '$lib/i18n.svelte';
	import { tTitle } from '$lib/recipes/localize';

	type Role = 'protein' | 'veg' | 'carb';
	const ROLES: { key: Role; label: string; kind: string }[] = [
		{ key: 'protein', label: 'Protein', kind: 'Protein' },
		{ key: 'veg', label: 'Veggie', kind: 'Side' },
		{ key: 'carb', label: 'Carb', kind: 'Carb' }
	];

	let dlg = $state<HTMLDialogElement | null>(null);

	const all = $derived(allRecipes());
	const parts = $derived(comboParts(all) as Record<Role, Recipe[]>);
	const anchor = $derived(all.find((r) => r.id === ui.comboFrom));
	// The two roles the visitor still has to choose.
	const others = $derived(ROLES.filter((r) => r.kind !== anchor?.kind));

	let picks = $state<Record<string, string>>({});
	const pickOf = (role: Role) => all.find((r) => r.id === picks[role]);

	/** Options for a role that go with the starting item and the other pick. */
	function options(role: Role): Recipe[] {
		if (!anchor) return [];
		const other = others.find((o) => o.key !== role);
		const op = other ? pickOf(other.key) : undefined;
		return parts[role].filter((r) => pairOk([anchor, op, r].filter((x): x is Recipe => !!x)));
	}

	// Start from the best-fitting pair, so adding is one click.
	function best() {
		if (!anchor || others.length < 2) return {};
		const [a, b] = others;
		let top = { score: -Infinity, a: '', b: '' };
		for (const x of parts[a.key])
			for (const y of parts[b.key]) {
				if (!pairOk([anchor, x, y])) continue;
				const score = pairFit([anchor, x, y]);
				if (score > top.score) top = { score, a: x.id, b: y.id };
			}
		return { [a.key]: top.a, [b.key]: top.b };
	}

	function choose(role: Role, id: string) {
		picks[role] = id;
		// If the other pick no longer goes with this one, switch it to the best that does.
		const other = others.find((o) => o.key !== role);
		if (other && !options(other.key).some((r) => r.id === picks[other.key])) {
			picks[other.key] = options(other.key)[0]?.id ?? '';
		}
	}

	$effect(() => {
		if (anchor && dlg && !dlg.open) {
			picks = best();
			dlg.showModal();
		} else if (!anchor && dlg?.open) {
			dlg.close();
		}
	});

	const ready = $derived(!!anchor && others.every((o) => picks[o.key]));
	function add() {
		if (!anchor) return;
		const ordered = ROLES.map((r) => (r.kind === anchor.kind ? anchor.id : picks[r.key])).filter(
			Boolean
		);
		addCombo(ordered);
		ui.comboFrom = '';
	}
</script>

<dialog
	bind:this={dlg}
	class="brutal-box m-auto w-[min(34rem,calc(100vw-2.5rem))] bg-cream p-0 backdrop:bg-ink/50"
	onclose={() => (ui.comboFrom = '')}
	onclick={(e) => e.target === dlg && dlg?.close()}
>
	{#if anchor}
		<div class="flex flex-col gap-5 p-6">
			<div>
				<p class="font-mono text-xs font-bold tracking-wide uppercase">
					{t(ROLES.find((r) => r.kind === anchor.kind)?.label ?? '')}
				</p>
				<h2 class="font-display text-2xl font-black">{tTitle(anchor)}</h2>
			</div>

			{#each others as role (role.key)}
				<div>
					<p class="font-mono text-xs font-bold tracking-wide uppercase">{t(role.label)}</p>
					<div class="mt-2 flex flex-wrap gap-2" role="group" aria-label={t(role.label)}>
						{#each options(role.key) as r (r.id)}
							<button
								type="button"
								class="brutal-chip normal-case"
								aria-pressed={picks[role.key] === r.id}
								onclick={() => choose(role.key, r.id)}
							>
								{tTitle(r)}
							</button>
						{/each}
					</div>
				</div>
			{/each}

			<div class="flex flex-wrap items-center gap-4">
				<button type="button" class="brutal-btn" disabled={!ready} onclick={add}>
					{t('Add to plan')}
				</button>
				<button
					type="button"
					class="font-mono text-xs font-bold tracking-wide uppercase underline decoration-2 underline-offset-4"
					onclick={() => dlg?.close()}
				>
					{t('Cancel')}
				</button>
			</div>
		</div>
	{/if}
</dialog>
