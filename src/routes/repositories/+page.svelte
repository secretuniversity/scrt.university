<script lang="ts">
	import RepoCard from '$lib/components/cards/Repo.svelte';
	import SecretBoxCard from '$lib/components/cards/SecretBox.svelte';
	import Filter from '$lib/components/forms/Filter.svelte';
	import Search from '$lib/components/forms/Search.svelte';
	import Breadcrumb from '$lib/components/page/Breadcrumb.svelte';
	import PageHeader from '$lib/components/page/PageHeader.svelte';
	import { genExp, getNotification } from '$lib/helpers';
	import { boxes, notes, repos } from '$lib/stores';
	import Fuse from 'fuse.js';
	import { onMount } from 'svelte';

	export let data: Page.Repositories;

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

	let tags: Contributions.Tag[] = [];
	let hasBoxes = false;
	let hasRepos = false;
	let cache = {
		boxes: [],
		repos: []
	} as {
		boxes: Contributions.SecretBox.Self[];
		repos: Contributions.Repo.Self[];
	};

	onMount(async () => {
		try {
			let reposFetched = data.repos;
			let boxesFetched = data.secretBoxes;

			if (reposFetched.length > 0) {
				hasRepos = true;
			}

			if (boxesFetched.length > 0) {
				hasBoxes = true;
			}

			cache.boxes = boxesFetched;
			cache.repos = reposFetched;

			$repos = { val: reposFetched, exp: genExp() };
			$boxes = { val: boxesFetched, exp: genExp() };
		} catch (err) {
			$notes = [...$notes, getNotification(err as string, 'error')];
		}
	});

	function handleSearch(e: CustomEvent) {
		if (!$boxes || !$repos) return;

		if (e.detail.val === '') {
			$boxes.val = cache.boxes;
			$repos.val = cache.repos;
			setHasBoxes();
			setHasRepos();
			return;
		}

		const boxesFuse = new Fuse([...$boxes.val], {
			keys: ['title', 'description', 'tags'],
			threshold: 0.3
		});
		const reposFuse = new Fuse([...$repos.val], {
			keys: ['title', 'description', 'tags'],
			threshold: 0.3
		});
		const boxesRes = boxesFuse.search(e.detail.val);
		const repoRes = reposFuse.search(e.detail.val);

		$boxes.val = boxesRes.map((res) => res.item);
		$repos.val = repoRes.map((res) => res.item);

		setHasBoxes();
		setHasRepos();
	}

	function setHasBoxes() {
		if ($boxes && $boxes.val.length > 0) {
			hasBoxes = true;
		} else {
			hasBoxes = false;
		}
	}

	function setHasRepos() {
		if ($repos && $repos.val.length > 0) {
			hasRepos = true;
		} else {
			hasRepos = false;
		}
	}
</script>

<div class="mx-24 py-8">
	<Breadcrumb routes={BREADCRUMB_ROUTES} />
</div>

<section class="lg:mx-24">
	<PageHeader
		image="/images/illustrations/dev.svg"
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
						{#if $boxes}
							{#each $boxes.val as b}
								<SecretBoxCard secretBox={b} />
							{/each}
						{/if}

						{#if $repos}
							{#each $repos.val as r}
								<RepoCard repo={r} />
							{/each}
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
