import { getLatest } from '$lib/posts';

export function load() {
	return {
		travel: getLatest('travel')
	};
}
