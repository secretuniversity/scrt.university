<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import TipTap from '$lib/components/TipTap.svelte';

	const pageTitle = 'Submit An Article';
	const pageDescription =
		'For those with a knack for writing and endless curiousity, submit your article to Secret University and share your discoveries with the Secret community.';

	const breadcrumbRoutes = [
		{
			name: 'Dashboard',
			path: '/dashboard'
		},
		{
			name: 'Submit',
			path: '/submit'
		},
		{
			name: 'Article',
			path: '/submit/article'
		}
	];

	let title = '';
	let description = '';
	let content = { html: '', text: '' };
</script>

<Head {pageTitle} />

<section class="w-11/12 mx-auto py-8">
	<Breadcrumb routes={breadcrumbRoutes} />
	<PageHeader title={pageTitle} description={pageDescription} />
</section>

<section class="w-11/12 mx-auto py-8 grid grid-cols-3 grid-rows-12 gap-x-4 gap-y-4">
	<div class="col-start-1 flex-col space-y-2 h-fit">
		<label for="title" class="block text-base font-medium text-white">Title</label>
		<div>
			<input
				type="text"
				name="title"
				id="title"
				value={title}
				class="block w-full rounded-md border-white bg-dark-3 shadow-sm"
				placeholder="My Secret Article..."
			/>
		</div>
	</div>

	<div class="col-start-1 row-start-2 flex-col space-y-2 h-fit">
		<label for="title" class="block text-base font-medium text-white">Description</label>
		<div>
			<textarea
				name="description"
				id="description"
				value={description}
				class="block w-full resize-none h-28 rounded-md border-white bg-dark-3 shadow-sm"
				placeholder="Enter a brief introduction of your article..."
			/>
		</div>
	</div>

	<div class="col-start-1 row-start-3">
		<p class="text-gray text-sm italic mb-4">
			Before submitting, be sure you have read the standards and practices for writing Articles on
			Secret University. Standards for all university contributions can be found in the public
			Secret University notion.
		</p>
		<button class="px-6 py-2 bg-dark-4 text-white rounded-md">Submit</button>
	</div>

	<div class="col-start-2 col-span-full row-span-full">
		<div
			class="h-[800px] max-h-[800px] overflow-hidden border border-solid border-white rounded-md text-white"
		>
			<TipTap />
		</div>
	</div>
</section>
