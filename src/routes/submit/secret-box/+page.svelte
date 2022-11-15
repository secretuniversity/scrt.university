<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import TagInput from '$lib/components/TagInput.svelte';
	import { contributorStore, notificationsStore } from '$lib/stores';
	import { getBaseAPIUrl } from '$lib/helpers';

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
	let url = '';
	let difficulty = '';
	let devEnv = '';
	let bannerImg: FileList;
	let tags: string[] = [];

	async function submit() {
		const token = sessionStorage.getItem('contributor');

		if (!$contributorStore || !token) {
			return;
		}

		const formData = new FormData();
		formData.append('title', title);
		formData.append('description', description);
		formData.append('contributor', $contributorStore.val.id.toString());
		formData.append('difficulty', difficulty);
		formData.append('dev_env', devEnv);
		formData.append('banner_img', bannerImg[0]);
		formData.append('url', url);
		tags.forEach((tag) => formData.append('tags', tag));

		try {
			const url = getBaseAPIUrl() + '/v1/secret-boxes';
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					Token: token
				},
				body: formData
			});

			if (res.status === 200) {
				$notificationsStore = [
					{
						message: 'Your Secret Box has been submitted!',
						status: 'success',
						loading: false
					},
					...$notificationsStore
				];
			} else {
				$notificationsStore = [
					{
						message: 'There was an error submitting your Secret Box.',
						status: 'success',
						loading: false
					},
					...$notificationsStore
				];
			}
		} catch (err) {
			$notificationsStore = [
				{
					message: err as string,
					status: 'success',
					loading: false
				},
				...$notificationsStore
			];
		}
	}
</script>

<Head {pageTitle} />

<section class="mx-auto w-11/12 py-8">
	<Breadcrumb routes={breadcrumbRoutes} />
	<PageHeader title={pageTitle} description={pageDescription} />
</section>

<section class="mx-auto grid w-11/12 grid-cols-3 gap-x-8 gap-y-4 pt-8 pb-36">
	<div class="col-start-2 h-fit flex-col space-y-6">
		<div class="inline-flex w-full items-center">
			<label for="title" class="mr-4 block text-sm font-medium text-white">Title</label>
			<input
				type="text"
				name="title"
				id="title"
				bind:value={title}
				class="block w-full rounded-md border-white bg-dark-3 text-white shadow-sm"
				placeholder="My Secret Box"
			/>
		</div>

		<label for="description" class="block text-sm font-medium text-white">Description</label>
		<div>
			<textarea
				name="description"
				id="description"
				bind:value={description}
				class="block h-36 w-full resize-none rounded-md border-white bg-dark-3 text-white shadow-sm"
				placeholder="What's in your Secet Box?"
			/>
		</div>

		<div class="inline-flex w-full items-center">
			<label for="github" class="mr-4 block text-sm font-medium text-white">Repo</label>
			<input
				type="text"
				name="github"
				id="github"
				bind:value={url}
				class="block w-full rounded-md border-white bg-dark-3 text-white shadow-sm"
				placeholder="https://github.com/you/your-repo"
			/>
		</div>

		<div class="inline-flex w-full items-center">
			<label for="dev-env" class="mr-4 block text-sm font-medium text-white">Deployment</label>
			<input
				type="text"
				name="dev-env"
				id="dev-env"
				bind:value={devEnv}
				class="block w-full rounded-md border-white bg-dark-3 text-white shadow-sm"
				placeholder="https://gitpod.com/you/your-gitpod-url"
			/>
		</div>

		<label for="difficulty" class="block text-sm font-medium text-white">Difficulty</label>
		<select
			bind:value={difficulty}
			id="difficulty"
			name="difficulty"
			class="mt-1 block w-full rounded-md border-2 border-white bg-dark-3 py-2 pl-3 pr-10 text-base text-white focus:border-dark-blue focus:outline-none focus:ring-dark-blue"
		>
			<option value="introductory" selected>Introductory</option>
			<option value="intermediate">Intermediate</option>
			<option value="Advanced">Advanced</option>
		</select>

		<label for="banner-img" class="block text-sm font-medium text-white"
			>Banner Image (optional)</label
		>

		<input
			class="block w-full cursor-pointer rounded-lg border border-white text-sm text-white focus:outline-none"
			aria-describedby="file_input_help"
			id="banner-img"
			type="file"
			bind:value={bannerImg}
		/>

		<TagInput artifact={'secret box'} on:update={(e) => (tags = e.detail.tags)} />

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
