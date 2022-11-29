<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let query = '';

	function onSearchInputKeyPress(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleSearch();
		}
	}

	function handleSearch() {
		dispatch('search', {
			val: query
		});
	}
</script>

<div class="flex gap-x-4">
	<!-- Search Input -->
	<div class="w-full">
		<label for="search" class="sr-only">Search</label>
		<input
			on:keydown={onSearchInputKeyPress}
			bind:value={query}
			type="search"
			name="search"
			id="search"
			class="block w-full rounded-md border-dark-5 bg-dark-3 text-off-white shadow-sm"
			placeholder="Search for term... Press [Enter] to search"
		/>
	</div>
	<!-- <button on:click|preventDefault={handleSearch} class="rounded-md bg-dark-4 py-2 px-3 shadow-md">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="#fff"
			class="h-6 w-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
			/>
		</svg>
	</button> -->
</div>
