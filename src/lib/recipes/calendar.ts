// Add the planned cooking sessions to a calendar.
//
// Nothing here knows anyone's email address. Web calendars open in whatever account the visitor is
// already signed into, and the .ics file goes to whatever calendar app their device opens it with,
// so every event lands in their own calendar.
import { S } from './store.svelte';
import { lineText } from './engine';
import { cookOf, dayDate } from './plan';
import type { CalendarId, PlanItem } from './types';

export const CALENDARS: { id: CalendarId; label: string; hint: string; oneAtATime: boolean }[] = [
	{
		id: 'google',
		label: 'Google Calendar',
		hint: 'Opens Google Calendar, one event per click.',
		oneAtATime: true
	},
	{
		id: 'outlook',
		label: 'Outlook.com',
		hint: 'Opens Outlook.com, one event per click.',
		oneAtATime: true
	},
	{
		id: 'office',
		label: 'Microsoft 365',
		hint: 'Opens Outlook for work or school, one event per click.',
		oneAtATime: true
	},
	{
		id: 'ics',
		label: 'Apple / other (.ics)',
		hint: 'Downloads one file with every event. Open it with Apple Calendar, Outlook, or any calendar app.',
		oneAtATime: false
	}
];

export interface CalEvent {
	title: string;
	start: Date;
	end: Date;
	html: string;
	text: string;
	uid: string;
}

const pad2 = (n: number) => String(n).padStart(2, '0');
const localStamp = (d: Date) =>
	`${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}T${pad2(d.getHours())}${pad2(d.getMinutes())}00`;
const localIso = (d: Date) =>
	`${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}T${pad2(d.getHours())}:${pad2(d.getMinutes())}:00`;
const escHtml = (s: string) =>
	s.replace(
		/[&<>"']/g,
		(c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string
	);

const stepText = (s: string | [string, string]) => (Array.isArray(s) ? s[0] + '. ' + s[1] : s);

function recipeParts(x: PlanItem) {
	const r = x.r;
	const f = x.servings / r.servings;
	const ings = r.ing.map((i) => '• ' + lineText(i, f) + (i.note ? ' (' + i.note + ')' : ''));
	const steps = r.steps.map((s, i) => i + 1 + '. ' + stepText(s));
	const scaled =
		f !== 1
			? `Amounts written inside the steps are for the full recipe (${r.servings} servings).`
			: '';
	const notes = (r.notes ?? []).map((n) => '• ' + n);
	return { r, ings, steps, scaled, notes };
}

function detailsHtml(x: PlanItem) {
	const { r, ings, steps, scaled, notes } = recipeParts(x);
	let h = `<b>${escHtml(r.title)}</b><br>Makes ${x.servings} servings<br><br><b>Ingredients</b><br>`;
	h += ings.map(escHtml).join('<br>');
	h += '<br><br><b>Method</b>';
	if (scaled) h += `<br><i>${escHtml(scaled)}</i>`;
	h += '<br>' + steps.map(escHtml).join('<br>');
	if (notes.length) h += '<br><br><b>Notes</b><br>' + notes.map(escHtml).join('<br>');
	return h;
}

function detailsText(x: PlanItem) {
	const { r, ings, steps, scaled, notes } = recipeParts(x);
	const out = [r.title, `Makes ${x.servings} servings`, '', 'INGREDIENTS', ...ings, '', 'METHOD'];
	if (scaled) out.push(scaled);
	out.push(...steps);
	if (notes.length) out.push('', 'NOTES', ...notes);
	return out.join('\n');
}

export function eventFor(x: PlanItem): CalEvent | null {
	const sc = S.sched[x.r.id];
	if (!sc) return null;
	const chef = cookOf(sc.chef);
	const d = dayDate(sc.day);
	const [h, mi] = (S.cookTime || '17:30').split(':').map(Number);
	const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, mi);
	const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, mi + 90);
	return {
		title: `${chef.name} cooks ${x.r.title}`,
		start,
		end,
		html: detailsHtml(x),
		text: detailsText(x),
		uid: `recipe-${x.r.id}-${localStamp(start)}@timotei.blog`
	};
}

/** Cut the description until the whole link is short enough for browsers and calendar sites. */
function fitUrl(
	build: (details: string) => string,
	details: string,
	shrink: (s: string) => string
) {
	let det = details;
	let url = build(det);
	while (url.length > 7500 && det.length > 400) {
		det = shrink(det);
		url = build(det);
	}
	return url;
}

function timeZone() {
	try {
		return Intl.DateTimeFormat().resolvedOptions().timeZone || '';
	} catch {
		return '';
	}
}

export function webCalendarUrl(kind: Exclude<CalendarId, 'ics'>, ev: CalEvent): string {
	if (kind === 'google') {
		const tz = timeZone();
		return fitUrl(
			(t) =>
				'https://calendar.google.com/calendar/render?action=TEMPLATE' +
				'&text=' +
				encodeURIComponent(ev.title) +
				'&dates=' +
				localStamp(ev.start) +
				'/' +
				localStamp(ev.end) +
				'&details=' +
				encodeURIComponent(t) +
				(tz ? '&ctz=' + encodeURIComponent(tz) : ''),
			ev.html,
			(s) => s.slice(0, Math.floor(s.length * 0.85)).replace(/<[^<]*$/, '') + '<br>…'
		);
	}
	const host = kind === 'outlook' ? 'outlook.live.com' : 'outlook.office.com';
	return fitUrl(
		(t) =>
			`https://${host}/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent` +
			'&subject=' +
			encodeURIComponent(ev.title) +
			'&startdt=' +
			encodeURIComponent(localIso(ev.start)) +
			'&enddt=' +
			encodeURIComponent(localIso(ev.end)) +
			'&body=' +
			encodeURIComponent(t),
		ev.text,
		(s) => s.slice(0, Math.floor(s.length * 0.85)) + '\n…'
	);
}

/* ---------- .ics file (RFC 5545) ---------- */
const icsEscape = (s: string) =>
	s.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

// Lines may not exceed 75 octets; continue on the next line with a leading space.
function fold(line: string): string {
	const enc = new TextEncoder();
	const parts: string[] = [];
	let cur = '';
	let bytes = 0;
	for (const ch of line) {
		const b = enc.encode(ch).length;
		if (bytes + b > (parts.length ? 74 : 75)) {
			parts.push(cur);
			cur = '';
			bytes = 0;
		}
		cur += ch;
		bytes += b;
	}
	parts.push(cur);
	return parts.join('\r\n ');
}

export function buildIcs(events: CalEvent[]): string {
	const now = new Date();
	const stamp =
		now.getUTCFullYear() +
		pad2(now.getUTCMonth() + 1) +
		pad2(now.getUTCDate()) +
		'T' +
		pad2(now.getUTCHours()) +
		pad2(now.getUTCMinutes()) +
		pad2(now.getUTCSeconds()) +
		'Z';
	const lines = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//timotei.blog//Recipe Book//EN',
		'CALSCALE:GREGORIAN'
	];
	for (const ev of events) {
		lines.push(
			'BEGIN:VEVENT',
			'UID:' + ev.uid,
			'DTSTAMP:' + stamp,
			// No time zone on purpose: the event happens at this clock time wherever the calendar is.
			'DTSTART:' + localStamp(ev.start),
			'DTEND:' + localStamp(ev.end),
			'SUMMARY:' + icsEscape(ev.title),
			'DESCRIPTION:' + icsEscape(ev.text),
			'END:VEVENT'
		);
	}
	lines.push('END:VCALENDAR');
	return lines.map(fold).join('\r\n') + '\r\n';
}

export function downloadIcs(events: CalEvent[], filename = 'meal-plan.ics') {
	const blob = new Blob([buildIcs(events)], { type: 'text/calendar;charset=utf-8' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 1000);
}
