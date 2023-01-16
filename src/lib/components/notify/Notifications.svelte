<script lang="ts">
	import NotificationEle from './Notification.svelte';
	import { notes } from '$lib/stores';
	import { onDestroy } from 'svelte';

	onDestroy(() => {
		$notes = [];
	});
</script>

<div class="fixed bottom-5 right-5 z-10 flex-col space-y-4">
	{#each $notes as n, i}
		<NotificationEle {n} {i} />
	{/each}
</div>
