<script lang="ts">
	import { Shadow } from 'svelte-loading-spinners';
	import { fly, fade } from 'svelte/transition';
	import { notes } from '$lib/stores';
	import { onDestroy, onMount } from 'svelte';

	export let n: Note;
	export let i = 0;

	let close = false;

	$: if (n.close) {
		close = true;
	}

	onMount(() => {
		if (!n.loading) {
			setTimeout(() => {
				close = true;
			}, 5000);
		}
	});

	function getBGColor(n: Note) {
		switch (n.status) {
			case 'error':
				return 'bg-red-700';
			case 'success':
				return 'bg-green-700';
			case 'info':
				return 'bg-yellow-700';
			default:
				return 'bg-dark-1';
		}
	}

	onDestroy(() => {
		$notes = $notes.filter((_, index) => index !== i);
	});

	function handleClick() {
		if (n.loading) return;

		close = true;
	}
</script>

{#if !close}
	<div
		in:fly={{ y: -200, duration: 1000 }}
		out:fade
		on:click={() => handleClick()}
		class="cursor-pointer px-4 py-2 text-base text-white {getBGColor(n)} rounded-md shadow-md"
	>
		<div class="flex items-center">
			{#if n.loading}
				<div class="mr-4 p-2">
					<Shadow size="20" color="#ffffff" unit="px" />
				</div>
			{/if}
			<div>
				<p>
					{@html n.message}
				</p>

				{#if n.loading}
					<p class="text-sm italic">This can take some time.</p>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.loader {
		border: 16px solid #f3f3f3;
		border-radius: 50%;
		border-top: 16px solid blue;
		border-bottom: 16px solid blue;
		width: 120px;
		height: 120px;
		-webkit-animation: spin 2s linear infinite;
		animation: spin 2s linear infinite;
	}

	@-webkit-keyframes spin {
		0% {
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
