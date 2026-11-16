// Language and measurement units for the whole site (Svelte 5 runes).
// Everything is written in English in the code. `t('English text')` returns the Spanish version when
// Spanish is on, looked up in src/lib/i18n/es. Text with a missing translation shows in English.
import { browser } from '$app/environment';
import { ES } from './i18n/es';

export type Lang = 'en' | 'es';
export type Units = 'us' | 'metric';

const KEY = 'timotei-prefs-v1';

export const L = $state({ lang: 'en' as Lang, units: 'us' as Units });

/** Translate a UI string. `{name}` placeholders are filled from `vars`. Call it where the text is
 *  displayed (in a template or a function the template calls), never at module load, so it
 *  follows the language toggle. */
export function t(s: string, vars?: Record<string, string | number>): string {
	let out = L.lang === 'es' ? (ES[s] ?? s) : s;
	if (vars) out = out.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
	return out;
}

/** Load saved choices (or the browser's language the first time). Call once on the client. */
export function initPrefs() {
	if (!browser) return;
	try {
		const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
		if (saved) {
			if (saved.lang === 'en' || saved.lang === 'es') L.lang = saved.lang;
			if (saved.units === 'us' || saved.units === 'metric') L.units = saved.units;
		} else if (navigator.language?.toLowerCase().startsWith('es')) {
			L.lang = 'es';
		}
	} catch {
		/* storage blocked: stay with the defaults */
	}
	document.documentElement.lang = L.lang;
}

function save() {
	if (!browser) return;
	document.documentElement.lang = L.lang;
	try {
		localStorage.setItem(KEY, JSON.stringify({ lang: L.lang, units: L.units }));
	} catch {
		/* ignore */
	}
}
export function setLang(l: Lang) {
	L.lang = l;
	save();
}
export function setUnits(u: Units) {
	L.units = u;
	save();
}
