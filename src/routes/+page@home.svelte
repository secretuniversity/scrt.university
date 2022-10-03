<script context="module" lang="ts">
	import Head from '$lib/components/Head.svelte';
	import Hero from '$lib/components/hero/Hero.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Features from '$lib/components/FeatureList.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Stats from '$lib/components/Stats.svelte';

	export const prerender = true;

	const pageTitle = 'Home';
</script>

<Head {pageTitle} />

<section class="relative overflow-hidden bg-dark-3">
	<div>
		<Nav />

		<Hero />
	</div>

	<Stats />

	<SectionHeader
		title={'Secret Pathways'}
		subtitle={'Find your path'}
		description={"Choose the course that's right for you."}
	/>

	<Features
		features={[
			{
				img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				alt: '',
				title: 'Welcome to Secret Network',
				description:
					'An introductory course for developers to familiarize themselves with the Secret Network.',
				tag: null,
				url: '/pathways/welcome-to-secret-network'
			},
			{
				img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				alt: '',
				title: 'Writing Smart Contracts and Rolling Dice',
				description: 'Learn the ins and outs of writing a private smart contract on Secret Network',
				tag: null,
				url: '/pathways/writing-secret-smart-contracts'
			},
			{
				img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				alt: '',
				title: 'JavaScript on Secret Network',
				description:
					'Use JavaScript to connect to the Secret Network and supercharge your application with privacy',
				tag: null,
				url: '/pathways/writing-secret-smart-contracts'
			}
		]}
	/>

	<SectionHeader
		title={'Secret Boxes'}
		subtitle={'Start building today'}
		description={'Launch your first secret smart contract in minutes. Secret Boxes are fully integrated starter projects. They come preconfigured and ready to hack.'}
	/>

	<Features
		features={[
			{
				img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				alt: '',
				title: 'Secret Counter',
				description: 'A simple counter smart contract integrated on Secret Network',
				tag: null,
				url: '/repos/secret-box/secret-counter'
			},
			{
				img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				alt: '',
				title: 'Richie Rich',
				description: "Solving Yao's millionaires' problem with secret smart contracts",
				tag: 'Coming Soon',
				url: null
			}
		]}
	/>

	<div class="py-8">
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
	</div>

	<div class="mb-24 grid grid-rows-2 items-center justify-items-center py-24">
		<h2 class="mb-8 text-center text-4xl font-bold text-white">
			Interested in joining the <span class="text-dark-blue">university?</span> <br />
			<span class="mt-2 inline-block text-3xl"
				>Join the community, and find out how you can help.</span
			>
		</h2>
		<a
			href="https://chat.scrt.network"
			class="inline-flex items-center rounded-md border border-transparent bg-dark-blue px-6 py-3 text-base font-medium text-white shadow-sm"
			>Become A Contributor</a
		>
	</div>
</section>
