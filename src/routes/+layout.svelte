<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import '../app.css';
</script>

<header />

<main class="bg-dark-3">
	<div class="overflow-hidden">
		<Nav />
	</div>
	<slot />
</main>

<Footer />
