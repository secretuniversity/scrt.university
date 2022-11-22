<script lang="ts">
	import Head from '$lib/components/Head.svelte';
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

	let name = '';
	let skill = 'beginner';
	let reason = '';
	let discord = '';
	let email = '';

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

	async function getContributions() {}

	async function submitContributorForm() {
		try {
			if (!$userStore) {
				$notificationsStore = [
					...$notificationsStore,
					getNotification('You must be logged in to become a contributor.', 'error')
				];
				return;
			}

			const form = new FormData();
			form.append('id', $userStore.val.id.toString());
			form.append('name', name);
			form.append('reason', reason);
			form.append('skill_rating', skill);
			form.append('discord', discord);
			form.append('email', email);
			const url = getBaseAPIUrl() + '/v1/users/register';
			const res = await fetch(url, {
				method: 'POST',
				body: form
			});

			if (res.status === 200) {
				$notificationsStore = [
					...$notificationsStore,
					getNotification('Your application has been submitted.', 'success')
				];
			}
		} catch (err) {
			$notificationsStore = [...$notificationsStore, getNotification(err as string, 'error')];
		}
	}
</script>

<Head pageTitle={title} />

<Modal active={contributorModalActive} on:hide={() => (contributorModalActive = false)}>
	<form class="grid grid-cols-1 text-white">
		<h2 class="mx-auto max-w-xs text-center text-2xl font-semibold">
			Become A Contributor for Secret University
		</h2>
		<p class="mx-auto mt-2 max-w-md text-center text-sm">
			Fill out the questions below and a leader of Secret University will process your request soon!
			Thank you for your interest in advancing private blockchain solutions and developer education!
		</p>

		<div class="my-4 flex-col">
			<label class="mb-1 block text-sm font-bold" for="name">Name (Pseudonym)</label>
			<input
				bind:value={name}
				class="w-full rounded-md border border-white bg-dark-4 outline-none placeholder:text-gray"
				type="text"
				id="name"
				name="name"
				placeholder="How people will see you on Secret University"
			/>
		</div>

		<div class="mb-4 flex-col">
			<label class="mb-1 block text-sm font-bold" for="skills"
				>How would you rate your skills as a developer?</label
			>
			<select
				bind:value={skill}
				class="w-full rounded-md border border-white bg-dark-4 text-white outline-none"
				name="skills"
				id="skills"
			>
				<option selected class="text-gray" value="beginner">Beginner (New to programming) </option>
				<option class="text-gray" value="intermediate"
					>Intermediate (Knows fundamental programming concepts)</option
				>
				<option class="text-gray" value="advanced"
					>Advanced (Can take a project from concept to production)</option
				>
			</select>
		</div>

		<div class="mb-4 flex-col">
			<label class="mb-1 block text-sm font-bold" for="reason"
				>Why do you want to join and contribute to Secret University?</label
			>
			<textarea
				bind:value={reason}
				id="reason"
				name="reason"
				class="h-40 w-full resize-none rounded-md border border-white bg-dark-4 outline-none placeholder:text-gray"
				type="text"
				placeholder="In a couple of sentences, please describe why or what you'd like to contribute to Secret University (Remember Secret University is actively looking for technical articles/guides, developer screencasts, courses, and templates projects that utilize Secret)"
			/>
		</div>

		<div class="mb-4 flex-col">
			<label class="mb-1 block text-sm font-bold" for="name">What's you Discord username?</label>
			<input
				bind:value={discord}
				class="w-full rounded-md border border-white bg-dark-4 outline-none placeholder:text-gray"
				type="text"
				id="discord"
				name="discord"
				placeholder="agent#1234"
			/>
		</div>

		<p class="text-center text-sm font-bold">OR</p>

		<div class="mb-4 flex-col">
			<label class="mb-1 block text-sm font-bold" for="name">What's your email address</label>
			<input
				bind:value={email}
				class="w-full rounded-md border border-white bg-dark-4 outline-none placeholder:text-gray"
				type="text"
				id="email"
				name="email"
				placeholder="agent@scrt.network"
			/>
		</div>

		<button
			on:click|preventDefault={submitContributorForm}
			class="w-20 justify-self-end rounded-md bg-dark-blue px-4 py-2 hover:bg-darker-blue"
			>Submit</button
		>
	</form>
</Modal>

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
