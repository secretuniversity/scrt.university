<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let tabs: string[] = ['Default Tab'];

	const dispatch = createEventDispatcher<{ 'tab-click': string }>();

	let selected = tabs[0];

	function handleTabClick(tab: string) {
		selected = tab;
		dispatch('tab-click', tab);
	}

	function getBorderRoundClass(index: number) {
		if (index === 0) {
			return 'rounded-l-lg';
		} else if (index === tabs.length - 1) {
			return 'rounded-r-lg';
		}
		return '';
	}
</script>

<div class="w-full">
	<div class="sm:hidden">
		<label for="tabs" class="sr-only">Select a tab</label>
		<!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
		<!-- <select
			id="tabs"
			name="tabs"
			class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
		>
			<option selected>My Account</option>

			<option>Company</option>

			<option>Team Members</option>

			<option>Billing</option>
		</select> -->
	</div>
	<div class="hidden sm:block">
		<nav class="isolate flex divide-x divide-dark-1 rounded-lg shadow" aria-label="Tabs">
			<!-- Current: "text-gray-900", Default: "text-gray-500 hover:text-gray-700" -->
			{#each tabs as t, i}
				<div
					on:click={() => handleTabClick(t)}
					on:keydown={(e) => {
						if (e.key === 'Enter') {
							handleTabClick(t);
						}
					}}
					class="text-white {getBorderRoundClass(
						i
					)} group relative min-w-0 flex-1 overflow-hidden bg-dark-4 py-4 px-4 text-center text-sm font-semibold hover:bg-dark-2 focus:z-10"
					aria-current="page"
				>
					<span>{t}</span>
					{#if selected === t}
						<span aria-hidden="true" class="absolute inset-x-0 bottom-0 h-0.5 bg-dark-blue" />
					{/if}
				</div>
			{/each}
		</nav>
	</div>
</div>
