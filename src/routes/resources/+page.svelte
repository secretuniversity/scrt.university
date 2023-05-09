<script lang="ts">
	import ArticleCard from '$lib/components/cards/Article.svelte';
	import VideoCard from '$lib/components/cards/Video.svelte';
	import Filter from '$lib/components/forms/Filter.svelte';
	import Search from '$lib/components/forms/Search.svelte';
	import Breadcrumb from '$lib/components/page/Breadcrumb.svelte';
	import PageHeader from '$lib/components/page/PageHeader.svelte';
	import { genExp, getNotification } from '$lib/helpers';
	import { articles, notes, videos } from '$lib/stores';
	import Fuse from 'fuse.js';
	import { onMount } from 'svelte';

	export let data: Page.Resources;

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

	let localArticles: Contributions.Article.Self[] = [];
	let localVideos: Contributions.Video.Self[] = [];

	const cache = {
		articles: [],
		videos: []
	} as {
		articles: Contributions.Article.Self[];
		videos: Contributions.Video.Self[];
	};

	onMount(async () => {
		try {
			localArticles = data.resources.articles;
			localVideos = data.resources.videos;

			cache.articles = localArticles;
			cache.videos = localVideos;
		} catch (err) {
			$notes = [...$notes, getNotification(err as string, 'error')];
		}
	});

	$: {
		if (localArticles) {
			$articles = { val: localArticles, exp: genExp() };
		}

		if (localVideos) {
			$videos = { val: localVideos, exp: genExp() };
		}
	}

	function handleSearch(e: CustomEvent) {
		if (e.detail.val === '') {
			localArticles = cache.articles;
			localVideos = cache.videos;
			return;
		}

		const articleFuse = new Fuse([...localArticles], {
			keys: ['title', 'description', 'tags'],
			threshold: 0.3
		});
		const videoFuse = new Fuse([...localVideos], {
			keys: ['title', 'description', 'tags'],
			threshold: 0.3
		});
		const articleRes = articleFuse.search(e.detail.val);
		const videoRes = videoFuse.search(e.detail.val);

		localArticles = articleRes.map((res) => res.item);
		localVideos = videoRes.map((res) => res.item);
	}
</script>

<div class="mx-24 py-8">
	<Breadcrumb routes={breadcrumbRoutes} />
</div>

<section class="mx-24">
	<PageHeader
		image="/images/illustrations/code.svg"
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
					{#if localArticles.length === 0 && localVideos.length === 0}
						<div class="mt-24 text-center text-dark-5">Unable to find any community resources.</div>
					{/if}

					<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{#each localVideos as video}
							<VideoCard {video} />
						{/each}

						{#each localArticles as article}
							<ArticleCard {article} />
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
