<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Staking from '$lib/components/Staking.svelte';
	const pageTitle = 'Build';
</script>

<Head {pageTitle} />

<div class="mx-auto max-w-2xl py-20">
	<h1 class="text-center text-6xl font-bold text-white">Learn to Earn</h1>
	<p class="mt-2 text-center text-base text-gray">
		Secret University is an open platform for developers building on Secret Network. Builders of all
		skill levels are encouraged to become educators of the community and help guide others along a
		path towards privacy & security.
	</p>
</div>

<div class="flex justify-center gap-x-24">
	<div class="lg:max-w-xs">
		<div class="mx-auto h-24 w-24 bg-dark-blue" />
		<!-- <img src="" alt="" /> -->
		<h2 class="mt-3 text-center text-lg font-semibold text-white">Code</h2>
		<p class="mt-1 text-center text-base text-gray">
			Build your next project on Secret and learn to build private decentralized applications.
		</p>
	</div>

	<div class="lg:max-w-xs">
		<div class="mx-auto h-24 w-24 bg-dark-blue" />
		<!-- <img src="" alt="" /> -->
		<h2 class="mt-3 text-center text-lg font-semibold text-white">Teach</h2>
		<p class="mt-1 text-center text-base text-gray">
			From video to courses, Secret University supports all kinds of educational material and wants
			your help creating it.
		</p>
	</div>

	<div class="lg:max-w-xs">
		<div class="mx-auto h-24 w-24 bg-dark-blue" />
		<!-- <img src="" alt="" /> -->
		<h2 class="mt-3 text-center text-lg font-semibold text-white">Earn</h2>
		<p class="mt-1 text-center text-base text-gray">
			Your work on Secret is valuable. Earn real crypto for educating the community and become a
			member of Secret University
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

<div id="staking">
	<Staking />
</div>

<SectionHeader
	title={'Community Curated Bounties'}
	subtitle={'Looking for your next project?'}
	description={"If you're ready, try building for the community. Use the CCBL to find your next project on Secret Network."}
/>

<div class="flex justify-center bg-dark-2 pb-32">
	<a
		href="/bounties"
		type="button"
		class="inline-flex items-center rounded-md border border-transparent bg-light-cream px-6 py-3 text-base font-medium text-dark-2 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
		>Learn more</a
	>
</div>