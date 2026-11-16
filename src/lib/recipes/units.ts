// US <-> metric conversion for ingredient lines and for amounts written inside recipe text.
// Volumes: cup, pint <-> ml / L. Weights: oz, lb <-> g / kg. Teaspoons and tablespoons stay as they
// are (they are the same size the world over). Temperatures: °F <-> °C.
import { L } from '$lib/i18n.svelte';

const ML_CUP = 240;
const ML_PINT = 475;
const G_OZ = 28.35;
const G_LB = 453.6;

/** Round to a sensible kitchen number. */
function nice(n: number): number {
	if (n < 10) return Math.round(n * 2) / 2 || 0.5;
	if (n < 100) return Math.round(n / 5) * 5;
	if (n < 1000) return Math.round(n / 10) * 10;
	return Math.round(n / 50) * 50;
}
const oneDec = (n: number) => Math.round(n * 10) / 10;

export interface Amount {
	q: number | null;
	unit: string;
}

/** Convert an ingredient amount to the chosen unit system. Returns it unchanged if it has nothing to convert. */
export function convertAmount(q: number | null, unit: string): Amount {
	if (q == null) return { q, unit };
	const m = /^(cup|oz|lb|pint|g|ml|kg|l)\b/i.exec(unit);
	const canMatch =
		/^(can|jar|bag|bottle|package|box|carton)\b \((\d+(?:\.\d+)?) (oz|g|ml)\)$/i.exec(unit);
	if (L.units === 'metric') {
		if (canMatch && canMatch[3].toLowerCase() === 'oz')
			return { q, unit: `${canMatch[1]} (${nice(+canMatch[2] * G_OZ)} g)` };
		if (!m) return { q, unit };
		const u = m[1].toLowerCase();
		let ml: number | null = null,
			g: number | null = null;
		if (u === 'cup') ml = q * ML_CUP;
		else if (u === 'pint') ml = q * ML_PINT;
		else if (u === 'oz') g = q * G_OZ;
		else if (u === 'lb') g = q * G_LB;
		else if (u === 'g') g = q;
		else if (u === 'ml') ml = q;
		if (ml != null)
			return ml >= 1000 ? { q: oneDec(ml / 1000), unit: 'L' } : { q: nice(ml), unit: 'ml' };
		if (g != null)
			return g >= 1000 ? { q: oneDec(g / 1000), unit: 'kg' } : { q: nice(g), unit: 'g' };
		return { q, unit };
	}
	// US
	if (canMatch && canMatch[3].toLowerCase() === 'g')
		return { q, unit: `${canMatch[1]} (${oneDec(+canMatch[2] / G_OZ)} oz)` };
	if (!m) return { q, unit };
	const u = m[1].toLowerCase();
	if (u === 'g' || u === 'kg') {
		const g = u === 'kg' ? q * 1000 : q;
		const oz = g / G_OZ;
		return oz >= 16
			? { q: Math.round((oz / 16) * 4) / 4, unit: 'lb' }
			: { q: Math.round(oz * 2) / 2 || 0.5, unit: 'oz' };
	}
	if (u === 'ml' || u === 'l') {
		const ml = u === 'l' ? q * 1000 : q;
		if (ml >= 60) return { q: Math.round((ml / ML_CUP) * 8) / 8, unit: 'cup' };
		if (ml >= 15) return { q: Math.round(ml / 15), unit: 'tbsp' };
		return { q: Math.round(ml / 5) || 1, unit: 'tsp' };
	}
	return { q, unit };
}

const FRAC: Record<string, number> = {
	'½': 0.5,
	'¼': 0.25,
	'¾': 0.75,
	'⅓': 1 / 3,
	'⅔': 2 / 3,
	'⅛': 0.125,
	'⅜': 0.375,
	'⅝': 0.625,
	'⅞': 0.875
};
function parseNum(s: string): number {
	let total = 0;
	for (const part of s.trim().split(/\s+/)) {
		if (/^\d+\/\d+$/.test(part)) {
			const [a, b] = part.split('/').map(Number);
			total += a / b;
		} else if (/^\d+(\.\d+)?$/.test(part)) total += +part;
		else {
			// e.g. 1½ or ½
			const m = /^(\d*)([½¼¾⅓⅔⅛⅜⅝⅞])$/.exec(part);
			if (m) total += (m[1] ? +m[1] : 0) + FRAC[m[2]];
			else return NaN;
		}
	}
	return total;
}

const NUM = String.raw`(\d+(?:\.\d+)?(?:\s\d+\/\d+)?\/?\d*|\d*[½¼¾⅓⅔⅛⅜⅝⅞]|\d+\/\d+)`;
const trimNum = (n: number) => String(oneDec(n)).replace(/\.0$/, '');
const dec = (s: string) => (L.lang === 'es' ? s.replace('.', ',') : s);

/** Convert temperatures and amounts written inside step or note text. */
export function convertText(text: string): string {
	if (typeof text !== 'string') return text;
	let out = text;
	if (L.units === 'metric') {
		out = out.replace(/(\d{2,3})\s?(?:°\s?F\b|degrees (?:F\b|farenheit|fahrenheit))/gi, (_m, f) => {
			const c = Math.round(((+f - 32) * 5) / 9 / 5) * 5;
			return `${c}°C`;
		});
		out = out.replace(
			new RegExp(
				String.raw`${NUM}\s?(?:de\s)?(cups?|tazas?|oz|ounces?|onzas?|lbs?|pounds?|libras?)\b(?!\s?\()`,
				'gi'
			),
			(m, n, u) => {
				const v = parseNum(n);
				if (Number.isNaN(v)) return m;
				const k = /cup|taza/i.test(u) ? 'cup' : /^(oz|ounce|onza)/i.test(u) ? 'oz' : 'lb';
				const a = convertAmount(v, k);
				return `${dec(trimNum(a.q ?? v))} ${a.unit}`;
			}
		);
	} else {
		out = out.replace(
			/(\d{2,3})\s?°\s?C\b/g,
			(_m, c) => `${Math.round(((+c * 9) / 5 + 32) / 5) * 5}°F`
		);
	}
	if (L.units === 'metric' && L.lang === 'es')
		out = out.replace(/(\d+)\.(\d+)(?= (?:ml|g|kg|L)\b)/g, '$1,$2');
	return out;
}
