<script lang="ts">
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import Head from '$lib/components/Head.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Filter from '$lib/components/Filter.svelte';
	import Search from '$lib/components/Search.svelte';
	import TagComponent from '$lib/components/Tag.svelte';

	import ArticleCard from '$lib/components/cards/Article.svelte';
	import VideoCard from '$lib/components/cards/Video.svelte';
	import {
		articlesStore,
		selectedArticle,
		notificationsStore,
		videosStore,
		selectedVideo,
		resourceTagsStore
	} from '$lib/stores';
	import { genExp, slugify } from '$lib/helpers';
	import type { Article, Video, Tag } from '$lib/models/index';
	import { onMount } from 'svelte';

	const pageTitle = 'Community Resources';
	const breadcrumbRoutes = [
		{
			name: 'Learn',
			path: '/learn'
		},
		{
			name: 'Community Resources',
			path: '/resources'
		}
	];
	const filterSections = ['Date', 'Type', 'Tags'];

	// let tags: Tag[];
	let articles: Article[] = [];
	let videos: Video[] = [];

	onMount(async () => {
		try {
			articles = await getArticles();
			videos = await getVideos();

			$notificationsStore = [
				...$notificationsStore,
				{
					message: 'Successfully loaded resources',
					status: 'success',
					loading: false
				}
			];
		} catch (err) {
			$notificationsStore = [
				...$notificationsStore,
				{
					message: err as string,
					status: 'error',
					loading: false
				}
			];
		}
	});

	$: {
		if (articles) {
			$articlesStore = { val: articles, exp: genExp() };
		}

		if (videos) {
			$videosStore = { val: videos, exp: genExp() };
		}
	}

	function handleSearch(e: CustomEvent) {
		console.log(e.detail.val);
	}

	async function getVideos(): Promise<Video[]> {
		try {
			const res = await fetch('/api/v1/videos?limit=25&offset=0');

			if (res.ok) {
				const json = await res.json();
				let typed: Video[] = json;
				return Promise.resolve(typed);
			} else {
				return Promise.reject('Failed to fetch videos');
			}
		} catch (err) {
			return Promise.reject(err);
		}
	}

	async function getArticles(): Promise<Article[]> {
		try {
			const res = await fetch('/api/v1/articles?limit=25&offset=0');

			if (res.ok) {
				const json = await res.json();
				let typed: Article[] = json;
				return Promise.resolve(typed);
			} else {
				return Promise.reject('Failed to fetch videos');
			}
		} catch (err) {
			return Promise.reject(err);
		}
	}

	async function getArticleTags(): Promise<Tag[]> {
		return Promise.reject();
	}

	async function getVideoTags(): Promise<Tag[] | null> {
		return Promise.reject();
	}
</script>

<Head {pageTitle} />

<div class="mx-24 py-8">
	<Breadcrumb routes={breadcrumbRoutes} />
</div>

<section class="mx-24">
	<PageHeader
		title={'Community Resources'}
		description={'Learn from the community. Find guides, courses, videos, and more— each made by developers on Secret Network.'}
	/>

	<div class="mt-12 grid grid-cols-4 gap-x-8 pb-36">
		<div class="col-span-1">
			<Filter let:index sections={filterSections}>
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
					<!-- {#each tags as tag}
						<div class="py-2">
							<input
								class="mr-2 rounded-sm border-white bg-dark-4"
								type="checkbox"
								name="{tag}-input"
								id="{tag}-input"
							/>
							<label class="text-white" for="{tag}-input">{tag.name}</label>
						</div>
					{/each} -->

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
			<div class="my-6 flex gap-x-4">
				<p class="inline-block rounded-full bg-dark-blue py-1 px-4 text-white">
					&times<span class="pl-1 font-bold">tag:</span> secret-box
				</p>
				<p class="inline-block rounded-full bg-dark-blue py-1 px-4 text-white">
					&times<span class="pl-1 font-bold">tag:</span> essential
				</p>
			</div>
			<div class="-z-10 pt-4 pb-28">
				<div class="relative mx-auto max-w-full">
					{#if articles.length === 0 && videos.length === 0}
						<div class="mt-4 text-center text-dark-5">Unable to find any community resources.</div>
					{/if}

					<div class="grid grid-cols-3 gap-4">
						{#each videos as video}
							<VideoCard {video} />
						{/each}

						{#each articles as article}
							<ArticleCard {article} />
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
