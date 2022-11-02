<script>
	import { onMount } from 'svelte';
	import lottie from 'lottie-web';

	export let id = 'lottie-id';
	export let path = '';
	export let loop = true;

	onMount(() => {
		var _animation = lottie.loadAnimation({
			container: document.getElementById(id), // Required
			path, // Required
			renderer: 'svg', // Required
			loop, // Optional
			autoplay: true // Optional
		});
	});
</script>

<div {id} />
