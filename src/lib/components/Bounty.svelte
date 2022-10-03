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
			return 'bg-dark-2';
		}

		if (index % 2 === 0) {
			return 'bg-dark-4';
		} else {
			return 'bg-dark-5';
		}
	};
</script>

<a
	href={url}
	class="block h-full rounded-md w-full {getBGColor()} px-4 py-6 shadow-md lg:px-8 lg:py-8"
>
	<div class="grid grid-col-5 auto-rows-auto">
		<div class="col-span-3 mt-2 text-white">
			<div>
				<p class="text-2xl font-semibold">{bounty.title}</p>
				<p>Reward: <span class="font-bold">{bounty.amount}</span> SCRT</p>
			</div>
			<p>{bounty.description}</p>
		</div>

		<div
			class="col-start-5 rounded-lg h-min self-center w-max mx-auto text-white {getStatusColor()}"
		>
			<div class="h-fit px-2 py-1 rounded-lg capitalize {getStatusColor()}">
				{bounty.status}
			</div>
		</div>
	</div>
</a>
