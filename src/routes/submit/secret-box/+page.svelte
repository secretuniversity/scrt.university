<script lang="ts">
	import Image from '$lib/assets/illustrations/developer.svg';
	import Head from '$lib/components/Head.svelte';
	import Breadcrumb from '$lib/components/page/Breadcrumb.svelte';
	import PageHeader from '$lib/components/page/PageHeader.svelte';
	import TagInput from '$lib/components/forms/TagInput.svelte';
	import { user, notes } from '$lib/stores';
	import { getBaseAPIUrl, getNotification } from '$lib/helpers';
	import { goto } from '$app/navigation';
	import { array, number, object, string, mixed } from 'yup';
	import type { InferType, ValidationError } from 'yup';

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

	const secretBoxSchema = object({
		title: string().required('Title is required'),
		description: string().required('Description is required'),
		url: string().required('URL is required'),
		contributor: number().required('Contributor is required'),
		devEnv: string(),
		difficulty: string().required('Difficulty is required'),
		file: mixed().nullable(),
		tags: array().of(string()).required('Tags are required')
	});

	interface SecretBox extends InferType<typeof secretBoxSchema> {
		title: string;
		description: string;
		url: string;
		difficulty: string;
		devEnv: string;
		file: File | null;
		tags: string[];
	}

	let secretBox: SecretBox = {
		title: '',
		description: '',
		url: '',
		contributor: -1,
		difficulty: '',
		devEnv: '',
		file: null,
		tags: []
	};

	let files: FileList;

	let hasTitleError = false;
	let hasDescriptionError = false;
	let hasUrlError = false;
	let hasDifficultyError = false;
	let hasDevEnvError = false;

	async function submit() {
		const token = sessionStorage.getItem('user');

		if (!$user || !token) {
			const n = getNotification('You must be logged in to submit a video.', 'error');
			$notes = [...$notes, n];
			return;
		}

		if (files && files.length > 0) {
			secretBox.file = files[0];
		}

		secretBox.contributor = $user.val.id;

		try {
			await secretBoxSchema.validate(secretBox, { abortEarly: false });
		} catch (err) {
			$notes = [...$notes, getNotification('Your Secret Box has some errors!', 'error')];

			const e = err as ValidationError;

			for (const error of e.inner) {
				switch (error.path) {
					case 'title':
						hasTitleError = true;
						break;
					case 'description':
						hasDescriptionError = true;
						break;
					case 'url':
						hasUrlError = true;
						break;
					case 'difficulty':
						hasDifficultyError = true;
						break;
					case 'devEnv':
						hasDevEnvError = true;
						break;
				}
			}

			return;
		}

		const formData = new FormData();
		formData.append('title', secretBox.title);
		formData.append('description', secretBox.description);
		formData.append('repo_url', secretBox.url);
		formData.append('contributor', secretBox.contributor.toString());
		formData.append('difficulty', secretBox.difficulty);
		formData.append('dev_env', secretBox.devEnv);
		if (secretBox.file) {
			formData.append('file', secretBox.file);
		}
		secretBox.tags.forEach((tag) => formData.append('tags', tag));

		try {
			const url = getBaseAPIUrl() + '/v1/secret-boxes';
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				},
				body: formData
			});

			if (res.status === 200) {
				const n = getNotification('Secret Box submitted successfully!', 'success');
				$notes = [...$notes, n];

				goto('/dashboard');
			} else {
				const n = getNotification('There was an error submitting your Secret Box.', 'error');
				$notes = [...$notes, n];
			}
		} catch (err) {
			const n = getNotification(err as string, 'error');
			$notes = [...$notes, n];
		}
	}
</script>

<Head {pageTitle} />

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
			<label for="title" class="mr-4 block text-sm font-medium text-white">Title</label>
			<input
				type="text"
				name="title"
				id="title"
				on:focus={() => (hasTitleError = false)}
				bind:value={secretBox.title}
				class="block w-full rounded-md border-white bg-dark-3 text-white shadow-sm"
				placeholder="My Secret Box"
			/>
		</div>

		{#if hasDescriptionError}
			<p class="italic text-dark-red">Description is required</p>
		{/if}

		<label for="description" class="block text-sm font-medium text-white">Description</label>
		<div>
			<textarea
				name="description"
				id="description"
				on:focus={() => (hasDescriptionError = false)}
				bind:value={secretBox.description}
				class="block h-36 w-full resize-none rounded-md border-white bg-dark-3 text-white shadow-sm"
				placeholder="What's in your Secet Box?"
			/>
		</div>

		{#if hasUrlError}
			<p class="italic text-dark-red">Github URL is required</p>
		{/if}

		<div class="inline-flex w-full items-center">
			<label for="github" class="mr-4 block text-sm font-medium text-white">Repo</label>
			<input
				type="text"
				name="github"
				id="github"
				on:focus={() => (hasUrlError = false)}
				bind:value={secretBox.url}
				class="block w-full rounded-md border-white bg-dark-3 text-white shadow-sm"
				placeholder="https://github.com/you/your-repo"
			/>
		</div>

		{#if hasDevEnvError}
			<p class="italic text-dark-red">Developer Environment is required</p>
		{/if}

		<div class="inline-flex w-full items-center">
			<label for="dev-env" class="mr-4 block text-sm font-medium text-white"
				>Deployment (Optional)</label
			>
			<input
				type="text"
				name="dev-env"
				id="dev-env"
				on:focus={() => (hasDevEnvError = false)}
				bind:value={secretBox.devEnv}
				class="block w-full rounded-md border-white bg-dark-3 text-white shadow-sm"
				placeholder="https://gitpod.com/you/your-gitpod-url"
			/>
		</div>

		{#if hasDifficultyError}
			<p class="italic text-dark-red">Difficulty is required</p>
		{/if}

		<label for="difficulty" class="block text-sm font-medium text-white">Difficulty</label>
		<select
			bind:value={secretBox.difficulty}
			on:focus={() => (hasDifficultyError = false)}
			id="difficulty"
			name="difficulty"
			class="mt-1 block w-full rounded-md border-2 border-white bg-dark-3 py-2 pl-3 pr-10 text-base text-white focus:border-dark-blue focus:outline-none focus:ring-dark-blue"
		>
			<option value="introductory" selected>Introductory</option>
			<option value="intermediate">Intermediate</option>
			<option value="Advanced">Advanced</option>
		</select>

		<label for="banner-img" class="block text-sm font-medium text-white"
			>Banner Image (optional .JPG)</label
		>

		<input
			class="block w-full cursor-pointer rounded-lg border border-white text-sm text-white focus:outline-none"
			aria-describedby="file_input_help"
			id="banner-img"
			accept="image/jpg"
			type="file"
			bind:files
		/>

		<TagInput artifact={'secret box'} on:update={(e) => (secretBox.tags = e.detail.tags)} />

		<p class="mb-4 text-sm italic text-gray">
			Before submitting, be sure you have read the standards and practices for creating Secret Boxes
			on Secret University. Standards for all university contributions can be found in the public
			Secret University notion.
		</p>

		<div>
			<button
				on:click={() => submit()}
				class="mr-2 rounded-md bg-dark-blue px-6 py-2 text-white hover:bg-darker-blue"
				>Submit</button
			>
		</div>
	</div>
</section>
