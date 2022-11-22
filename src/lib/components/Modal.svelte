<script lang="ts">
	import { clickOutside } from '$lib/directives/clickOutside';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let active = false;

	function hide() {
		active = false;
		dispatch('hide');
	}
</script>

{#if active}
	<div class="absolute top-0 left-0 z-10 h-full w-full bg-black/[0.6]" />
	<div class="relative z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<div class="fixed inset-0 bg-opacity-75 transition-opacity" />

		<div class="fixed inset-0 z-10 overflow-y-auto">
			<div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
				<div
					use:clickOutside
					on:click_outside={hide}
					class="6 relative transform overflow-hidden rounded-lg bg-dark-4 px-4 pt-5 pb-4 text-left shadow-xl transition-all"
				>
					<slot />
				</div>
			</div>
		</div>
	</div>
{/if}
