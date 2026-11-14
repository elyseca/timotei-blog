// Meal-plan helpers and actions. They read and write the shared state S.
import { S, byId, toast } from './store.svelte';
import { lineText, fmtQty, WEEK_MEALS, comboId } from './engine';
import type { PlanItem } from './types';

export const CDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// Cooking tiles use the site's palette; the meals eaten later use a light tint of the same colour.
const PALETTE = ['purple', 'mustard', 'coral', 'teal', 'blue', 'lime'];
export const STRONG = PALETTE.map((c) => `var(--color-${c})`);
export const TINT = PALETTE.map((c) => `color-mix(in srgb, var(--color-${c}) 28%, white)`);
export const GORDER = [
	'spice',
	'oil',
	'dry',
	'produce',
	'meat',
	'dairy',
	'bakery',
	'pantry',
	'frozen',
	'other'
];

export const ppl = (n: number) => n + (n === 1 ? ' person' : ' people');
export const mealsOf = (servings: number): number => Math.floor(servings / S.household + 1e-9);
export const daysText = (meals: number): string => {
	const d = meals / 2;
	return fmtQty(d) + (d <= 1 ? ' day' : ' days');
};
const shortOne = (t: string) =>
	t
		.replace(/\(.*?\)/g, '')
		.replace(/^(One-Pot|Instant Pot|Frozen|Simple)\s+/i, '')
		.replace(/[:,].*$/, '')
		.trim();
// A combo's title is its parts joined with " + ": shorten each part.
export const shortName = (t: string) => t.split(' + ').map(shortOne).join(' + ');
export const cookOf = (id: string) => S.cooks.find((c) => c.id === id) ?? S.cooks[0];

export function planItems(): PlanItem[] {
	return S.plan
		.map((p) => ({ r: byId(p.id), servings: p.servings }))
		.filter((x): x is PlanItem => !!x.r);
}

/* ---------- schedule ----------
 * A slot is one lunch or dinner: slot = day * 2 + (0 lunch | 1 dinner), 0..13 for the first
 * Sun..Sat, then 14..27 for the next week, and so on.
 * Rule: a recipe can only be eaten in the slot it is cooked in, or later.
 * Each planned recipe has the slot it is cooked in, who cooks, and the slots its servings are eaten in.
 */
export const slotDay = (slot: number) => Math.floor(slot / 2);
/** The calendar scrolls through this many weeks; slots keep counting past the first week. */
export const MAX_WEEKS = 8;
export const HORIZON = WEEK_MEALS * MAX_WEEKS;
export const weekOf = (slot: number) => Math.floor(slot / WEEK_MEALS);
export const slotName = (slot: number) => (slot % 2 ? 'Dinner' : 'Lunch');

/** Give every planned recipe a cook slot and eating slots, and keep them matching the servings. */
export function ensureSched() {
	const items = planItems();
	const taken = new Set<number>();
	items.forEach((x) => S.sched[x.r.id]?.eats.forEach((e) => taken.add(e)));
	let cursor = 1;
	items.forEach((x, i) => {
		let sc = S.sched[x.r.id];
		if (!sc) {
			const slot = Math.min(HORIZON - 1, cursor);
			sc = S.sched[x.r.id] = { slot, chef: S.cooks[i % S.cooks.length].id, eats: [] };
		}
		// Nothing is eaten before it is cooked.
		sc.eats.filter((e) => e < sc.slot).forEach((e) => taken.delete(e));
		sc.eats = sc.eats.filter((e) => e >= sc.slot);
		const need = mealsOf(x.servings);
		if (sc.eats.length > need) {
			sc.eats.slice(need).forEach((e) => taken.delete(e));
			sc.eats = sc.eats.slice(0, need);
		}
		let p = Math.max(sc.slot, sc.eats.length ? Math.max(...sc.eats) + 1 : sc.slot);
		while (sc.eats.length < need && p < HORIZON) {
			if (!taken.has(p)) {
				sc.eats.push(p);
				taken.add(p);
			}
			p++;
		}
		cursor = Math.max(cursor, sc.eats.length ? Math.max(...sc.eats) + 1 : cursor);
	});
	Object.keys(S.sched).forEach((id) => {
		if (!S.plan.some((p) => p.id === id)) delete S.sched[id];
	});
	// The grocery run happens on or before the first cooking slot.
	const first = firstCook();
	if (first == null) S.shop = null;
	else if (S.shop == null || S.shop > first) S.shop = Math.max(0, first - 1);
}

/** The earliest slot anything is cooked in, or null with no plan. */
export function firstCook(): number | null {
	const slots = Object.values(S.sched).map((sc) => sc.slot);
	return slots.length ? Math.min(...slots) : null;
}

/** What sits in each of the 14 slots: who is cooked, and which recipe is eaten. */
export function layout(items: PlanItem[]) {
	const eat: (string | null)[] = Array(HORIZON).fill(null);
	const cook: string[][] = Array.from({ length: HORIZON }, () => []);
	const over: Record<string, number> = {};
	items.forEach((x) => {
		const sc = S.sched[x.r.id];
		if (!sc) return;
		cook[sc.slot].push(x.r.id);
		sc.eats.forEach((e) => (eat[e] = x.r.id));
		const short = mealsOf(x.servings) - sc.eats.length;
		if (short > 0) over[x.r.id] = short;
	});
	return { eat, cook, over, shop: S.shop };
}

/**
 * Drag actions. Dropping a meal on another meal swaps them.
 * A meal can't be eaten before it is cooked: those moves are refused with a reason.
 */
export function moveCook(id: string, slot: number): string | null {
	const sc = S.sched[id];
	if (!sc || sc.slot === slot) return null;
	const eatsBefore = sc.eats.filter((e) => e < slot).length;
	const shopBefore = S.shop;
	sc.slot = slot;
	// Servings that would now be eaten before cooking slide to the next free meals after it,
	// and the grocery run steps back if it would now come after the first cook.
	ensureSched();
	const notes: string[] = [];
	if (eatsBefore)
		notes.push(`${eatsBefore} meal${eatsBefore === 1 ? '' : 's'} shifted to after cooking`);
	if (S.shop !== shopBefore) notes.push('grocery run moved earlier');
	return notes.length ? 'Moved. ' + notes.join(', ') : null;
}
/** The grocery run must come on or before the first cook. */
export function moveShop(slot: number): string | null {
	const first = firstCook();
	if (first != null && slot > first) return "Can't shop after the first cook";
	S.shop = slot;
	return null;
}
export function moveEat(id: string, from: number, to: number): string | null {
	if (from === to) return null;
	const mine = S.sched[id];
	if (!mine) return null;
	if (to < mine.slot) return "Can't eat it before it's cooked";
	const other = Object.entries(S.sched).find(([k, v]) => k !== id && v.eats.includes(to));
	if (other && from < other[1].slot) return "Can't swap: that meal isn't cooked yet by then";
	mine.eats = mine.eats.map((e) => (e === from ? to : e === to ? from : e));
	if (other) other[1].eats = other[1].eats.map((e) => (e === to ? from : e));
	return null;
}
export function nextChef(id: string) {
	const sc = S.sched[id];
	if (!sc) return;
	const i = S.cooks.findIndex((c) => c.id === sc.chef);
	sc.chef = S.cooks[(i + 1) % S.cooks.length].id;
}

/* ---------- actions ---------- */
export function togglePlan(id: string) {
	const i = S.plan.findIndex((p) => p.id === id);
	if (i >= 0) {
		S.plan.splice(i, 1);
		toast('Removed from plan');
	} else {
		S.plan.push({ id, servings: S.servingsPer });
		ensureSched();
		toast('Added to plan');
	}
}
/** Add a protein + veg + carb combination (any two or three of them) as one planned meal. */
export function addCombo(parts: string[]) {
	const id = comboId(parts);
	if (S.plan.some((p) => p.id === id)) return toast('Already in plan');
	S.plan.push({ id, servings: S.servingsPer });
	ensureSched();
	toast('Added to plan');
}
export function removeFromPlan(id: string) {
	S.plan = S.plan.filter((p) => p.id !== id);
	ensureSched();
}
export function choosePlan(ids: string[]) {
	S.plan = ids.map((id) => ({ id, servings: S.servingsPer }));
	S.sched = {};
	ensureSched();
	window.scrollTo(0, 0);
}
export function backToPlans() {
	S.plan = [];
	S.sched = {};
	window.scrollTo(0, 0);
}
export function setServ(id: string, d: number) {
	const p = S.plan.find((x) => x.id === id);
	if (p) p.servings = Math.max(1, Math.min(48, p.servings + d));
	ensureSched();
}
export function setHousehold(d: number) {
	S.household = Math.max(1, Math.min(12, S.household + d));
	ensureSched();
}
export function setServingsPer(d: number) {
	S.servingsPer = Math.max(1, Math.min(24, S.servingsPer + d));
	S.plan.forEach((p) => (p.servings = S.servingsPer));
	ensureSched();
}
export const setPerPlan = (d: number) => (S.perPlan = Math.max(1, Math.min(6, S.perPlan + d)));
export function toggleExclude(m: string) {
	const i = S.filters.exclude.indexOf(m);
	if (i >= 0) S.filters.exclude.splice(i, 1);
	else S.filters.exclude.push(m);
	S.shuffle = 0;
}
export function toggleHave(name: string) {
	const i = S.filters.have.indexOf(name);
	if (i >= 0) S.filters.have.splice(i, 1);
	else S.filters.have.push(name);
	S.shuffle = 0;
}
export function toggleFilter(key: 'plant' | 'fresh') {
	S.filters[key] = !S.filters[key];
	S.shuffle = 0;
}

/* ---------- grocery text ---------- */
export function groceryText(
	items: PlanItem[],
	list: { dept: string; qty: number | null; unit: string; name: string }[],
	deptLabel: (k: string) => string
) {
	const out = ['Grocery list for ' + items.map((x) => x.r.title).join(', '), ''];
	GORDER.forEach((k) => {
		const rows = list.filter((e) => e.dept === k);
		if (!rows.length) return;
		out.push(deptLabel(k).toUpperCase());
		rows.forEach((e) =>
			out.push(
				'- ' +
					(e.qty == null
						? e.name + ' (to taste)'
						: lineText({ qty: e.qty, unit: e.unit, name: e.name }))
			)
		);
		out.push('');
	});
	return out.join('\n');
}

export function dayDate(i: number): Date {
	const [y, m, d] = S.weekStart.split('-').map(Number);
	return new Date(y, m - 1, d + i);
}
