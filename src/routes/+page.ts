import { redirect } from '@sveltejs/kit';
import { getLatest } from '$lib/posts';

export const prerender = true;

// The Home page is paused while it is built out, so the front door goes straight to the recipe book.
// Set this to false to bring Home back (and add it to the nav in Nav.svelte).
const HOME_PAUSED = true;

export function load() {
	if (HOME_PAUSED) redirect(307, '/recipes');
	return {
		travel: getLatest('travel')
	};
}
