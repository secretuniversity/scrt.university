<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	const pageTitle = 'Submit a Video';
	const pageDescription =
		"Got a screencast you'd like to share with our developers? We're actively supporting videos that help our developers build better applications on Secret";

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
			name: 'Submit a Video',
			path: '/submit/video'
		}
	];

	let title = '';
	let description = '';
	let file: File;
</script>

<Head {pageTitle} />

<section class="mx-auto w-11/12 py-8">
	<Breadcrumb routes={breadcrumbRoutes} />
	<PageHeader title={pageTitle} description={pageDescription} />
</section>

<section class="mx-auto grid w-11/12 grid-cols-3 gap-x-8 gap-y-4 pt-8 pb-36">
	<div class="col-start-2 h-fit flex-col space-y-6">
		<div class="inline-flex w-full items-center">
			<label for="title" class="mr-4 block text-base font-medium text-white">Title</label>
			<input
				type="text"
				name="title"
				id="title"
				value={title}
				class="block w-full rounded-md border-white bg-dark-3 text-white shadow-sm"
				placeholder="My Secret Video..."
			/>
		</div>

		<label for="description" class="block text-base font-medium text-white">Description</label>
		<div>
			<textarea
				name="description"
				id="description"
				value={description}
				class="block h-36 w-full resize-none rounded-md border-white bg-dark-3 text-white shadow-sm"
				placeholder="Enter a brief introduction of your article..."
			/>
		</div>

		<label for="description" class="block text-base font-medium text-white">Video File (.mp4)</label
		>
		<input value={file} type="file" />

		<p class="mb-4 text-sm italic text-gray">
			Before submitting, be sure you have read the standards and practices for creating videos on
			Secret University. Standards for all university contributions can be found in the public
			Secret University notion.
		</p>

		<div>
			<button class="mr-2 rounded-md bg-dark-blue px-6 py-2 text-white">Submit</button>
		</div>
	</div>
</section>
