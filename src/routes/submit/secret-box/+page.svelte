<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Banner from '$lib/components/Banner.svelte';

	const pageTitle = 'Submit a Secret Box';
	const pageDescription = `Have you created a tool, template, or some kind of cool concept while 
        building on Secret? You may have the chance to be rewarded for your work by submitting a Secret Box.
    `;

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
	let github = '';
	let difficulty = '';
	let devEnv = '';
	let bannerImg: File;
</script>

<Head {pageTitle} />

<section class="mx-auto w-11/12 py-8">
	<Breadcrumb routes={breadcrumbRoutes} />
	<PageHeader title={pageTitle} description={pageDescription} />
</section>

<section class="mx-auto grid w-11/12 grid-cols-3 gap-x-8 gap-y-4 pt-8 pb-36">
	<div class="col-start-2 h-fit flex-col space-y-6">
		<div class="inline-flex items-center w-full">
			<label for="title" class="block text-base font-medium text-white mr-4">Title</label>
			<input
				type="text"
				name="title"
				id="title"
				value={title}
				class="text-white block w-full rounded-md border-white bg-dark-3 shadow-sm"
				placeholder="My Secret Box"
			/>
		</div>

		<label for="description" class="block text-base font-medium text-white">Description</label>
		<div>
			<textarea
				name="description"
				id="description"
				value={description}
				class="text-white block h-36 w-full resize-none rounded-md border-white bg-dark-3 shadow-sm"
				placeholder="What's in your Secet Box?"
			/>
		</div>

		<div class="inline-flex items-center w-full">
			<label for="github" class="block text-base font-medium text-white mr-4">Repo</label>
			<input
				type="text"
				name="github"
				id="github"
				value={github}
				class="text-white block w-full rounded-md border-white bg-dark-3 shadow-sm"
				placeholder="https://github.com/you/your-repo"
			/>
		</div>

		<div class="inline-flex items-center w-full">
			<label for="dev-env" class="block text-base font-medium text-white mr-4">Deployment</label>
			<input
				type="text"
				name="dev-env"
				id="dev-env"
				value={devEnv}
				class="text-white block w-full rounded-md border-white bg-dark-3 shadow-sm"
				placeholder="https://gitpod.com/you/your-gitpod-url"
			/>
		</div>

		<label for="difficulty" class="block text-base font-medium text-white">Difficulty</label>
		<select value={difficulty} name="difficulty" id="difficulty">
			<option value="introductory">Introductory</option>
			<option value="intermediate">Intermediate</option>
			<option value="Advanced">Advanced</option>
		</select>

		<label for="banner-img" class="block text-base font-medium text-white"
			>Banner Image (Optional)</label
		>
		<input value={bannerImg} type="file" />

		<p class="mb-4 text-sm italic text-gray">
			Before submitting, be sure you have read the standards and practices for creating Secret Boxes
			on Secret University. Standards for all university contributions can be found in the public
			Secret University notion.
		</p>

		<div>
			<button class="mr-2 rounded-md bg-dark-blue px-6 py-2 text-white">Submit</button>
		</div>
	</div>
</section>