<script lang="ts">
	import Footer from '$lib/footer.svelte';
	import Nav from '$lib/nav.svelte';
	import '../app.css';
</script>

<header />

<main>
	<Nav />
	<slot />
</main>

<Footer />
