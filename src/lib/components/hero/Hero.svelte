<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Slide1 from './Slide1.svelte';
	import Slide2 from './Slide2.svelte';
	import Slide3 from './Slide3.svelte';
	import Slide4 from './Slide4.svelte';

	const max = 3;
	const speed = 8000;
	const delay = 800;
	const duration = 800;

	let interval: NodeJS.Timer | null = null;

	let i = 0;

	onMount(() => {
		runSlides();
	});

	function runSlides() {
		interval = setInterval(() => {
			if (i < max) {
				i += 1;
			} else {
				i = 0;
			}
		}, speed);
	}

	function clear(n: number) {
		if (interval) {
			clearInterval(interval);
			runSlides();
		}

		i = n;
	}
</script>

<!-- Hero Content Container -->
<div class="grid h-home-hero min-h-home-hero">
	<main class="mx-auto grid h-[90%] max-w-7xl grid-cols-1 grid-rows-1 overflow-hidden">
		{#if i === 0}
			<div
				in:fade|local={{ duration, delay }}
				out:fade|local={{ duration }}
				class="col-start-1 row-start-1 grid grid-cols-12 gap-4 pt-44 pb-12"
			>
				<Slide1 />
			</div>
		{/if}

		{#if i === 1}
			<div
				in:fade|local={{ duration, delay }}
				out:fade|local={{ duration }}
				class="col-start-1 row-start-1 grid grid-cols-12 gap-4 pt-44 pb-48"
			>
				<Slide2 />
			</div>
		{/if}

		{#if i === 2}
			<div
				in:fade|local={{ duration, delay }}
				out:fade|local={{ duration }}
				class="col-start-1 row-start-1 grid grid-cols-12 gap-4 pt-44 pb-48"
			>
				<Slide3 />
			</div>
		{/if}

		{#if i === 3}
			<div
				in:fade|local={{ duration, delay }}
				out:fade|local={{ duration }}
				class="col-start-1 row-start-1 grid grid-cols-12 gap-4 pt-44 pb-48"
			>
				<Slide4 />
			</div>
		{/if}
	</main>
	<div class="flex h-[10%] justify-center gap-x-2">
		<div
			on:click={() => clear(0)}
			class="h-4 w-4 rounded-full {i === 0 ? 'bg-white' : 'bg-gray'}"
		/>
		<div
			on:click={() => clear(1)}
			class="h-4 w-4 rounded-full {i === 1 ? 'bg-white' : 'bg-gray'}"
		/>
		<div
			on:click={() => clear(2)}
			class="h-4 w-4 rounded-full {i === 2 ? 'bg-white' : 'bg-gray'}"
		/>
		<div
			on:click={() => clear(3)}
			class="h-4 w-4 rounded-full {i === 3 ? 'bg-white' : 'bg-gray'}"
		/>
	</div>
</div>
