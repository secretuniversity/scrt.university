<script lang="ts">
	import Spinner from '$lib/assets/spinner.svg';
	import { notification } from '$lib/stores';
	import { onDestroy, onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let visible = false;

	onMount(() => {
		notification.subscribe((value) => {
			if (value) {
				visible = true;
				setTimeout(() => {
					hide();
					notification.set(null);
				}, 4000);
			}
		});
	});

	onDestroy(() => {
		notification.set(null);
	});

	function getBGColor() {
		if (!$notification) {
			return '';
		}

		if ($notification.loading) {
			return 'bg-gray';
		} else if ($notification.hasError) {
			return 'bg-dark-red';
		} else {
			return 'bg-dark-turquoise-g';
		}
	}

	function hide() {
		visible = false;
	}
</script>

{#if visible}
	<div
		in:fly={{ y: -200, duration: 1000 }}
		out:fade
		on:click={hide}
		class="absolute bottom-0 right-0 text-base text-white {getBGColor} rounded-md shadow-md"
	>
		<div class="flex">
			{#if $notification && $notification.loading}
				<img src={Spinner} alt="Loading your request" />
			{/if}
			<div>
				{#if $notification && $notification.msg}
					{$notification.msg}
				{/if}
			</div>
		</div>
	</div>
{/if}
