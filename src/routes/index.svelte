<script context="module" lang="ts">
	import HeadPartial  from "$lib/head.svelte";
	export const prerender = true;

	const pageTitle = "Home";
</script>

<HeadPartial pageTitle={pageTitle} />

<section>
	<h1>Secret University</h1>
</section>