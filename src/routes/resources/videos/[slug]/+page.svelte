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
		<div class="max-w-5xl mx-auto mt-16">
			<div class="border-2 border-dark-5 rounded-sm">
				<video autoplay controls width="100%" height="auto">
					<source
						src="https://storage.googleapis.com/celadon/videos/{$video.file}"
						type="video/mp4"
					/>
				</video>
			</div>
			<div class="flex items-center mt-4 h-12">
				<h2 class="text-2xl text-white mr-4">{$video.title}</h2>
				{#if contributorName}
					<p class="text-white text-sm">by {contributorName}</p>
				{/if}
			</div>
			<p class="text-white text-base mt-4 w-full bg-dark-5 rounded-md p-4">{$video.description}</p>
		</div>
	{/if}
</section>
