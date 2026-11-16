<script lang="ts">
	import { t } from '$lib/i18n.svelte';
	import { WEB3FORMS_KEY, sendPhoto } from '$lib/recipes/submit';

	let { id, title, onclose }: { id: string; title: string; onclose: () => void } = $props();
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

<div class="brutal-box mt-3 bg-white p-4">
	{#if status === 'done'}
		<p class="font-semibold">{t("Thank you! We'll take a look and add it soon.")}</p>
		<div class="mt-3 flex gap-2">
			<button type="button" class="brutal-btn bg-white" onclick={() => (status = 'idle')}>
				{t('Send another')}
			</button>
			<button type="button" class="brutal-btn bg-white" onclick={onclose}>{t('Close')}</button>
		</div>
	{:else}
		<p class="mb-3 text-sm text-ink/80">
			{t(
				'Made {title}? Send a photo of the dish, or of you making it. We look at each one before it goes on the page.',
				{ title }
			)}
		</p>
		<form class="flex flex-col gap-3" onsubmit={submit}>
			<div class="flex flex-wrap gap-3">
				<label class={label}>
					{t('Your name')}
					<input class="brutal-field normal-case" bind:value={by} required maxlength="80" />
				</label>
				<label class={label}>
					{t('Photo of')}
					<select class="brutal-field w-auto normal-case" bind:value={kind}>
						<option value="dish">{t('The finished dish')}</option>
						<option value="cooking">{t('Me making it')}</option>
					</select>
				</label>
			</div>
			<label class={label}>
				{t('Link to the photo')}
				<input
					type="url"
					class="brutal-field normal-case"
					bind:value={link}
					required
					placeholder={t('Share link from Google Photos, iCloud or Drive')}
				/>
			</label>
			<label class={label}>
				{t('Caption (optional)')}
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
				<p class="font-semibold">{t('Something went wrong sending that. Please try again.')}</p>
			{/if}
			<div class="flex gap-2">
				<button type="submit" class="brutal-btn" disabled={!WEB3FORMS_KEY || status === 'sending'}>
					{status === 'sending' ? t('Sending…') : t('Send for review')}
				</button>
				<button type="button" class="brutal-btn bg-white" onclick={onclose}>{t('Cancel')}</button>
			</div>
		</form>
	{/if}
</div>
