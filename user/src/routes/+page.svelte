<script lang="ts">
	import copy from 'copy-to-clipboard';
	import toast from 'svelte-french-toast';

	const toekns: string[] = ['ถ้า', 'ปล่อย', 'คุณ', 'ไป'];

	const onClickCopy = () => {
		copy(JSON.stringify(toekns));
		toast.success('Content copied!');
	};
</script>

<div class="mt-4 w-10/12 flex flex-col gap-3">
	<div class="card bg-base-100">
		<div class="card-body">
			<form>
				<textarea class="textarea textarea-bordered w-full" placeholder="ตัวอย่าง ถ้าปล่อยคุณไป" />
				<button type="submit" class="btn btn-primary btn-sm justify-self-end gap-2"> Submit</button>
				<button class="btn btn-outline btn-sm">Clear</button>
			</form>
		</div>
	</div>
	<div class="divider">Result</div>
	<div class="flex gap-4">
		<div class="stats stats-vertical shadow">
			<div class="stat">
				<div class="stat-title">Tokens</div>
				<div class="stat-value">{toekns.length}</div>
			</div>

			<div class="stat">
				<div class="stat-title">Characters</div>
				<div class="stat-value">{toekns.reduce((res, toekn) => res + toekn.length, 0)}</div>
			</div>
		</div>
		<div class="flex-grow">
			<div class="card bg-base-100">
				<div class="card-body">
					<div class="flex">
						<div class="flex-grow">
							{#each toekns as token}
								<span>{token} | </span>
							{/each}
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
				</div>
			</div>
		</div>
	</div>

	<!-- daisy divier -->
</div>
