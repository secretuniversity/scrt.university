<script lang="ts">
	import Filter from '$lib/components/Filter.svelte';
	import Head from '$lib/components/Head.svelte';
	import BountyCard from '$lib/components/cards/Bounty.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { bountiesStore, notificationsStore } from '$lib/stores';
	import { getNotification, getBaseAPIUrl } from '$lib/helpers';

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

	let limit = 25;
	let offset = 0;

	async function getBounties() {
		try {
			const url = getBaseAPIUrl() + `/v1/bounties?limit=${limit}&offset=${offset}`;
			const res = await fetch(url);
			const json = await res.json();

			if (res.ok) {
				$bountiesStore = {
					val: json,
					exp: new Date().setHours(new Date().getHours() + 1)
				};

				return json;
			}
		} catch (err) {
			$notificationsStore = [...$notificationsStore, getNotification(err as string, 'error')];
		}
	}
</script>

<Head {pageTitle} />

<section class="px-24 py-12">
	<Breadcrumb routes={breadcrumbRoutes} />
</section>

<section class="min-h-screen px-24">
	<div class="pb-28">
		<h1 class="mb-4 text-4xl font-bold text-white">Community Curated Bounty List</h1>
		<p class="max-w-3xl text-base font-medium text-gray">
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
			{#await getBounties()}
				<!-- promise is pending -->
			{:then list}
				{#if list.length === 0}
					<p class="block self-center text-center text-sm font-medium text-dark-5">
						Secret University found no bounties.
					</p>
				{/if}

				<div class="flex-col space-y-4 pb-36">
					{#each list as bounty, index}
						<BountyCard {bounty} {index} />
					{/each}
				</div>
			{:catch error}
				<!-- promise was rejected -->
				<p class="block self-center text-center text-sm font-medium text-dark-5">
					Secret University found no bounties.
				</p>
			{/await}
		</div>
	</div>
</section>
