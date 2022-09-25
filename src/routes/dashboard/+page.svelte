<script lang="ts">
	import { user, contributions, bookmarks } from '$lib/stores';
	import Head from '$lib/components/Head.svelte';
	import { onMount } from 'svelte';
	import type { Bookmark, Contribution, User } from '$lib/models';

	const title = 'Your Dashboard';
	const description = 'Browse your bookmarks and view your contributions to the university.';
	const views = {
		contributions: 'contributions',
		bookmarks: 'bookmarks',
		settings: 'settings'
	};

	let view = views.contributions;
	let address = 'secret1q4vgdvkqcp20e7mzz0tnfx9rpy6fp0ykr8cxam';

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

<!-- <div class="w-11/12 mx-auto">
	<PageHeader {title} {description} />
</div> -->

<section class="jusitfy-items-center mt-6 flex min-h-home-hero gap-x-6 px-8 text-white">
	<section class="inline-block w-1/3" id="profile">
		<div class="h-fit rounded-lg bg-dark-4 p-6">
			<!-- <img src="" alt="" /> -->
			<div class="flex-col items-center">
				<div class="h-32 w-32 rounded-full bg-dark-3 " />
				<div class="self-end px-2">
					<div class="pb-2">{address}</div>
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

	{#if view === views.contributions}
		<section class="inline-block w-2/3">
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
		</section>
	{/if}

	{#if view === views.bookmarks}
		<section>
			<h2 class="w-full border-b-2 border-white py-2 text-xl">
				Bookmarks ({$bookmarks.data.length})
			</h2>

			{#each $bookmarks.data as b}
				<div>Some bookmark</div>
			{/each}
		</section>
	{/if}

	{#if view === views.settings}
		<section>
			<h2>Profile Settings</h2>
		</section>
	{/if}
</section>
