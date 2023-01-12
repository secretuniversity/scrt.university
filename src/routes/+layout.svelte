<script lang="ts">
	import Banner from '$lib/components/page/Banner.svelte';
	import Footer from '$lib/components/page/Footer.svelte';
	import Nav from '$lib/components/page/Nav.svelte';
	import Notification from '$lib/components/notify/Notifications.svelte';
	import MobileImage from '$lib/assets/illustrations/mobile.svg';
	import '../app.css';

	const minScreenWidth = 961;

	$: width = 2000; // arbitrary large number to avoid loading mobile warning
	$: isMobile = width < minScreenWidth;
</script>

<svelte:window bind:innerWidth={width} />

<header />

{#if isMobile}
	<section class="h-screen bg-dark-4 text-white">
		<div class="flex h-full">
			<p class="mx-auto max-w-md self-center text-center">
				<img class="mx-auto mb-10 h-72 w-72" src={MobileImage} alt="Mobile is not supported" />
				Sorry! Secret University currently only supports desktop devices at this time.
			</p>
		</div>
	</section>
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
