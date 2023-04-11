<script lang="ts">
	import CommunityBountyCard from '$lib/components/cards/bounties/Community.svelte';
	import SlabsBountyCard from '$lib/components/cards/bounties/Slabs.svelte';
	import Filter from '$lib/components/forms/Filter.svelte';
	import Breadcrumb from '$lib/components/page/Breadcrumb.svelte';
	import Tabs from '$lib/components/page/Tabs.svelte';
	import { onMount } from 'svelte';

	export let data: Page.Bounties;

	enum Programs {
		Slabs = 'Secret Labs Bounty Program',
		Ccbl = 'Community Curated Bounty List'
	}

	const breadcrumbRoutes = [
		{
			name: 'Build',
			path: '/build'
		},
		{
			name: 'Bounties',
			path: '/bounties'
		}
	];

	const tabs = [Programs.Slabs, Programs.Ccbl];
	const filterSections = ['Date', 'Reward', 'Status'];

	let program: string = Programs.Slabs;

	onMount(() => {
		console.log(data);
	});

	function getProgramDescription(p: string) {
		if (p === Programs.Slabs) {
			return 'The Secret Labs Bounty program offers exciting opportunities for developers to contribute to the growth and development of the Secret ecosystem. These bounties focus on enhancing Keplr wallet functionality, improving user experience, and supporting a variety of tokens, making the network even more accessible and powerful for our community.';
		} else if (p === Programs.Ccbl) {
			return 'This community curated bounty list (CCBL) contains requests from the Secret Network community. Each bounty is a project many have voted on and hope to see built on the network. Think you can take on a bounty for the community? Click the bounty to learn more.';
		}
	}
</script>

<section class="px-24 py-12">
	<Breadcrumb routes={breadcrumbRoutes} />
</section>

<section class="relative min-h-screen px-24 pt-8">
	<div class="grid w-full grid-cols-2 items-start pb-28">
		<div>
			<h1 class="mb-4 text-4xl font-bold text-white">{program}</h1>
			<p class="max-w-2xl text-base font-medium text-gray">
				{getProgramDescription(program)}
			</p>
		</div>

		<div class="flex w-full justify-end">
			<div class="w-[70%]">
				<Tabs
					{tabs}
					on:tab-click={(e) => {
						program = e.detail;
					}}
				/>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-12 gap-x-6">
		<div class="col-span-3">
			<Filter let:index sections={filterSections}>
				{#if index === 0}
					<select
						class="w-full rounded-lg border-white bg-dark-4 text-white"
						name="date-selector"
						id="date-select"
					>
						<option value="newest">Recently Added</option>
						<option value="oldest">Recently Updated</option>
					</select>
				{/if}

				{#if index === 1}
					<!-- TODO: Fix non-responsive widths. IDK inputs are not respecting flexbox -->
					<div class="mx-auto flex w-fit justify-items-center gap-x-4 overflow-hidden">
						<input
							class="w-32 rounded-lg border-white bg-dark-4 text-white"
							type="text"
							placeholder="Min."
						/>
						<p class="self-center text-white">-</p>
						<input
							class="w-32 rounded-lg border-white bg-dark-4 text-white"
							type="text"
							placeholder="Max."
						/>
					</div>
				{/if}

				{#if index === 2}
					<div class="flex items-center gap-x-2 text-lg text-white">
						<input
							class="rounded-sm border-white bg-dark-4"
							type="checkbox"
							name="status-open"
							id="status-open"
						/>
						<label for="status-open">Open</label>
					</div>

					<div class="flex items-center gap-x-2 text-lg text-white">
						<input
							class="rounded-sm border-white bg-dark-4"
							type="checkbox"
							name="status-in-progress"
							id="status-in-progress"
						/>
						<label for="status-open">In Progress</label>
					</div>

					<div class="flex items-center gap-x-2 text-lg text-white">
						<input
							class="rounded-sm border-white bg-dark-4"
							type="checkbox"
							name="status-complete"
							id="status-complete"
						/>
						<label for="status-open">Completed</label>
					</div>
				{/if}
			</Filter>
		</div>

		<div class="col-span-9">
			{#if program === Programs.Slabs}
				<!-- content here -->
				{#if data.slabsBounties.length === 0}
					<p class="block self-center text-center text-sm font-medium text-dark-5">
						Secret University found no Secret Labs bounties.
					</p>
				{/if}

				<div class="flex-col space-y-4 pb-36">
					{#each data.slabsBounties as bounty, index}
						<SlabsBountyCard {bounty} />
					{/each}
				</div>
			{/if}

			{#if program === Programs.Ccbl}
				{#if data.communityBounties.length === 0}
					<p class="block self-center text-center text-sm font-medium text-dark-5">
						Secret University found no community bounties.
					</p>
				{/if}

				<div class="flex-col space-y-4 pb-36">
					{#each data.communityBounties as bounty, index}
						<CommunityBountyCard {bounty} />
					{/each}
				</div>
			{/if}
		</div>
	</div>
</section>
