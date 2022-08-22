<script lang="ts">
	import { navigating } from '$app/stores';
	import { clickOutside } from '$lib/directives/clickOutside';
	import WalletIcon from '$lib/assets/wallet_icon.svg';
	import ChevronDown from '$lib/assets/chevron_down_white.svg';

	// Dropdown flags
	let learn = false;
	let contribute = false;

	$: if ($navigating) reset();

	function reset() {
		learn = false;
		contribute = false;
	}
</script>

<div>
	<nav
		class="relative flex items-center justify-between bg-dark-4 py-3 shadow-xl sm:px-6"
		aria-label="Global"
	>
		<div class="flex flex-1 items-center pl-4">
			<div class="flex w-full items-center justify-between md:w-auto">
				<a href="/">
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
					<a href="/contribute" class="font-medium text-white hover:text-gray"> Contribute </a>
					<img
						on:click={() => (contribute = true)}
						class="inline-block h-3.5 w-3.5 cursor-pointer"
						src={ChevronDown}
						alt="Contribute to Secret University and Secret Network"
					/>

					{#if contribute}
						<div
							use:clickOutside
							on:click_outside={() => (contribute = false)}
							class="absolute top-0 left-0 z-10 mt-10 w-max rounded-md border border-gray bg-dark-4 p-4"
						>
							<div class="grid-col-1 grid gap-y-2 overflow-visible border-gray text-white">
								<a href="#">Application</a>
								<a href="/bounties">Bounties</a>
							</div>
						</div>
					{/if}
				</span>
				<a href="/support" class="font-medium text-white hover:text-gray">Support</a>
			</div>
		</div>

		<div class="hidden pr-4 text-right md:block">
			<span class="inline-flex rounded-md shadow-md">
				<button
					class="inline-flex items-center rounded-md border border-transparent bg-dark-blue px-4 py-2 font-semibold text-white"
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
			</span>
		</div>
	</nav>

	<!--
	        Mobile menu, show/hide based on menu open state.

	        Entering: "duration-150 ease-out"
	          From: "opacity-0 scale-95"
	          To: "opacity-100 scale-100"
	        Leaving: "duration-100 ease-in"
	          From: "opacity-100 scale-100"
	          To: "opacity-0 scale-95"
	      -->
	<div class="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden">
		<div class="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
			<div class="flex items-center justify-between px-5 pt-4">
				<div>
					<img
						class="h-8 w-auto"
						src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
						alt=""
					/>
				</div>
				<div class="-mr-2">
					<button
						type="button"
						class="text-gray-400 hover:bg-gray-100 hover:text-gray-500 inline-flex items-center justify-center rounded-md bg-white p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
					>
						<span class="sr-only">Close main menu</span>
						<!-- Heroicon name: outline/x -->
						<svg
							class="h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</div>
			<div class="space-y-1 px-2 pt-2 pb-3">
				<a
					href="#"
					class="text-gray-700 hover:bg-gray-50 hover:text-gray-900 block rounded-md px-3 py-2 text-base font-medium"
					>Product</a
				>

				<a
					href="#"
					class="text-gray-700 hover:bg-gray-50 hover:text-gray-900 block rounded-md px-3 py-2 text-base font-medium"
					>Features</a
				>

				<a
					href="#"
					class="text-gray-700 hover:bg-gray-50 hover:text-gray-900 block rounded-md px-3 py-2 text-base font-medium"
					>Marketplace</a
				>

				<a
					href="#"
					class="text-gray-700 hover:bg-gray-50 hover:text-gray-900 block rounded-md px-3 py-2 text-base font-medium"
					>Company</a
				>
			</div>
			<a
				href="#"
				class="bg-gray-50 hover:bg-gray-100 block w-full px-5 py-3 text-center font-medium text-indigo-600"
			>
				Log in
			</a>
		</div>
	</div>
</div>
