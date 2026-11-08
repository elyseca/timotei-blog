import { getBlogPosts } from '$lib/posts';

export function load() {
	return { posts: getBlogPosts() };
}
