<script lang="ts">
	import { t } from '$lib/i18n.svelte';
	import { MEALS } from '$lib/recipes/data';
	import PrefsBar from '$lib/components/PrefsBar.svelte';
	import { L } from '$lib/i18n.svelte';
	import { EQUIPMENT, UNITS, WEB3FORMS_KEY, sendSubmission } from '$lib/recipes/submit';
	import type { Submission } from '$lib/recipes/submit';

	// Units offered follow the US / metric switch (a unit already chosen stays in the list).
	const US_ONLY = ['cup', 'oz', 'lb'];
	const METRIC_ONLY = ['g', 'kg', 'ml', 'L'];
	const unitChoices = (current: string) =>
		UNITS.filter(
			(u) => u === current || !(L.units === 'metric' ? US_ONLY : METRIC_ONLY).includes(u)
		);

	const blankIng = () => ({ qty: '', unit: '', name: '' });
	let f = $state<Submission>({
		title: '',
		by: '',
		note: '',
		meal: 'everyday',
		servings: 4,
		active: null,
		total: null,
		equip: [],
		freezer: false,
		ing: [blankIng(), blankIng(), blankIng()],
		steps: ['', ''],
		tips: '',
		dishPhoto: '',
		cookPhoto: ''
	});
	let pick = $state('');
	let custom = $state('');
	let trap = $state(''); // hidden field: real people leave it empty
	let status = $state<'idle' | 'sending' | 'done' | 'error'>('idle');

	const ready = $derived(
		f.title.trim() &&
			f.by.trim() &&
			f.ing.some((i) => i.name.trim()) &&
			f.steps.some((x) => x.trim())
	);

	function addEquip(name: string) {
		const n = name.trim();
		if (n && !f.equip.some((e) => e.toLowerCase() === n.toLowerCase())) f.equip.push(n);
	}
	function onPick() {
		if (pick && pick !== '__other') {
			addEquip(pick);
			pick = '';
		}
	}
	function addCustom() {
		addEquip(custom);
		custom = '';
		pick = '';
	}

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		if (trap || !ready || status === 'sending') return;
		status = 'sending';
		try {
			status = (await sendSubmission($state.snapshot(f))) ? 'done' : 'error';
		} catch {
			status = 'error';
		}
	}
	function again() {
		f.title = f.note = f.tips = f.dishPhoto = f.cookPhoto = '';
		f.ing = [blankIng(), blankIng(), blankIng()];
		f.steps = ['', ''];
		f.equip = [];
		f.active = f.total = null;
		f.freezer = false;
		status = 'idle';
	}
	const label = 'flex flex-col gap-1 font-mono text-xs font-bold tracking-wide uppercase';
</script>

<section class="mx-auto max-w-3xl px-5 py-6 md:px-8">
	{#if status === 'done'}
		<div class="brutal-box bg-lime p-8 text-center">
			<h2 class="font-display text-3xl font-black">{t('Thank you!')}</h2>
			<p class="mt-3 text-ink/85">
				{t(
					"Your recipe is on its way to us. We'll take a look and add it to the recipe book soon."
				)}
			</p>
			<button type="button" class="brutal-btn mt-6 bg-white" onclick={again}>
				{t('Share another recipe')}
			</button>
		</div>
	{:else}
		<p class="max-w-2xl text-lg text-ink/80">
			{t(
				"We'd love for everyone close to us to help start a family recipe archive. Share the dishes you make on repeat to get through the week, and the ones saved for the most important days of the year. Every recipe you add becomes part of something we all get to cook from and pass along."
			)}
		</p>
		<p class="mt-3 max-w-2xl text-sm text-ink/70">
			{t('We read each one before it goes in the book.')}
		</p>

		<form class="mt-5 flex flex-col gap-4" onsubmit={submit}>
			<div class="brutal-box flex flex-col gap-4 bg-white p-4">
				<h2 class="font-display text-2xl font-black">{t('The basics')}</h2>
				<label class={label}>
					{t('Recipe name')}
					<input class="brutal-field normal-case" bind:value={f.title} required maxlength="120" />
				</label>
				<label class={label}>
					{t('Your name')}
					<input class="brutal-field normal-case" bind:value={f.by} required maxlength="80" />
				</label>
				<label class={label}>
					{t('Inspiration or note (optional)')}
					<textarea
						class="brutal-field min-h-20 normal-case"
						bind:value={f.note}
						maxlength="600"
						placeholder={t('Where it came from, who made it for you, why you love it')}></textarea>
				</label>
				<div class="flex flex-wrap gap-5">
					<label class={label}>
						{t('Meal')}
						<select class="brutal-field w-auto normal-case" bind:value={f.meal}>
							{#each Object.entries(MEALS) as [k, v] (k)}<option value={k}>{t(v)}</option>{/each}
						</select>
					</label>
					<label class={label}>
						{t('Servings')}
						<input
							type="number"
							min="1"
							max="50"
							class="brutal-field w-24"
							bind:value={f.servings}
						/>
					</label>
					<label class={label}>
						{t('Hands-on minutes')}
						<input type="number" min="1" class="brutal-field w-28" bind:value={f.active} />
					</label>
					<label class={label}>
						{t('Total minutes')}
						<input type="number" min="1" class="brutal-field w-28" bind:value={f.total} />
					</label>
				</div>
				<div class="flex flex-wrap gap-6">
					<label class="flex items-center gap-2 text-sm">
						<input type="checkbox" class="brutal-check" bind:checked={f.freezer} />
						{t('Freezer-friendly')}
					</label>
				</div>
			</div>

			<div class="brutal-box flex flex-col gap-3 bg-white p-4">
				<h2 class="font-display text-2xl font-black">{t('Equipment')}</h2>
				{#if f.equip.length}
					<div class="flex flex-wrap gap-2">
						{#each f.equip as e (e)}
							<button
								type="button"
								class="brutal-chip"
								aria-pressed="true"
								onclick={() => (f.equip = f.equip.filter((x) => x !== e))}
							>
								{t(e)} ×
							</button>
						{/each}
					</div>
				{/if}
				<div class="flex flex-wrap items-center gap-3">
					<select
						class="brutal-field w-auto"
						aria-label={t('Add equipment')}
						bind:value={pick}
						onchange={onPick}
					>
						<option value="">{t('Add equipment…')}</option>
						{#each EQUIPMENT.filter((x) => !f.equip.includes(x)) as x (x)}
							<option value={x}>{t(x)}</option>
						{/each}
						<option value="__other">{t('Something else…')}</option>
					</select>
					{#if pick === '__other'}
						<input
							class="brutal-field w-56"
							placeholder={t('Name it')}
							bind:value={custom}
							aria-label={t('Other equipment')}
							onkeydown={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault();
									addCustom();
								}
							}}
						/>
						<button type="button" class="brutal-btn" onclick={addCustom}>{t('Add')}</button>
					{/if}
				</div>
			</div>

			<div class="brutal-box flex flex-col gap-3 bg-white p-4">
				<div class="flex items-center justify-between gap-3">
					<h2 class="font-display text-2xl font-black">{t('Ingredients')}</h2>
					<PrefsBar show="units" />
				</div>
				<p class="text-sm text-ink/70">{t('One per line, for the whole recipe as written.')}</p>
				{#each f.ing as ing, i (i)}
					<div
						class="grid grid-cols-[4.5rem_1fr_auto] items-center gap-2 sm:grid-cols-[4.5rem_6rem_1fr_auto]"
					>
						<input
							class="brutal-field"
							placeholder={t('Qty')}
							inputmode="decimal"
							aria-label={t('Quantity')}
							bind:value={ing.qty}
						/>
						<select class="brutal-field" aria-label={t('Unit')} bind:value={ing.unit}>
							{#each unitChoices(ing.unit) as u (u)}<option value={u}>{u ? t(u) : t('unit')}</option
								>{/each}
						</select>
						<input
							class="brutal-field order-last col-span-3 sm:order-none sm:col-span-1"
							placeholder={t('Ingredient')}
							bind:value={ing.name}
						/>
						<button
							type="button"
							class="p-2 font-mono text-lg font-bold uppercase"
							aria-label={t('Remove ingredient')}
							onclick={() => f.ing.length > 1 && f.ing.splice(i, 1)}>×</button
						>
					</div>
				{/each}
				<button
					type="button"
					class="brutal-btn self-start bg-white"
					onclick={() => f.ing.push(blankIng())}>{t('+ Add ingredient')}</button
				>
			</div>

			<div class="brutal-box flex flex-col gap-3 bg-white p-4">
				<h2 class="font-display text-2xl font-black">{t('Steps')}</h2>
				{#each f.steps as _, i (i)}
					<div class="flex items-start gap-3">
						<span class="mt-2 font-display text-lg font-black">{i + 1}</span>
						<textarea class="brutal-field min-h-16 flex-1" bind:value={f.steps[i]}></textarea>
						<button
							type="button"
							class="p-2 font-mono text-lg font-bold uppercase"
							aria-label={t('Remove step')}
							onclick={() => f.steps.length > 1 && f.steps.splice(i, 1)}>×</button
						>
					</div>
				{/each}
				<button
					type="button"
					class="brutal-btn self-start bg-white"
					onclick={() => f.steps.push('')}>{t('+ Add step')}</button
				>
			</div>

			<div class="brutal-box flex flex-col gap-4 bg-white p-4">
				<h2 class="font-display text-2xl font-black">{t('Anything else?')}</h2>
				<label class={label}>
					{t('Tips or swaps (optional)')}
					<textarea class="brutal-field min-h-20 normal-case" bind:value={f.tips}></textarea>
				</label>
			</div>

			<div class="brutal-box flex flex-col gap-3 bg-white p-4">
				<h2 class="font-display text-2xl font-black">{t('Photos (optional)')}</h2>
				<p class="text-sm text-ink/70">
					{t(
						"A picture of the dish as it's meant to look, and one of you making it yourself, make the recipe feel like ours. Upload them to Google Photos, iCloud or Drive, then paste the share links here."
					)}
				</p>
				<label class={label}>
					{t('The finished dish')}
					<input type="url" class="brutal-field normal-case" bind:value={f.dishPhoto} />
				</label>
				<label class={label}>
					{t('You making it')}
					<input type="url" class="brutal-field normal-case" bind:value={f.cookPhoto} />
				</label>
			</div>

			<input
				class="hidden"
				tabindex="-1"
				autocomplete="off"
				aria-hidden="true"
				bind:value={trap}
				name="website"
			/>

			{#if status === 'error'}
				<p class="brutal-box bg-coral p-4 font-semibold">
					{t('Something went wrong sending that. Please try again in a moment.')}
				</p>
			{/if}
			{#if !WEB3FORMS_KEY}
				<p class="font-mono text-xs font-bold text-ink/60 uppercase">
					{t("Sending isn't switched on yet: the site needs its Web3Forms key.")}
				</p>
			{/if}
			<div>
				<button
					type="submit"
					class="brutal-btn"
					disabled={!ready || !WEB3FORMS_KEY || status === 'sending'}
				>
					{status === 'sending' ? t('Sending…') : t('Send for review')}
				</button>
			</div>
		</form>
	{/if}
</section>
