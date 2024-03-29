<script lang="ts">
	import { goto } from '$app/navigation';
	import { navigating } from '$app/stores';
	import { clickOutside } from '$lib/directives/clickOutside';
	import { getBaseAPIUrl, getNotification, isExpired, loadJWT } from '$lib/helpers/index';
	import { connect } from '$lib/helpers/keplr';
	import { notes, secretClient, user } from '$lib/stores';

	let learn = false;
	let build = false;

	$: if ($navigating) reset();
	$: loggedIn = $user && $secretClient && loadJWT('user');

	function reset() {
		learn = false;
		build = false;
	}

	async function login(address: string): Promise<User.Self> {
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

			$notes = [
				...$notes,
				getNotification('Successfully connected to Secret University', 'success')
			];
			return Promise.resolve(json.user);
		} catch (err) {
			$notes = [...$notes, getNotification(err as string, 'error')];
			return Promise.reject(err);
		}
	}

	async function handleConnect() {
		const localUser = localStorage.getItem('user');
		try {
			// Connect to Keplr
			await connect();

			// SecretStore should be populated by now
			if (!$secretClient) {
				$notes = [...$notes, getNotification('Error connecting to Keplr', 'error')];
				return;
			}

			if (localUser) {
				$user = JSON.parse(localUser);
			}

			// Check if user is already logged in
			if ($user && !isExpired($user.exp) && loadJWT('user')) {
				return;
			}

			const res = await login($secretClient.val.address);
			const exp = new Date();

			exp.setDate(exp.getDate() + 1);

			$user = { val: res, exp: exp.getTime() };
			localStorage.setItem('local-user', JSON.stringify($user));
		} catch (err) {
			$notes = [...$notes, getNotification(err as string, 'error')];
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
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								learn = true;
							}
						}}
						class="inline-block h-3.5 w-3.5 cursor-pointer"
						src="/images/icons/chevron_down_white.svg"
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
					<img
						on:click={() => (build = true)}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								build = true;
							}
						}}
						class="inline-block h-3.5 w-3.5 cursor-pointer"
						src="/images/icons/chevron_down_white.svg"
						alt="Learn to build on Secret Network"
					/>
					{#if build}
						<div
							use:clickOutside
							on:click_outside={() => (build = false)}
							class="absolute top-0 left-0 z-10 mt-10 w-max rounded-md border border-gray bg-dark-4 p-4"
						>
							<div class="grid-col-1 grid gap-y-2 overflow-visible border-gray text-white">
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
								src="/images/icons/wallet_icon.svg"
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
