<script lang="ts">
	import type { Post } from '$lib/posts';
	import { formatDate } from '$lib/format';

	let { post }: { post: Post } = $props();

	const accent: Record<Post['category'], string> = {
		travel: 'bg-mustard',
		gabe: 'bg-blue',
		elyse: 'bg-coral'
	};

	const label: Record<Post['category'], string> = {
		travel: 'Travel',
		gabe: 'Gabe',
		elyse: 'Elyse'
	};

	const sectionHref: Record<Post['category'], string> = {
		travel: 'travel',
		gabe: 'blog',
		elyse: 'blog'
	};
</script>

<a
	href="/{sectionHref[post.category]}/{post.slug}"
	class="brutal-box group flex flex-col overflow-hidden transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_var(--color-ink)]"
>
	<div class="relative aspect-[4/3] overflow-hidden border-b-[2.5px] border-ink">
		{#if post.meta.cover}
			<img
				src={post.meta.cover}
				alt=""
				class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
			/>
		{/if}
		<span class="brutal-tag absolute top-3 left-3 {accent[post.category]}">
			{label[post.category]}
		</span>
	</div>

	<div class="flex flex-1 flex-col gap-2 p-5">
		<p class="font-mono text-xs font-bold tracking-wide text-ink/60 uppercase">
			{formatDate(post.meta.date)}
			{#if post.meta.location}
				· {post.meta.location}
			{/if}
		</p>
		<h3 class="font-display text-xl font-black">{post.meta.title}</h3>
		<p class="line-clamp-3 flex-1 text-sm text-ink/75">{post.meta.excerpt}</p>
		<span class="font-mono text-sm font-bold tracking-wide uppercase underline decoration-2 underline-offset-4">
			Read →
		</span>
	</div>
</a>
