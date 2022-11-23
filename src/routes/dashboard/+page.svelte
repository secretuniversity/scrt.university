<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import ContributorForm from '$lib/components/ContributorForm.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import ChevronDown from '$lib/assets/chevron_down_white.svg';
	import { clickOutside } from '$lib/directives/clickOutside';
	import { onMount } from 'svelte';
	import { getNotification, getBaseAPIUrl } from '$lib/helpers';
	import { goto } from '$app/navigation';
	import { userStore, contributionsStore, bookmarksStore, notificationsStore } from '$lib/stores';
	import type { Article, Pathway, SecretBox, Video } from '$lib/models';

	const title = 'Your Dashboard';
	const description = 'Browse your bookmarks and view your contributions to the university.';
	const views = {
		profile: 'profile',
		settings: 'settings'
	};
	const exp = new Date().setHours(new Date().getHours() + 1);

	let view = views.profile;
	let tab = 'bookmarks';

	let contributionDropdownActive = false;
	let contributorModalActive = false;

	let renderBecomeContributorBtn = false;
	let renderContributionSubmissionBtn = false;

	let profileButtonText = 'Edit Profile';

	onMount(async () => {
		try {
			if (!$userStore) {
				$notificationsStore = [
					...$notificationsStore,
					getNotification('You must be logged in to view your dashboard.', 'error')
				];

				goto('/');
				return;
			}

			await fetchRole();
			await fetchArticles();
			await fetchPathways();
			await fetchSecretBoxes();
			await fetchVideos();
		} catch (err) {
			$notificationsStore = [...$notificationsStore, getNotification(err as string, 'error')];
		}
	});

	async function fetchRole() {
		if (!$userStore) return;

		const url = getBaseAPIUrl() + '/v1/users/roles?id=' + $userStore.val.id;
		const res = await fetch(url);
		const json = (await res.json()) as string[];

		if (json && json.includes('contributor')) {
			renderBecomeContributorBtn = false;
			renderContributionSubmissionBtn = true;
		} else {
			renderBecomeContributorBtn = true;
			renderContributionSubmissionBtn = false;
		}
	}

	async function fetchArticles() {
		if (!$userStore) return;

		try {
			const url = getBaseAPIUrl() + '/v1/articles/contributor/' + $userStore.val.id;
			const res = await fetch(url);
			const json = (await res.json()) as Article[];
		} catch (err) {
			$notificationsStore = [
				...$notificationsStore,
				getNotification('Failed to fetch articles.', 'error')
			];
		}
	}

	async function fetchPathways() {
		try {
			if (!$userStore) return;
			const url = getBaseAPIUrl() + '/v1/pathways/contributor/' + $userStore.val.id;
			const res = await fetch(url);
			const json = (await res.json()) as Pathway[];
		} catch (err) {
			$notificationsStore = [
				...$notificationsStore,
				getNotification('Failed to fetch pathways.', 'error')
			];
		}
	}

	async function fetchSecretBoxes() {
		try {
			if (!$userStore) return;
			const url = getBaseAPIUrl() + '/v1/secret-boxes/contributor/' + $userStore.val.id;
			const res = await fetch(url);
			const json = (await res.json()) as SecretBox[];
		} catch (err) {
			$notificationsStore = [
				...$notificationsStore,
				getNotification('Failed to fetch secret boxes.', 'error')
			];
		}
	}

	async function fetchVideos() {
		try {
			if (!$userStore) return;
			const url = getBaseAPIUrl() + '/v1/videos/contributor/' + $userStore.val.id;
			const res = await fetch(url);
			const json = (await res.json()) as Video[];
		} catch (err) {
			$notificationsStore = [
				...$notificationsStore,
				getNotification('Failed to fetch videos.', 'error')
			];
		}
	}

	// async function getBookmarks(): Promise<Array<Bookmark> | null> {
	// 	return new Promise((res, rej) => {
	// 		if ($userStore) {
	// 			fetch(`/api/v1/bookmarks/${$userStore.val.id}`)
	// 				.then((res) => res.json())
	// 				.then((result) => {
	// 					const b: Array<Bookmark> = result.data;
	// 					res(b);
	// 				});
	// 		} else {
	// 			rej('No user in storage');
	// 		}
	// 	});
	// }

	// async function getContributions() {}
</script>

<Head pageTitle={title} />

<ContributorForm active={contributorModalActive} />

<section class="relative mt-12 min-h-home-hero px-36 text-white">
	<div class="grid grid-cols-2 items-center">
		{#if $userStore && $userStore.val.name}
			<div class="py-24 text-4xl font-bold">Welcome Back, {$userStore.val.name.String} 👋</div>
		{:else}
			<div class="py-24 text-4xl">Your Dashboard</div>
		{/if}

		<div class="relative flex h-fit w-full justify-end">
			<div
				on:click={() => {
					if (profileButtonText !== 'Back') {
						view = views.settings;
						profileButtonText = 'Back';
					} else {
						view = views.profile;
						profileButtonText = 'Edit Profile';
					}
				}}
				class="mr-4 mb-4 cursor-pointer rounded-md bg-dark-5 py-2 px-4 text-center hover:bg-dark-4"
			>
				{profileButtonText}
			</div>

			{#if renderBecomeContributorBtn}
				<button
					on:click|preventDefault={() => (contributorModalActive = true)}
					class="mb-4 mr-4 rounded-md bg-dark-4 py-2 px-4">Become A Contributor</button
				>
			{/if}

			{#if renderContributionSubmissionBtn}
				<!-- content here -->
				<a
					class="mb-4 box-border block rounded-tl-md rounded-bl-md border-r-2 border-dark-3 bg-dark-5 py-2 px-4 hover:bg-dark-4"
					href="/submit">&plus; New Contribution</a
				>

				<button
					class="mb-4 box-border block rounded-tr-md rounded-br-md bg-dark-5 py-2 px-4 hover:bg-dark-4"
					on:click|preventDefault={() => (contributionDropdownActive = true)}
				>
					<img class="h-4 w-4" src={ChevronDown} alt="Choose your contribution" />
				</button>
			{/if}

			{#if contributionDropdownActive}
				<div
					use:clickOutside
					on:click_outside={() => (contributionDropdownActive = false)}
					class="absolute top-0 right-0 z-10 mt-12 w-fit rounded-md border border-gray bg-dark-4 p-4"
				>
					<div class="grid-col-1 grid gap-y-2 overflow-visible border-gray text-white">
						<a href="/submit/article">Article / Guide</a>
						<a href="/submit/video">Video</a>
						<a href="/submit/pathway">Pathway</a>
						<a href="/submit/secret-box">Secret Box</a>
					</div>
				</div>
			{/if}
		</div>
	</div>
	{#if view === views.profile}
		<div class="h-1/2">
			<h2 class="flex w-full border-b-4 border-dark-5 text-lg">
				<div
					on:click={() => (tab = 'bookmarks')}
					class="w-fit rounded-tr-3xl {tab === 'bookmarks'
						? 'bg-dark-5'
						: ''} cursor-pointer px-8 py-2 hover:bg-dark-4"
				>
					Bookmarks ({$bookmarksStore ? $bookmarksStore.val.length : 0})
				</div>

				<div
					on:click={() => (tab = 'contributions')}
					class="w-fit {tab === 'contributions'
						? 'bg-dark-5'
						: ''} cursor-pointer rounded-t-3xl px-8 py-2 hover:bg-dark-4"
				>
					Contributions ({$contributionsStore ? $contributionsStore.val.length : 0})
				</div>
			</h2>

			{#if tab === 'contributions'}
				{#if !$contributionsStore}
					<div class="mt-24 text-center text-dark-5">Couldn't find any of your contributions.</div>
				{:else}
					<div class="mt-8 grid h-full w-full auto-rows-max grid-cols-2 gap-6 px-8 pb-4">
						{#each $contributionsStore.val as c}
							<div class="grid h-32 w-full grid-rows-3 rounded-xl bg-dark-4 py-4 px-6">
								<p class="h-min justify-self-end rounded-full bg-dark-blue py-2 px-4">{c.kind}</p>
								<h3 class="text-lg font-semibold">{c.title}</h3>
								<p class="max-w-[80%]">{c.description}</p>
							</div>
						{/each}
					</div>
				{/if}
			{/if}

			{#if tab === 'bookmarks'}
				{#if !$bookmarksStore}
					<div class="mt-24 text-center text-dark-5">Couldn't find any of your bookmarks.</div>
				{:else}
					<div class="mt-8 grid h-full w-full auto-rows-max grid-cols-2 gap-6 px-8 pb-4">
						{#each $bookmarksStore.val as c}{/each}
					</div>
				{/if}
			{/if}
		</div>
	{/if}

	{#if view === views.settings}
		<h2>Profile Settings</h2>
	{/if}
</section>
