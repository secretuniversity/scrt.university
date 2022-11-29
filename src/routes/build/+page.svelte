<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import ContributorForm from '$lib/components/ContributorForm.svelte';
	import GoldPot from '$lib/assets/illustrations/gold_pot.svg';
	import CodeImage from '$lib/assets/illustrations/code.svg';
	import TeachImage from '$lib/assets/illustrations/teach.svg';
	import EarnImage from '$lib/assets/illustrations/earn.svg';
	import { getBaseAPIUrl, getNotification } from '$lib/helpers';
	import { contributorModal, notificationsStore, userStore } from '$lib/stores';

	const pageTitle = 'Build';

	let isModalActive = false;

	async function isContributor(): Promise<boolean> {
		try {
			if (!$userStore)
				return Promise.reject('You need to connect your Keplr wallet to submit this form.');

			const url = getBaseAPIUrl() + '/v1/users/roles?id=' + $userStore.val.id;
			const res = await fetch(url);
			const json = (await res.json()) as string[];

			if (!json) {
				return Promise.resolve(false);
			}

			if (json.includes('contributor')) {
				return Promise.resolve(true);
			}

			return Promise.resolve(false);
		} catch (err) {
			$notificationsStore = [...$notificationsStore, getNotification(err as string, 'error')];
			return Promise.reject(err);
		}
	}

	async function tryShowContributorForm() {
		try {
			const is = await isContributor();
			if (!is) {
				$contributorModal = true;
			} else {
				$notificationsStore = [
					...$notificationsStore,
					getNotification('You are already a contributor.', 'info')
				];
			}
		} catch (err) {
			$notificationsStore = [...$notificationsStore, getNotification(err as string, 'error')];
		}
	}
</script>

<ContributorForm />

<Head {pageTitle} />

<div class="mx-auto max-w-2xl pt-20 pb-10">
	<h1 class="text-center text-6xl font-bold text-white">Learn to Earn</h1>
	<p class="mt-2 text-center text-base text-gray">
		Secret University is an open platform for developers building on Secret Network. Builders of all
		skill levels are encouraged to become educators of the community and help guide others along a
		path towards privacy & security.
	</p>
</div>

<div class="my-8 flex justify-center gap-x-40">
	<div class="lg:max-w-xs">
		<img class="mx-auto h-56 w-56" src={CodeImage} alt="code your next project on secret" />
		<h2 class="mt-4 text-center text-lg font-semibold text-white">Code</h2>
		<p class="mt-2 text-center text-base text-gray">
			Build your next project on Secret and learn to build private decentralized applications.
		</p>
	</div>

	<div class="lg:max-w-xs">
		<img
			class="mx-auto h-56 w-56"
			src={TeachImage}
			alt="teach for the next generation of builders on secret"
		/>
		<h2 class="mt-4 text-center text-lg font-semibold text-white">Teach</h2>
		<p class="mt-2 text-center text-base text-gray">
			From video to courses, Secret University supports all kinds of educational material and wants
			your help creating it.
		</p>
	</div>

	<div class="lg:max-w-xs">
		<img
			class="mx-auto h-56 w-56"
			src={EarnImage}
			alt="earn SCRT for your contributions to secret university"
		/>
		<h2 class="mt-4 text-center text-lg font-semibold text-white">Earn</h2>
		<p class="mt-2 text-center text-base text-gray">
			Your work on Secret is valuable. Earn real crypto for educating the community and become a
			member of Secret University
		</p>
	</div>
</div>

<div class="mt-20 mb-36 flex justify-center">
	<button
		on:click={() => tryShowContributorForm()}
		type="button"
		class="inline-flex items-center rounded-md border border-transparent bg-dark-blue px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-darker-blue"
		>Become A Contributor</button
	>
</div>

<div class="grid grid-cols-3 items-center justify-items-center bg-dark-2 py-32 text-white">
	<div class="col-span-2 grid gap-y-6">
		<p class="text-base font-semibold text-dark-turquoise-g">COMMUNITY CURATED BOUNTIES</p>
		<p class="text-4xl font-bold">Looking for your next project?</p>
		<p class="max-w-3xl">
			If you think you've got the skills, try building for the community today. The CCBL is a list
			of bounties requested to be developed by members of Secret Network. Complete the bounty, and
			earn your reward in SCRT
		</p>

		<div class="flex justify-start bg-dark-2">
			<a
				href="/bounties"
				type="button"
				class="inline-flex items-center rounded-md border border-transparent bg-light-cream px-6 py-3 text-base font-medium text-dark-2 shadow-sm hover:bg-darker-light-cream"
				>View Bounties</a
			>
		</div>
	</div>

	<img class="h-72 w-72 justify-self-start" src={GoldPot} alt="Pot of gold" />
</div>
