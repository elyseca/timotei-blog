// Add the planned cooking sessions to Google Calendar.
//
// Nothing here knows anyone's email address. Google Calendar opens in whatever account the
// visitor is already signed into, so every event lands in their own calendar.
import { S } from './store.svelte';
import { lineText } from './engine';
import { cookOf, dayDate, slotDay } from './plan';
import type { PlanItem } from './types';

export interface CalEvent {
	title: string;
	start: Date;
	end: Date;
	html: string;
}

const pad2 = (n: number) => String(n).padStart(2, '0');
const localStamp = (d: Date) =>
	`${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}T${pad2(d.getHours())}${pad2(d.getMinutes())}00`;
const escHtml = (s: string) =>
	s.replace(
		/[&<>"']/g,
		(c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string
	);

const stepText = (s: string | [string, string]) => (Array.isArray(s) ? s[0] + '. ' + s[1] : s);

function detailsHtml(x: PlanItem) {
	const r = x.r;
	const f = x.servings / r.servings;
	const ings = r.ing.map((i) => '• ' + lineText(i, f) + (i.note ? ' (' + i.note + ')' : ''));
	const steps = r.steps.map((s, i) => i + 1 + '. ' + stepText(s));
	const scaled = r.parts
		? 'Amounts written inside the steps are for each recipe as written.'
		: f !== 1
			? `Amounts written inside the steps are for the full recipe (${r.servings} servings).`
			: '';
	const notes = (r.notes ?? []).map((n) => '• ' + n);
	let h = `<b>${escHtml(r.title)}</b><br>Makes ${x.servings} servings<br><br><b>Ingredients</b><br>`;
	h += ings.map(escHtml).join('<br>');
	h += '<br><br><b>Method</b>';
	if (scaled) h += `<br><i>${escHtml(scaled)}</i>`;
	h += '<br>' + steps.map(escHtml).join('<br>');
	if (notes.length) h += '<br><br><b>Notes</b><br>' + notes.map(escHtml).join('<br>');
	return h;
}

export function eventFor(x: PlanItem): CalEvent | null {
	const sc = S.sched[x.r.id];
	if (!sc) return null;
	const chef = cookOf(sc.chef);
	const d = dayDate(slotDay(sc.slot));
	// Cooking happens at lunch or dinner.
	const [h, mi] = (sc.slot % 2 ? '17:30' : '11:30').split(':').map(Number);
	return {
		title: `${chef.name} cooks ${x.r.title}`,
		start: new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, mi),
		end: new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, mi + 90),
		html: detailsHtml(x)
	};
}

function timeZone() {
	try {
		return Intl.DateTimeFormat().resolvedOptions().timeZone || '';
	} catch {
		return '';
	}
}

/** The Google Calendar link for one event. The description is cut until the link is short enough. */
export function googleCalendarUrl(ev: CalEvent): string {
	const tz = timeZone();
	const build = (details: string) =>
		'https://calendar.google.com/calendar/render?action=TEMPLATE' +
		'&text=' +
		encodeURIComponent(ev.title) +
		'&dates=' +
		localStamp(ev.start) +
		'/' +
		localStamp(ev.end) +
		'&details=' +
		encodeURIComponent(details) +
		(tz ? '&ctz=' + encodeURIComponent(tz) : '');
	let details = ev.html;
	let url = build(details);
	while (url.length > 7500 && details.length > 400) {
		details = details.slice(0, Math.floor(details.length * 0.85)).replace(/<[^<]*$/, '') + '<br>…';
		url = build(details);
	}
	return url;
}
