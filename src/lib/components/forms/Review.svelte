<script>
	import { fade } from 'svelte/transition';
	import ThumbUpEmptyIcon from '$lib/assets/thumbs_up_empty.svg';
	import ThumbUpFilledIcon from '$lib/assets/thumbs_up_filled.svg';

	// NOTE: Need seperate variables for fade transition.
	let hasReviewed = false;
	let hasNotReviewed = true;
	let isThumbEmpty = true;

	function review() {
		isThumbEmpty = !isThumbEmpty;

		if (hasReviewed) {
			hasReviewed = !hasReviewed;
		} else {
			if (hasNotReviewed) {
				hasNotReviewed = !hasNotReviewed;
			} else {
				return null;
			}
		}
	}
</script>

<div class="flex gap-x-4 rounded-xl bg-dark-4 shadow-md">
	<p class="h-max grow self-center pl-3 text-center text-sm text-white">
		{#if hasReviewed}
			<span transition:fade on:outroend={() => (hasNotReviewed = true)} class="italic text-gray"
				>Thank you for your feedback!</span
			>
		{:else if hasNotReviewed}
			<span transition:fade on:outroend={() => (hasReviewed = true)}
				>Would you recommend this material?</span
			>
		{/if}
	</p>
	<div
		on:click={() => review()}
		class="cursor-pointer self-center rounded-r-xl border-l border-gray bg-dark-2 px-4 py-3"
	>
		{#if !isThumbEmpty}
			<img
				width="30"
				height="30"
				src={ThumbUpFilledIcon}
				alt="Recommend this material to another developer."
			/>
		{:else}
			<img
				width="30"
				height="30"
				src={ThumbUpEmptyIcon}
				alt="Recommend this material to another developer."
			/>
		{/if}
	</div>
</div>
