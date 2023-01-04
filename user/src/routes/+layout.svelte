<script>
	import { Toaster } from 'svelte-french-toast';
	import '../app.postcss';
</script>

<svelte:head>
	<title>TH Tokenizer</title>
</svelte:head>

<div class="flex flex-col h-screen bg-base-200">
	<div class="navbar bg-base-100 container mx-auto  rounded-box mt-6 p-3">
		<div class="navbar-start">
			<div class="btn btn-ghost normal-case text-xl">TH Tokenizer</div>
		</div>
	</div>
	<div class="container mx-auto flex flex-grow justify-center">
		<slot />
	</div>
</div>

<Toaster />
