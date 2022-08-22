<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import '../app.css';
</script>

<header />

<main class="bg-dark-3">
	<Nav />
	<slot />
</main>

<Footer />
