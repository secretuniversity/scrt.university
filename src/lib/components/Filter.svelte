<script lang="ts">
	import { onMount } from 'svelte';

	import CaretLeftIcon from '$lib/assets/left_caret.svg';
	import CaretUpIcon from '$lib/assets/up_caret.svg';
	import CaretDownIcon from '$lib/assets/down_caret.svg';
	import FilterIcon from '$lib/assets/filter.svg';

	export let sections: string[] = [];
	const flags: boolean[] = [];

	onMount(() => {
		sections.forEach((_s, i) => {
			flags[i] = false;
		});
	});
</script>

<div class="mb-0.5 flex rounded-t-xl bg-dark-4 p-4">
	<p class="grow text-lg font-bold text-white">Filter</p>
	<img
		class="block cursor-pointer"
		width="10"
		height="10"
		src={CaretLeftIcon}
		alt="Hide the side filter"
	/>
</div>

{#each sections as section, index}
	<!-- content here -->
	<div class="mb-0.5 flex bg-dark-4 p-4">
		<p class="grow text-lg font-bold text-white">{section}</p>
		{#if flags[index]}
			<img
				on:click={() => {
					flags[index] = false;
				}}
				class="block cursor-pointer"
				width="15"
				height="15"
				src={CaretUpIcon}
				alt="Hide the side filter"
			/>
		{:else}
			<img
				on:click={() => {
					flags[index] = true;
				}}
				class="block cursor-pointer"
				width="15"
				height="15"
				src={CaretDownIcon}
				alt="Hide the side filter"
			/>
		{/if}
	</div>

	{#if flags[index]}
		<div class="mb-0.5 bg-dark-4 p-4">
			<slot {index} />
		</div>
	{/if}
{/each}
