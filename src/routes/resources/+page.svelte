<script lang="ts">
	import Breadcrumb from '$lib/components/page/Breadcrumb.svelte';
	import Head from '$lib/components/Head.svelte';
	import PageHeader from '$lib/components/page/PageHeader.svelte';
	import Filter from '$lib/components/forms/Filter.svelte';
	import Search from '$lib/components/forms/Search.svelte';
	import Image from '$lib/assets/illustrations/code.svg';
	import ArticleCard from '$lib/components/cards/Article.svelte';
	import VideoCard from '$lib/components/cards/Video.svelte';
	import Fuse from 'fuse.js';
	import { articlesStore, notificationsStore, videosStore } from '$lib/stores';
	import { genExp, getBaseAPIUrl, getNotification } from '$lib/helpers';
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

	let articles: Article[] = [];
	let videos: Video[] = [];
	const cache = {
		articles: [],
		videos: []
	} as {
		articles: Article[];
		videos: Video[];
	};

	let limit = 25;
	let offset = 0;

	onMount(async () => {
		try {
			articles = await getArticles();
			videos = await getVideos();

			cache.articles = articles;
			cache.videos = videos;
		} catch (err) {
			$notificationsStore = [...$notificationsStore, getNotification(err as string, 'error')];
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
		if (e.detail.val === '') {
			articles = cache.articles;
			videos = cache.videos;
			return;
		}

		const articleFuse = new Fuse([...articles], {
			keys: ['title', 'description', 'tags'],
			threshold: 0.3
		});
		const videoFuse = new Fuse([...videos], {
			keys: ['title', 'description', 'tags'],
			threshold: 0.3
		});
		const articleRes = articleFuse.search(e.detail.val);
		const videoRes = videoFuse.search(e.detail.val);

		articles = articleRes.map((res) => res.item);
		videos = videoRes.map((res) => res.item);
	}

	async function getVideos(): Promise<Video[]> {
		try {
			const url = getBaseAPIUrl() + `/v1/videos?limit=${limit}&offset=${offset}`;
			const res = await fetch(url);

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
			const url = getBaseAPIUrl() + `/v1/articles?limit=${limit}&offset=${offset}`;
			const res = await fetch(url);

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
		image={Image}
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
			<div class="-z-10 pt-6 pb-28">
				<div class="relative mx-auto max-w-full">
					{#if articles.length === 0 && videos.length === 0}
						<div class="mt-24 text-center text-dark-5">Unable to find any community resources.</div>
					{/if}

					<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
