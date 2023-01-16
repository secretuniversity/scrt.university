<script lang="ts">
	import Tag from '$lib/components/page/Tag.svelte';
	import { selectedArticle } from '$lib/stores';
	import { slugify } from '$lib/helpers';
	export let article: Contributions.Article.Self;
</script>

<a
	class=" block h-56 w-full"
	href={'/resources/articles/' + article.id + '/' + slugify(article.title)}
	on:click={() => selectedArticle.set(article)}
>
	<div class="grid h-full rounded-md bg-dark-4 p-6 text-white shadow-lg">
		<div class="mb-4 flex h-fit w-full space-x-4">
			<h3 class="grow text-2xl font-bold">
				{article.title}
			</h3>

			<p
				class="h-fit w-fit shrink self-start justify-self-end rounded-sm bg-dark-purple py-1 px-3 text-sm font-semibold"
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
