<script lang="ts">
	import { user, contributions, bookmarks } from '$lib/stores';
	import Head from '$lib/components/Head.svelte';
	import { clickOutside } from '$lib/directives/clickOutside';
	import { onMount } from 'svelte';
	import type { Bookmark, Contribution, User } from '$lib/models';
	import ChevronDown from '$lib/assets/chevron_down_white.svg';

	const title = 'Your Dashboard';
	const description = 'Browse your bookmarks and view your contributions to the university.';
	const views = {
		contributions: 'contributions',
		bookmarks: 'bookmarks',
		settings: 'settings'
	};

	let view = views.contributions;
	let address = 'secret1q4vgdvkqcp20e7mzz0tnfx9rpy6fp0ykr8cxam';

	let contributionDropdownActive = false;
	let contributorModalActive = false;

	onMount(async () => {
		// Get user, contributions, and bookmarks, if not in store
		const reqs = [];

		if ($user.id === 0) {
			reqs.push(getUser);
		}

		if ($contributions.data.length === 0) {
			reqs.push(getUserContributions);
		}

		if ($bookmarks.data.length === 0) {
			reqs.push(getUserBookmarks);
		}

		try {
			const [userResponse, bookmarkResponse, contributionResponse] = await Promise.all([
				getUser,
				getUserBookmarks,
				getUserContributions
			]);
		} catch (err) {
			// Fail toast
		}
	});

	async function getUser(): Promise<User> {
		return new Promise((res, rej) => {
			fetch(`/api/v1/user/${$user.id}`)
				.then((res) => res.json())
				.then((data) => res(data as User));
		});
	}

	async function getUserBookmarks(): Promise<Array<Bookmark>> {
		return new Promise((res, rej) => {
			fetch(`/api/v1/bookmarks/${$user.id}`)
				.then((res) => res.json())
				.then((data) => res(data as Array<Bookmark>));
		});
	}

	async function getUserContributions(): Promise<Array<Contribution>> {
		return new Promise((res, rej) => {
			fetch(`/api/v1/contributions/${$user.id}`)
				.then((res) => res.json())
				.then((data) => res(data as Array<Contribution>));
		});
	}
</script>

<Head pageTitle={title} />

<section class="jusitfy-items-center mt-6 flex min-h-home-hero gap-x-6 px-8 text-white">
	<section class="inline-block w-1/3" id="profile">
		<div class="h-fit rounded-lg bg-dark-4 p-6">
			<!-- <img src="" alt="" /> -->
			<div class="flex-col items-center">
				<div class="h-32 w-32 rounded-full bg-dark-3 " />
				<div class="self-end px-2">
					<div class="py-2">{address}</div>
					<div
						on:click={() => {
							view = views.settings;
						}}
						class="cursor-pointer rounded-md bg-dark-3 py-1 text-center"
					>
						Edit Profile
					</div>
				</div>
			</div>
		</div>

		<div
			on:click={() => {
				view = views.contributions;
			}}
			class="mb-0.5 mt-2 cursor-pointer rounded-t-xl bg-dark-4 p-4"
		>
			Contributions
		</div>
		<div
			on:click={() => {
				view = views.bookmarks;
			}}
			class="mb-0.5 cursor-pointer bg-dark-4 p-4"
		>
			Bookmarks
		</div>
		<div
			on:click={() => {
				view = views.settings;
			}}
			class="cursor-pointer rounded-b-xl bg-dark-4 p-4"
		>
			Settings
		</div>
	</section>

	<section class="inline-block w-2/3">
		<div class="relative flex w-full justify-end">
			<button
				on:click|preventDefault={() => (contributorModalActive = true)}
				class="mb-4 mr-4 rounded-md bg-dark-4 py-2 px-4">Become A Contributor</button
			>

			<a
				class="block mb-4 rounded-tl-md rounded-bl-md bg-dark-4 py-2 px-4 box-border border-r-2 border-dark-3"
				href="/submit">&plus; New Contribution</a
			>

			<button
				class="block mb-4 rounded-tr-md rounded-br-md bg-dark-4 py-2 px-4 box-border"
				on:click|preventDefault={() => (contributionDropdownActive = true)}
			>
				<img class="w-4 h-4" src={ChevronDown} alt="Choose your contribution" />
			</button>

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
		{#if view === views.contributions}
			<div class="h-1/2">
				<h2 class="w-full border-b-4 border-dark-4 text-lg">
					<div class="w-fit rounded-tr-3xl bg-dark-4 px-8 py-2">
						Contributions ({$contributions.data.length})
					</div>
				</h2>

				{#if $contributions.data.length === 0}
					<div class="mt-4 text-center text-gray">You have no published contributions yet.</div>
				{/if}

				{#each $contributions.data as c}
					<div>Some contribution</div>
				{/each}
			</div>

			<div>
				<h2 class="w-full border-b-4 border-dark-4 text-lg">
					<div class="w-fit rounded-tr-3xl bg-dark-4 px-8 py-2">
						In Review ({$contributions.data.length})
					</div>
				</h2>

				{#if $contributions.data.length === 0}
					<div class="mt-4 text-center text-gray">You have no contributions in review.</div>
				{/if}

				{#each $contributions.data as c}
					<div>Some contribution</div>
				{/each}
			</div>
		{/if}

		{#if view === views.bookmarks}
			<h2 class="w-full border-b-2 border-white py-2 text-xl">
				Bookmarks ({$bookmarks.data.length})
			</h2>

			{#each $bookmarks.data as b}
				<div>Some bookmark</div>
			{/each}
		{/if}

		{#if view === views.settings}
			<h2>Profile Settings</h2>
		{/if}
	</section>
</section>

{#if contributorModalActive}
	<div class="absolute top-0 left-0 h-full w-full bg-black/[0.6]" />
	<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<!--
	  Background backdrop, show/hide based on modal state.
  
	  Entering: "ease-out duration-300"
		From: "opacity-0"
		To: "opacity-100"
	  Leaving: "ease-in duration-200"
		From: "opacity-100"
		To: "opacity-0"
	-->
		<div class="bg-gray-500 fixed inset-0 bg-opacity-75 transition-opacity" />

		<div class="fixed inset-0 z-10 overflow-y-auto">
			<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
				<!--
		  Modal panel, show/hide based on modal state.
  
		  Entering: "ease-out duration-300"
			From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
			To: "opacity-100 translate-y-0 sm:scale-100"
		  Leaving: "ease-in duration-200"
			From: "opacity-100 translate-y-0 sm:scale-100"
			To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
		-->
				<div
					use:clickOutside
					on:click_outside={() => (contributorModalActive = false)}
					class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
				>
					<div>
						<div
							class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
						>
							<!-- Heroicon name: outline/check -->
							<svg
								class="h-6 w-6 text-green-600"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
							</svg>
						</div>
						<div class="mt-3 text-center sm:mt-5">
							<h3 class="text-gray-900 text-lg font-medium leading-6" id="modal-title">
								Payment successful
							</h3>
							<div class="mt-2">
								<p class="text-gray-500 text-sm">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
								</p>
							</div>
						</div>
					</div>
					<div class="mt-5 sm:mt-6">
						<button
							type="button"
							class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
							>Go back to dashboard</button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
