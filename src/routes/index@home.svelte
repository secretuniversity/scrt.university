<script context="module" lang="ts">
	import HeadPartial from '$lib/Head.svelte';
	import Nav from '$lib/Nav.svelte';
	import Features from '$lib/FeatureList.svelte';
	import SectionHeader from '$lib/SectionHeader.svelte';
	import Stats from '$lib/Stats.svelte';

	export const prerender = true;

	const pageTitle = 'Home';
	const pageBgColor = 'dark-4';
</script>

<HeadPartial {pageTitle} />

<section class="relative overflow-hidden bg-dark-3">
	<div>
		<Nav />

		<!-- Hero Content Container -->
		<div
			class="relative pt-2 pb-16 sm:pb-24 lg:pb-10 shadow-xl lg:mt-6 lg:mx-4 rounded-xl bg-dark-4"
		>
			<main class="mx-auto mt-16 max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
				<div class="lg:grid lg:grid-cols-12 lg:gap-8">
					<div class="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
						<h1>
							<span
								class="block text-sm font-semibold uppercase tracking-wide text-gray sm:text-base lg:text-sm xl:text-base"
								>Secret University</span
							>
							<span
								class="mt-1 block text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl"
							>
								<span class="block text-white">Learn to build a better</span>
								<span class="block text-dark-blue">more private web</span>
							</span>
						</h1>
						<p class="mt-3 text-base text-gray sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
							Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
							commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua ad ad non deserunt sunt.
						</p>
						<div class="mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left">
							<p class="text-base font-medium text-off-white">
								Sign up for the Secret University newsletter.
							</p>
							<form action="#" method="POST" class="mt-3 sm:flex">
								<label for="email" class="sr-only">Email</label>
								<input
									type="email"
									name="email"
									id="email"
									class="block w-full rounded-md border-gray-300 py-3 text-base placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:flex-1"
									placeholder="Enter your email"
								/>
								<button
									type="submit"
									class="mt-3 w-full rounded-md border border-transparent bg-light-cream px-6 py-3 text-base font-medium text-dark-2 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:inline-flex sm:w-auto sm:flex-shrink-0 sm:items-center"
									>Register</button
								>
							</form>
							<p class="mt-3 text-sm text-gray">
								We care about the protection of your data. Read our
								<a href="#" class="font-medium text-gray-900 underline">Privacy Policy</a>.
							</p>
						</div>
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
									<rect
										x="0"
										y="0"
										width="4"
										height="4"
										class="text-gray-200"
										fill="currentColor"
									/>
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
								class="relative block w-full overflow-hidden rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								<span class="sr-only">Watch our video to learn more</span>
								<img
									class="w-full"
									src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
									alt=""
								/>
								<span
									class="absolute inset-0 flex h-full w-full items-center justify-center"
									aria-hidden="true"
								>
									<svg class="h-20 w-20 text-indigo-500" fill="currentColor" viewBox="0 0 84 84">
										<circle opacity="0.9" cx="42" cy="42" r="42" fill="white" />
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
			<div class="mt-20 flex gap-x-2 justify-center">
				<div class="w-4 h-4 rounded-full bg-white" />
				<div class="w-4 h-4 rounded-full bg-white" />
				<div class="w-4 h-4 rounded-full bg-white" />
				<div class="w-4 h-4 rounded-full bg-white" />
			</div>
		</div>
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
					'An introductory course for developers to familiarize themselves with the Secret Network.'
			},
			{
				img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				alt: '',
				title: 'Your first Secret Smart Contract',
				description: 'Learn the ins and outs of writing a private smart contract on Secret Network'
			},
			{
				img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				alt: '',
				title: 'Your First Private dApp',
				description:
					'Use JavaScript to connect to the Secret Network and supercharge your application with privacy'
			}
		]}
	/>

	<SectionHeader
		title={'Secret Boxes'}
		subtitle={'Start building today'}
		description={'Secret Boxes are fully integrated projects for you to learn from and expand. Focus on building, not on configuration and setup.'}
	/>

	<Features
		features={[
			{
				img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				alt: '',
				title: 'Hello World',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas, nisi eu consequat condimentum, leo lorem feugiat leo, sed gravida sem mi in libero'
			},
			{
				img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				alt: '',
				title: 'Secret Counter',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas, nisi eu consequat condimentum, leo lorem feugiat leo, sed gravida sem mi in libero'
			},
			{
				img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				alt: '',
				title: 'Richie Rich',
				description: "Solving Yao's millionaires' problem with secret smart contracts"
			}
		]}
	/>

	<SectionHeader
		title={'Community Resources'}
		subtitle={'Learn from the community'}
		description={'Read guides, watch screencasts, and learn from developers building on Secret Network'}
	/>

	<Features
		features={[
			{
				img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				alt: '',
				title: 'Video Example',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas, nisi eu consequat condimentum, leo lorem feugiat leo, sed gravida sem mi in libero'
			},
			{
				img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				alt: '',
				title: 'Guide Example',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas, nisi eu consequat condimentum, leo lorem feugiat leo, sed gravida sem mi in libero'
			},
			{
				img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
				alt: '',
				title: 'Another Example',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas, nisi eu consequat condimentum, leo lorem feugiat leo, sed gravida sem mi in libero'
			}
		]}
	/>

	<div class="py-12">
		<div class="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-white">
			<p
				class="mt-1 text-center text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
			>
				Who we are
			</p>
		</div>

		<div
			class="mx-auto max-w-xl flex-col justify-center sm:px-6 md:flex-col md:gap-y-8 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-12"
		>
			<div class="mb-12 divide-y divide-gray-200 overflow-hidden rounded-lg bg-dark-4 shadow">
				<div>
					<!-- Image goes here -->
					<img src="./test-image.jpg" alt="Space" />
				</div>
				<div class="pb-6 sm:px-6">
					<!-- Content goes here -->
					<h2 class="mt-5 text-lg font-bold leading-6 text-white">Builders</h2>
					<p class="mt-2 text-base text-gray">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et nisi efficitur,
						consequat neque nec, volutpat orci. Proin auctor finibus dui, sed condimentum urna
						cursus ac. Mauris semper at ipsum eget interdum. Cras ullamcorper fringilla nunc, ut
						accumsan arcu accumsan ac.
					</p>
					<!-- We use less vertical padding on card footers at all sizes than on headers or body sections -->
				</div>
			</div>

			<div class="mb-12 divide-y divide-gray-200 overflow-hidden rounded-lg bg-dark-4 shadow">
				<div>
					<!-- Image goes here -->
					<img src="./test-image.jpg" alt="Space" />
				</div>
				<div class="pb-6 sm:px-6">
					<!-- Content goes here -->
					<h2 class="mt-5 text-lg font-bold leading-6 text-white">Creatives</h2>
					<p class="mt-2 text-base text-gray">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et nisi efficitur,
						consequat neque nec, volutpat orci. Proin auctor finibus dui, sed condimentum urna
						cursus ac. Mauris semper at ipsum eget interdum. Cras ullamcorper fringilla nunc, ut
						accumsan arcu accumsan ac.
					</p>
					<!-- We use less vertical padding on card footers at all sizes than on headers or body sections -->
				</div>
			</div>

			<div class="mb-12 divide-y divide-gray-200 overflow-hidden rounded-lg bg-dark-4 shadow">
				<div>
					<!-- Image goes here -->
					<img src="./test-image.jpg" alt="Space" />
				</div>
				<div class="pb-6 sm:px-6">
					<!-- Content goes here -->
					<h2 class="mt-5 text-lg font-bold leading-6 text-white">Teachers</h2>
					<p class="mt-2 text-base text-gray">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et nisi efficitur,
						consequat neque nec, volutpat orci. Proin auctor finibus dui, sed condimentum urna
						cursus ac. Mauris semper at ipsum eget interdum. Cras ullamcorper fringilla nunc, ut
						accumsan arcu accumsan ac.
					</p>
					<!-- We use less vertical padding on card footers at all sizes than on headers or body sections -->
				</div>
			</div>
		</div>
	</div>

	<div class="mb-24 grid grid-rows-2 items-center justify-items-center py-24">
		<h2 class="mb-8 text-4xl font-bold text-white text-center">
			Interested in joining the <span class="text-dark-blue">university?</span> <br />
			<span class="inline-block mt-2">Join the community, and find out how you can help.</span>
		</h2>
		<button
			type="button"
			class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>Join our Community</button
		>
	</div>
</section>
