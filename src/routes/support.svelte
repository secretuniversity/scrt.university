<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import SupportTicket from '$lib/components/support-ticket/SupportTicket.svelte';
	const pageTitle = 'Support';
</script>

<Head {pageTitle} />

<div class="grid grid-cols-1 items-center justify-items-center pt-16 pb-24 lg:grid-cols-2">
	<div class="max-w-2xl flex-col py-16 lg:max-w-3xl lg:px-8">
		<h1 class="self-start text-3xl font-bold text-white">Need Support?</h1>
		<p class="my-4 text-base text-gray">
			Are you having trouble working through a course or guide. We're here to help. Submit a support
			ticket and we will get back to you soon. If you need faster support, consider asking your
			question in on Secret Network's many community channels.
		</p>
		<a
			href="/support#community"
			class="inline-flex items-center justify-self-center rounded-md border border-transparent bg-dark-blue px-4 py-2 text-base font-medium text-white hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>Join The Community</a
		>
	</div>

	<div class="w-9/12 overflow-hidden rounded-lg bg-dark-4 px-12 py-14 shadow-lg">
		<SupportTicket />
	</div>
</div>

<div id="community" class="bg-dark-2 pb-36">
	<SectionHeader
		title={'Secret Community'}
		subtitle={'Join the community'}
		description={'Find the answers to your questions in one of our many community channels.'}
	/>

	<div class="mx-auto mt-8 flex max-w-7xl gap-x-12">
		<div class="flex flex-col items-center lg:w-4/12">
			<!-- <img src="" alt=""> -->
			<h2 class="mb-3 text-lg font-semibold text-white">Chat on Discord</h2>
			<p class="mb-4 text-center text-base text-gray">
				Have real-time discussions with developers building on Secret Network
			</p>
			<a
				href="#"
				class="inline-flex items-center rounded-md border border-transparent bg-light-cream px-4 py-2 text-base font-medium text-dark-2 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>Join Discord</a
			>
		</div>

		<div class="flex flex-col items-center lg:w-4/12">
			<!-- <img src="" alt=""> -->
			<h2 class="mb-3 text-lg font-semibold text-white">Post on the Forum</h2>
			<p class="mb-4 text-center text-base text-gray">
				Have real-time discussions with developers building on Secret Network
			</p>
			<a
				href="#"
				class="inline-flex items-center rounded-md border border-transparent bg-light-cream px-4 py-2 text-base font-medium text-dark-2 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>Join Discussion</a
			>
		</div>

		<div class="flex flex-col items-center lg:w-4/12">
			<!-- <img src="" alt=""> -->
			<h2 class="mb-3 text-lg font-semibold text-white">Find us on Github</h2>
			<p class="mb-4 text-center text-base text-gray">
				Have real-time discussions with developers building on Secret Network
			</p>
			<a
				href="#"
				class="inline-flex items-center rounded-md border border-transparent bg-light-cream px-4 py-2 text-base font-medium text-dark-2 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>Check Github</a
			>
		</div>
	</div>
</div>
