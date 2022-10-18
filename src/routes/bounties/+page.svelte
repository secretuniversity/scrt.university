<script lang="ts">
	import Filter from '$lib/components/Filter.svelte';
	import Head from '$lib/components/Head.svelte';
	import BountyCard from '$lib/components/Bounty.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { bounties } from '$lib/stores';
	import { onMount } from 'svelte';

	import type { Bounty } from '$lib/models/index';
	import { isExpired } from '$lib/helpers';

	let toastIsVisible = false;
	let toastKind = 'fail';
	let toastMsg = '';

	onMount(async () => {
		if (!$bounties || ($bounties && !isExpired($bounties.exp))) {
			try {
				const url = '/api/v1/bounties/0';
				let res = await fetch(url);
				let json = await res.json();
				let data = json.data;

				// Create exp and set it to 1 hour from now
				const exp = new Date();
				exp.setHours(exp.getHours() + 1);

				$bounties = {
					val: data as Bounty[],
					exp: exp.getTime()
				};
			} catch (err) {
				toastIsVisible = true;
				toastMsg = 'There was an error fetching bounties';
			}
		}
	});

	const pageTitle = 'Bounties';
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

	const filterSections = ['Date', 'Reward', 'Status'];
</script>

<Head {pageTitle} />

<section class="px-24 pt-12 pb-10">
	<Breadcrumb routes={breadcrumbRoutes} />
</section>

<section class="min-h-screen px-24">
	<div class="mb-16">
		<h1 class="text-4xl font-bold text-white">Community Curated Bounty List</h1>
		<p class="mt-2 max-w-3xl text-base font-medium text-gray">
			This community curated bounty list (CCBL) contains requests from the Secret Network community.
			Each bounty is a project many have voted on and hope to see built on the network. Think you
			can take on a bounty for the community? Click the bounty to learn more.
		</p>
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
			{#if $bounties}
				{#each $bounties.val as bounty, index}
					<div class="mb-2 w-full">
						<BountyCard {bounty} {index} />
					</div>
				{/each}
			{:else}
				<p class="block self-center text-center text-sm font-medium text-dark-5">
					Secret University found no bounties.
				</p>
			{/if}
		</div>
	</div>
</section>
