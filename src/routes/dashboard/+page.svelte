<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import ChevronDown from '$lib/assets/chevron_down_white.svg';
	import Toast from '$lib/components/Toast.svelte';
	import { clickOutside } from '$lib/directives/clickOutside';
	import { onMount } from 'svelte';
	import { secret, user, contributor, contributions, bookmarks } from '$lib/stores';
	import type { Bookmark, Contributor, Contribution, User } from '$lib/models';
	import { loadJWT, saveJWT, getOrCreateUser } from '$lib/helpers';
	import { connect } from '$lib/helpers/keplr';
	import { goto } from '$app/navigation';

	let toastIsVisible = false;
	let toastKind = 'fail';
	let toastMsg = '';

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

	onMount(async () => {
		let addr = '';

		if (!loadJWT('user')) {
			goto('/');
			return Promise.reject();
		}

		if (!$secret) {
			await connect();
		} else {
			addr = $secret.val.address;
		}

		if (loadJWT('contributor') && $contributor) {
			renderContributionSubmissionBtn = true;
		} else {
			renderBecomeContributorBtn = true;
		}

		try {
			const exp = new Date();
			exp.setHours(exp.getHours() + 1);

			if (!$user || !$contributor) {
				console.log('trying to get user and contributor');

				const [userResult, contributorResult] = await Promise.all([
					getOrCreateUser(addr),
					tryLoginContributor()
				]);

				if (userResult) {
					console.log(userResult);
					$user = { val: userResult, exp: exp.getTime() };
				}

				if (contributorResult) {
					$contributor = { val: contributorResult, exp: exp.getTime() };
				}

				if ($contributor) {
					renderContributionSubmissionBtn = true;
				} else {
					renderBecomeContributorBtn = true;
				}
			}

			if (!$contributions || !$bookmarks) {
				const [contributionsResult, bookmarksResult] = await Promise.all([
					getContributions(),
					getBookmarks()
				]);

				console.log({ contributionsResult, bookmarksResult });

				if (contributionsResult) {
					$contributions = { val: contributionsResult, exp: exp.getTime() };
				}

				if (bookmarksResult) {
					$bookmarks = { val: bookmarksResult, exp: exp.getTime() };
				}
			}
		} catch (err) {
			console.log(err);
			toastMsg = err as string;
			toastIsVisible = true;
		}
	});

	async function tryLoginContributor(): Promise<Contributor | null> {
		return new Promise((res, rej) => {
			const userToken = loadJWT('user');

			if (!userToken) {
				return rej('No user token found');
			}

			if ($user) {
				console.log($user);
				fetch(`/api/v1/contributor/login`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Token: userToken
					},
					body: JSON.stringify({
						address: $user.val.address,
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
			if ($user) {
				fetch(`/api/v1/bookmarks/${$user.val.id}`)
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

			if ($contributor) {
				fetch(`/api/v1/contributions/${$contributor.val.id}`, {
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
</script>

<Head pageTitle={title} />

{#if toastIsVisible}
	<Toast msg={toastMsg} kind={toastKind} />
{/if}

<section class="jusitfy-items-center relative mt-6 flex min-h-home-hero gap-x-6 px-8 text-white">
	<section class="inline-block w-1/3" id="profile">
		<div class="grid w-full justify-items-center">
			<div class="h-48 w-48 rounded-full bg-dark-5" />
			{#if $contributor}
				<div class="py-2">Hey, {$contributor.val.name} 👋</div>
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
						Contributions ({$contributions ? $contributions.val.length : 0})
					</div>
				</h2>

				{#if !$contributions}
					<div class="mt-4 text-center text-gray">You have no published contributions yet.</div>
				{:else}
					<div class="mt-8 grid h-full w-full auto-rows-max grid-cols-2 gap-6 px-8 pb-4">
						{#each $contributions.val as c}
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
