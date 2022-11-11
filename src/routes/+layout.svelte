<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Notification from '$lib/components/Notifications.svelte';
	import '../app.css';

	const minScreenWidth = 961;

	$: width = 2000; // arbitrary large number to avoid loading mobile warning
	$: isMobile = width < minScreenWidth;
</script>

<svelte:window bind:innerWidth={width} />

<header />

{#if isMobile}
	<!-- content here -->
	<div>Sorry! Secret University currently only supports desktop devices.</div>
{:else}
	<div class="relative">
		<Notification />

		<main class="relative bg-dark-3">
			<Banner />
			<Nav />
			<slot />
		</main>

		<Footer />
	</div>
{/if}
