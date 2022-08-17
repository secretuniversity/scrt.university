<script lang="ts">
	import type { Bounty } from '$lib/models/lib';
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
			<div class="mb-0.5 rounded-t-xl bg-dark-4 px-4 py-4 text-lg font-bold text-white">Filter</div>
			<div class="mb-0.5 bg-dark-4 px-4 py-4 text-lg font-bold text-white">Date</div>
			<div class="mb-0.5 bg-dark-4 px-4 py-4 text-lg font-bold text-white">Reward</div>
			<div class="bg-dark-4 px-4 py-4 text-lg font-bold text-white">Status</div>
		</div>

		<div class="col-span-9 grid grid-cols-3 gap-4">
			{#each bounties as bounty}
				<!-- content here -->
				<BountyCard {bounty} />
			{/each}
		</div>
	</div>
</section>
