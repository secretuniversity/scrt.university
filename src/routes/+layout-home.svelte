<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';
</script>

<header />

<main>
	<Banner />
	<slot />
</main>

<Footer />
