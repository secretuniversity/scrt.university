<script lang="ts">
	import { onMount } from 'svelte';
	import Slide1 from './Slide1.svelte';
	import Slide2 from './Slide2.svelte';
	import Slide3 from './Slide3.svelte';
	import Slide4 from './Slide4.svelte';

	const MAX_INDEX = 3;
	const SPEED = 8000; // ms

	let i = 0;

	// onMount(() => {
	// 	setInterval(() => {
	// 		if (i < MAX_INDEX) {
	// 			i += 1;
	// 		} else {
	// 			i = 0;
	// 		}
	// 	}, SPEED);
	// });
</script>

<!-- Hero Content Container -->
<div class="min-h-home-hero">
	<main class="mx-auto max-w-7xl px-4 lg:px-0">
		<div class="lg:grid lg:grid-cols-12 lg:gap-4 lg:py-48">
			{#if i === 0}
				<Slide1 />
			{/if}

			{#if i === 1}
				<Slide2 />
			{/if}

			{#if i === 2}
				<Slide3 />
			{/if}

			{#if i === 3}
				<Slide4 />
			{/if}
		</div>
	</main>
	<div class="mt-12 flex justify-center gap-x-2">
		<div on:click={() => (i = 0)} class="h-4 w-4 rounded-full {i === 0 ? 'bg-white' : 'bg-gray'}" />
		<div on:click={() => (i = 1)} class="h-4 w-4 rounded-full {i === 1 ? 'bg-white' : 'bg-gray'}" />
		<div on:click={() => (i = 2)} class="h-4 w-4 rounded-full {i === 2 ? 'bg-white' : 'bg-gray'}" />
		<div on:click={() => (i = 3)} class="h-4 w-4 rounded-full {i === 3 ? 'bg-white' : 'bg-gray'}" />
	</div>
</div>
