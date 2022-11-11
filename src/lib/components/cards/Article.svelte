<script lang="ts">
	import { selectedArticle } from '$lib/stores';
	import { slugify } from '$lib/helpers';
	import type { Article } from '$lib/models/index';
	export let article: Article;
</script>

<a
	class=" flex h-56 w-full"
	href={'/resources/articles/' + slugify(article.title)}
	on:click={() => selectedArticle.set(article)}
>
	<div class="flex-col rounded-md bg-dark-4 p-6 text-white">
		<div class="mb-4 grid h-fit w-full grid-cols-2">
			<h3 class="text-2xl font-bold">
				{article.title}
			</h3>

			<p
				class="h-fit w-fit self-start justify-self-end rounded-full bg-dark-purple py-1 px-3 text-sm font-semibold"
			>
				Article
			</p>
		</div>

		<p class="description">
			Just as super long description of article. How are we gonna handle all of these words. IDk.
			Just as super long description of article. How are we gonna handle all of these words. IDk.
			Just as super long description of article. How are we gonna handle all of these words. IDk.
			Just as super long description of article. How are we gonna handle all of these words. IDk.
			Just as super long description of article. How are we gonna handle all of these words. IDk.
			Just as super long description of article. How are we gonna handle all of these words. IDk.
		</p>

		<!-- {#each article.tags as tag}
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
