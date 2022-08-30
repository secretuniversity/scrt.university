<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import '../app.css';
</script>

<header />

<main class="bg-dark-3">
	<Banner />
	<Nav />
	<slot />
</main>

<Footer />
