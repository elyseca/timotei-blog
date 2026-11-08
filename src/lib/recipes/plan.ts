// Meal-plan helpers and actions. They read and write the shared state S.
import { S, byId, toast } from './store.svelte';
import { lineText, fmtQty, WEEK_MEALS } from './engine';
import type { PlanItem } from './types';

export const CDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// Cooking tiles use strong colours; the meals eaten later use the matching light tint.
export const STRONG = ['#B3202B', '#2380BF', '#1E7B3A', '#7A3E9D', '#B4590F', '#1F7C69'];
export const TINT = ['#FBE4E5', '#DDEEFB', '#DDF1E3', '#EFE3F6', '#FBE9D9', '#DAF0EA'];
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
export const shortName = (t: string) =>
	t
		.replace(/\(.*?\)/g, '')
		.replace(/^(One-Pot|Instant Pot)\s+/i, '')
		.replace(/[:,].*$/, '')
		.trim();
export const cookOf = (id: string) => S.cooks.find((c) => c.id === id) ?? S.cooks[0];

export function planItems(): PlanItem[] {
	return S.plan
		.map((p) => ({ r: byId(p.id), servings: p.servings }))
		.filter((x): x is PlanItem => !!x.r);
}

/* ---------- default cook days + eating layout ---------- */
export function ensureSched() {
	const items = planItems();
	let p = 1;
	items.forEach((x, i) => {
		if (!S.sched[x.r.id]) {
			const day = p % 2 === 0 ? Math.floor(p / 2) - 1 : Math.floor(p / 2);
			S.sched[x.r.id] = {
				day: Math.max(0, Math.min(6, day)),
				chef: S.cooks[i % S.cooks.length].id
			};
		}
		p = Math.max(p, S.sched[x.r.id].day * 2 + 1) + mealsOf(x.servings);
	});
}

// slots[0..13] = lunch/dinner for Sun..Sat. The first serving is eaten the night it's cooked.
export function layout(items: PlanItem[]) {
	const slots: (string | null)[] = Array(WEEK_MEALS).fill(null);
	const over: Record<string, number> = {};
	items
		.map((x, i) => ({ x, i, sc: S.sched[x.r.id] }))
		.filter((o) => o.sc)
		.sort((a, b) => a.sc.day - b.sc.day || a.i - b.i)
		.forEach(({ x, sc }) => {
			let need = mealsOf(x.servings);
			let p = sc.day * 2 + 1;
			while (need > 0) {
				while (p < WEEK_MEALS && slots[p] !== null) p++;
				if (p >= WEEK_MEALS) {
					over[x.r.id] = (over[x.r.id] || 0) + need;
					break;
				}
				slots[p] = x.r.id;
				need--;
				p++;
			}
		});
	return { slots, over };
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
export function removeFromPlan(id: string) {
	S.plan = S.plan.filter((p) => p.id !== id);
}
export function choosePlan(ids: string[]) {
	S.plan = ids.map((id) => ({ id, servings: S.servingsPer }));
	ensureSched();
	window.scrollTo(0, 0);
}
export function backToPlans() {
	S.plan = [];
	window.scrollTo(0, 0);
}
export function setServ(id: string, d: number) {
	const p = S.plan.find((x) => x.id === id);
	if (p) p.servings = Math.max(1, Math.min(48, p.servings + d));
}
export const setHousehold = (d: number) =>
	(S.household = Math.max(1, Math.min(12, S.household + d)));
export function setServingsPer(d: number) {
	S.servingsPer = Math.max(1, Math.min(24, S.servingsPer + d));
	S.plan.forEach((p) => (p.servings = S.servingsPer));
}
export const setPerPlan = (d: number) => (S.perPlan = Math.max(1, Math.min(6, S.perPlan + d)));
export function toggleExclude(m: string) {
	const i = S.filters.exclude.indexOf(m);
	if (i >= 0) S.filters.exclude.splice(i, 1);
	else S.filters.exclude.push(m);
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
