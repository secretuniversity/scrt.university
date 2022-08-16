<script lang="ts">
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import Head from '$lib/components/Head.svelte';

	const pageTitle = 'Pathways';

	const breadcrumbRoutes = [
		{
			name: 'Learn',
			path: '/learn'
		},
		{
			name: 'Secret Pathways',
			path: '/pathways'
		}
	];
</script>

<Head {pageTitle} />

<section class="mx-24 py-8">
	<Breadcrumb routes={breadcrumbRoutes} />
	<div class="mt-8 max-w-3xl">
		<h1 class="mb-4 text-5xl font-bold text-white">Secret Pathways</h1>
		<p class="mb-16 text-base text-gray">
			Secret Pathways are self-contained lessons designed to help you build on Secret. Gain insight
			into building on Secret Network by reading through the lessons of a pathway, and answer
			questions to earn <span class="font-bold">secret badges</span>
			and
			<span class="font-bold">certifications</span>.
		</p>
	</div>

	<div class="mx-auto grid w-11/12 grid-cols-3 gap-12">
		<a href="/pathways/welcome-to-secret-network">
			<div
				class="h-full max-w-lg overflow-hidden rounded-xl bg-dark-4 px-6 py-6 shadow-lg lg:px-8 lg:py-8"
			>
				<div class="grid h-full gap-y-2">
					<!-- <img src="" alt=""> -->
					<div class="mx-auto h-36 w-36 bg-slate-400" />
					<h2 class="mt-2 text-center text-lg font-semibold text-white">
						Welcome To Secret Network
					</h2>
					<div class="flex space-x-2 justify-self-center">
						<p class="inline-block rounded-full bg-dark-blue px-3 py-0.5 text-white">
							Introductory
						</p>
						<p class="inline-block rounded-full bg-dark-blue px-3 py-0.5 text-white">Ecosystem</p>
					</div>

					<p class="text-center text-base text-off-white">
						Learn about the ecosystem before diving straight into code. Get to learn the tools and
						the privacy model of the network so you can design better apps in the future.
					</p>

					<div class="mt-2 flex items-center gap-x-4">
						<div class="h-8 w-8 rounded-full bg-slate-400" />
						<p class="text-white">Created by <span class="underline">Secret University</span></p>
					</div>
				</div>
			</div>
		</a>

		<a href="/pathways/secret-dice-pathway">
			<div
				class="h-full max-w-lg overflow-hidden rounded-xl bg-dark-4 px-6 py-6 shadow-lg lg:px-8 lg:py-8"
			>
				<div class="grid h-full gap-y-2">
					<!-- <img src="" alt=""> -->
					<div class="mx-auto h-36 w-36 bg-slate-400" />
					<h2 class="mt-2 text-center text-lg font-semibold text-white">
						Building Private Smart Contracts
					</h2>
					<div class="flex h-fit space-x-2 justify-self-center">
						<p class="inline-block rounded-full bg-dark-blue px-3 py-0.5 text-white">
							Introductory
						</p>
						<p class="inline-block rounded-full bg-dark-orange px-3 py-0.5 text-white">Rust</p>
					</div>

					<p class="text-center text-base text-off-white">
						Walk through rust code of private dice rolling smart contract and learn to build private
						smart contracts using Secret Network and Cosmwasm.
					</p>
					<div class="mt-2 flex items-center gap-x-4">
						<div class="h-8 w-8 rounded-full bg-slate-400" />
						<p class="text-white">Created by <span class="underline">Secret University</span></p>
					</div>
				</div>
			</div>
		</a>

		<a href="/pathways/welcome-to-secret-network">
			<div
				class="h-full max-w-lg overflow-hidden rounded-xl bg-dark-4 px-6 py-6 shadow-lg lg:px-8 lg:py-8"
			>
				<div class="grid auto-rows-min gap-y-2">
					<!-- <img src="" alt=""> -->
					<div class="mx-auto h-36 w-36 bg-slate-400" />
					<h2 class="mt-2 text-center text-lg font-semibold text-white">
						Building dApps for Privacy
					</h2>
					<div class="flex space-x-2 justify-self-center">
						<p class="inline-block rounded-full bg-dark-blue px-3 py-0.5 text-white">
							Introductory
						</p>
						<p class="inline-block rounded-full bg-dark-yellow px-3 py-0.5 text-black">
							Javascript
						</p>
					</div>

					<p class="text-center text-base text-off-white">
						Learn to integrate JavaScript applications with Secret Network. From working with tokens
						to building with access controls on the blockchain, this pathway will get you
						comfortable working as a front-end dev for the network.
					</p>
					<div class="mt-2 flex items-center gap-x-4">
						<div class="h-8 w-8 rounded-full bg-slate-400" />
						<p class="text-white">Created by <span class="underline">Secret University</span></p>
					</div>
				</div>
			</div>
		</a>
	</div>
</section>

<div class="mx-auto w-9/12 py-16" />
