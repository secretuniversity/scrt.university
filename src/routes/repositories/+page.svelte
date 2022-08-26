<script lang="ts">
	import { onMount } from 'svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import Filter from '$lib/components/Filter.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import RepoCard from '$lib/components/cards/Repo.svelte';
	import SecretBox from '$lib/components/cards/SecretBox.svelte';
	import Head from '$lib/components/Head.svelte';
	import Search from '$lib/components/Search.svelte';
	import type { Repo } from '$lib/models/index';

	const PAGE_TITLE = 'Repositories';
	const BREADCRUMB_ROUTES = [
		{
			name: 'Learn',
			path: '/learn'
		},
		{
			name: 'Repositories',
			path: '/repositories'
		}
	];
	const FILTER_SECTIONS = ['Type', 'Date', 'Tags'];

	let tags: string[] = [];
	let repos: Repo[] = [];

	onMount(() => {
		getRepos();
		getTags();
	});

	function handleSearch(e: CustomEvent) {
		console.log(e.detail.val);
	}

	async function getRepos() {
		console.log('Getting repos from backend');
		repos = [
			...repos,
			{
				kind: 'secret-box',
				title: 'Secret Counter',
				description: 'A quick introduction to building private smart contracts on Secret Network',
				tags: ['secret-box', 'essential']
			},
			{
				kind: 'generic',
				title: 'secret-toolkit',
				description: 'A rust library used to help build private smart contracts on Secret Network',
				tags: ['rust', 'library', 'essential']
			},
			{
				kind: 'generic',
				title: 'secret-random-minting-snip721-impl',
				description: 'A smart contract optimized for randomly minting SNIP-721s (Secret NFTs)',
				tags: ['smart-contracts', 'nfts']
			}
		];

		console.log({ repos });
	}

	async function getTags() {
		console.log('Getting tags from backend');
		tags.push(...['Essential', 'Smart Contracts', 'DeFi', 'Gaming', 'Rust', 'JavaScript']);
	}
</script>

<Head pageTitle={PAGE_TITLE} />

<section class="lg:mx-24">
	<div class="mt-8">
		<Breadcrumb routes={BREADCRUMB_ROUTES} />
	</div>
	<PageHeader
		title={PAGE_TITLE}
		description={'Learn from the source. Find inspiration for you next project by looking at these repositories.'}
	/>

	<div class="mt-12 grid grid-cols-4 gap-x-8 pb-12">
		<div class="col-span-1">
			<Filter sections={FILTER_SECTIONS} let:index>
				{#if index === 0}
					<div class="flex gap-x-2 py-2">
						<input
							class="self-center rounded-sm border-gray bg-dark-4"
							id="type-box"
							type="checkbox"
						/>
						<label class="self-center text-white" for="type-box">Secret Box</label>
					</div>

					<div class="flex gap-x-2 py-2">
						<input
							class="self-center rounded-sm border-gray bg-dark-4"
							id="type-repo"
							type="checkbox"
						/>
						<label class="self-center text-white" for="type-repo">Repositores</label>
					</div>
				{/if}

				{#if index === 1}
					<select
						class="w-full rounded-lg border-white bg-dark-4 text-white"
						name="date-selector"
						id="date-select"
					>
						<option value="newest">Recently Added</option>
						<option value="oldest">Recently Updated</option>
					</select>
				{/if}

				{#if index === 2}
					{#each tags as tag}
						<div class="py-2">
							<input
								class="mr-2 rounded-sm border-white bg-dark-4"
								type="checkbox"
								name="{tag}-input"
								id="{tag}-input"
							/>
							<label class="text-white" for="{tag}-input">{tag}</label>
						</div>
					{/each}

					<div class="mx-auto w-fit">
						<button
							type="button"
							class="mt-4 inline-flex w-fit items-center justify-self-center rounded-md border border-transparent bg-dark-blue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>View More</button
						>
					</div>
				{/if}
			</Filter>
		</div>

		<div class="col-span-3">
			<Search on:search={handleSearch} />
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
						{#each repos as r}
							{#if r.kind === 'secret-box'}
								<!-- content here -->
								<SecretBox title={r.title} description={r.description} tags={r.tags} />
							{:else}
								<RepoCard title={r.title} description={r.description} tags={r.tags} />
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
