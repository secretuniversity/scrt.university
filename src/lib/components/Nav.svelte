<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { navigating } from '$app/stores';
	import { clickOutside } from '$lib/directives/clickOutside';
	import { connect } from '$lib/helpers/keplr';
	import { user, secret } from '$lib/stores';
	import Toast from '$lib/components/Toast.svelte';
	import WalletIcon from '$lib/assets/wallet_icon.svg';
	import ChevronDown from '$lib/assets/chevron_down_white.svg';

	import type { Connection } from '$lib/helpers/keplr';

	// Dropdown flags
	let learn = false;
	let build = false;
	let dashboard = false;

	let connected = false;

	let toastIsVisible = false;
	let toastKind = 'fail';
	let toastMsg = '';

	$: if ($navigating) reset();

	const unsubSecret = secret.subscribe((val) => {
		connected = val.client === null ? false : true;
	});

	const unsubUser = user.subscribe((val) => {
		connected = val.id === -1 ? false : true;
	});

	onMount(async () => {
		const session = sessionStorage.getItem('keplr-connected');

		if (session === 'true' && !$secret.client) {
			const { err } = await connect();

			if (!err) {
				connected = true;
			}

			if (err) {
				toastMsg = 'There was an error reconnecting to Keplr';
				toastIsVisible = true;
			}
		} else if (session === 'true' && $secret.client && $user.id !== -1) {
			connected = true;
			console.log('Keplr client exists in store already.');
		}
	});

	onDestroy(() => {
		unsubSecret();
		unsubUser();
	});

	function reset() {
		learn = false;
		build = false;
		dashboard = false;
	}

	async function getOrCreateUser(address: string) {
		try {
			const data = { address };
			console.log(JSON.stringify(data));
			await fetch('/api/v1/user', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			})
				.then((res) => res.json())
				.then((res) => {
					console.log(res);
					$user.id = res.data.id;
					$user.address = res.data.address;
				});

			toastMsg = 'Successfully connected to Secret University';
			toastKind = 'success';
			toastIsVisible = true;

			console.log($user);
		} catch (err) {
			if (err) {
				toastMsg = 'There was an error creating or finding your user';
				toastIsVisible = true;
			}
		}
	}

	async function handleConnect() {
		try {
			let con: Connection = await connect();

			if (con.address) {
				await getOrCreateUser(con.address);
			} else {
				toastMsg = 'There was an error connecting you to Secret University';
				toastIsVisible = true;
			}
		} catch (err) {
			if (err) {
				toastMsg = 'There was an error connecting to Keplr';
				toastIsVisible = true;
			}
		}
	}
</script>

<div class="relative">
	{#if toastIsVisible}
		<Toast kind={toastKind} msg={toastMsg} />
	{/if}

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
					<a href="/learn" class="hover:text-gray-text font-medium text-white"> Learn </a>
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
								<a href="/repositories">Repositores</a>
								<a href="/resources">Community Resources</a>
								<a href="https://docs.scrt.network">Official Docs</a>
							</div>
						</div>
					{/if}
				</span>

				<span class="relative inline-flex items-center gap-x-2">
					<a href="/build" class="font-medium text-white hover:text-gray"> Build </a>
					<img
						on:click={() => (build = true)}
						class="inline-block h-3.5 w-3.5 cursor-pointer"
						src={ChevronDown}
						alt="Contribute to Secret University and Secret Network"
					/>

					{#if build}
						<div
							use:clickOutside
							on:click_outside={() => (build = false)}
							class="absolute top-0 left-0 z-10 mt-10 w-max rounded-md border border-gray bg-dark-4 p-4"
						>
							<div class="grid-col-1 grid gap-y-2 overflow-visible border-gray text-white">
								<a href="/build">Contribute</a>
								<a href="/bounties">Bounties</a>
							</div>
						</div>
					{/if}
				</span>
				<a href="/support" class="font-medium text-white hover:text-gray">Support</a>
			</div>
		</div>

		<div class="hidden pr-4 text-right md:block">
			<span class="relative inline-flex rounded-md shadow-md">
				{#if connected}
					<button
						on:click={() => goto('/dashboard')}
						class="inline-flex h-12 cursor-pointer items-center rounded-md border border-transparent bg-dark-blue px-4 py-2 font-semibold text-white"
						>Dashboard</button
					>
				{:else}
					<button
						on:click={handleConnect}
						class="inline-flex h-12 cursor-pointer items-center rounded-md border border-transparent bg-dark-blue px-4 py-2 font-semibold text-white"
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
