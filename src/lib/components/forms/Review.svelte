<script>
	import { fade } from 'svelte/transition';

	// NOTE: Need separate variables for fade transition.
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
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				review();
			}
		}}
		on:click={() => review()}
		class="cursor-pointer self-center rounded-r-xl border-l border-gray bg-dark-2 px-4 py-3"
	>
		{#if !isThumbEmpty}
			<img
				width="30"
				height="30"
				src="/images/icons/thumbs_up_filled.svg"
				alt="Recommend this material to another developer."
			/>
		{:else}
			<img
				width="30"
				height="30"
				src="images/icons/thumbs_up_empty.svg"
				alt="Recommend this material to another developer."
			/>
		{/if}
	</div>
</div>
