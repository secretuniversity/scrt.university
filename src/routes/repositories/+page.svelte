<script lang="ts">
	import { onMount } from 'svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import Filter from '$lib/components/Filter.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Image from '$lib/assets/illustrations/dev.svg';
	import RepoCard from '$lib/components/cards/Repo.svelte';
	import SecretBoxCard from '$lib/components/cards/SecretBox.svelte';
	import Head from '$lib/components/Head.svelte';
	import Search from '$lib/components/Search.svelte';
	import Fuse from 'fuse.js';
	import { notificationsStore, reposStore, boxesStore } from '$lib/stores';
	import { getNotification, genExp, getBaseAPIUrl } from '$lib/helpers';
	import type { Repo, SecretBox, Tag } from '$lib/models/index';

	const PAGE_TITLE = 'Repositories';
	const BREADCRUMB_ROUTES = [
		{
			name: 'Learn',
			path: '/learn'
		},
		{
			name: 'Repositories',
			path: '/repositories'
		}
	];
	const FILTER_SECTIONS = ['Type', 'Date', 'Tags'];

	let tags: Tag[] = [];
	let limit = 25;
	let offset = 0;
	let hasBoxes = false;
	let hasRepos = false;
	let cache = {
		boxes: [],
		repos: []
	} as {
		boxes: SecretBox[];
		repos: Repo[];
	};

	onMount(async () => {
		try {
			let reposFetched = await getRepos();
			let boxesFetched = await getSecretBoxes();

			if (reposFetched.length > 0) {
				hasRepos = true;
			}

			if (boxesFetched.length > 0) {
				hasBoxes = true;
			}

			cache.boxes = boxesFetched;
			cache.repos = reposFetched;

			$reposStore = { val: reposFetched, exp: genExp() };
			$boxesStore = { val: boxesFetched, exp: genExp() };
		} catch (err) {
			$notificationsStore = [...$notificationsStore, getNotification(err as string, 'error')];
		}
	});

	function handleSearch(e: CustomEvent) {
		if (!$boxesStore || !$reposStore) return;

		if (e.detail.val === '') {
			$boxesStore.val = cache.boxes;
			$reposStore.val = cache.repos;
			setHasBoxes();
			setHasRepos();
			return;
		}

		const boxesFuse = new Fuse([...$boxesStore.val], {
			keys: ['title', 'description', 'tags'],
			threshold: 0.3
		});
		const reposFuse = new Fuse([...$reposStore.val], {
			keys: ['title', 'description', 'tags'],
			threshold: 0.3
		});
		const boxesRes = boxesFuse.search(e.detail.val);
		const repoRes = reposFuse.search(e.detail.val);

		$boxesStore.val = boxesRes.map((res) => res.item);
		$reposStore.val = repoRes.map((res) => res.item);

		setHasBoxes();
		setHasRepos();
	}

	function setHasBoxes() {
		if ($boxesStore && $boxesStore.val.length > 0) {
			hasBoxes = true;
		} else {
			hasBoxes = false;
		}
	}

	function setHasRepos() {
		if ($reposStore && $reposStore.val.length > 0) {
			hasRepos = true;
		} else {
			hasRepos = false;
		}
	}

	async function getRepos(): Promise<Repo[]> {
		try {
			const url = getBaseAPIUrl() + `/v1/repos?limit=${limit}&offset=${offset}`;
			const res = await fetch(url);

			if (res.ok) {
				let data = await res.json();
				return data as Repo[];
			} else {
				return Promise.reject("Couldn't fetch repos");
			}
		} catch (err) {
			return Promise.reject(err);
		}
	}

	async function getSecretBoxes(): Promise<SecretBox[]> {
		try {
			const url = getBaseAPIUrl() + `/v1/secret-boxes?limit=${limit}&offset=${offset}`;
			const res = await fetch(url);

			if (res.ok) {
				let data = await res.json();
				return data as SecretBox[];
			} else {
				return Promise.reject("Couldn't fetch secret boxes");
			}
		} catch (err) {
			return Promise.reject(err);
		}
	}

	// async function getRepoTags(): Promise<Array<Tag>> {
	// 	return new Promise((res, rej) => {
	// 		fetch('/api/v1/tags/kind/repo/offset/0')
	// 			.then((response) => response.json())
	// 			.then((data) => res(data as Array<Tag>));
	// 	});
	// }

	// async function getBoxesTags(): Promise<Array<Tag>> {
	// 	return new Promise((res, rej) => {
	// 		fetch('/api/v1/tags/kind/secret_box/offset/0')
	// 			.then((response) => response.json())
	// 			.then((data) => res(data as Array<Tag>));
	// 	});
	// }
</script>

<Head pageTitle={PAGE_TITLE} />

<div class="mx-24 py-8">
	<Breadcrumb routes={BREADCRUMB_ROUTES} />
</div>

<section class="lg:mx-24">
	<PageHeader
		image={Image}
		title={PAGE_TITLE}
		description={'Learn from the source. Find inspiration for you next project by looking at these repositories.'}
	/>

	<div class="mt-12 grid grid-cols-4 gap-x-8 pb-12">
		<div class="col-span-1">
			<Filter sections={FILTER_SECTIONS} let:index>
				{#if index === 0}
					<div class="flex gap-x-2 py-2">
						<input
							class="self-center rounded-sm border-gray bg-dark-4"
							id="type-box"
							type="checkbox"
						/>
						<label class="self-center text-white" for="type-box">Secret Box</label>
					</div>

					<div class="flex gap-x-2 py-2">
						<input
							class="self-center rounded-sm border-gray bg-dark-4"
							id="type-repo"
							type="checkbox"
						/>
						<label class="self-center text-white" for="type-repo">Repositores</label>
					</div>
				{/if}

				{#if index === 1}
					<select
						class="w-full rounded-lg border-white bg-dark-4 text-white"
						name="date-selector"
						id="date-select"
					>
						<option value="newest">Recently Added</option>
						<option value="oldest">Recently Updated</option>
					</select>
				{/if}

				{#if index === 2}
					{#each tags as tag}
						<div class="py-2">
							<input
								class="mr-2 rounded-sm border-white bg-dark-4"
								type="checkbox"
								name="{tag.id}-input"
								id="{tag.id}-input"
							/>
							<label class="text-white" for="{tag.id}-input">{tag.name}</label>
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
			{#if !hasBoxes && !hasRepos}
				<div class="mt-24 text-center text-dark-5">Unable to find any repositories.</div>
			{/if}

			<div class="-z-10 pt-6 pb-20 lg:pt-4 lg:pb-28">
				<div class="divide-gray-200 relative mx-auto max-w-lg divide-y-2 lg:max-w-full">
					<div class="grid gap-16 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
						{#if $boxesStore}
							{#each $boxesStore.val as b}
								<SecretBoxCard secretBox={b} />
							{/each}
						{/if}

						{#if $reposStore}
							{#each $reposStore.val as r}
								<RepoCard repo={r} />
							{/each}
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
