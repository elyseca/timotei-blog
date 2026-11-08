import type { Component } from 'svelte';

export type Category = 'travel';

export interface PostMeta {
	title: string;
	date: string;
	excerpt: string;
	cover?: string;
	video?: string;
	location?: string;
	gallery?: string[];
}

export interface Post {
	slug: string;
	category: Category;
	meta: PostMeta;
}

const metaModules = import.meta.glob('/src/lib/content/**/*.md', {
	eager: true,
	import: 'metadata'
}) as Record<string, PostMeta>;

const componentModules = import.meta.glob('/src/lib/content/**/*.md') as Record<
	string,
	() => Promise<{ default: Component; metadata: PostMeta }>
>;

function parsePath(path: string) {
	const parts = path.split('/');
	const file = parts.pop() as string;
	const category = parts.pop() as Category;
	const slug = file.replace(/\.md$/, '');
	return { category, slug };
}

export function getAllPosts(category?: Category): Post[] {
	const posts: Post[] = Object.entries(metaModules).map(([path, meta]) => {
		const { category: cat, slug } = parsePath(path);
		return { slug, category: cat, meta };
	});
	const filtered = category ? posts.filter((p) => p.category === category) : posts;
	return filtered.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}

export function getLatest(category: Category): Post | undefined {
	return getAllPosts(category)[0];
}

export async function loadPostComponent(category: Category, slug: string) {
	const path = `/src/lib/content/${category}/${slug}.md`;
	const importer = componentModules[path];
	if (!importer) return undefined;
	return await importer();
}
