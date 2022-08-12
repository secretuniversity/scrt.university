<script lang="ts">
	import type { Bounty } from '$lib/models';

	export let bounty: Bounty;

	const url = bounty.proposal === null ? bounty.forumPost : bounty.proposal;

	const getStatusColor = function () {
		switch (bounty.status) {
			case 'open':
				return 'bg-dark-turquoise-b';
			case 'completed':
				return 'bg-dark-turquoise-g';
			case 'in-progress':
				return 'bg-dark-orange';
			default:
				return 'bg-dark-blue';
		}
	};
</script>

<div class="h-full overflow-hidden rounded-xl bg-dark-4 px-4 py-6 shadow-md lg:px-8 lg:py-8">
	<div class="grid auto-rows-auto grid-cols-2 items-center">
		<div
			class="col-start-2 max-w-fit self-center justify-self-end rounded-full px-2.5 py-0.5 text-base capitalize text-white {getStatusColor()} font-medium"
		>
			{bounty.status}
		</div>
		<!-- Title and Description -->
		<p class="col-span-2 mt-2 self-center justify-self-center text-2xl font-semibold text-white">
			{bounty.title}
		</p>

		<div
			class="col-span-2 mt-2.5 max-w-fit self-center justify-self-center rounded-full bg-dark-red px-2.5 py-0.5 text-center text-base text-white"
		>
			Reward: <span class="font-bold">{bounty.amount}</span> SCRT
		</div>

		<p
			class="col-span-2 mt-4 max-w-md self-center justify-self-center text-center text-base text-gray"
		>
			{bounty.description}
		</p>

		<a
			href={url}
			type="button"
			class="col-span-2 mt-4 inline-flex items-center self-center justify-self-center rounded-md border border-transparent bg-dark-blue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>Learn More</a
		>
	</div>
</div>
