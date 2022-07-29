<script lang="ts">
	import Head from '$lib/Head.svelte';
	import Staking from '$lib/Staking.svelte';
	const pageTitle = 'Contribute';
</script>

<Head {pageTitle} />

<div class="mx-auto max-w-xl py-20">
	<h1 class="text-center text-6xl font-bold text-gray-900">Learn to Earn</h1>
	<p class="mt-2 text-center text-base text-gray-600">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel laoreet ipsum. Quisque et
		nulla dapibus, vehicula odio mollis, vestibulum dolor. Cras hendrerit ipsum ut tempus
		scelerisque.
	</p>
</div>

<div class="flex justify-center gap-x-24">
	<div class="lg:max-w-xs">
		<div class="mx-auto h-24 w-24 bg-gray-500" />
		<!-- <img src="" alt="" /> -->
		<h2 class="mt-3 text-center text-lg font-semibold text-gray-900">Code</h2>
		<p class="mt-1 text-center text-base text-gray-600">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit
		</p>
	</div>

	<div class="lg:max-w-xs">
		<div class="mx-auto h-24 w-24 bg-gray-500" />
		<!-- <img src="" alt="" /> -->
		<h2 class="mt-3 text-center text-lg font-semibold text-gray-900">Create</h2>
		<p class="mt-1 text-center text-base text-gray-600">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit
		</p>
	</div>

	<div class="lg:max-w-xs">
		<div class="mx-auto h-24 w-24 bg-gray-500" />
		<!-- <img src="" alt="" /> -->
		<h2 class="mt-3 text-center text-lg font-semibold text-gray-900">Teach</h2>
		<p class="mt-1 text-center text-base text-gray-600">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit
		</p>
	</div>
</div>

<div class="my-12 flex justify-center">
	<button
		type="button"
		class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
		>Apply</button
	>
</div>

<Staking />
