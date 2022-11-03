<script lang="ts">
	import Spinner from '$lib/assets/spinner.svg';
	import { notification } from '$lib/stores';
	import { onDestroy } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	$: {
		if ($notification) {
			setTimeout(() => {
				hide();
			}, 6000);
		}
	}

	onDestroy(() => {
		notification.set(null);
	});

	function getBGColor() {
		if (!$notification) {
			return '';
		}

		if ($notification.hasError) {
			return 'bg-fail';
		} else {
			return 'bg-success';
		}
	}

	function hide() {
		notification.set(null);
	}
</script>

{#if $notification}
	<div
		in:fly={{ y: -200, duration: 1000 }}
		out:fade
		on:click={hide}
		class="fixed bottom-5 right-5 z-10 cursor-pointer px-4 py-2 text-base text-white {getBGColor()} rounded-md shadow-md"
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
