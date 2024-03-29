<script lang="ts">
	import ArticleCard from '$lib/components/cards/Article.svelte';
	import PathwayCard from '$lib/components/cards/Pathway.svelte';
	import SecretBoxCard from '$lib/components/cards/SecretBox.svelte';
	import VideoCard from '$lib/components/cards/Video.svelte';
	import ContributorForm from '$lib/components/forms/ContributorForm.svelte';
	import Head from '$lib/components/page/Head.svelte';

	import { goto } from '$app/navigation';
	import { clickOutside } from '$lib/directives/clickOutside';
	import { getBaseAPIUrl, getNotification } from '$lib/helpers';
	import { contributorModal, notes, user } from '$lib/stores';
	import { onMount } from 'svelte';

	const title = 'Your Dashboard';
	const description = 'Browse your bookmarks and view your contributions to the university.';
	const views = {
		profile: 'profile',
		settings: 'settings'
	};
	const exp = new Date().setHours(new Date().getHours() + 1);

	let articles: Contributions.Article.Self[] = [];
	let pathways: Contributions.Pathway.Self[] = [];
	let secretBoxes: Contributions.SecretBox.Self[] = [];
	let videos: Contributions.Video.Self[] = [];
	let totalContributions = 0;

	$: namePlaceholder = 'Your name';

	let view = views.profile;
	let tab = 'contributions';

	let contributionDropdownActive = false;
	let contributorModalActive = false;

	let renderBecomeContributorBtn = false;
	let renderContributionSubmissionBtn = false;

	let profileButtonText = 'Edit Profile';

	let nameChange = '';

	onMount(async () => {
		try {
			if (!$user) {
				$notes = [
					...$notes,
					getNotification('You must be logged in to view your dashboard.', 'error')
				];

				goto('/');
				return;
			}

			if ($user.val.name) {
				namePlaceholder = $user.val.name.String;
			}

			await fetchRole();

			articles = await fetchArticles();
			pathways = await fetchPathways();
			secretBoxes = await fetchSecretBoxes();
			videos = await fetchVideos();

			totalContributions = articles.length + pathways.length + secretBoxes.length + videos.length;
		} catch (err) {
			$notes = [...$notes, getNotification(err as string, 'error')];
		}
	});

	async function fetchRole() {
		if (!$user) return;

		const url = getBaseAPIUrl() + '/v1/users/roles?id=' + $user.val.id;
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

	async function fetchArticles(): Promise<Contributions.Article.Self[]> {
		if (!$user) return Promise.reject('You must be logged in to view your contributions.');

		try {
			const url = getBaseAPIUrl() + '/v1/articles/contributor/' + $user.val.id;
			const res = await fetch(url);
			const json = (await res.json()) as Contributions.Article.Self[];

			return json;
		} catch (err) {
			$notes = [...$notes, getNotification('Failed to fetch articles.', 'error')];

			return Promise.reject(err);
		}
	}

	async function fetchPathways(): Promise<Contributions.Pathway.Self[]> {
		try {
			if (!$user) return Promise.reject('You must be logged in to view your contributions.');
			const url = getBaseAPIUrl() + '/v1/pathways/contributor/' + $user.val.id;
			const res = await fetch(url);
			const json = (await res.json()) as Contributions.Pathway.Self[];

			return json;
		} catch (err) {
			$notes = [...$notes, getNotification('Failed to fetch pathways.', 'error')];
			return Promise.reject(err);
		}
	}

	async function fetchSecretBoxes(): Promise<Contributions.SecretBox.Self[]> {
		try {
			if (!$user) return Promise.reject('You must be logged in to view your contributions.');
			const url = getBaseAPIUrl() + '/v1/secret-boxes/contributor/' + $user.val.id;
			const res = await fetch(url);
			const json = (await res.json()) as Contributions.SecretBox.Self[];

			return json;
		} catch (err) {
			$notes = [...$notes, getNotification('Failed to fetch secret boxes.', 'error')];

			return Promise.reject(err);
		}
	}

	async function fetchVideos() {
		try {
			if (!$user) return Promise.reject('You must be logged in to view your contributions.');
			const url = getBaseAPIUrl() + '/v1/videos/contributor/' + $user.val.id;
			const res = await fetch(url);
			const json = (await res.json()) as Contributions.Video.Self[];

			return json;
		} catch (err) {
			$notes = [...$notes, getNotification('Failed to fetch videos.', 'error')];

			return Promise.reject(err);
		}
	}

	async function changeName() {
		if (!$notes) return;

		// const url = getBaseAPIUrl() + '/v1/users/name';
		// const res = await fetch(url, {
		// 	method: 'PUT',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Authorization: 'Bearer ' + $userStore.token
		// 	},
		// 	body: JSON.stringify({
		// 		id: $userStore.val.id,
		// 		name: nameChange
		// 	})
		// });

		// if (res.status === 200) {
		// 	$notificationsStore = [
		// 		...$notificationsStore,
		// 		getNotification('Successfully changed your name.', 'success')
		// 	];

		// 	$userStore = {
		// 		...$userStore,
		// 		val: {
		// 			...$userStore.val,
		// 			name: {
		// 				String: nameChange
		// 			}
		// 		}
		// 	};

		// 	namePlaceholder = nameChange;
		// 	nameChange = '';
		// } else {
		// 	$notificationsStore = [
		// 		...$notificationsStore,
		// 		getNotification('Failed to change your name.', 'error')
		// 	];
		// }
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

<ContributorForm />

<section class="relative mt-12 min-h-home-hero px-36 text-white">
	<div class="grid grid-cols-2 items-center">
		{#if $user && $user.val.name}
			<div class="py-24 text-4xl font-bold">Welcome Back, {$user.val.name.String} 👋</div>
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
				on:keydown={(e) => {
					if (e.key === 'Enter') {
						if (profileButtonText !== 'Back') {
							view = views.settings;
							profileButtonText = 'Back';
						} else {
							view = views.profile;
							profileButtonText = 'Edit Profile';
						}
					}
				}}
				class="mr-4 mb-4 cursor-pointer rounded-md bg-dark-5 py-2 px-4 text-center hover:bg-dark-4"
			>
				{profileButtonText}
			</div>

			{#if renderBecomeContributorBtn}
				<button
					on:click|preventDefault={() => ($contributorModal = true)}
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
					<img
						class="h-4 w-4"
						src="/images/icons/chevron_down_white.svg"
						alt="Choose your contribution"
					/>
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
					on:keydown={(e) => {
						if (e.key === 'Enter') {
							tab = 'bookmarks';
						}
					}}
					class="w-fit rounded-tr-3xl {tab === 'bookmarks'
						? 'bg-dark-5'
						: ''} cursor-pointer px-8 py-2 hover:bg-dark-4"
				>
					Bookmarks (0)
				</div>

				<div
					on:click={() => (tab = 'contributions')}
					on:keydown={(e) => {
						if (e.key === 'Enter') {
							tab = 'contributions';
						}
					}}
					class="w-fit {tab === 'contributions'
						? 'bg-dark-5'
						: ''} cursor-pointer rounded-t-3xl px-8 py-2 hover:bg-dark-4"
				>
					Contributions ({totalContributions})
				</div>
			</h2>

			<div class="pb-56">
				{#if tab === 'contributions'}
					{#if totalContributions === 0}
						<div class="mt-24 text-center text-dark-5">
							Couldn't find any of your contributions.
						</div>
					{:else}
						<h2 class="mt-16 font-bold text-dark-5">Articles ({articles.length})</h2>
						<div class="mt-8 grid h-full w-full auto-rows-max grid-cols-4 gap-6 px-8 pb-4">
							{#if articles}
								{#each articles as article}
									<ArticleCard {article} />
								{/each}
							{/if}
						</div>

						<h2 class="mt-16 font-bold text-dark-5">Pathways ({pathways.length})</h2>
						<div class="mt-8 grid h-full w-full auto-rows-max grid-cols-4 gap-6 px-8 pb-4">
							{#if pathways}
								{#each pathways as pathway}
									<PathwayCard {pathway} />
								{/each}
							{/if}
						</div>

						<h2 class="mt-16 font-bold text-dark-5">Secret Boxes ({secretBoxes.length})</h2>
						<div class="mt-8 grid h-full w-full auto-rows-max grid-cols-4 gap-6 px-8 pb-4">
							{#if secretBoxes}
								{#each secretBoxes as secretBox}
									<SecretBoxCard {secretBox} />
								{/each}
							{/if}
						</div>

						<h2 class="mt-16 font-bold text-dark-5">Videos ({videos.length})</h2>
						<div class="mt-8 grid h-full w-full auto-rows-max grid-cols-4 gap-6 px-8 pb-4">
							{#if videos}
								{#each videos as video}
									<VideoCard {video} />
								{/each}
							{/if}
						</div>
					{/if}
				{/if}
			</div>

			<!-- {#if tab === 'bookmarks'}
				{#if !$bookmarksStore}
					<div class="mt-24 text-center text-dark-5">Couldn't find any of your bookmarks.</div>
				{:else}
					<div class="mt-8 grid h-full w-full auto-rows-max grid-cols-2 gap-6 px-8 pb-4">
						{#each $bookmarksStore.val as c}{/each}
					</div>
				{/if}
			{/if} -->
		</div>
	{/if}

	{#if view === views.settings}
		<h2 class="mb-20 text-2xl font-bold text-white">Profile Settings</h2>
		<div class="mx-auto mb-6 max-w-lg">
			<label class="mb-2 block" for="name-change">Change Name</label>
			<div class="flex w-full space-x-2">
				<input
					bind:value={nameChange}
					class="w-[80%] rounded-md border-dark-5 bg-dark-4 text-white placeholder:text-gray"
					placeholder={namePlaceholder}
					type="text"
				/>

				<button
					on:click={() => changeName()}
					class="rounded-md bg-dark-blue py-4 px-6 text-white hover:bg-darker-blue">Change</button
				>
			</div>
		</div>

		<!-- <div class="max-w-lg mx-auto">
			<p class="block mb-2" for="bookmarks-checkbox">Change Default Dashboard Tab</p>

			<input
				checked={tab === 'bookmarks'}
				on:change={() => (tab = 'contributions')}
				class="rounded-md"
				type="radio"
				name="bookmarks-checkbox"
				id="bookmarks-checkbox"
				value="bookmarks"
			/>
			<label class="inline-block mr-4" for="bookmarks-checkbox">Bookmarks</label>

			<input
				checked={tab === 'contributions'}
				on:change={() => (tab = 'contributions')}
				class="rounded-md"
				type="radio"
				name="contributions-checkbox"
				id="contributions-checkbox"
				value="contributions"
			/>
			<label class="" for="contributions-checkbox">Contributions</label>
		</div> -->
	{/if}
</section>
