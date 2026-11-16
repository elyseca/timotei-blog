// The display layer for a recipe: Spanish text (when Spanish is on) and amounts in the chosen units.
// The planner, diet checks and swaps always work on the English recipe; call `localize(r)` only to
// show a recipe (after swapRecipe, if you use it). Titles in lists: `tTitle(r)`.
import { L } from '$lib/i18n.svelte';
import { RECIPES_ES } from './es';
import { convertText } from './units';
import { makeCombo } from './engine';
import { allRecipes, byId } from './store.svelte';
import type { Recipe } from './types';

const SWAP_ES = {
	veg: {
		test: /(?<!de verduras )\bcaldo(?: de (?:pollo|res|vaca|carne|ternera|pavo))?(?! de verduras)\b/gi,
		to: 'caldo de verduras'
	},
	gf: { test: /\bpasta\b(?! de (?:garbanzos|tomate|curry|ajo|miso))/gi, to: 'pasta de garbanzos' }
};
const swapEs = (s: string, kinds: ('veg' | 'gf')[]) =>
	kinds.reduce((t, k) => t.replace(SWAP_ES[k].test, SWAP_ES[k].to), s);

function es(r: Recipe): Recipe {
	const x = RECIPES_ES[r.id];
	if (!x) return r;
	const kinds: ('veg' | 'gf')[] = [];
	if (r.swaps?.some((w) => /vegetable/i.test(w.to))) kinds.push('veg');
	if (r.swaps?.some((w) => /chickpea/i.test(w.to))) kinds.push('gf');
	const sw = (t: string) => (kinds.length ? swapEs(t, kinds) : t);
	return {
		...r,
		title: x.title,
		blurb: x.blurb ?? r.blurb,
		story: x.story ?? r.story,
		variant: x.variant ?? r.variant,
		ing: r.ing.map((i, n) => ({
			...i,
			name: sw(x.ing[n]?.name ?? i.name),
			note: x.ing[n]?.note ?? i.note
		})),
		steps: x.steps.map((st) => (Array.isArray(st) ? (st.map(sw) as [string, string]) : sw(st))),
		notes: x.notes ?? r.notes,
		flavors: x.flavors ?? r.flavors,
		swaps: r.swaps?.map((w) => ({ from: w.from, to: w.to }))
	};
}

export function localize<T extends Recipe | undefined>(r: T): T {
	if (!r) return r;
	let out: Recipe = r;
	if (L.lang === 'es') {
		if (r.parts) {
			// A combo is built from its parts, so build it from the Spanish parts.
			const parts = allRecipes().map((p) => es(p));
			const c = makeCombo(parts, r.parts);
			out = c ? { ...r, title: c.title, ing: c.ing, steps: c.steps } : r;
		} else out = es(r);
	}
	const metricOrText = (s: string | [string, string]) =>
		Array.isArray(s)
			? ([convertText(s[0]), convertText(s[1])] as [string, string])
			: convertText(s);
	return {
		...out,
		steps: out.steps.map(metricOrText),
		notes: out.notes?.map((n) => convertText(n)),
		flavors: out.flavors
	} as T;
}

/** A recipe's title in the current language (combos: the parts joined with " + "). */
export function tTitle(r: Recipe | undefined): string {
	if (!r) return '';
	if (L.lang !== 'es') return r.title;
	if (r.parts) return r.parts.map((id) => tTitle(byId(id))).join(' + ');
	return RECIPES_ES[r.id]?.title ?? r.title;
}
