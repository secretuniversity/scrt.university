<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { navigating } from '$app/stores';
	import { clickOutside } from '$lib/directives/clickOutside';
	import { connect } from '$lib/helpers/keplr';
	import {
		getNotification,
		isExpired,
		retry,
		loadJWT,
		saveJWT,
		getBaseAPIUrl
	} from '$lib/helpers/index';
	import { notificationsStore, userStore, secretStore } from '$lib/stores';
	import type { User } from '$lib/models';
	import WalletIcon from '$lib/assets/wallet_icon.svg';
	import ChevronDown from '$lib/assets/chevron_down_white.svg';

	let learn = false;
	let dashboard = false;

	$: if ($navigating) reset();
	$: loggedIn = $userStore && $secretStore && loadJWT('user');

	function reset() {
		learn = false;
		dashboard = false;
	}

	async function login(address: string): Promise<User> {
		try {
			const url = getBaseAPIUrl() + '/v1/users';
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ address })
			});
			const json = await res.json();
			const token = json.token;

			if (token) {
				sessionStorage.setItem('user', token);
			}

			$notificationsStore = [
				...$notificationsStore,
				getNotification('Successfully connected to Secret University', 'success')
			];
			return Promise.resolve(json.user);
		} catch (err) {
			$notificationsStore = [...$notificationsStore, getNotification(err as string, 'error')];
			return Promise.reject(err);
		}
	}

	async function handleConnect() {
		try {
			// Connect to Keplr
			await connect();

			// SecretStore should be populated by now
			if (!$secretStore) {
				$notificationsStore = [
					...$notificationsStore,
					getNotification('Error connecting to Keplr', 'error')
				];
				return;
			}

			// Check if user is already logged in
			if ($userStore && !isExpired($userStore.exp) && loadJWT('user')) {
				return;
			}

			// Otherwise log user in
			const res = await login($secretStore.val.address);
			const exp = new Date();
			exp.setDate(exp.getDate() + 1);

			$userStore = { val: res, exp: exp.getTime() };
		} catch (err) {
			$notificationsStore = [...$notificationsStore, getNotification(err as string, 'error')];
		}
	}
</script>

<div class="relative">
	<nav
		class="pointer-auto relative flex items-center justify-between bg-dark-4 py-3 shadow-xl sm:px-6"
		aria-label="Global"
	>
		<div class="flex flex-1 items-center pl-4">
			<div class="flex w-full items-center justify-between md:w-auto">
				<a href="/" class="cursor-pointer">
					<span class="sr-only">Secret University</span>
					<p class="text-2xl font-bold text-white">scrt.university</p>
					<!-- <img class="h-10 w-auto" src={Logo} alt="Secret Network Logo" /> -->
				</a>
				<div class="-mr-2 flex items-center md:hidden">
					<button
						type="button"
						class="text-gray-400 hover:bg-gray-100 hover:text-gray-500 inline-flex items-center justify-center rounded-md bg-white p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
						aria-expanded="false"
					>
						<span class="sr-only">Open main menu</span>
						<!-- Heroicon name: outline/menu -->
						<svg
							class="h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>
				</div>
			</div>
			<div class="hidden md:ml-10 md:block md:space-x-10">
				<span class="relative inline-flex items-center gap-x-2">
					<a href="/learn" class="font-medium text-white hover:text-gray"> Learn </a>
					<img
						on:click={() => (learn = true)}
						class="inline-block h-3.5 w-3.5 cursor-pointer"
						src={ChevronDown}
						alt="Learn to build on Secret Network"
					/>
					{#if learn}
						<div
							use:clickOutside
							on:click_outside={() => (learn = false)}
							class="absolute top-0 left-0 z-10 mt-10 w-max rounded-md border border-gray bg-dark-4 p-4"
						>
							<div class="grid-col-1 grid gap-y-2 overflow-visible border-gray text-white">
								<a href="/pathways">Secret Pathways</a>
								<a href="/repositories">Repositories</a>
								<a href="/resources">Community Resources</a>
								<a href="https://docs.scrt.network">Official Docs</a>
							</div>
						</div>
					{/if}
				</span>

				<span class="relative inline-flex items-center gap-x-2">
					<a href="/build" class="font-medium text-white hover:text-gray"> Build </a>
				</span>
				<a href="/support" class="font-medium text-white hover:text-gray">Support</a>
			</div>
		</div>

		<div class="hidden pr-4 text-right md:block">
			<span class="relative inline-flex rounded-md shadow-md">
				{#if loggedIn}
					<button
						on:click={() => goto('/dashboard')}
						class="inline-flex h-12 cursor-pointer items-center rounded-md border border-transparent bg-dark-blue px-4 py-2 font-semibold text-white hover:bg-darker-blue"
						>Dashboard</button
					>
				{:else}
					<button
						on:click={handleConnect}
						class="inline-flex h-12 cursor-pointer items-center rounded-md border border-transparent bg-dark-blue px-4 py-2 font-semibold text-white hover:bg-darker-blue"
					>
						<div class="flex">
							<img
								class="mr-2 h-7 w-7 self-center justify-self-center"
								src={WalletIcon}
								alt="Wallet icon"
							/>
							<p class="self-center justify-self-center">Connect</p>
						</div>
					</button>
				{/if}
			</span>
		</div>
	</nav>
</div>
