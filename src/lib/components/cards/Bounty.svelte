<script lang="ts">
	import type { Bounty } from '$lib/models';

	export let bounty: Bounty;
	export let index = 0;

	const url = bounty.proposal_url === null ? bounty.forum_url : bounty.proposal_url;

	const getStatusColor = function () {
		switch (bounty.status) {
			case 'open':
				return 'bg-dark-turquoise-b';
			case 'complete':
				return 'bg-dark-turquoise-g';
			case 'in-progress':
				return 'bg-dark-orange';
			default:
				return 'bg-dark-blue';
		}
	};

	const getBGColor = () => {
		if (bounty.status === 'complete') {
			return 'bg-dark-3 border-4 border-dark-4';
		} else {
			return 'bg-dark-4';
		}
	};
</script>

<a href={url} class="block h-fit w-full rounded-md {getBGColor()} px-8 py-6 shadow-md">
	<div class="grid-col-5 grid auto-rows-auto">
		<div class="col-span-3 mt-2 text-white">
			<div>
				<p class="my-2 text-2xl font-semibold">{bounty.title}</p>
				<p>Reward: <span class="my-1 font-bold">{bounty.reward_amount}</span></p>
			</div>
			<p class="mb-6 max-w-lg">{bounty.description}</p>
			<div class="mt-2 flex">
				<a
					target="_blank"
					rel="noopener noreferrer"
					href={bounty.forum_url}
					class="mr-2 inline-block"
				>
					<span
						class="inline-flex items-center rounded-md bg-dark-blue px-4 py-2 font-medium text-white hover:bg-darker-blue"
					>
						View Forum Discussion
					</span>
				</a>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href={bounty.proposal_url}
					class="inline-block"
				>
					<span
						class="inline-flex items-center rounded-md bg-dark-blue px-4 py-2 font-medium text-white hover:bg-darker-blue"
					>
						View Proposal
					</span>
				</a>
			</div>
		</div>

		<div
			class="col-start-5 h-min w-max self-start justify-self-end rounded-lg text-white {getStatusColor()}"
		>
			<div class="h-fit rounded-lg px-3 py-2 capitalize {getStatusColor()}">
				{bounty.status}
			</div>
		</div>
	</div>
</a>
