import { error } from '@sveltejs/kit';
import { loadPostComponent } from '$lib/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const mod = await loadPostComponent('travel', params.slug);
	if (!mod) throw error(404, 'Trip not found');
	return { content: mod.default, meta: mod.metadata };
};
