<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Staking from '$lib/components/Staking.svelte';
	const pageTitle = 'Contribute';
</script>

<Head {pageTitle} />

<div class="mx-auto max-w-xl py-20">
	<h1 class="text-center text-6xl font-bold text-white">Learn to Earn</h1>
	<p class="mt-2 text-center text-base text-gray">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel laoreet ipsum. Quisque et
		nulla dapibus, vehicula odio mollis, vestibulum dolor. Cras hendrerit ipsum ut tempus
		scelerisque.
	</p>
</div>

<div class="flex justify-center gap-x-24">
	<div class="lg:max-w-xs">
		<div class="mx-auto h-24 w-24 bg-dark-blue" />
		<!-- <img src="" alt="" /> -->
		<h2 class="mt-3 text-center text-lg font-semibold text-white">Code</h2>
		<p class="mt-1 text-center text-base text-gray">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit
		</p>
	</div>

	<div class="lg:max-w-xs">
		<div class="mx-auto h-24 w-24 bg-dark-blue" />
		<!-- <img src="" alt="" /> -->
		<h2 class="mt-3 text-center text-lg font-semibold text-white">Create</h2>
		<p class="mt-1 text-center text-base text-gray">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit
		</p>
	</div>

	<div class="lg:max-w-xs">
		<div class="mx-auto h-24 w-24 bg-dark-blue" />
		<!-- <img src="" alt="" /> -->
		<h2 class="mt-3 text-center text-lg font-semibold text-white">Teach</h2>
		<p class="mt-1 text-center text-base text-gray">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit
		</p>
	</div>
</div>

<div class="my-12 flex justify-center">
	<button
		type="button"
		class="inline-flex items-center rounded-md border border-transparent bg-dark-blue px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
		>Apply</button
	>
</div>

<Staking />

<SectionHeader
	title={'Community Curated Bounties'}
	subtitle={'Looking for your next project?'}
	description={"If you're ready, try building for the community. Use the CCBL to find your next project on Secret Network."}
/>

<div class="flex justify-center bg-dark-2 pb-32">
	<button
		type="button"
		class="inline-flex items-center rounded-md border border-transparent bg-light-cream px-6 py-3 text-base font-medium text-dark-2 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
		>Learn more</button
	>
</div>
