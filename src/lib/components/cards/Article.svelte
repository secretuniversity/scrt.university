<script lang="ts">
	import Tag from '$lib/components/page/Tag.svelte';
	import { slugify } from '$lib/helpers';
	import { articleCursor } from '$lib/stores';
	export let article: Contributions.Article.Self;

	$: href = article.external_url
		? article.external_url.String
		: '/resources/articles/' + article.id + '/' + slugify(article.title);

	$: target = article.external_url ? '_blank' : '_self';
</script>

<a class=" block h-[364px] w-full" {href} {target} on:click={() => articleCursor.set(article)}>
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
			{#if article.tags}
				{#each article.tags as tag, i}
					{#if i < 3}
						<Tag {tag} />
					{/if}
				{/each}
				{#if article.tags.length > 3}
					<p class="ml-2 self-end text-gray">+ more</p>
				{/if}
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
