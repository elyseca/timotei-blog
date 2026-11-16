// Spanish names for ingredients and units, and the ingredient line itself.
import { L } from '$lib/i18n.svelte';
import { RECIPES } from './data';
import { RECIPES_ES } from './es';

let ing: Map<string, string> | null = null;
function ingMap() {
	if (ing) return ing;
	ing = new Map();
	for (const r of RECIPES) {
		const es = RECIPES_ES[r.id];
		if (!es) continue;
		r.ing.forEach((x, i) => {
			const n = es.ing[i]?.name;
			if (n && !ing!.has(x.name.toLowerCase())) ing!.set(x.name.toLowerCase(), n);
		});
	}
	return ing;
}
/** The Spanish name of an ingredient, or the English one if there isn't a translation. */
export const tIng = (name: string) =>
	L.lang === 'es' ? (ingMap().get(name.toLowerCase()) ?? name) : name;

const UNIT_ES: Record<string, [string, string]> = {
	tsp: ['cdta.', 'cdtas.'],
	tbsp: ['cda.', 'cdas.'],
	cup: ['taza', 'tazas'],
	clove: ['diente', 'dientes'],
	can: ['lata', 'latas'],
	jar: ['frasco', 'frascos'],
	bag: ['bolsa', 'bolsas'],
	bunch: ['manojo', 'manojos'],
	pint: ['pinta', 'pintas'],
	pinch: ['pizca', 'pizcas'],
	stalk: ['tallo', 'tallos'],
	package: ['paquete', 'paquetes'],
	box: ['caja', 'cajas'],
	bottle: ['botella', 'botellas']
};
const EN_PLURAL = /^(cup|can|bag|bunch|pint|clove|stalk|jar|pinch|package|box|bottle)/;

/** A unit as shown next to a quantity, e.g. "cups", "tazas", "g". */
export function unitWord(unit: string, q: number | null): string {
	if (!unit) return '';
	const m = /^(\w+)(.*)$/.exec(unit)!;
	const word = m[1].toLowerCase(),
		rest = m[2];
	const plural = q != null && q > 1;
	if (L.lang === 'es' && UNIT_ES[word]) return UNIT_ES[word][plural ? 1 : 0] + rest;
	if (plural) return unit.replace(EN_PLURAL, '$1s');
	return unit;
}

const STOP = new Set([
	'de',
	'del',
	'la',
	'el',
	'y',
	'o',
	'con',
	'en',
	'para',
	'a',
	'al',
	'sin',
	'u'
]);
/** Spanish plural for a short ingredient name: every word but the small joining words. */
export function esPlural(name: string): string {
	return name
		.split(' ')
		.map((w, i, all) => {
			if (STOP.has(w.toLowerCase()) || /\d|\(|\)|,/.test(w)) return w;
			// stop before a "de ..." phrase: "dientes de ajo", "hojas de laurel"
			if (all.slice(0, i).some((x) => x.toLowerCase() === 'de')) return w;
			if (/s$/i.test(w)) return w;
			if (/ón$/i.test(w)) return w.slice(0, -2) + 'ones'; // limón → limones
			if (/[aeiouáéíóú]$/i.test(w)) return w + 's';
			if (/z$/i.test(w)) return w.slice(0, -1) + 'ces';
			return w + 'es';
		})
		.join(' ');
}
