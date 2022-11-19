<script lang="ts">
	import NotificationEle from '$lib/components/Notification.svelte';
	import { notificationsStore } from '$lib/stores';
	import { onDestroy } from 'svelte';

	onDestroy(() => {
		$notificationsStore = [];
	});
</script>

<div class="fixed bottom-5 right-5 z-10 flex-col space-y-4">
	{#each $notificationsStore as n, i}
		<NotificationEle {n} {i} />
	{/each}
</div>
