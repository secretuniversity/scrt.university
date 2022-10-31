<script lang="ts">
	import { video } from '$lib/stores';
	import { onMount } from 'svelte';

	let contributorName = '';

	onMount(() => {
		if ($video) {
			fetch(`/api/v1/contributor/id/${$video.contributor}`)
				.then((res) => res.json())
				.then((res) => {
					contributorName = res.data.name;
				});
		}
	});
</script>

<section class="min-h-screen">
	{#if $video}
		<div class="mx-auto mt-16 max-w-5xl">
			<div class="rounded-sm border-2 border-dark-5">
				<video autoplay controls width="100%" height="auto">
					<source
						src="https://storage.googleapis.com/celadon/videos/{$video.file}"
						type="video/mp4"
					/>
				</video>
			</div>
			<div class="mt-4 flex h-12 items-center">
				<h2 class="mr-4 text-2xl text-white">{$video.title}</h2>
				{#if contributorName}
					<p class="text-sm text-white">by {contributorName}</p>
				{/if}
			</div>
			<p class="mt-4 w-full rounded-md bg-dark-5 p-4 text-base text-white">{$video.description}</p>
		</div>
	{/if}
</section>
