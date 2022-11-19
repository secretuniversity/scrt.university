<script lang="ts">
	import Tag from '$lib/components/Tag.svelte';
	import { selectedArticle } from '$lib/stores';
	import { slugify } from '$lib/helpers';
	import type { Article } from '$lib/models/index';
	export let article: Article;

	console.log(article);
</script>

<a
	class=" h-58 flex"
	href={'/resources/articles/' + slugify(article.title)}
	on:click={() => selectedArticle.set(article)}
>
	<div class="grid flex-col rounded-md bg-dark-4 p-6 text-white shadow-lg">
		<div class="mb-4 grid h-fit w-full grid-cols-2">
			<h3 class="text-2xl font-bold">
				{article.title}
			</h3>

			<p
				class="h-fit w-fit self-start justify-self-end rounded-sm bg-dark-purple py-1 px-3 text-sm font-semibold"
			>
				Article
			</p>
		</div>

		<p class="description">
			{article.description}
		</p>

		<div class="mt-8 flex space-x-2 self-end">
			{#each article.tags as tag, i}
				{#if i < 3}
					<Tag {tag} />
				{/if}
			{/each}
			{#if article.tags.length > 3}
				<p class="ml-2 self-end text-gray">+ more</p>
			{/if}
		</div>
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
