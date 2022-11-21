<script lang="ts">
	import Tag from '$lib/components/Tag.svelte';
	import hljs from 'highlight.js';
	import { onMount } from 'svelte';
	import { getNotification } from '$lib/helpers';
	import { notificationsStore, selectedArticle } from '$lib/stores';
	import { goto } from '$app/navigation';

	import 'highlight.js/styles/tokyo-night-dark.css';
	import '$lib/styles/markdown.scss';
	import { getBaseAPIUrl } from '$lib/helpers';

	let author = '';

	onMount(() => {
		if (!$selectedArticle) {
			goto('/resources');
			return;
		}

		fetchContributor();

		hljs.highlightAll();
	});

	async function fetchContributor() {
		if (!$selectedArticle) return;

		try {
			const url = getBaseAPIUrl() + `/v1/users/name/${$selectedArticle.contributor}`;
			const res = await fetch(url);
			const json = await res.json();

			author = json;
		} catch (_err) {
			$notificationsStore = [
				...$notificationsStore,
				getNotification('Unable to find contributor name', 'error')
			];
		}
	}
</script>

<section class="min-h-screen py-16 text-white">
	{#if $selectedArticle}
		<div class="flex h-full w-full flex-col items-center justify-center">
			<p class="my-6 text-center text-5xl font-bold">{$selectedArticle.title}</p>
			<p class="mb-4 text-center text-base">Written by {author}</p>

			<div class="mx-auto flex max-w-2xl flex-wrap space-x-2">
				{#each $selectedArticle.tags as tag}
					<div class="mb-2">
						<Tag {tag} />
					</div>
				{/each}
			</div>

			<div class="markdown mt-8 w-full max-w-4xl">
				{@html $selectedArticle.content}
			</div>
		</div>
	{:else}
		<div class="flex h-full w-full flex-col items-center justify-center">
			<h1 class="text-center text-4xl font-bold">Article not found</h1>
			<p class="mt-4 text-center">The article you are looking for does not exist.</p>
		</div>
	{/if}
</section>
