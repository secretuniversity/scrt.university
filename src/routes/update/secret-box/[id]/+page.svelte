<script lang="ts">
	import { goto } from '$app/navigation';
	import TagInput from '$lib/components/forms/TagInput.svelte';
	import Breadcrumb from '$lib/components/page/Breadcrumb.svelte';
	import Head from '$lib/components/page/Head.svelte';
	import PageHeader from '$lib/components/page/PageHeader.svelte';
	import { getBaseAPIUrl, getNotification } from '$lib/helpers';
	import { notes, user } from '$lib/stores';
	import { onMount } from 'svelte';
	import type { InferType, ValidationError } from 'yup';
	import { array, number, object, string } from 'yup';

	export let data: Page.SecretBox;

	const pageTitle = 'Update Your Secret Box';
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
		tags: array().of(string()).required('Tags are required')
	});

	interface SecretBox extends InferType<typeof secretBoxSchema> {
		title: string;
		description: string;
		url: string;
		difficulty: string;
		devEnv: string;
		tags: string[];
	}

	let secretBox: SecretBox = {
		title: '',
		description: '',
		url: '',
		contributor: -1,
		difficulty: '',
		devEnv: '',
		tags: []
	};

	let hasTitleError = false;
	let hasDescriptionError = false;
	let hasUrlError = false;
	let hasDifficultyError = false;
	let hasDevEnvError = false;

	onMount(async () => {
		if (!$user) {
			$notes = [...$notes, getNotification('You must be logged in to update an article.', 'error')];
			goto('/');
			return;
		}

		const userId = $user.val.id;
		const contributorId = data.box.contributor;

		if (userId !== contributorId) {
			$notes = [
				...$notes,
				getNotification('You must be the author of the article to update it.', 'error')
			];
			goto('/');
			return;
		}

		secretBox.title = data.box.title;
		secretBox.description = data.box.description;
		secretBox.url = data.box.repo_url;
		secretBox.contributor = data.box.contributor;
		secretBox.difficulty = data.box.difficulty;
		secretBox.devEnv = data.box.dev_env;
		secretBox.tags = data.box.tags;
	});

	async function submit() {
		const token = sessionStorage.getItem('user');

		if (!$user || !token) {
			const n = getNotification('You must be logged in to submit a video.', 'error');
			$notes = [...$notes, n];
			return;
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

		try {
			const url = getBaseAPIUrl() + '/v1/secret-boxes';
			const res = await fetch(url, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					id: data.box.id,
					title: secretBox.title,
					description: secretBox.description,
					repo_url: secretBox.url,
					contributor: secretBox.contributor,
					difficulty: secretBox.difficulty,
					dev_env: secretBox.devEnv,
					tags: secretBox.tags
				})
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
	<PageHeader
		image="/images/illustrations/developer.svg"
		title={pageTitle}
		description={pageDescription}
	/>
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

		<TagInput
			tags={secretBox.tags || []}
			artifact={'secret box'}
			on:update={(e) => (secretBox.tags = e.detail.tags)}
		/>

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
