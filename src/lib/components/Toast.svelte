<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	export let kind = 'default';
	export let msg = 'Some toast message';

	let visible = true;

	onMount(() => {
		setTimeout(() => {
			hide();
		}, 4000);
	});

	function getTagStyles() {
		switch (kind) {
			case 'success':
				return 'bg-success';
			case 'fail':
				return 'bg-fail';
			default:
				return 'bg-dark-1';
		}
	}

	function hide() {
		visible = false;
	}

	function close(e: MouseEvent) {
		hide();
	}
</script>

{#if visible}
	<!-- content here -->
	<div
		id="toast"
		in:fly={{ y: -200, duration: 1000 }}
		out:fade
		on:click={close}
		class="absolute top-[10%] left-0 right-0 z-10 mx-auto h-max w-max cursor-pointer rounded-md p-4 text-white {getTagStyles()}"
	>
		<span>{msg}</span>
	</div>
{/if}
