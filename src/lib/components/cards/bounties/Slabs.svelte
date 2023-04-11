<script lang="ts">
	import LinkIcon from '$lib/assets/link_icon.svg';
	import { toTitleCase } from '$lib/helpers';
	export let bounty: Contributions.Bounty.Slabs;

	let showDetails = false;

	// parse a string to include new lines
	function parseNewLines(str: string) {
		return str.replace(/(?:\r \n|\r|\n)/g, '<br />');
	}
</script>

<div class="block h-fit w-full rounded-md bg-dark-4 px-8 py-6 text-white shadow-md">
	<div class="grid auto-rows-auto grid-cols-[4fr_1fr]">
		<div class="row-span-full mt-2 text-white">
			<div class="flex items-center space-x-4">
				<p class="my-2 text-2xl font-bold">{toTitleCase(bounty.title)}</p>
				<p class="w-max rounded-full bg-dark-purple py-1 px-4 font-semibold">
					{bounty.complexity}
				</p>
				<p class="rounded-full bg-dark-turquoise-g py-1 px-4 font-semibold capitalize">
					{bounty.status}
				</p>
			</div>

			<div class="mb-8"><span class="font-semibold">Category:</span> {bounty.category}</div>

			<p class="mb-2 text-lg font-semibold">Description</p>
			<p class="mb-8 text-off-white">{@html parseNewLines(bounty.description)}</p>
			<div class="grid grid-cols-2 gap-x-6">
				<div>
					<div class="mb-2 text-lg font-semibold">Success Criteria</div>
					<p class="text-off-white">{@html parseNewLines(bounty.success_criteria)}</p>
				</div>

				<div>
					<div class="mb-2 text-lg font-semibold">Reward</div>
					<span class="">{bounty.reward} {bounty.token} </span>
				</div>
			</div>
		</div>

		<a
			target="_blank"
			rel="noopener noreferrer"
			href={bounty.external_url}
			class="cursor-pointer justify-self-end"
		>
			<img class="h-6 w-6" src={LinkIcon} alt="" />
		</a>
	</div>

	{#if showDetails}
		<div class="mt-12 mb-6 h-0.5 w-full rounded-md bg-white" />
	{/if}
</div>
