<script lang="ts">
	import { selectedVideo } from '$lib/stores';
	import { slugify } from '$lib/helpers';
	import type { Video } from '$lib/models/index';
	export let video: Video;
</script>

<a
	class="flex w-full"
	href={'/resources/videos/' + slugify(video.title)}
	on:click={() => selectedVideo.set(video)}
>
	<div class="flex-col rounded-md bg-dark-4 p-6 text-white">
		<div class="mb-4 grid w-full grid-cols-2">
			<h3 class="text-2xl font-bold">
				{video.title}
			</h3>

			<p
				class="h-fit w-fit self-start justify-self-end rounded-full bg-dark-orange py-1 px-3 text-sm font-semibold"
			>
				Video
			</p>
		</div>
		<p class="description">
			Just as super long description of article. How are we gonna handle all of these words. IDk.
		</p>
		<!-- {#each video.tags as tag}
									<div class="mt-2 w-min self-end">
										<TagComponent tag={tag.name} />
									</div>
								{/each} -->
	</div>
</a>

<style>
	.description {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
