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
	class="brutal-box group reveal flex cursor-pointer flex-col overflow-hidden transition-[translate,box-shadow] duration-200 ease-out hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard-lg active:translate-x-0.5 active:translate-y-0.5 active:shadow-hard-sm active:duration-75"
>
	<div class="relative aspect-[4/3] overflow-hidden border-b-[2.5px] border-ink">
		{#if post.meta.cover}
			<img
				src={post.meta.cover}
				alt=""
				class="h-full w-full object-cover transition-[scale] duration-500 ease-out group-hover:scale-105"
			/>
		{/if}
		<span
			class="brutal-tag absolute top-3 left-3 transition-[rotate] duration-200 group-hover:-rotate-6 {accent[
				post.category
			]}"
		>
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
		<span
			class="font-mono text-sm font-bold tracking-wide uppercase underline decoration-2 underline-offset-4"
		>
			Read <span
				class="inline-block transition-[translate] duration-200 group-hover:translate-x-1.5">→</span
			>
		</span>
	</div>
</a>
