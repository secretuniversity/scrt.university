<script lang="ts">
	import { goto } from '$app/navigation';
	import Image from '$lib/assets/illustrations/content_creator.svg';
	import TagInput from '$lib/components/forms/TagInput.svelte';
	import Breadcrumb from '$lib/components/page/Breadcrumb.svelte';
	import PageHeader from '$lib/components/page/PageHeader.svelte';
	import { getBaseAPIUrl, getNotification, loadJWT } from '$lib/helpers';
	import { notes, user } from '$lib/stores';
	import type { ValidationError } from 'yup';
	import { array, number, object, string } from 'yup';

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

	const videoSchema = object({
		title: string().required('Title is required'),
		description: string().required('Description is required'),
		contributor: number().required('Contributor is required'),
		tags: array().of(string()).required('Tags are required')
	});

	interface Video {
		title: string;
		description: string;
		contributor: number;
		file: File | null;
		external_url: string;
		tags: string[];
	}

	let files: FileList;

	let video: Video = {
		title: '',
		description: '',
		contributor: -1,
		file: null,
		external_url: '',
		tags: []
	};

	let useExternal = false;

	let hasTitleError = false;
	let hasDescriptionError = false;
	let hasFileError = false;

	async function submit() {
		const token = loadJWT('user');

		if (!$user || !token) {
			const n = getNotification('You must be logged in to submit a video.', 'error');
			$notes = [...$notes, n];
			return;
		}

		video.contributor = $user.val.id;
		if (files && files.length > 0) {
			video.file = files[0];
		}

		try {
			await videoSchema.validate(video, { abortEarly: false });
		} catch (err) {
			$notes = [...$notes, getNotification('Your video has some errors!', 'error')];

			const e = err as ValidationError;

			for (const error of e.inner) {
				switch (error.path) {
					case 'title':
						hasTitleError = true;
						break;
					case 'description':
						hasDescriptionError = true;
						break;
					case 'file':
						hasFileError = true;
						break;
				}
			}

			return;
		}

		const formData = new FormData();
		formData.append('title', video.title);
		formData.append('description', video.description);
		formData.append('contributor', video.contributor.toString());
		formData.append('external_url', video.external_url);
		if (video.file) formData.append('file', video.file);
		video.tags.forEach((tag) => formData.append('tags', tag));

		try {
			const n = getNotification('Submitting video...', 'info', true);
			$notes = [...$notes, n];

			const url = getBaseAPIUrl() + '/v1/videos';
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				},
				body: formData
			});

			if (res.status === 200) {
				$notes = $notes.filter((v) => v.id !== n.id);

				$notes = [...$notes, getNotification('Video submitted successfully!', 'success')];

				goto('/dashboard');
			} else {
				$notes = $notes.filter((v) => v.id !== n.id);

				$notes = [...$notes, getNotification('There was an error submitting your video.', 'error')];
			}
		} catch (err) {
			$notes = [...$notes, getNotification(err as string, 'error')];
		}
	}
</script>

<section class="mx-auto w-11/12 py-8">
	<Breadcrumb routes={breadcrumbRoutes} />
</section>

<section class="mx-auto w-11/12 pb-8">
	<PageHeader image={Image} title={pageTitle} description={pageDescription} />
</section>

<section class="mx-auto grid w-11/12 grid-cols-3 gap-x-8 gap-y-4 pt-8 pb-36">
	<div class="col-start-2 h-fit flex-col space-y-6">
		{#if hasTitleError}
			<p class="italic text-dark-red">Title is required</p>
		{/if}
		<div class="inline-flex w-full items-center">
			<label for="title" class="mr-4 block text-base font-medium text-white">Title</label>
			<input
				type="text"
				name="title"
				id="title"
				on:focus={() => (hasTitleError = false)}
				bind:value={video.title}
				class="block w-full rounded-md border-white bg-dark-3 text-white shadow-sm"
				placeholder="My Secret Video..."
			/>
		</div>

		{#if hasDescriptionError}
			<p class="italic text-dark-red">Description is required</p>
		{/if}

		<label for="description" class="block text-base font-medium text-white">Description</label>
		<div>
			<textarea
				name="description"
				id="description"
				on:focus={() => (hasDescriptionError = false)}
				bind:value={video.description}
				class="block h-36 w-full resize-none rounded-md border-white bg-dark-3 text-white shadow-sm"
				placeholder="Enter a brief introduction of your article..."
			/>
		</div>

		<div class="mb-6 inline-flex items-center space-x-4">
			<input
				on:click={() => (useExternal = !useExternal)}
				type="checkbox"
				name="external"
				id="external"
				class="rounded-sm"
			/>
			<label for="external" class="mr-4 block text-sm font-medium text-white"
				>Provide an external video.</label
			>
		</div>

		{#if useExternal}
			<!-- content here -->
			<input
				type="text"
				name="external-link"
				id="external-link"
				bind:value={video.external_url}
				class="block w-full rounded-md border-white bg-dark-3 text-white shadow-sm"
				placeholder="https://youtube.com/secretnetwork"
			/>
		{:else}
			{#if hasFileError}
				<p class="italic text-dark-red">Video file is required</p>
			{/if}

			<label class="block cursor-pointer text-sm font-medium text-white" for="file_input"
				>Upload video <span class="text-dark-5">MP4</span></label
			>
			<input
				class="block w-full cursor-pointer rounded-lg border border-white text-sm text-white focus:outline-none"
				aria-describedby="file_input_help"
				id="file_input"
				on:change={() => (hasFileError = false)}
				type="file"
				bind:files
			/>
		{/if}

		<TagInput artifact={'video'} on:update={(e) => (video.tags = e.detail.tags)} />

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
