<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';

	const minScreenWidth = 961;

	$: width = 2000; // arbitrary large number to avoid loading mobile warning
	$: isMobile = width < minScreenWidth;
</script>

<svelte:window bind:innerWidth={width} />

<header />

{#if isMobile}
	<div>Sorry! Secret University currently only supports desktop devices.</div>
{:else}
	<main>
		<Banner />
		<slot />
	</main>

	<Footer />
{/if}
