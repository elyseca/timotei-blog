// Shared recipe-book state (Svelte 5 runes). Everything in `S` is saved on this device only
// (localStorage); nothing is sent anywhere.
import { browser } from '$app/environment';
import { RECIPES } from './data';
import { makeCombo } from './engine';
import type { Cook, Recipe } from './types';

const KEY = 'timotei-recipes-v1';

const pad2 = (n: number) => String(n).padStart(2, '0');
export const isoDate = (d: Date) =>
	`${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

function comingSunday() {
	const d = new Date();
	d.setDate(d.getDate() + ((7 - d.getDay()) % 7));
	return isoDate(d);
}

function fresh() {
	return {
		household: 2,
		servingsPer: 6,
		perPlan: 3,
		shuffle: 0,
		plan: [] as { id: string; servings: number }[],
		checks: {} as Record<string, boolean>,
		user: [] as Recipe[],
		sched: {} as Record<string, { slot: number; chef: string; eats: number[] }>,
		// The slot of the grocery run (null until there is a plan). It stays on or before the first cook.
		shop: null as number | null,
		filters: {
			exclude: [] as string[],
			plant: false,
			fresh: false,
			// Only recipes that are quick and easy to make.
			easy: false,
			// Dietary: only recipes that are gluten-free, nut-free or dairy-free.
			veg: false,
			gf: false,
			nf: false,
			df: false,
			// Which meals plans draw from.
			occasion: 'everyday' as 'everyday' | 'special',
			have: [] as string[]
		},
		weekStart: comingSunday(),
		cooks: [
			{ id: 'e', name: 'Elyse', icon: 'shark' },
			{ id: 'g', name: 'Gabe', icon: 'jellyfish' }
		] as Cook[]
	};
}

export const S = $state(fresh());

// Not saved: search/filter state, toast, and the step of the calendar button.
export const ui = $state({
	F: {
		q: '',
		meal: '',
		by: '',
		equip: '',
		freezer: false,
		veg: false,
		garlic: false,
		gf: false,
		nf: false,
		df: false
	},
	calStep: 0,
	// Id of the protein, veggie or carb being turned into a combo (opens the pop-up).
	comboFrom: '',
	toast: '',
	ready: false
});

/** Load saved state. Call once from the browser (onMount) so server rendering stays deterministic. */
export function hydrate() {
	if (!browser || ui.ready) return;
	try {
		const raw = localStorage.getItem(KEY);
		if (raw) {
			const saved = JSON.parse(raw);
			// Older saves used a cook time and per-day cooking; start the schedule fresh.
			delete saved.cookTime;
			delete saved.calendar;
			delete saved.cooks; // the two chefs are fixed
			const first = Object.values(saved.sched ?? {})[0] as Record<string, unknown> | undefined;
			if (first && !('slot' in first)) saved.sched = {};
			saved.filters = { ...fresh().filters, ...saved.filters };
			Object.assign(S, saved);
		}
	} catch {
		// private window / blocked storage: just run without saving
	}
	ui.ready = true;
}

/** Write state to localStorage. Call from an $effect in a component so it re-runs on every change. */
export function persist() {
	if (!browser || !ui.ready) return;
	const snapshot = $state.snapshot(S);
	try {
		localStorage.setItem(KEY, JSON.stringify(snapshot));
	} catch {
		// ignore
	}
}

export const allRecipes = (): Recipe[] => RECIPES.concat(S.user);
export const byId = (id: string): Recipe | undefined =>
	id.startsWith('combo:')
		? (makeCombo(allRecipes(), id.slice(6).split('+')) as Recipe | undefined)
		: allRecipes().find((r) => r.id === id);

let toastTimer: ReturnType<typeof setTimeout>;
export function toast(msg: string) {
	ui.toast = msg;
	clearTimeout(toastTimer);
	toastTimer = setTimeout(() => (ui.toast = ''), 2400);
}
