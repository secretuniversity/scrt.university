<script lang="ts">
	import { onMount } from 'svelte';

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
</div>

{#each sections as section, index}
	<!-- content here -->
	<div class="mb-0.5 flex bg-dark-4 p-4">
		<p class="grow text-lg font-bold text-white">{section}</p>
		{#if flags[index]}
			<div class="h-full self-center">
				<img
					on:keydown={(e) => {
						if (e.key === 'Enter') {
							flags[index] = false;
						}
					}}
					on:click={() => {
						flags[index] = false;
					}}
					width="20"
					height="20"
					class="block cursor-pointer"
					src="/images/icons/up_caret.svg"
					alt="Hide the side filter"
				/>
			</div>
		{:else}
			<div class="h-full self-center">
				<img
					on:keydown={(e) => {
						if (e.key === 'Enter') {
							flags[index] = true;
						}
					}}
					on:click={() => {
						flags[index] = true;
					}}
					width="20"
					height="20"
					class="block cursor-pointer"
					src="/images/icons/down_caret.svg"
					alt="Hide the side filter"
				/>
			</div>
		{/if}
	</div>

	{#if flags[index]}
		<div class="mb-0.5 bg-dark-4 p-4">
			<slot {index} />
		</div>
	{/if}
{/each}
