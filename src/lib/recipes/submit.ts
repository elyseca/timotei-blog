/* Sending a recipe for review. Submissions are emailed to the site owner through Web3Forms
 * (https://web3forms.com): put the access key it gives you here. The key is meant to be public;
 * it only lets people send mail to the address it was made for. */
export const WEB3FORMS_KEY = '1250b0f3-7da9-49a5-b94a-e75bf4e1ce63';

export const EQUIPMENT = [
	'Oven',
	'Stovetop',
	'Instant Pot',
	'Dutch oven',
	'Slow cooker',
	'Air fryer',
	'Sheet pan',
	'Skillet',
	'Blender',
	'Food processor',
	'Stand mixer',
	'Grill',
	'Rice cooker',
	'Microwave'
];

export const UNITS = [
	'',
	'tsp',
	'tbsp',
	'cup',
	'oz',
	'lb',
	'g',
	'kg',
	'ml',
	'L',
	'can',
	'clove',
	'pinch'
];

export type Submission = {
	title: string;
	by: string;
	note: string;
	meal: string;
	servings: number;
	active: number | null;
	total: number | null;
	equip: string[];
	freezer: boolean;
	ing: { qty: string; unit: string; name: string }[];
	steps: string[];
	tips: string;
	dishPhoto: string;
	cookPhoto: string;
};

/** The email body: easy to read, followed by the recipe in the site's own format. */
export function submissionText(s: Submission) {
	const ing = s.ing.filter((i) => i.name.trim());
	const steps = s.steps.filter((x) => x.trim());
	const json = {
		title: s.title,
		by: s.by,
		meal: [s.meal],
		servings: s.servings,
		mins: s.active && s.total ? { active: s.active, total: s.total } : undefined,
		equip: s.equip,
		freezer: s.freezer || undefined,
		ing: ing.map((i) => ({
			qty: i.qty.trim() === '' ? null : Number(i.qty) || i.qty,
			unit: i.unit,
			name: i.name.trim()
		})),
		steps,
		notes: s.tips.trim() ? [s.tips.trim()] : undefined,
		photos: [s.dishPhoto.trim(), s.cookPhoto.trim()].filter(Boolean)
	};
	return [
		`Recipe: ${s.title}`,
		`From: ${s.by}`,
		s.note.trim() ? `Inspiration / note: ${s.note.trim()}` : null,
		`Meal: ${s.meal} · Serves ${s.servings}` +
			(s.active ? ` · ${s.active} min hands-on, ${s.total ?? '?'} min total` : ''),
		s.equip.length ? `Equipment: ${s.equip.join(', ')}` : null,
		[s.freezer && 'Freezer-friendly'].filter(Boolean).join(', ') || null,
		'',
		'INGREDIENTS',
		...ing.map((i) => `- ${[i.qty, i.unit, i.name].filter((x) => String(x).trim()).join(' ')}`),
		'',
		'STEPS',
		...steps.map((x, n) => `${n + 1}. ${x}`),
		s.tips.trim() ? `\nTIPS\n${s.tips.trim()}` : null,
		s.dishPhoto.trim() ? `\nPhoto of the dish: ${s.dishPhoto.trim()}` : null,
		s.cookPhoto.trim() ? `Photo of making it: ${s.cookPhoto.trim()}` : null,
		'',
		'--- as recipe data ---',
		JSON.stringify(json, null, 2)
	]
		.filter((x): x is string => typeof x === 'string')
		.join('\n');
}

export async function sendSubmission(s: Submission): Promise<boolean> {
	const res = await fetch('https://api.web3forms.com/submit', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		body: JSON.stringify({
			access_key: WEB3FORMS_KEY,
			subject: `New recipe to review: ${s.title}`,
			from_name: s.by,
			message: submissionText(s)
		})
	});
	const out = await res.json().catch(() => ({}));
	return res.ok && out.success !== false;
}

export type PhotoSubmission = {
	recipeId: string;
	recipe: string;
	by: string;
	kind: 'dish' | 'cooking';
	link: string;
	caption: string;
};

/** A photo for an existing recipe page: emailed for review, never published automatically. */
export async function sendPhoto(p: PhotoSubmission): Promise<boolean> {
	const res = await fetch('https://api.web3forms.com/submit', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		body: JSON.stringify({
			access_key: WEB3FORMS_KEY,
			subject: `Photo to review: ${p.recipe}`,
			from_name: p.by,
			message: [
				`Recipe: ${p.recipe} (${p.recipeId})`,
				`From: ${p.by}`,
				`Photo of: ${p.kind === 'dish' ? 'the finished dish' : 'them making it'}`,
				`Link: ${p.link}`,
				p.caption.trim() && `Caption: ${p.caption.trim()}`
			]
				.filter(Boolean)
				.join('\n')
		})
	});
	const out = await res.json().catch(() => ({}));
	return res.ok && out.success !== false;
}
