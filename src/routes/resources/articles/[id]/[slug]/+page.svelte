<script lang="ts">
	import ContributionUpdateButton from '$lib/components/page/ContributionUpdateButton.svelte';
	import Tag from '$lib/components/page/Tag.svelte';
	import { getNotification } from '$lib/helpers';
	import { articleCursor, notes } from '$lib/stores';
	import hljs from 'highlight.js';
	import { onMount, tick } from 'svelte';

	import { getBaseAPIUrl } from '$lib/helpers';
	import '$lib/styles/markdown.scss';
	import 'highlight.js/styles/tokyo-night-dark.css';

	export let data: Page.Article;

	let author = '';

	onMount(async () => {
		$articleCursor = data.article;

		data.article.kind = 'article';
		fetchContributor();

		await tick();
		hljs.highlightAll();
	});

	async function fetchContributor() {
		try {
			const url = getBaseAPIUrl() + `/v1/users/name/${data.article.contributor}`;
			const res = await fetch(url);
			const json = await res.json();

			author = json;
		} catch (_err) {
			$notes = [...$notes, getNotification('Unable to find contributor name', 'error')];
		}
	}
</script>

<section class="min-h-screen py-16 text-white">
	<div class="mx-32 mb-6 flex justify-end">
		<ContributionUpdateButton contribution={data.article} />
	</div>
	{#if data.article}
		<div class="flex h-full w-full flex-col items-center justify-center">
			<p class="my-6 text-center text-5xl font-bold">{data.article.title}</p>
			<p class="mb-4 text-center text-base">Written by {author}</p>

			<div class="mx-auto flex max-w-2xl flex-wrap space-x-2">
				{#if data.article.tags}
					{#each data.article.tags as tag}
						<div class="mb-2">
							<Tag {tag} />
						</div>
					{/each}
				{/if}
			</div>

			<div class="markdown mt-8 w-full max-w-4xl">
				{@html data.article.content}
			</div>
		</div>
	{:else}
		<div class="flex h-full w-full flex-col items-center justify-center">
			<h1 class="text-center text-4xl font-bold">Article not found</h1>
			<p class="mt-4 text-center">The article you are looking for does not exist.</p>
		</div>
	{/if}
</section>
