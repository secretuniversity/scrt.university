<script>
	import lottie from 'lottie-web';
	import { onMount } from 'svelte';

	export let id = 'lottie-id';
	export let path = '';
	export let loop = true;

	onMount(() => {
		const el = document.getElementById(id);

		if (el) {
			let _animation = lottie.loadAnimation({
				container: el, // Required
				path, // Required
				renderer: 'svg', // Required
				loop, // Optional
				autoplay: true // Optional
			});
		}
	});
</script>

<div {id} />
