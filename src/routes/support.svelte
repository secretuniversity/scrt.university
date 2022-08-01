<script lang="ts">
	import Head from '$lib/Head.svelte';
	import SectionHeader from '$lib/SectionHeader.svelte';
	import SupportTicket from '$lib/support-ticket/SupportTicket.svelte';
	const pageTitle = 'Support';
</script>

<Head {pageTitle} />

<div class="grid grid-cols-1 items-center justify-items-center pt-16 pb-24 lg:grid-cols-2">
	<div class="max-w-2xl flex-col py-16 lg:max-w-3xl lg:px-8">
		<h1 class="self-start text-3xl font-bold text-gray-900">Need Support?</h1>
		<p class="my-4 text-base text-gray-600">
			Are you having trouble working through a course or guide. We're here to help. Submit a support
			ticket and we will get back to you soon. If you need faster support, consider asking your
			question in on Secret Network's many community channels.
		</p>
		<a
			href="/support#community"
			class="inline-flex items-center justify-self-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-base font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>Join The Community</a
		>
	</div>

	<div class="w-9/12 overflow-hidden rounded-lg px-12 py-14 shadow-lg">
		<SupportTicket />
	</div>
</div>

<div id="community" class="mb-36">
	<SectionHeader
		title={'Secret Community'}
		subtitle={'Join the community'}
		description={'Find the answers to your questions in one of our many community channels.'}
	/>

	<div class="mx-auto mt-8 flex max-w-7xl gap-x-12">
		<div class="lg:w-4/12">
			<!-- <img src="" alt=""> -->
			<h2 class="mb-3 text-center text-lg font-semibold text-gray-900">Chat on Discord</h2>
			<p class="mb-4 text-center text-base text-gray-600">
				Have real-time discussions with developers building on Secret Network
			</p>
			<a
				href="#"
				class="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-base font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>Join Discord</a
			>
		</div>

		<div class="lg:w-4/12">
			<!-- <img src="" alt=""> -->
			<h2 class="mb-3 text-center text-lg font-semibold text-gray-900">Post on the Forum</h2>
			<p class="mb-4 text-center text-base text-gray-600">
				Have real-time discussions with developers building on Secret Network
			</p>
			<a
				href="#"
				class="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-base font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>Join Discussions</a
			>
		</div>

		<div class="lg:w-4/12">
			<!-- <img src="" alt=""> -->
			<h2 class="mb-3 text-center text-lg font-semibold text-gray-900">Find us on Github</h2>
			<p class="mb-4 text-center text-base text-gray-600">
				Have real-time discussions with developers building on Secret Network
			</p>
			<a
				href="#"
				class="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-base font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>Open an Issue</a
			>
		</div>
	</div>
</div>
