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

<section class="mx-auto w-11/12 py-8">
	<Breadcrumb routes={breadcrumbRoutes} />
	<PageHeader title={pageTitle} description={pageDescription} />
</section>

<section class="mx-auto grid w-11/12 grid-cols-3 gap-x-8 gap-y-4 pt-8 pb-36">
	<div class="col-start-1 h-fit flex-col space-y-6">
		<div class="inline-flex items-center w-full">
			<label for="title" class="block text-base font-medium text-white mr-4">Title</label>
			<input
				type="text"
				name="title"
				id="title"
				value={title}
				class="text-white block w-full rounded-md border-white bg-dark-3 shadow-sm"
				placeholder="My Secret Article..."
			/>
		</div>

		<label for="description" class="block text-base font-medium text-white">Description</label>
		<div>
			<textarea
				name="description"
				id="description"
				value={description}
				class="text-white block h-36 w-full resize-none rounded-md border-white bg-dark-3 shadow-sm"
				placeholder="Enter a brief introduction of your article..."
			/>
		</div>

		<p class="mb-4 text-sm italic text-gray">
			Before submitting, be sure you have read the standards and practices for writing Articles on
			Secret University. Standards for all university contributions can be found in the public
			Secret University notion.
		</p>
		<div>
			<button class="mr-2 rounded-md bg-dark-blue px-6 py-2 text-white">Submit</button>
			<button class="rounded-md bg-dark-4 px-6 py-2 text-white">Save Draft</button>
		</div>
	</div>

	<div class="col-span-full col-start-2">
		<div
			class="h-[800px] max-h-[800px] overflow-hidden rounded-md border border-solid border-white text-white"
		>
			<TipTap />
		</div>
	</div>
</section>
