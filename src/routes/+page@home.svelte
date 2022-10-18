<script context="module" lang="ts">
	import Head from '$lib/components/Head.svelte';
	import Hero from '$lib/components/hero/Hero.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Stats from '$lib/components/Stats.svelte';
	import RoadImage from '$lib/assets/illustrations/road.svg';
	import BoxImage from '$lib/assets/illustrations/mystery_box.svg';
	import LibraryImage from '$lib/assets/illustrations/library.svg';

	export const prerender = true;

	const pageTitle = 'Home';
</script>

<Head {pageTitle} />

<section class="relative overflow-hidden">
	<div class="bg-dark-3">
		<Nav />

		<Hero />

		<Stats />
	</div>

	<div class="bg-dark-2 text-white">
		<div class="grid grid-cols-12 items-center justify-center py-64 max-w-[80%] mx-auto">
			<div class="col-span-6 justify-self-start">
				<p class="text-sm font-bold text-dark-turquoise-g mb-6">PATHWAYS</p>
				<h2 class="text-7xl font-semibold mb-4">Find your path</h2>
				<p class="text-base mb-4 max-w-xl">
					Secret University provides online courses that we call pathways. Pathways can walk you
					through the steps of building and integrating privacy into your dApps using Secret
					Network.
				</p>
				<button class="text-black px-8 py-4 bg-light-orange rounded-md">Find your path</button>
			</div>
			<div class="col-span-6 justify-self-end">
				<img class="w-[32rem] h-auto" src={RoadImage} alt="take coures on secret university" />
			</div>
		</div>

		<div class="grid grid-cols-12 items-center py-48 max-w-[80%] mx-auto">
			<div class="col-span-6 justify-self-start">
				<img class="w-[32rem] h-auto" src={BoxImage} alt="utilize secret box starter projects" />
			</div>

			<div class="col-span-6 justify-self-end">
				<p class="text-sm font-bold text-dark-turquoise-g mb-6">SECRET BOXES</p>
				<h2 class="text-7xl font-semibold mb-4">Open a Box</h2>
				<p class="text-base mb-4 max-w-xl">
					Secret Boxes can help you get building quicker and learn rapidly. Secret Boxes are
					self-contained development instances complete with Secret Network integrations.
				</p>
				<button class="text-black px-8 py-4 bg-light-orange rounded-md">Open a Box</button>
			</div>
		</div>

		<div class="grid grid-cols-12 py-64 items-center max-w-[80%] mx-auto">
			<div class="col-span-6">
				<p class="text-sm font-bold text-dark-turquoise-g mb-6">RESOURCES</p>
				<h2 class="text-7xl font-semibold mb-4">Browse our library</h2>
				<p class="text-base mb-4 max-w-xl">
					Secret University is collecting the many learning materials, both new and old, that aid
					development and activity on the Secret Network. Find the resources you need to integrate
					privacy into your next dentralized application.
				</p>
				<button class="text-black px-8 py-4 bg-light-orange rounded-md">Browse resources</button>
			</div>

			<div class="col-span-6 justify-self-end">
				<img
					class="w-[32rem] h-auto"
					src={LibraryImage}
					alt="browse resources on secret university"
				/>
			</div>
		</div>
	</div>

	<div class="bg-dark-3 py-8">
		<div class="mx-auto max-w-7xl py-16 px-4 text-white sm:py-24 sm:px-6 lg:px-8">
			<p
				class="text-gray-900 mt-1 text-center text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl"
			>
				Who we are
			</p>
		</div>

		<div
			class="mx-auto max-w-xl flex-col justify-center sm:px-6 md:flex-col md:gap-y-8 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-12"
		>
			<div class="divide-gray-200 mb-12 divide-y overflow-hidden rounded-lg bg-dark-4 shadow">
				<div>
					<!-- Image goes here -->
					<img src="./test-image.jpg" alt="Space" />
				</div>
				<div class="pb-6 sm:px-6">
					<!-- Content goes here -->
					<h2 class="mt-5 text-xl font-bold leading-6 text-white">Builders</h2>
					<p class="mt-2 text-base text-gray">
						Members of Secret University are committed to the ethos of Secret Network. We advocate
						for privacy by building private and secure applications. From private DeFi, to NFTs and
						gaming, we believe privacy is essential to the future of blockchain. That's why we build
						on Secret.
					</p>
					<!-- We use less vertical padding on card footers at all sizes than on headers or body sections -->
				</div>
			</div>

			<div class="divide-gray-200 mb-12 divide-y overflow-hidden rounded-lg bg-dark-4 shadow">
				<div>
					<!-- Image goes here -->
					<img src="./test-image.jpg" alt="Space" />
				</div>
				<div class="pb-6 sm:px-6">
					<!-- Content goes here -->
					<h2 class="mt-5 text-xl font-bold leading-6 text-white">Explorers</h2>
					<p class="mt-2 text-base text-gray">
						To build privacy-focused applications, developers on Secret Network have to succeed
						where others have failed. Members of Secret University are passionate about the future
						of the web. We explore new ideas and look for ways to improve user experience. Where
						web2 failed, we will succeed.
					</p>
					<!-- We use less vertical padding on card footers at all sizes than on headers or body sections -->
				</div>
			</div>

			<div class="divide-gray-200 mb-12 divide-y overflow-hidden rounded-lg bg-dark-4 shadow">
				<div>
					<!-- Image goes here -->
					<img src="./test-image.jpg" alt="Space" />
				</div>
				<div class="pb-6 sm:px-6">
					<!-- Content goes here -->
					<h2 class="mt-5 text-xl font-bold leading-6 text-white">Teachers</h2>
					<p class="mt-2 text-base text-gray">
						As a community, our goal is to expand privacy awarness and create robust privacy
						solutions for web3. To do so, members of Secret University are encouraged and
						incentivised to share their work with the community. Together, by expanding our
						collective knowledge, we can iterate faster and build for the future.
					</p>
					<!-- We use less vertical padding on card footers at all sizes than on headers or body sections -->
				</div>
			</div>
		</div>

		<div class="grid grid-rows-2 items-center justify-items-center py-32">
			<h2 class="text-4xl mb-2 font-bold text-white">
				Want to join the
				<span
					class="inline bg-gradient-to-r from-light-blue to-dark-blue bg-clip-text text-transparent"
					>university?
				</span>
			</h2>

			<p class="mb-4 text-lg inline-block text-white">
				Find out how you can jumpstart your development on Secret Network
			</p>
			<a
				href="https://chat.scrt.network"
				class="inline-flex items-center rounded-md border border-transparent bg-dark-blue px-6 py-3 text-base font-medium text-white shadow-sm"
				>Reach Out</a
			>
		</div>
	</div>
</section>
