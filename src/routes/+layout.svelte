<script lang="ts">
	import { page } from '$app/stores';

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

<svelte:head>
	<title>{$page.data.title} | Secret University</title>
	<meta name="description" content={$page.data.description} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<svelte:window bind:innerWidth={width} />

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
