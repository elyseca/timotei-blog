// @ts-nocheck -- ported recipe/grocery/plan engine
/* Helpers: formatting, scaling, grocery list, similarity, line parsing */
export const FR = [
	[0, ''],
	[1 / 8, '⅛'],
	[1 / 6, '⅙'],
	[1 / 4, '¼'],
	[1 / 3, '⅓'],
	[3 / 8, '⅜'],
	[1 / 2, '½'],
	[5 / 8, '⅝'],
	[2 / 3, '⅔'],
	[3 / 4, '¾'],
	[7 / 8, '⅞'],
	[1, '']
];

export function fmtQty(q) {
	if (q == null) return '';
	if (q >= 10) return String(Math.round(q * 10) / 10).replace(/\.0$/, '');
	let w = Math.floor(q),
		f = q - w,
		best = FR[0],
		d = 9;
	for (const x of FR) {
		const dd = Math.abs(f - x[0]);
		if (dd < d) {
			d = dd;
			best = x;
		}
	}
	if (d > 0.03) return String(Math.round(q * 10) / 10).replace(/\.0$/, '');
	if (best[0] === 1) {
		w += 1;
		best = FR[0];
	}
	if (w === 0 && best[0] === 0) return '⅛';
	return (w ? String(w) : '') + best[1];
}

export function isCount(unit) {
	return unit === '' || /^(can|bag|bunch|pint)/.test(unit);
}

export function pluralUnit(unit, q) {
	if (q != null && q > 1) return unit.replace(/^(cup|can|bag|bunch|pint|clove|stalk)/, '$1s');
	return unit;
}
export function pluralName(name, q, unit) {
	if (unit !== '' || q == null || q <= 1) return name;
	if (/ leaf$/.test(name)) return name.replace(/leaf$/, 'leaves');
	if (/s$/.test(name)) return name;
	if (/(x|z|ch|sh|o)$/.test(name)) return name + 'es';
	return name + 's';
}

export function lineText(x, f = 1) {
	f = f || 1;
	let q = x.qty == null ? null : x.qty * f,
		u = x.unit;
	if (q != null && u === 'cup' && q < 0.25) {
		q *= 16;
		u = 'tbsp';
	}
	if (q != null && u === 'tbsp' && q < 1) {
		q *= 3;
		u = 'tsp';
	}
	x = Object.assign({}, x, { unit: u });
	const parts = [];
	if (q != null) parts.push(fmtQty(q));
	if (u) parts.push(pluralUnit(u, q));
	parts.push(pluralName(x.name, q, x.unit));
	return parts.join(' ');
}

export const FAT_RE =
	/^((olive|vegetable|canola|avocado|coconut) )?oil$|^(unsalted |salted )?butter$/;
export function fatTbsp(r) {
	let t = 0;
	for (const x of r.ing) {
		if (x.qty != null && FAT_RE.test(x.name.toLowerCase())) {
			t +=
				x.unit === 'tbsp'
					? x.qty
					: x.unit === 'tsp'
						? x.qty / 3
						: x.unit === 'cup'
							? x.qty * 16
							: 0;
		}
	}
	return t / (r.servings || 1);
}

export function hasGarlic(r) {
	return (
		r.ing.some((x) => /garlic/i.test(x.name)) ||
		r.steps.some((s) => /garlic/i.test(Array.isArray(s) ? s.join(' ') : s))
	);
}

export const DROP = new Set([
	'chopped',
	'diced',
	'fresh',
	'frozen',
	'low-sodium',
	'boneless',
	'skinless',
	'dried',
	'large',
	'small',
	'medium',
	'shredded',
	'grated',
	'sliced',
	'cooked',
	'raw',
	'unsalted',
	'plain',
	'baby',
	'yukon',
	'yellow',
	'ripe',
	'shaved',
	'soft'
]);
export function singular(w) {
	if (/ies$/.test(w)) return w.slice(0, -3) + 'y';
	if (/(o|ch|sh|x)es$/.test(w)) return w.slice(0, -2);
	if (/(us|ss)$/.test(w) || w.length < 4) return w;
	if (/[^s]s$/.test(w)) return w.slice(0, -1);
	return w;
}
export function coreName(name) {
	let s = name.toLowerCase().replace(/\(.*?\)/g, ' ');
	s = s
		.split(/\s+/)
		.filter((w) => w && !DROP.has(w))
		.join(' ');
	if (/broth$/.test(s)) return 'broth';
	const ws = s.split(' ');
	ws[ws.length - 1] = singular(ws[ws.length - 1]);
	return ws.join(' ');
}
export const STAPLES = new Set([
	'salt',
	'black pepper',
	'olive oil',
	'water',
	'sugar',
	'flour',
	'all-purpose flour',
	'baking powder',
	'broth',
	'lemon juice',
	'vanilla extract',
	'cumin',
	'oregano',
	'paprika',
	'thyme',
	'dijon mustard'
]);
export const STAPLES_HIDE = new Set(['salt', 'black pepper']);

export function groceryList(items, opts) {
	opts = opts || {};
	const map = new Map(),
		nulls = new Map();
	for (const it of items) {
		const r = it.r,
			f = it.servings / r.servings;
		for (const x of r.ing) {
			const core = coreName(x.name);
			if (core === 'water') continue;
			if (opts.hideStaples && STAPLES_HIDE.has(core)) continue;
			if (x.qty == null) {
				if (!nulls.has(core)) nulls.set(core, { name: x.name, dept: x.dept, from: new Set() });
				nulls.get(core).from.add(r.title);
				continue;
			}
			const key = core + '|' + x.unit;
			let e = map.get(key);
			if (!e) {
				e = { key, core, name: x.name, qty: 0, unit: x.unit, dept: x.dept, from: new Set() };
				map.set(key, e);
			}
			e.qty += x.qty * f;
			if (x.name.length < e.name.length) e.name = x.name;
			e.from.add(r.title);
		}
	}
	const out = [...map.values()];
	const have = new Set(out.map((e) => e.core));
	for (const [core, n] of nulls) {
		if (!have.has(core))
			out.push({
				key: core + '|',
				core,
				name: n.name,
				qty: null,
				unit: '',
				dept: n.dept,
				from: n.from
			});
	}
	for (const e of out) {
		if (e.qty != null && isCount(e.unit))
			e.qty = Math.max(1, Math.ceil(Math.round(e.qty * 1000) / 1000));
		e.from = [...e.from];
	}
	out.sort((a, b) => a.name.localeCompare(b.name));
	return out;
}

export function coreSet(r) {
	const s = new Set();
	for (const x of r.ing) {
		const c = coreName(x.name);
		if (!STAPLES.has(c)) s.add(c);
	}
	return s;
}
export function similar(ids, all, n) {
	n = n || 3;
	const base = new Set();
	all.filter((r) => ids.includes(r.id)).forEach((r) => coreSet(r).forEach((c) => base.add(c)));
	const res = [];
	for (const r of all) {
		if (ids.includes(r.id) || r.kind === 'Carb' || r.kind === 'Treat') continue;
		const shared = [...coreSet(r)].filter((c) => base.has(c));
		if (shared.length)
			res.push({ r, shared, score: shared.length + (r.kind === 'Main' ? 0.5 : 0) });
	}
	res.sort((a, b) => b.score - a.score);
	return res.slice(0, n);
}

/* ---- parsing a typed ingredient line ---- */
export const UNITS = {
	cup: 'cup',
	cups: 'cup',
	c: 'cup',
	tbsp: 'tbsp',
	tablespoon: 'tbsp',
	tablespoons: 'tbsp',
	tbs: 'tbsp',
	tsp: 'tsp',
	teaspoon: 'tsp',
	teaspoons: 'tsp',
	oz: 'oz',
	ounce: 'oz',
	ounces: 'oz',
	lb: 'lb',
	lbs: 'lb',
	pound: 'lb',
	pounds: 'lb',
	g: 'g',
	gram: 'g',
	grams: 'g',
	kg: 'kg',
	ml: 'ml',
	l: 'l',
	can: 'can',
	cans: 'can',
	pinch: 'pinch',
	clove: 'clove',
	cloves: 'clove',
	stalk: 'stalk',
	stalks: 'stalk',
	bunch: 'bunch',
	pint: 'pint',
	bag: 'bag'
};
export const VULG = { '½': 0.5, '⅓': 1 / 3, '⅔': 2 / 3, '¼': 0.25, '¾': 0.75, '⅛': 0.125 };

export function parseQty(s) {
	let m;
	if ((m = s.match(/^(\d+)\s+(\d+)\/(\d+)(?=\s|$)/)))
		return [+m[1] + m[2] / m[3], s.slice(m[0].length)];
	if ((m = s.match(/^(\d+)\/(\d+)(?=\s|$)/))) return [m[1] / m[2], s.slice(m[0].length)];
	if ((m = s.match(/^(\d+(?:\.\d+)?)\s*([½⅓⅔¼¾⅛])/)))
		return [+m[1] + VULG[m[2]], s.slice(m[0].length)];
	if ((m = s.match(/^([½⅓⅔¼¾⅛])/))) return [VULG[m[1]], s.slice(m[0].length)];
	if ((m = s.match(/^(\d+(?:\.\d+)?)/))) {
		let rest = s.slice(m[0].length).replace(/^\s*[-–]\s*\d+(\.\d+)?/, '');
		return [+m[1], rest];
	}
	return [null, s];
}

export function guessDept(name) {
	const n = name.toLowerCase();
	if (/frozen/.test(n)) return 'frozen';
	if (
		/broth|stock|canned|tomato paste|tomato sauce|crushed tomato|diced tomato|salsa|puree|jarred|roasted red pepper/.test(
			n
		)
	)
		return 'pantry';
	if (
		/black pepper|white pepper|chili|cayenne|pepper flakes|salt|cumin|oregano|paprika|cinnamon|thyme|rosemary|nutmeg|powder|sugar|flour|baking|vanilla|chocolate|cocoa|allspice|spice/.test(
			n
		)
	)
		return 'spice';
	if (
		/oil|vinegar|mustard|soy|honey|maple|tahini|hot sauce|glaze|mayo|peanut butter|ketchup/.test(n)
	)
		return 'oil';
	if (/milk|butter|cheese|parmesan|feta|yogurt|egg|tofu|cream/.test(n)) return 'dairy';
	if (
		/chicken|beef|pork|turkey|sausage|salmon|fish|shrimp|bacon|prosciutto|meatball|lamb|wing/.test(
			n
		)
	)
		return 'meat';
	if (/bread|bun|tortilla|pita|bagel/.test(n)) return 'bakery';
	if (
		/rice|quinoa|couscous|pasta|oats|lentil|cashew|peanut|walnut|pecan|almond|chia|seed|cereal|nutritional yeast|bean|chickpea/.test(
			n
		)
	)
		return /can/.test(n) ? 'pantry' : 'dry';
	if (
		/onion|carrot|celery|pepper|lemon|lime|potato|tomato|zucchini|squash|spinach|kale|arugula|lettuce|cucumber|broccoli|asparagus|fennel|ginger|basil|parsley|cilantro|scallion|herb|apple|banana|berry|mushroom|cabbage|avocado|fruit|garlic/.test(
			n
		)
	)
		return 'produce';
	return 'other';
}

export function parseLine(line) {
	let s = line.trim().replace(/^[-•*]\s*/, '');
	if (!s) return null;
	let [qty, rest] = parseQty(s);
	rest = rest.trim();
	let unit = '';
	const m = rest.match(/^([A-Za-z]+)\.?(?=\s|$)/);
	if (qty != null && m && UNITS[m[1].toLowerCase()]) {
		unit = UNITS[m[1].toLowerCase()];
		rest = rest.slice(m[0].length).trim();
	}
	rest = rest.replace(/^of\s+/i, '');
	let name = rest,
		note = '';
	const c = rest.search(/,|\s\(/);
	if (c > 0) {
		name = rest.slice(0, c).trim();
		note = rest
			.slice(c)
			.replace(/^[,\s]+/, '')
			.replace(/^\((.*)\)$/, '$1')
			.trim();
	}
	if (!name) return null;
	return { qty, unit, name, dept: guessDept(name), note };
}

/* ---- effort: how much work a recipe is ----
 * Built from the hands-on time, the start-to-table time, and the volume of work (how many
 * ingredients there are to buy and prep, and how many steps). Each gives 0 to 4 points; hands-on
 * time counts most. The score runs from 1 (a few minutes of work) to 5 (a project). */
const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
export const EFFORT_LABEL = { easy: 'Quick & easy', medium: 'Moderate', involved: 'Involved' };

export function effort(r) {
	// A recipe with no times yet is guessed from its steps, so it still gets a score.
	const m = r.mins || { active: 5 + 3 * r.steps.length, total: 15 + 6 * r.steps.length };
	const items = coreSet(r).size;
	const steps = r.steps.length;
	const timePts = clamp((m.total - 20) / 20, 0, 4);
	const handsPts = clamp((m.active - 5) / 10, 0, 4);
	const workPts = clamp(((items - 4) / 4 + (steps - 3) / 2) / 2, 0, 4);
	const score = Math.round((1 + 0.35 * timePts + 0.4 * handsPts + 0.25 * workPts) * 10) / 10;
	const tier = score <= EFFORT_EASY ? 'easy' : score <= EFFORT_MEDIUM ? 'medium' : 'involved';
	return { score, tier, label: EFFORT_LABEL[tier], active: m.active, total: m.total, items, steps };
}
const EFFORT_EASY = 2.3;
const EFFORT_MEDIUM = 3;

export function fmtMins(n) {
	if (n < 60) return n + ' min';
	const h = Math.floor(n / 60),
		m = n % 60;
	return h + ' hr' + (m ? ' ' + m + ' min' : '');
}

/* ---- meal-plan recommendations ---- */
export const WEEK_MEALS = 14; // 7 days x lunch + dinner

export function proteinOf(r) {
	const meat = r.ing
		.filter((x) => x.dept === 'meat')
		.map((x) => x.name.toLowerCase())
		.join(' ');
	if (/chicken|sausage/.test(meat)) return 'Chicken';
	if (/turkey/.test(meat) && !/beef/.test(meat)) return 'Turkey';
	if (/beef/.test(meat)) return 'Beef';
	if (/pork/.test(meat)) return 'Pork';
	if (/salmon|fish/.test(meat)) return 'Fish';
	if (/meatball/.test(meat)) return 'Meatballs';
	return 'Plant-based';
}
/** The meals plans draw from: everyday ones by default, or the special-occasion mains. */
export function planPool(all, occasion) {
	return all.filter(
		(r) =>
			r.kind === 'Main' && (occasion === 'special' ? (r.meal ?? []).includes('special') : r.weekly)
	);
}
export const hasSpecial = (all) => planPool(all, 'special').length > 0;
export function hashStr(s) {
	let h = 0;
	for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
	return h;
}

export function isSoup(r) {
	return !!r.stew || /soup|stew|chili/i.test(r.title);
}

/* ---- combos: a protein, a veg side and a carb cooked together as one meal ---- */
export const comboId = (ids) => 'combo:' + ids.join('+');

/** A virtual recipe for the chosen parts. Amounts are per serving, so the plan can scale them. */
export function makeCombo(all, ids) {
	const rs = ids.map((id) => all.find((r) => r.id === id));
	if (rs.length < 2 || rs.some((r) => !r)) return undefined;
	return {
		id: comboId(ids),
		title: rs.map((r) => r.title).join(' + '),
		blurb: '',
		section: 'Combos',
		kind: 'Main',
		meal: ['everyday'],
		by: '',
		servings: 1,
		parts: ids,
		// The parts cook side by side: work adds up, but the clock runs once.
		mins: rs.every((r) => r.mins)
			? {
					active: rs.reduce((t, r) => t + r.mins.active, 0),
					total: Math.max(...rs.map((r) => r.mins.total))
				}
			: undefined,
		freezer: false,
		veg: rs.every((r) => r.veg),
		ing: rs.flatMap((r) =>
			r.ing.map((x) => ({ ...x, qty: x.qty == null ? null : x.qty / r.servings }))
		),
		steps: rs.flatMap((r) =>
			r.steps.map((st) => [r.title, Array.isArray(st) ? st[0] + '. ' + st[1] : st])
		),
		notes: []
	};
}

const weekly = (all, kind) => all.filter((r) => r.kind === kind && r.weekly);
export const comboParts = (all) => ({
	protein: weekly(all, 'Protein'),
	veg: weekly(all, 'Side'),
	carb: weekly(all, 'Carb')
});

/* ---- what goes with what ----
 * One protein, one non-starchy veg, one starch. Potatoes are a starch, so never beside rice.
 * - Salad goes with quinoa or pearled couscous (grains that suit a cool plate), not rice or mash.
 * - Sushi rice is for fish only.
 * - Mashed potatoes go with the roasts (whole chicken, chicken thighs, pork loin), not wings.
 * Parts may be missing (a two-part combo); only the parts present are checked. */
const isSalad = (r) => !!r && /salad/i.test(r.title);
const WHOLE_GRAIN = ['brown-rice', 'quinoa'];
const ROASTS = ['whole-chicken', 'pork-loin', 'chicken-thighs'];

export function pairOk(parts) {
	const by = (k) => parts.find((r) => r && r.kind === k);
	const protein = by('Protein'),
		veg = by('Side'),
		carb = by('Carb');
	if (!carb) return true;
	if (carb.id === 'sushi-rice' && protein && proteinOf(protein) !== 'Fish') return false;
	if (isSalad(veg) && !['quinoa', 'pearled-couscous'].includes(carb.id)) return false;
	if (carb.id === 'mashed-potatoes') {
		if (protein && !ROASTS.includes(protein.id)) return false;
	}
	return true;
}

/** How well the parts suit each other (higher is better): used to rank suggestions. */
export function pairFit(parts) {
	const by = (k) => parts.find((r) => r && r.kind === k);
	const protein = by('Protein'),
		veg = by('Side'),
		carb = by('Carb');
	let f = 0;
	if (carb) {
		if (WHOLE_GRAIN.includes(carb.id)) f += 0.5;
		if (carb.id === 'white-rice') f -= 0.3;
		if (isSalad(veg) && carb.id === 'quinoa') f += 2;
		if (isSalad(veg) && carb.id === 'pearled-couscous') f += 1;
		if (veg && !isSalad(veg) && /rice/.test(carb.id)) f += 1;
		if (carb.id === 'mashed-potatoes') f += 1.5;
	}
	if (protein && protein.id === 'wings' && isSalad(veg)) f += 1; // something fresh against fried skin
	// Pairings that are classics from the recipe book itself.
	if (protein && protein.id === 'salmon' && veg && veg.id === 'asparagus') f += 1.5;
	if (protein && protein.id === 'salmon' && carb && /rice/.test(carb.id)) f += 1;
	if (protein && protein.id === 'meatballs' && veg && veg.id === 'cucumber-salad') f += 1.5;
	if (protein && protein.id === 'chicken-thighs' && carb && carb.id === 'roasted-potatoes') f += 1;
	if (protein && protein.id === 'lentils' && carb && /rice/.test(carb.id)) f += 0.5;
	return f;
}

/** Every full protein + veg + carb combination that works, best fits carrying a higher `fit`. */
export function comboList(all) {
	const { protein, veg, carb } = comboParts(all);
	const out = [];
	for (const p of protein)
		for (const v of veg)
			for (const c of carb) {
				if (!pairOk([p, v, c])) continue;
				const combo = makeCombo(all, [p.id, v.id, c.id]);
				combo.fit = pairFit([p, v, c]);
				out.push(combo);
			}
	return out;
}

/** Combos that share the most ingredients with what is already planned (and what is on hand). */
export function suggestCombos(all, planned, have, n) {
	n = n || 3;
	const base = new Set(have || []);
	planned.forEach((r) => coreSet(r).forEach((c) => base.add(c)));
	const ids = new Set(planned.map((r) => r.id));
	const scored = comboList(all)
		.filter((r) => !ids.has(r.id))
		.map((r) => {
			const cores = coreSet(r);
			const shared = [...cores].filter((c) => base.has(c));
			return {
				r,
				shared,
				score: shared.length - (cores.size - shared.length) * 0.15 + (r.fit || 0)
			};
		})
		.sort((a, b) => b.score - a.score || (a.r.id < b.r.id ? -1 : 1));
	const out = [];
	// Prefer different proteins, veg and starches across the suggestions; relax if there are too few.
	for (const strict of [3, 2, 1]) {
		const seen = [new Set(), new Set(), new Set()];
		out.forEach((c) => c.r.parts.forEach((id, n) => seen[n].add(id)));
		for (const c of scored) {
			if (out.length >= n) break;
			if (out.includes(c)) continue;
			const [p, v, k] = c.r.parts;
			const clash = [seen[0].has(p), seen[1].has(v), seen[2].has(k)];
			if (clash[0] || (strict >= 2 && clash[2]) || (strict >= 3 && clash[1])) continue;
			out.push(c);
			seen[0].add(p);
			seen[1].add(v);
			seen[2].add(k);
		}
	}
	return out;
}

/** Ingredients (minus pantry staples) a visitor can say they already have, for the plan picker. */
export function haveOptions(all) {
	const out = new Set();
	planPool(all).forEach((r) => coreSet(r).forEach((c) => out.add(c)));
	return [...out].sort();
}

export function buildPlans(all, n, shuffle, opts) {
	n = Math.max(1, n || 3);
	shuffle = shuffle || 0;
	opts = opts || {};
	const special = opts.occasion === 'special';
	// Combos are built from the everyday proteins, veg and carbs, so they only belong to everyday plans.
	let pool = planPool(all, opts.occasion)
		.concat(special ? [] : comboList(all))
		.filter((r) => !(opts.exclude || []).includes(proteinOf(r)));
	if (opts.easy) pool = pool.filter((r) => effort(r).tier === 'easy');
	if (opts.plant) pool = pool.filter((r) => proteinOf(r) === 'Plant-based');
	if (opts.fresh) pool = pool.filter((r) => !r.ing.some((x) => x.dept === 'frozen'));
	const maxSoups = Math.max(1, Math.min(2, n - 1)); // never three soups
	const maxCombos = n >= 4 ? 2 : 1;
	const cores = new Map(pool.map((r) => [r.id, coreSet(r)]));
	const pair = (a, b) => {
		let c = 0;
		cores.get(a.id).forEach((x) => {
			if (cores.get(b.id).has(x)) c++;
		});
		return c;
	};
	const mains = pool.filter((r) => !r.parts);
	const hubs = new Map();
	const hub = (r) => {
		if (!hubs.has(r.id))
			hubs.set(
				r.id,
				mains.reduce((t, o) => t + (o === r ? 0 : pair(r, o)), 0) // overlap with the regular mains only
			);
		return hubs.get(r.id);
	};
	const have = new Set(opts.have || []);
	const matches = (r) => [...have].filter((h) => cores.get(r.id).has(h)).length;
	const used = new Map();
	function pick(sub, o) {
		const chosen = [],
			cand = sub.slice();
		while (chosen.length < n && cand.length) {
			const soups = chosen.filter(isSoup).length;
			const combos = chosen.filter((r) => r.parts).length;
			const ok = cand.filter(
				(r) => !(isSoup(r) && soups >= maxSoups) && !(r.parts && combos >= maxCombos)
			);
			if (!ok.length) break;
			let best = null,
				bs = -1e9;
			for (const r of ok) {
				let s = chosen.reduce((t, c) => t + pair(r, c), 0) * (o.overlap || 0);
				if (!chosen.length && o.overlap) s += hub(r) * 0.3;
				if (o.distinct && chosen.some((c) => proteinOf(c) === proteinOf(r))) s -= 3;
				if (o.freezer && r.freezer) s += 4;
				if (o.veg && r.veg && !chosen.some((c) => c.veg)) s += 2;
				s += matches(r) * 6; // ingredients already on hand
				s += r.fit || 0; // how well a combo's parts go together
				if (r.parts) s += ((hashStr(r.id + ':' + shuffle) % 100) / 100) * 4; // so shuffling varies the combos
				s -= (used.get(r.id) || 0) * 3;
				if (r.parts) s -= r.parts.reduce((t, id) => t + (used.get(id) || 0), 0) * 12; // vary the combos
				s += (((hashStr(r.id) + shuffle * 37) % 10) / 10) * 1.2;
				if (s > bs) {
					bs = s;
					best = r;
				}
			}
			chosen.push(best);
			cand.splice(cand.indexOf(best), 1);
		}
		chosen.forEach((r) => used.set(r.id, (used.get(r.id) || 0) + 1));
		chosen.forEach((r) => (r.parts || []).forEach((id) => used.set(id, (used.get(id) || 0) + 1)));
		return chosen;
	}
	const freezer = pool.filter((r) => r.freezer);
	const defs = [
		{
			key: 'batch',
			name: 'Cook once, eat all week',
			why: 'Soups, stews, and chili that freeze well, so one big cook covers many meals.',
			sub: pool,
			o: { overlap: 0.8, freezer: true }
		},
		{
			key: 'shop',
			name: 'Smallest grocery list',
			why: 'Recipes that share the most ingredients, so there is less to buy.',
			sub: pool,
			o: { overlap: 1.5 }
		},
		{
			key: 'variety',
			name: 'Most variety',
			why: 'Different proteins, including a vegetarian meal, so the week never repeats.',
			sub: pool,
			o: { distinct: true, veg: true, overlap: 0.3 }
		}
	];
	const seen = new Set();
	return defs
		.map((d) => {
			const rs = pick(d.sub, d.o);
			const count = new Map();
			rs.forEach((r) =>
				cores.get(r.id).forEach((c) => {
					if (!STAPLES.has(c)) count.set(c, (count.get(c) || 0) + 1);
				})
			);
			const shared = [...count]
				.filter((e) => e[1] > 1)
				.sort((a, b) => b[1] - a[1])
				.map((e) => e[0])
				.slice(0, 4);
			const uses = [...have].filter((h) => rs.some((r) => cores.get(r.id).has(h)));
			return { key: d.key, name: d.name, why: d.why, ids: rs.map((r) => r.id), shared, uses };
		})
		.filter((p) => {
			const k = p.ids.slice().sort().join('|');
			if (!p.ids.length || seen.has(k)) return false;
			seen.add(k);
			return true;
		});
}
