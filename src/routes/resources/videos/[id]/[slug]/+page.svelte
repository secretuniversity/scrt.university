<script lang="ts">
	import Tag from '$lib/components/page/Tag.svelte';
	import { getBaseAPIUrl, getNotification } from '$lib/helpers';
	import { notes, selectedVideo } from '$lib/stores';
	import { onMount } from 'svelte';

	export let data: Page.Video;

	let author = '';
	let src = '';

	onMount(async () => {
		try {
			$selectedVideo = data.video;
			const url = getBaseAPIUrl() + `/v1/users/name/${data.video.contributor}`;
			const res = await fetch(url);
			const json = await res.json();

			author = json;

			const videoUrl = `https://storage.googleapis.com/celadon/${process.env.APP_ENV}/videos/${data.video.id}/${data.video.title}.mp4`;
			const clean = videoUrl.replace(/ /g, '%20');
			src = clean;
		} catch (err) {
			$notes = [
				...$notes,
				getNotification("Could not find the name of this video's contributor", 'error')
			];
		}
	});
</script>

<section class="min-h-screen">
	{#if $selectedVideo}
		<div class="mx-auto mt-8 grid max-w-5xl grid-cols-1">
			<div class="mb-8 flex w-fit justify-self-end">
				{#each $selectedVideo.tags as tag}
					<Tag {tag} />
				{/each}
			</div>

			<div class="rounded-sm border-2 border-dark-5">
				{#if src}
					<video autoplay controls width="100%" height="auto">
						<source {src} type="video/mp4" />
					</video>
				{/if}
			</div>

			<div class="mt-4 grid h-12 grid-cols-2 items-center">
				<h2 class="mr-4 text-2xl text-white">{$selectedVideo.title}</h2>
				{#if author}
					<p class="justify-self-end text-sm text-white">by {author}</p>
				{/if}
			</div>
			<p class="mt-2 w-full rounded-md bg-dark-5 p-4 text-base text-white">
				{$selectedVideo.description}
			</p>
		</div>
	{/if}
</section>
