<script lang="ts">
	import { onMount } from 'svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import Head from '$lib/components/Head.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Filter from '$lib/components/Filter.svelte';
	import Repo from '$lib/components/cards/Repo.svelte';
	import Search from '$lib/components/Search.svelte';
	import type { Article, Resource, Video, Tag } from '$lib/models/index';

	const PAGE_TITLE = 'Community Resources';
	const BREADCRUMB_ROUTES = [
		{
			name: 'Learn',
			path: '/learn'
		},
		{
			name: 'Community Resources',
			path: '/resources'
		}
	];

	const FILTER_SECTIONS = ['Date', 'Type', 'Tags'];

	let tags: Tag[] = [];
	let resources: Resource[] = [];

	onMount(async () => {
		try {
			resources = [...resources, ...(await getArticles())];
			resources = [...resources, ...(await getVideos())];

			tags = [...tags, ...(await getArticleTags())];
			tags = [...tags, ...(await getVideoTags())];
		} catch (err) {
			// Fail toast
		}
	});

	function handleSearch(e: CustomEvent) {
		console.log(e.detail.val);
	}

	async function getVideos(): Promise<Video[]> {
		return new Promise((res, rej) => {
			fetch('/api/v1/videos/0')
				.then((response) => response.json())
				.then((data) => res(data as Video[]));
		});
	}

	async function getArticles(): Promise<Article[]> {
		return new Promise((res, rej) => {
			fetch('/api/v1/articles/0')
				.then((response) => response.json())
				.then((data) => res(data as Article[]));
		});
	}

	async function getArticleTags(): Promise<Tag[]> {
		return new Promise((res, rej) => {
			fetch('/api/v1/articles/0')
				.then((response) => response.json())
				.then((data) => res(data as Tag[]));
		});
	}

	async function getVideoTags(): Promise<Tag[]> {
		return new Promise((res, rej) => {
			fetch('/api/v1/articles/0')
				.then((response) => response.json())
				.then((data) => res(data as Tag[]));
		});
	}
</script>

<Head pageTitle={PAGE_TITLE} />

<section class="mx-24">
	<div class="mt-8">
		<Breadcrumb routes={BREADCRUMB_ROUTES} />
	</div>
	<PageHeader
		title={'Community Resources'}
		description={'Learn from the community. Find guides, courses, videos, and more— each made by developers on Secret Network.'}
	/>

	<div class="mt-12 grid grid-cols-4 gap-x-8 pb-12">
		<div class="col-span-1">
			<Filter let:index sections={FILTER_SECTIONS}>
				{#if index === 0}
					<select
						class="w-full rounded-lg border-white bg-dark-4 text-white"
						name="date-selector"
						id="date-select"
					>
						<option value="newest">Recently Added</option>
						<option value="oldest">Recently Updated</option>
					</select>
				{/if}
				{#if index === 1}
					<div class="flex items-center gap-x-2 py-2 text-white">
						<input
							class="rounded-sm border-white bg-dark-4"
							type="checkbox"
							name="type-guide"
							id="type-guide"
						/>
						<label for="type-guide">Guide</label>
					</div>

					<div class="flex items-center gap-x-2 py-2 text-white">
						<input
							class="rounded-sm border-white bg-dark-4"
							type="checkbox"
							name="type-article"
							id="type-article"
						/>
						<label for="type-article">Article</label>
					</div>

					<div class="flex items-center gap-x-2 py-2 text-white">
						<input
							class="rounded-sm border-white bg-dark-4"
							type="checkbox"
							name="type-screencast"
							id="type-screencast"
						/>
						<label for="type-screencast">Screencast</label>
					</div>
				{/if}

				{#if index === 2}
					{#each tags as tag}
						<div class="py-2">
							<input
								class="mr-2 rounded-sm border-white bg-dark-4"
								type="checkbox"
								name="{tag}-input"
								id="{tag}-input"
							/>
							<label class="text-white" for="{tag}-input">{tag}</label>
						</div>
					{/each}

					<div class="mx-auto w-fit">
						<button
							type="button"
							class="mt-4 inline-flex w-fit items-center justify-self-center rounded-md border border-transparent bg-dark-blue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>View More</button
						>
					</div>
				{/if}
			</Filter>
		</div>

		<div class="col-span-3">
			<Search on:search={handleSearch} />
			<div class="mt-4 flex gap-x-4">
				<p class="inline-block rounded-full bg-dark-blue py-1 px-4 text-white">
					&times<span class="pl-1 font-bold">tag:</span> secret-box
				</p>
				<p class="inline-block rounded-full bg-dark-blue py-1 px-4 text-white">
					&times<span class="pl-1 font-bold">tag:</span> essential
				</p>
			</div>
			<!-- Repo Cards -->
			<div class="-z-10 pt-6 pb-20 lg:pt-4 lg:pb-28">
				<div class="divide-gray-200 relative mx-auto max-w-lg divide-y-2 lg:max-w-full">
					{#if resources.length === 0}
						<div class="mt-4 text-center text-gray">Unable to find any resources.</div>
					{/if}

					{#each resources as r}
						<div>Some resource data</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
