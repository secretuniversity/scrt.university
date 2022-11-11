<script lang="ts">
	import Spinner from '$lib/assets/spinner.svg';
	import { notificationsStore } from '$lib/stores';
	import { fly, fade } from 'svelte/transition';
	import type { Notification } from '$lib/stores';

	$: {
		if ($notificationsStore.length > 0) {
			setTimeout(() => {
				$notificationsStore = $notificationsStore.filter((_, i) => i !== 0);
			}, 5000);
		}
	}

	function getBGColor(n: Notification) {
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

	function hide(index: number) {
		$notificationsStore = $notificationsStore.filter((n, i) => i !== index);
	}
</script>

<div class="fixed bottom-5 right-5 z-10 flex-col space-y-4">
	{#each $notificationsStore as n, i}
		<!-- content here -->
		<div
			in:fly={{ y: -200, duration: 1000 }}
			out:fade
			on:click={() => hide(i)}
			class="cursor-pointer px-4 py-2 text-base text-white {getBGColor(n)} rounded-md shadow-md"
		>
			<div class="flex">
				{#if n.loading}
					<img src={Spinner} alt="Loading your request" />
				{/if}
				<div>
					{n.message}
				</div>
			</div>
		</div>
	{/each}
</div>
