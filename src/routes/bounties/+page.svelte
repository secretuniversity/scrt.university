<script lang="ts">
	import type { Bounty } from '$lib/models/index';
	import Filter from '$lib/components/Filter.svelte';
	import Head from '$lib/components/Head.svelte';
	import BountyCard from '$lib/components/cards/Bounty.svelte';

	const bounties: Bounty[] = [
		{
			id: '1',
			title: 'Some Bounty',
			description: 'A super top secret bounty for a super secret, super shadowy coder',
			forumPost: 'https://forum.scrt.network/',
			proposal: null,
			amount: 1000,
			status: 'open',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		},
		{
			id: '2',
			title: 'Some Other Bounty',
			description: 'Another super top secret bounty for a super secret, super shadowy coder',
			forumPost: 'https://forum.scrt.network/',
			proposal: null,
			amount: 1000,
			status: 'in-progress',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		},
		{
			id: '3',
			title: 'Yet Another Bounty',
			description: 'Some super top secret bounty for a super secret, super shadowy coder',
			forumPost: 'https://forum.scrt.network/',
			proposal: null,
			amount: 1000,
			status: 'completed',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		},
		{
			id: '4',
			title: 'Simple Bounty',
			description: 'Some super simple top secret bounty for a super secret, super shadowy coder',
			forumPost: 'https://forum.scrt.network/',
			proposal: null,
			amount: 1000,
			status: 'completed',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		}
	];

	const pageTitle = 'Bounties';

	const filterSections = ['Date', 'Reward', 'Status'];
</script>

<Head {pageTitle} />

<section class="min-h-screen px-24">
	<div class="mt-16">
		<h1 class="text-4xl font-bold text-white">Community Curated Bounty List</h1>
		<p class="mt-2 max-w-3xl text-base font-medium text-gray">
			This community curated bounty list (CCBL) contains requests from the Secret Network community.
			Each bounty is a project many have voted on and hope to see built on the network. Think you
			can take on a bounty for the community? Click the bounty to learn more.
		</p>
	</div>

	<div class="mt-12 grid grid-cols-12 gap-x-6">
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

		<div class="col-span-9 grid grid-cols-3 gap-4">
			{#each bounties as bounty}
				<!-- content here -->
				<BountyCard {bounty} />
			{/each}
		</div>
	</div>
</section>
