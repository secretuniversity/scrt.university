<script context="module" lang="ts">
	import Head from '$lib/components/Head.svelte';
	import Hero from '$lib/components/hero/Hero.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Stats from '$lib/components/Stats.svelte';
	import RoadImage from '$lib/assets/illustrations/road.svg';
	import BoxImage from '$lib/assets/illustrations/mystery_box.svg';
	import LibraryImage from '$lib/assets/illustrations/library.svg';

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
		<div class="mx-auto grid max-w-[80%] grid-cols-12 items-center justify-items-center py-64">
			<div class="col-span-6 p-12">
				<p class="mb-6 text-sm font-bold text-dark-turquoise-g">PATHWAYS</p>
				<h2 class="mb-4 text-7xl font-semibold">Find your path</h2>
				<p class="mb-4 max-w-xl text-base">
					Secret University provides online courses that we call pathways. Pathways can walk you
					through the steps of building and integrating privacy into your dApps using Secret
					Network.
				</p>
				<a
					href="/pathways"
					class="block w-max rounded-md bg-light-cream px-8 py-4 text-black hover:bg-darker-light-cream"
					>Find your path</a
				>
			</div>
			<div class="col-span-6">
				<img class="h-auto w-[32rem]" src={RoadImage} alt="take coures on secret university" />
			</div>
		</div>

		<div class="mx-auto grid max-w-[80%] grid-cols-12 items-center justify-items-center">
			<div class="col-span-6">
				<img class="h-auto w-[32rem]" src={BoxImage} alt="utilize secret box starter projects" />
			</div>

			<div class="col-span-6">
				<p class="mb-6 text-sm font-bold text-dark-turquoise-g">SECRET BOXES</p>
				<h2 class="mb-4 text-7xl font-semibold">Open a Box</h2>
				<p class="mb-4 max-w-xl text-base">
					Secret Boxes can help you get building quicker and learn rapidly. Secret Boxes are
					self-contained development instances complete with Secret Network integrations.
				</p>
				<a
					href="/repositories"
					class="block w-max rounded-md bg-light-cream px-8 py-4 text-black hover:bg-darker-light-cream"
					>Open a Box</a
				>
			</div>
		</div>

		<div class="mx-auto grid max-w-[80%] grid-cols-12 items-center justify-items-center py-64">
			<div class="col-span-6">
				<p class="mb-6 text-sm font-bold text-dark-turquoise-g">RESOURCES</p>
				<h2 class="mb-4 text-7xl font-semibold">Browse our library</h2>
				<p class="mb-4 max-w-xl text-base">
					Secret University is collecting the many learning materials, both new and old, that aid
					development and activity on the Secret Network. Find the resources you need to integrate
					privacy into your next dentralized application.
				</p>
				<a
					href="/resources"
					class="block w-max rounded-md bg-light-cream px-8 py-4 text-black hover:bg-darker-light-cream"
					>Browse resources</a
				>
			</div>

			<div class="col-span-6">
				<img
					class="h-auto w-[32rem]"
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

		<div class="grid grid-rows-2 items-center justify-items-center py-56">
			<h2 class="text-4xl font-bold text-white">
				Want to join the
				<span
					class="inline bg-gradient-to-r from-light-blue to-dark-blue bg-clip-text text-transparent"
					>university?
				</span>
			</h2>

			<p class="mb-10 inline-block max-w-2xl text-center text-lg text-white">
				Join our growing community of builders and help us build better products and tools for a
				more private internet.
			</p>
			<a
				href="https://chat.scrt.network"
				class="inline-flex items-center rounded-md border border-transparent bg-dark-blue px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-darker-blue"
				>Reach Out</a
			>
		</div>
	</div>
</section>
