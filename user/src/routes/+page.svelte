<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import copy from 'copy-to-clipboard';
	import toast from 'svelte-french-toast';
	import type { ActionData } from './$types';

	let isSubmitting = false;
	let cuurentTab = 'text';
	const onSubmit: SubmitFunction = ({ form, data, action, cancel }) => {
		isSubmitting = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update({ reset: false });
					break;
				default:
					await update();
					break;
			}
			isSubmitting = false;
		};
	};

	const onClickCopy = (tab: string) => {
		if (cuurentTab === 'json') {
			copy(JSON.stringify(form?.tokens));
		} else {
			if (form?.tokens) {
				copy(form?.tokens.join(' | '));
			}
		}
		toast.success('Content copied!');
	};

	const tokensFormat = (tokens: string[]) => {
		return tokens.join(' | ');
	};

	const onClickClear = () => {
		form = null;
	};

	export let form: ActionData;
</script>

<div class="mt-4 w-10/12 flex flex-col gap-3">
	<div class="card bg-base-100">
		<div class="card-body">
			<form method="POST" use:enhance={onSubmit}>
				<textarea
					name="payload"
					class="textarea textarea-bordered w-full"
					placeholder="ตัวอย่าง ถ้าปล่อยคุณไป"
				/>
				<button
					type="submit"
					class="btn btn-primary btn-sm justify-self-end gap-2"
					class:loading={isSubmitting}
				>
					Submit</button
				>
				<button type="reset" class="btn btn-outline btn-sm" on:click={onClickClear}>Clear</button>
			</form>
		</div>
	</div>
	<div class="divider">Result</div>
	<div class="flex gap-4">
		<div class="stats stats-vertical shadow min-w-fit">
			<div class="stat">
				<div class="stat-title">Tokens</div>
				<div class="stat-value">{form?.tokens.length || 0}</div>
			</div>

			<div class="stat">
				<div class="stat-title">Characters</div>
				<div class="stat-value">
					{form?.tokens.reduce((res, toekn) => res + toekn.length, 0) || 0}
				</div>
			</div>
		</div>
		<div class="flex-grow">
			<div class="card bg-base-100">
				<div class="card-body">
					<div class="card-actions justify-between">
						<div class="tabs tabs-boxed">
							<button
								class="tab"
								class:tab-active={cuurentTab === 'text'}
								on:click={() => (cuurentTab = 'text')}>Text</button
							>
							<button
								class="tab"
								class:tab-active={cuurentTab === 'json'}
								on:click={() => (cuurentTab = 'json')}>JSON</button
							>
						</div>
						<div class="tooltip tooltip-left" data-tip="copy">
							<button class="btn btn-ghost btn-sm" on:click={onClickCopy}
								><div class="mi mi-add" />
								<svg
									class="w-5 h-5"
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 0 24 24"
									width="24px"
									fill="#000000"
									><path d="M0 0h24v24H0z" fill="none" /><path
										d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
									/></svg
								></button
							>
						</div>
					</div>
					<div class="flex">
						{#if cuurentTab === 'json'}
							{#if form?.tokens}
								<code class="language-json">
									{JSON.stringify(form?.tokens, null, 2)}
								</code>
							{:else}
								<span class="text-gray-400">[ "ถ้า", "ปล่อย", "คุณ", "ไป" ]</span>
							{/if}
						{:else if cuurentTab === 'text'}
							{#if form?.tokens}
								<code class="language-text">
									{tokensFormat(form?.tokens)}
								</code>
							{:else}
								<span class="text-gray-400">ถ้า | ปล่อย | คุณ | ไป</span>
							{/if}
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
