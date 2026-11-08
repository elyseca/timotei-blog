import { error } from '@sveltejs/kit';
import { loadBlogPost } from '$lib/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const mod = await loadBlogPost(params.slug);
	if (!mod) throw error(404, 'Post not found');
	return { content: mod.default, meta: mod.metadata, author: mod.category };
};
