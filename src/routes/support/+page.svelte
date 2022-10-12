<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import SupportTicket from '$lib/components/support-ticket/SupportTicket.svelte';
	import DiscordLogo from '$lib/assets/discord_logo.svg';
	import GithubLogo from '$lib/assets/github_logo.png';
	import SecretLogo from '$lib/assets/secret_logo.svg';
	import Staking from '$lib/components/Staking.svelte';
	import Image from '$lib/assets/illustrations/support.svg';

	const pageTitle = 'Support';
</script>

<Head {pageTitle} />

<div class="grid grid-cols-4 justify-items-center pt-20 lg:grid-cols-2">
	<div class="flex max-w-2xl flex-col lg:max-w-3xl lg:px-8">
		<h1 class="mt-8 text-6xl font-bold text-white">Need some help?</h1>
		<p class="my-4 text-base text-gray">
			Are you having trouble working through a course or guide. We're here to help. Submit a support
			ticket and we will get back to you soon. If you need faster support, consider asking your
			question in on Secret Network's many community channels.
		</p>
		<a
			href="/support#community"
			class="inline-flex w-fit items-center self-end rounded-md border border-transparent bg-dark-blue px-4 py-2 text-base font-medium text-white hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>Join The Community</a
		>

		<img src={Image} alt="support illustration" />
	</div>

	<div class="h-fit w-9/12 overflow-hidden rounded-lg bg-dark-4 px-12 py-14 shadow-lg">
		<SupportTicket />
	</div>
</div>

<div id="staking" class="pb-20">
	<Staking />
</div>

<div id="community" class="bg-dark-2 pb-36">
	<SectionHeader
		title={'Secret Community'}
		subtitle={'Join the community'}
		description={'Find the answers to your questions in one of our many community channels.'}
	/>

	<div class="mx-auto mt-8 flex max-w-7xl gap-x-12">
		<div class="flex flex-col items-center space-y-4 lg:w-4/12">
			<img src={DiscordLogo} alt="Join the Secret Network Discord" />
			<h2 class="text-lg font-semibold text-white">Chat on Discord</h2>
			<p class="text-center text-base text-gray">
				Have real-time discussions with developers building on Secret Network
			</p>
			<a
				href="https://chat.scrt.network"
				class="inline-flex items-center rounded-md border border-transparent bg-light-cream px-4 py-2 text-base font-medium text-dark-2 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>Join Discord</a
			>
		</div>

		<div class="flex flex-col items-center space-y-4 lg:w-4/12">
			<img class="h-14 w-40" src={SecretLogo} alt="Join discussions on the Secret Network forum." />
			<h2 class="text-lg font-semibold text-white">Post on the Forum</h2>
			<p class="text-center text-base text-gray">
				Have real-time discussions with developers building on Secret Network
			</p>
			<a
				href="https://forum.scrt.network"
				class="inline-flex items-center rounded-md border border-transparent bg-light-cream px-4 py-2 text-base font-medium text-dark-2 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>Join Discussion</a
			>
		</div>

		<div class="flex flex-col items-center space-y-4 lg:w-4/12">
			<img src={GithubLogo} alt="Check out Secret University on Github" />
			<h2 class="text-lg font-semibold text-white">Find us on Github</h2>
			<p class="text-center text-base text-gray">
				Have real-time discussions with developers building on Secret Network
			</p>
			<a
				href="https://github.com/secretuniversity/scrt.university"
				class="inline-flex items-center rounded-md border border-transparent bg-light-cream px-4 py-2 text-base font-medium text-dark-2 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>Check Github</a
			>
		</div>
	</div>
</div>
