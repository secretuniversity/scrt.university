<script lang="ts">
	import { onMount } from 'svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import Filter from '$lib/components/Filter.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import RepoCard from '$lib/components/cards/Repo.svelte';
	import SecretBoxCard from '$lib/components/cards/SecretBox.svelte';
	import Head from '$lib/components/Head.svelte';
	import Search from '$lib/components/Search.svelte';
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

	onMount(async () => {
		try {
			let reposFetched = await getRepos();
			let boxesFetched = await getSecretBoxes();

			console.log(reposFetched);
			console.log(boxesFetched);

			$reposStore = { val: reposFetched, exp: genExp() };
			$boxesStore = { val: boxesFetched, exp: genExp() };

			$notificationsStore = [
				...$notificationsStore,
				getNotification('Repositories fetched successfully', 'success')
			];
		} catch (err) {
			$notificationsStore = [...$notificationsStore, getNotification(err as string, 'error')];
		}
	});

	function handleSearch(e: CustomEvent) {
		console.log(e.detail.val);
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
			<div class="mt-4 flex gap-x-4">
				<p class="inline-block rounded-full bg-dark-blue py-1 px-4 text-white">
					&times<span class="pl-1 font-bold">tag:</span> secret-box
				</p>
				<p class="inline-block rounded-full bg-dark-blue py-1 px-4 text-white">
					&times<span class="pl-1 font-bold">tag:</span> essential
				</p>
			</div>
			{#if !$boxesStore && !$reposStore}
				<div class="mt-4 text-center text-gray">Unable to find any repositories.</div>
			{/if}

			<!-- Repo Cards -->
			<div class="-z-10 pt-6 pb-20 lg:pt-4 lg:pb-28">
				<div class="divide-gray-200 relative mx-auto max-w-lg divide-y-2 lg:max-w-full">
					<div class="grid gap-16 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
						{#if $boxesStore}
							{#each $boxesStore.val as b}
								<SecretBoxCard secretBox={b} />
							{/each}
						{/if}

						{#if $reposStore}
							<!-- content here -->
							{#each $reposStore.val as r}
								<div>repos</div>
							{/each}
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
