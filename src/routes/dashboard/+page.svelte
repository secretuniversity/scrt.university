<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import ChevronDown from '$lib/assets/chevron_down_white.svg';
	import { clickOutside } from '$lib/directives/clickOutside';
	import { onMount } from 'svelte';
	import { loadJWT, saveJWT, getOrCreateUser } from '$lib/helpers';
	import { connect } from '$lib/helpers/keplr';
	import { goto } from '$app/navigation';
	import {
		secretStore,
		userStore,
		contributionsStore,
		contributorStore,
		bookmarksStore,
		notificationsStore
	} from '$lib/stores';
	import type { Bookmark, Contributor, Contribution } from '$lib/models';

	const title = 'Your Dashboard';
	const description = 'Browse your bookmarks and view your contributions to the university.';
	const views = {
		profile: 'profile',
		settings: 'settings'
	};

	let view = views.profile;

	let contributionDropdownActive = false;
	let contributorModalActive = false;

	let renderBecomeContributorBtn = false;
	let renderContributionSubmissionBtn = false;

	let name = '';
	let skill = 'beginner';
	let reason = '';
	let discord = '';
	let email = '';

	onMount(async () => {
		let addr = '';

		if (!loadJWT('user')) {
			goto('/');
			return Promise.reject();
		}

		if (!$secretStore) {
			await connect();
		} else {
			addr = $secretStore.val.address;
		}

		if (loadJWT('contributor') && $contributorStore) {
			renderContributionSubmissionBtn = true;
		} else {
			renderBecomeContributorBtn = true;
		}

		try {
			const exp = new Date();
			exp.setHours(exp.getHours() + 1);

			if (!$userStore || !$contributorStore) {
				console.log('trying to get user and contributor');

				const [userResult, contributorResult] = await Promise.all([
					getOrCreateUser(addr),
					tryLoginContributor()
				]);

				if (userResult) {
					console.log(userResult);
					$userStore = { val: userResult, exp: exp.getTime() };
				}

				if (contributorResult) {
					$contributorStore = { val: contributorResult, exp: exp.getTime() };
				}

				if ($contributorStore) {
					renderContributionSubmissionBtn = true;
				} else {
					renderBecomeContributorBtn = true;
				}
			}

			if (!$contributionsStore || !$bookmarksStore) {
				const [contributionsResult, bookmarksResult] = await Promise.all([
					getContributions(),
					getBookmarks()
				]);

				console.log({ contributionsResult, bookmarksResult });

				if (contributionsResult) {
					$contributionsStore = { val: contributionsResult, exp: exp.getTime() };
				}

				if (bookmarksResult) {
					$bookmarksStore = { val: bookmarksResult, exp: exp.getTime() };
				}
			}
		} catch (err) {
			$notificationsStore.push({
				message: err as string,
				status: 'error',
				loading: false
			});
		}
	});

	async function tryLoginContributor(): Promise<Contributor | null> {
		return new Promise((res, rej) => {
			const userToken = loadJWT('user');

			if (!userToken) {
				return rej('No user token found');
			}

			if ($userStore) {
				fetch(`/api/v1/contributor/login`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Token: userToken
					},
					body: JSON.stringify({
						address: $userStore.val.address,
						name: null
					})
				})
					.then((res) => {
						let token = res.headers.get('Token');

						if (token) {
							saveJWT('contributor', token);
						}

						return res.json();
					})
					.then((result) => {
						if (!result.data) {
							return res(null);
						}

						const c: Contributor = {
							id: result.data.id,
							address: result.data.address,
							name: result.data.name
						};
						res(c);
					})
					.catch((_err) => {
						return rej('Failed to login contributor');
					});
			}
		});
	}

	async function getBookmarks(): Promise<Array<Bookmark> | null> {
		return new Promise((res, rej) => {
			if ($userStore) {
				fetch(`/api/v1/bookmarks/${$userStore.val.id}`)
					.then((res) => res.json())
					.then((result) => {
						const b: Array<Bookmark> = result.data;
						res(b);
					});
			} else {
				rej('No user in storage');
			}
		});
	}

	async function getContributions(): Promise<Array<Contribution> | null> {
		return new Promise((res, rej) => {
			const token = loadJWT('contributor');

			if (!token) {
				return rej('No contributor token found');
			}

			if ($contributorStore) {
				fetch(`/api/v1/contributions/${$contributorStore.val.id}`, {
					headers: {
						Token: token
					}
				})
					.then((res) => res.json())
					.then((data) => {
						const c: Array<Contribution> = data.data;
						res(c);
					})
					.catch((err) => {
						rej('There was a problem finding your contributions');
					});
			}
		});
	}

	async function submitContributorForm() {
		try {
			const res = await fetch('/api/v1/forms/contributor', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name,
					skill,
					reason,
					discord,
					email
				})
			});

			if (res.status === 200) {
				$notificationsStore.push({
					message: 'Thank you for your submission!',
					status: 'success',
					loading: false
				});
			}
		} catch (err) {
			$notificationsStore.push({
				message: err as string,
				status: 'error',
				loading: false
			});
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

<section class="jusitfy-items-center relative mt-6 flex min-h-home-hero gap-x-6 px-8 text-white">
	<section class="inline-block w-1/3" id="profile">
		<div class="grid w-full justify-items-center">
			<div class="h-48 w-48 rounded-full bg-dark-5" />
			{#if $contributorStore}
				<div class="py-2">Hey, {$contributorStore.val.name} 👋</div>
			{:else}
				<div class="py-2">Your Dashboard</div>
			{/if}
			<div
				on:click={() => {
					view = views.settings;
				}}
				class="w-max cursor-pointer rounded-md bg-dark-4 py-2 px-4 text-center"
			>
				Edit Profile
			</div>
		</div>
	</section>

	<section class="inline-block w-2/3">
		<div class="relative flex w-full justify-end">
			{#if renderBecomeContributorBtn}
				<button
					on:click|preventDefault={() => (contributorModalActive = true)}
					class="mb-4 mr-4 rounded-md bg-dark-4 py-2 px-4">Become A Contributor</button
				>
			{/if}

			{#if renderContributionSubmissionBtn}
				<!-- content here -->
				<a
					class="mb-4 box-border block rounded-tl-md rounded-bl-md border-r-2 border-dark-3 bg-dark-4 py-2 px-4"
					href="/submit">&plus; New Contribution</a
				>

				<button
					class="mb-4 box-border block rounded-tr-md rounded-br-md bg-dark-4 py-2 px-4"
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
		{#if view === views.profile}
			<div class="h-1/2">
				<h2 class="w-full border-b-4 border-dark-4 text-lg">
					<div class="w-fit rounded-tr-3xl bg-dark-4 px-8 py-2">
						Contributions ({$contributionsStore ? $contributionsStore.val.length : 0})
					</div>
				</h2>

				{#if !$contributionsStore}
					<div class="mt-4 text-center text-gray">You have no published contributions yet.</div>
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
			</div>
		{/if}

		{#if view === views.settings}
			<h2>Profile Settings</h2>
		{/if}
	</section>
</section>
