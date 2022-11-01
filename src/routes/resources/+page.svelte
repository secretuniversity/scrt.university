<script lang="ts">
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import Head from '$lib/components/Head.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Filter from '$lib/components/Filter.svelte';
	import Search from '$lib/components/Search.svelte';
	import TagComponent from '$lib/components/Tag.svelte';
	import { articles, article, notification, videos, video, resourceTags } from '$lib/stores';
	import { onMount } from 'svelte';
	import { genExp, slugify } from '$lib/helpers';

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

	interface LocalResource {
		src: Resource;
		type: string;
	}

	let tags: Tag[] = [];
	let resources: LocalResource[] = [];

	onMount(async () => {
		try {
			const [articlesResult, videosResult, articleTagResult, videoTagResult] = await Promise.all([
				getArticles(),
				getVideos(),
				getArticleTags(),
				getVideoTags()
			]);

			if (articlesResult) {
				$articles = { val: articlesResult, exp: genExp() };
				let locals = $articles.val.map((a) => {
					return {
						src: a,
						type: 'article'
					};
				});
				resources = [...resources, ...locals];
			}

			if (videosResult) {
				$videos = { val: videosResult, exp: genExp() };
				let locals = $videos.val.map((v) => {
					return {
						src: v,
						type: 'video'
					};
				});
				resources = [...resources, ...locals];
			}

			if (articleTagResult) {
				if ($resourceTags) {
					$resourceTags.val = [...$resourceTags.val, ...articleTagResult];
				} else {
					$resourceTags = { val: articleTagResult, exp: genExp() };
				}

				tags = [...tags, ...articleTagResult];
			}

			if (videoTagResult) {
				if ($resourceTags) {
					$resourceTags.val = [...$resourceTags.val, ...videoTagResult];
				} else {
					$resourceTags = { val: videoTagResult, exp: genExp() };
				}

				tags = [...tags, ...videoTagResult];
			}
		} catch (err) {
			$notification = {
				msg: err as string,
				hasError: true,
				loading: false
			};
		}
	});

	function handleSearch(e: CustomEvent) {
		console.log(e.detail.val);
	}

	async function getVideos(): Promise<Video[] | null> {
		return new Promise((res, rej) => {
			fetch('/api/v1/videos/0')
				.then((response) => response.json())
				.then((result) => {
					if (result.data) {
						return res(result.data as Video[]);
					} else {
						return res(null);
					}
				})
				.catch(() => {
					return rej('Failed to fetch videos');
				});
		});
	}

	async function getArticles(): Promise<Article[] | null> {
		return new Promise((res, rej) => {
			fetch('/api/v1/articles/0')
				.then((response) => response.json())
				.then((result) => {
					if (result.data) {
						return res(result.data as Article[]);
					} else {
						return res(null);
					}
				})
				.catch(() => {
					rej('Failed to fetch articles');
				});
		});
	}

	async function getArticleTags(): Promise<Tag[] | null> {
		return new Promise((res, rej) => {
			fetch('/api/v1/tags/kind/articles/offset/0')
				.then((response) => response.json())
				.then((result) => {
					if (result.data) {
						return res(result.data as Tag[]);
					} else {
						return res(null);
					}
				})
				.catch(() => {
					return rej('Failed to fetch article tags');
				});
		});
	}

	async function getVideoTags(): Promise<Tag[] | null> {
		return new Promise((res, rej) => {
			fetch('/api/v1/tags/kind/videos/offset/0')
				.then((response) => response.json())
				.then((result) => {
					if (result.data) {
						return res(result.data as Tag[]);
					} else {
						return res(null);
					}
				})
				.catch(() => {
					return rej('Failed to fetch video tags');
				});
		});
	}

	function setArticle(r: Resource) {
		$article = r as Article;
	}

	function setVideo(r: Resource) {
		$video = r as Video;
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
							<label class="text-white" for="{tag}-input">{tag.name}</label>
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
			<div class="-z-10 pt-4 pb-28">
				<div class="divide-gray-200 relative mx-auto max-w-lg divide-y-2 lg:max-w-full">
					{#if resources.length === 0}
						<div class="mt-4 text-center text-dark-5">Unable to find any resources.</div>
					{/if}

					<div class="grid auto-rows-max grid-cols-3 gap-4 text-white">
						{#each resources as r}
							{#if r.type === 'article'}
								<a
									href={'/resources/articles/' + slugify(r.src.title)}
									on:click={() => setArticle(r.src)}
								>
									<div
										class="grid h-48 w-full auto-rows-max grid-cols-2 rounded-md bg-dark-4 py-6 px-4"
									>
										<p
											class="col-start-2 w-min justify-self-end rounded-full bg-dark-orange py-1 px-3 capitalize"
										>
											{r.type}
										</p>
										<h3 class="col-start-1 row-start-1 mb-2 text-xl font-semibold">
											{r.src.title}
										</h3>
										<p class="col-span-full col-start-1 row-start-2 pt-4">
											Just as super long description of article. How are we gonna handle all of
											these words. IDk.
										</p>
										{#each r.src.tags as tag}
											<div class="mt-2 w-min self-end">
												<TagComponent tag={tag.name} />
											</div>
										{/each}
									</div>
								</a>
							{/if}

							{#if r.type === 'video'}
								<a
									href={'/resources/videos/' + slugify(r.src.title)}
									on:click={() => setVideo(r.src)}
								>
									<div
										class="grid h-48 w-full auto-rows-max grid-cols-2 rounded-md bg-dark-4 py-6 px-4"
									>
										<p
											class="col-start-2 w-min justify-self-end rounded-full bg-dark-orange py-1 px-3 capitalize"
										>
											{r.type}
										</p>
										<h3 class="col-start-1 row-start-1 mb-2 text-xl font-semibold">
											{r.src.title}
										</h3>
										<p class="col-span-full col-start-1 row-start-2 pt-4">
											Just as super long description of article. How are we gonna handle all of
											these words. IDk.
										</p>
										{#each r.src.tags as tag}
											<div class="mt-2 w-min self-end">
												<TagComponent tag={tag.name} />
											</div>
										{/each}
									</div>
								</a>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
