import { getLatest, getLatestBlogPost } from '$lib/posts';

export function load() {
	return {
		travel: getLatest('travel'),
		blog: getLatestBlogPost()
	};
}
