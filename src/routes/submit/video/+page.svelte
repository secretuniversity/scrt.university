<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import TagInput from '$lib/components/TagInput.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import { contributor } from '$lib/stores';
	import { loadJWT } from '$lib/helpers';

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
	let files: FileList;
	let tags: string[] = [];

	let toastIsVisible = false;
	let toastMessage = '';
	let toastType = '';

	function submit() {
		const token = loadJWT('contributor');

		if (!$contributor || !token) {
			return;
		}

		const formData = new FormData();
		formData.append('title', title);
		formData.append('description', description);
		formData.append('contributor', $contributor.val.id.toString());
		formData.append('file', files[0]);
		tags.forEach((tag) => formData.append('tags', tag));

		fetch('/api/v1/video', {
			method: 'POST',
			headers: {
				Token: token
			},
			body: formData
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				if (res.success) {
					toastMessage = 'Video submitted successfully!';
					toastType = 'success';
					toastIsVisible = true;
				} else {
					toastMessage = 'Video submission failed.';
					toastType = 'fail';
					toastIsVisible = true;
				}
			});
	}
</script>

<Head {pageTitle} />

{#if toastIsVisible}
	<Toast msg={toastMessage} kind={toastType} />
{/if}

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
				bind:value={title}
				class="block w-full rounded-md border-white bg-dark-3 text-white shadow-sm"
				placeholder="My Secret Video..."
			/>
		</div>

		<label for="description" class="block text-base font-medium text-white">Description</label>
		<div>
			<textarea
				name="description"
				id="description"
				bind:value={description}
				class="block h-36 w-full resize-none rounded-md border-white bg-dark-3 text-white shadow-sm"
				placeholder="Enter a brief introduction of your article..."
			/>
		</div>

		<label class="block cursor-pointer text-sm font-medium text-white" for="file_input"
			>Upload video <span class="text-dark-5">MP4</span></label
		>
		<input
			class="block w-full cursor-pointer rounded-lg border border-white text-sm text-white focus:outline-none"
			aria-describedby="file_input_help"
			id="file_input"
			type="file"
			bind:files
		/>

		<TagInput artifact={'video'} on:update={(e) => (tags = e.detail.tags)} />

		<p class="mb-4 text-sm italic text-gray">
			Before submitting, be sure you have read the standards and practices for creating videos on
			Secret University. Standards for all university contributions can be found in the public
			Secret University notion.
		</p>

		<div>
			<button on:click={submit} class="mr-2 rounded-md bg-dark-blue px-6 py-2 text-white"
				>Submit</button
			>
		</div>
	</div>
</section>
