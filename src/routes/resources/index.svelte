<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import Repo from '$lib/components/cards/Repo.svelte';

	const pageTitle = 'Community Resources';
</script>

<Head {pageTitle} />

<section class="mx-24">
	<PageHeader
		title={'Community Resources'}
		description={'Learn from the community. Find guides, courses, videos, and more— each made by developers on Secret Network.'}
	/>

	<div class="mt-12 grid grid-cols-4 gap-x-8 pb-12">
		<div class="col-span-1">
			<div class="mb-0.5 rounded-t-xl bg-dark-4 px-4 py-4 text-lg font-bold text-white">Filter</div>
			<div class="mb-0.5 bg-dark-4 px-4 py-4 text-lg font-bold text-white">Type</div>
			<div class="bg-dark-4 px-4 py-4 text-lg font-bold text-white">Tags</div>
		</div>

		<div class="col-span-3">
			<div class="flex gap-x-4">
				<!-- Search Input -->
				<div class="w-full">
					<label for="search" class="sr-only">Search</label>
					<input
						type="search"
						name="search"
						id="search"
						class="block w-full rounded-md border-gray bg-dark-3 text-off-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						placeholder="Search for term [or #tag]"
					/>
				</div>

				<!-- <div class="self-center justify-self-end">
					<Dropdown />
				</div> -->
			</div>
			<div class="mt-4 flex gap-x-4">
				<p class="inline-block rounded-full bg-dark-blue py-1 px-4 text-white">
					&times<span class="pl-1 font-bold">tag:</span> secret-box
				</p>
				<p class="inline-block rounded-full bg-dark-blue py-1 px-4 text-white">
					&times<span class="pl-1 font-bold">tag:</span> essential
				</p>
			</div>
			<!-- Repo Cards -->
			<div class="-z-10 pt-6 pb-20 lg:pt-4 lg:pb-28">
				<div class="divide-gray-200 relative mx-auto max-w-lg divide-y-2 lg:max-w-full">
					<div class="grid gap-16 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
						<Repo
							tags={['secret-box', 'essential']}
							title={'Secret Counter'}
							description={'A quick introdcution to building private smart contracts on Secret Network'}
						/>
						<Repo
							tags={['library', 'smart-contracts', 'rust', 'essential']}
							title={'secret-toolkit'}
							description={'A rust package to help you build private smart contracts on Secret Network'}
						/>
						<Repo
							tags={['smart-contracts', 'nfts']}
							title={'secret-random-minting-snip721-impl'}
							description={'A smart contract optimized for randomly minting SNIP-721s (Secret NFTs)'}
						/>

						<Repo />
						<Repo />
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
