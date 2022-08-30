<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	const PAGE_TITLE = 'Submit';

	// Possible Selections
	const PATHWAYS = 'pathways';
	const BOXES = 'boxes';
	const ARTICLES = 'articles';
	const VIDEOS = 'videos';

	let selected = 'pathways';
</script>

<Head pageTitle={PAGE_TITLE} />

<section class="min-h-screen">
	<div class="my-4 mx-auto flex w-min whitespace-nowrap rounded-md bg-dark-4 text-white">
		<div
			on:click={() => (selected = PATHWAYS)}
			class="border-r-2 border-gray p-4 {selected === PATHWAYS ? 'rounded-l-md bg-dark-2' : ''}"
		>
			Pathways (Courses)
		</div>
		<div
			on:click={() => (selected = BOXES)}
			class="border-r-2 border-gray p-4 {selected === BOXES ? 'bg-dark-2' : ''}"
		>
			Secret Boxes (Repos)
		</div>
		<div
			on:click={() => (selected = ARTICLES)}
			class="border-r-2 border-gray p-4 {selected === ARTICLES ? 'bg-dark-2' : ''}"
		>
			Articles & Guides
		</div>
		<div
			on:click={() => (selected = VIDEOS)}
			class="p-4 {selected === VIDEOS ? 'rounded-r-md bg-dark-2' : ''}"
		>
			Videos & Screencasts
		</div>
	</div>

	{#if selected === PATHWAYS}
		<div class="mx-auto mt-8 w-fit rounded-lg bg-white p-6">
			Secret Pathway submissions coming soon
		</div>
	{/if}

	{#if selected === BOXES}
		<div class="mx-auto mt-8 w-fit rounded-lg bg-white p-6">
			Secret Boxes submissions coming soon
		</div>
	{/if}

	{#if selected === ARTICLES}
		<div>Coming Soon</div>
	{/if}

	{#if selected === VIDEOS}
		<div>Coming Soon</div>
	{/if}
</section>
