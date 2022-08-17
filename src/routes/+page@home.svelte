<script context="module" lang="ts">
	import Head from '$lib/components/Head.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Features from '$lib/components/FeatureList.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Stats from '$lib/components/Stats.svelte';
	import ShockwaveImage from '$lib/assets/shockwave.png';

	export const prerender = true;

	const pageTitle = 'Home';
</script>

<Head {pageTitle} />

<section class="relative overflow-hidden bg-dark-3">
	<div>
		<Nav />

		<!-- Hero Content Container -->
		<div class="min-h-home-hero">
			<div class="">
				<main class="mx-auto max-w-7xl px-4 lg:px-0">
					<div class="lg:grid lg:grid-cols-12 lg:gap-4 lg:py-48">
						<div class="sm:text-center md:mx-auto md:max-w-3xl lg:col-span-6 lg:text-left">
							<h1>
								<!-- <span
									class="block text-sm font-semibold uppercase tracking-wide text-gray sm:text-base lg:text-sm xl:text-base"
									>Secret University</span
								> -->
								<span
									class="mt-1 block text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-8xl"
								>
									<span class="block text-white">Build a more</span>
									<span
										class="block bg-gradient-to-r from-light-blue to-dark-blue bg-clip-text text-transparent"
										>private web</span
									>
								</span>
							</h1>
							<p class="mt-3 text-base text-gray sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
								Welcome to Secret University— home of developer education on Secret Network. Learn
								to build private web3 applications on Secret. Explore to learn how you can
								contribute to the university and get involved on the network.
							</p>
							<!-- <div class="mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left">
							<p class="text-base font-medium text-off-white">
								Sign up for the Secret University newsletter.
							</p>
							<form action="#" method="POST" class="mt-3 sm:flex">
								<label for="email" class="sr-only">Email</label>
								<input
									type="email"
									name="email"
									id="email"
									class="border-gray-300 placeholder-gray-500 block w-full rounded-md py-3 text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:flex-1"
									placeholder="Enter your email"
								/>
								<button
									type="submit"
									class="hover:bg-gray-900 mt-3 w-full rounded-md border border-transparent bg-dark-blue px-6 py-3 text-base font-medium text-white shadow-sm shadow-dark-blue/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:inline-flex sm:w-auto sm:flex-shrink-0 sm:items-center"
									>Register</button
								>
							</form>
							<p class="mt-3 text-sm text-gray">
								We care about the protection of your data. Read our
								<a href="#" class="text-gray-900 font-medium underline">Privacy Policy</a>.
							</p>
						</div> -->
						</div>
						<div
							class="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center"
						>
							<svg
								class="absolute top-0 left-1/2 origin-top -translate-x-1/2 -translate-y-8 scale-75 transform sm:scale-100 lg:hidden"
								width="640"
								height="784"
								fill="none"
								viewBox="0 0 640 784"
								aria-hidden="true"
							>
								<defs>
									<pattern
										id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
										x="118"
										y="0"
										width="20"
										height="20"
										patternUnits="userSpaceOnUse"
									>
										<rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="#60A0DC" />
									</pattern>
								</defs>
								<rect y="72" width="640" height="640" class="text-gray-50" fill="currentColor" />
								<rect
									x="118"
									width="404"
									height="784"
									fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)"
								/>
							</svg>
							<div class="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
								<button
									type="button"
									class="relative block w-full overflow-hidden rounded-lg bg-dark-1 p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								>
									<span class="sr-only">Watch our video to learn more</span>
									<img class="h-72 w-full" src={ShockwaveImage} alt="Shockwave illustration" />
									<span
										class="absolute inset-0 flex h-full w-full items-center justify-center"
										aria-hidden="true"
									>
										<svg class="h-20 w-20 text-indigo-500" fill="#60a0dc" viewBox="0 0 84 84">
											<circle opacity="0.9" cx="42" cy="42" r="42" fill="#f9fafb" />
											<path
												d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z"
											/>
										</svg>
									</span>
								</button>
							</div>
						</div>
					</div>
				</main>
				<div class="mt-12 flex justify-center gap-x-2">
					<div class="h-4 w-4 rounded-full bg-white" />
					<div class="h-4 w-4 rounded-full bg-gray" />
					<div class="h-4 w-4 rounded-full bg-gray" />
					<div class="h-4 w-4 rounded-full bg-gray" />
				</div>
			</div>
		</div>
		<!-- <div class="grid grid-rows-2 justify-items-center pt-8">
			<img class="inline-block h-12 w-12" src="scroll_icon.svg" alt="Mouse scroll icon" />
			<p class="font-light text-gray">Scroll</p>
		</div> -->
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
				tag: null
			},
			{
				img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				alt: '',
				title: 'Writing Smart Contracts and Rolling Dice',
				description: 'Learn the ins and outs of writing a private smart contract on Secret Network',
				tag: null
			},
			{
				img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				alt: '',
				title: 'JavaScript on Secret Network',
				description:
					'Use JavaScript to connect to the Secret Network and supercharge your application with privacy',
				tag: null
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
				tag: null
			},
			{
				img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				alt: '',
				title: 'Richie Rich',
				description: "Solving Yao's millionaires' problem with secret smart contracts",
				tag: 'Coming Soon'
			}
		]}
	/>

	<SectionHeader
		title={'Community Resources'}
		subtitle={'Learn from the community'}
		description={'Read guides, watch screencasts, and learn from developers building on Secret Network.'}
	/>

	<Features
		features={[
			{
				img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				alt: '',
				title: 'Video Example',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas, nisi eu consequat condimentum, leo lorem feugiat leo, sed gravida sem mi in libero',
				tag: null
			},
			{
				img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				alt: '',
				title: 'Guide Example',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas, nisi eu consequat condimentum, leo lorem feugiat leo, sed gravida sem mi in libero',
				tag: null
			},
			{
				img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				alt: '',
				title: 'Another Example',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas, nisi eu consequat condimentum, leo lorem feugiat leo, sed gravida sem mi in libero',
				tag: null
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
		<button
			type="button"
			class="inline-flex items-center rounded-md border border-transparent bg-dark-blue px-6 py-3 text-base font-medium text-white shadow-sm"
			>Join our Community</button
		>
	</div>
</section>
