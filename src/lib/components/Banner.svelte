<script lang="ts">
	let show = true;
</script>

{#if show}
	<div id="banner" class="h-10 w-full bg-dark-blue text-sm font-bold text-white">
		<span class="grid h-full grid-cols-3">
			<span class="col-start-2 self-center justify-self-center"
				>Support the core Secret University team by <a
					href="/support/#staking"
					class="text-light-orange underline">staking with us</a
				> 😎</span
			>
			<span
				class="col-start-3 cursor-pointer self-center justify-self-end pr-4 text-xl"
				on:click={() => (show = false)}>&times;</span
			>
		</span>
	</div>
{/if}
