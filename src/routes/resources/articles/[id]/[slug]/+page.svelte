<script lang="ts">
	import Tag from '$lib/components/page/Tag.svelte';
	import hljs from 'highlight.js';
	import { onMount, tick } from 'svelte';
	import { getNotification } from '$lib/helpers';
	import { notes } from '$lib/stores';

	import 'highlight.js/styles/tokyo-night-dark.css';
	import '$lib/styles/markdown.scss';
	import { getBaseAPIUrl } from '$lib/helpers';

	export let data: Page.Article;

	let author = '';

	onMount(async () => {
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
	{#if data.article}
		<div class="flex h-full w-full flex-col items-center justify-center">
			<p class="my-6 text-center text-5xl font-bold">{data.article.title}</p>
			<p class="mb-4 text-center text-base">Written by {author}</p>

			<div class="mx-auto flex max-w-2xl flex-wrap space-x-2">
				{#each data.article.tags as tag}
					<div class="mb-2">
						<Tag {tag} />
					</div>
				{/each}
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
