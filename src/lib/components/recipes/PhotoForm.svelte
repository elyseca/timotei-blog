<script lang="ts">
	import { WEB3FORMS_KEY, sendPhoto } from '$lib/recipes/submit';

	let { id, title }: { id: string; title: string } = $props();
	let open = $state(false);
	let by = $state('');
	let kind = $state<'dish' | 'cooking'>('dish');
	let link = $state('');
	let caption = $state('');
	let trap = $state('');
	let status = $state<'idle' | 'sending' | 'done' | 'error'>('idle');

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		if (trap || status === 'sending') return;
		status = 'sending';
		try {
			status = (await sendPhoto({ recipeId: id, recipe: title, by, kind, link, caption }))
				? 'done'
				: 'error';
		} catch {
			status = 'error';
		}
		if (status === 'done') link = caption = '';
	}
	const label = 'flex flex-col gap-1 font-mono text-xs font-bold tracking-wide uppercase';
</script>

<div class="brutal-box mt-5 bg-white p-4">
	<div class="flex flex-wrap items-center gap-3">
		<p class="min-w-48 flex-1 text-sm text-ink/80">
			Made {title}? Send us a photo of the dish, or of you making it. We look at each one before it
			goes on the page.
		</p>
		{#if !open}
			<button type="button" class="brutal-btn bg-lime" onclick={() => (open = true)}>
				Send a photo
			</button>
		{/if}
	</div>

	{#if open}
		{#if status === 'done'}
			<p class="mt-4 font-semibold">Thank you! We'll take a look and add it soon.</p>
			<button
				type="button"
				class="brutal-btn mt-3 bg-white"
				onclick={() => {
					status = 'idle';
				}}>Send another</button
			>
		{:else}
			<form class="mt-4 flex flex-col gap-3" onsubmit={submit}>
				<div class="flex flex-wrap gap-3">
					<label class={label}>
						Your name
						<input class="brutal-field normal-case" bind:value={by} required maxlength="80" />
					</label>
					<label class={label}>
						Photo of
						<select class="brutal-field w-auto normal-case" bind:value={kind}>
							<option value="dish">The finished dish</option>
							<option value="cooking">Me making it</option>
						</select>
					</label>
				</div>
				<label class={label}>
					Link to the photo
					<input
						type="url"
						class="brutal-field normal-case"
						bind:value={link}
						required
						placeholder="Share link from Google Photos, iCloud or Drive"
					/>
				</label>
				<label class={label}>
					Caption (optional)
					<input class="brutal-field normal-case" bind:value={caption} maxlength="200" />
				</label>
				<input
					class="hidden"
					tabindex="-1"
					autocomplete="off"
					aria-hidden="true"
					bind:value={trap}
					name="website"
				/>
				{#if status === 'error'}
					<p class="font-semibold">Something went wrong sending that. Please try again.</p>
				{/if}
				<div>
					<button
						type="submit"
						class="brutal-btn"
						disabled={!WEB3FORMS_KEY || status === 'sending'}
					>
						{status === 'sending' ? 'Sending…' : 'Send for review'}
					</button>
				</div>
			</form>
		{/if}
	{/if}
</div>
