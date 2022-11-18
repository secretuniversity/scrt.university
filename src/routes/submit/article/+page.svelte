<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import TagInput from '$lib/components/TagInput.svelte';
	import TipTap from '$lib/components/TipTap.svelte';
	import PageHeaderImage from '$lib/assets/illustrations/developer.svg';
	import { articleRequest, notificationsStore, userStore } from '$lib/stores';
	import {
		getBaseAPIUrl,
		getLessonBaseContent,
		getNotification,
		loadJWT,
		loadLocalDrafts,
		saveLocalDraft
	} from '$lib/helpers';
	import { goto } from '$app/navigation';

	const pageTitle = 'Submit An Article';
	const pageDescription = `For those with a knack for writing and endless curiousity, submit your article to 
		Secret University and share your discoveries with the Secret community.</br>
		<a href=""><span class="inline-block mt-2 text-dark-blue underline cursor-pointer">Learn more</span></a> 
		about writing articles for Secret University.`;

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

	async function submit() {
		let token = loadJWT('user');

		if (!token || !$userStore) {
			$notificationsStore = [
				...$notificationsStore,
				getNotification('You must be logged in to submit an article.', 'error')
			];
			return;
		}

		$articleRequest.contributor = $userStore.val.id;

		try {
			const url = getBaseAPIUrl() + '/v1/articles';
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify($articleRequest)
			});

			if (res.status === 200) {
				$notificationsStore = [
					...$notificationsStore,
					getNotification('Article submitted successfully!', 'success')
				];

				goto('/dashboard');
			} else {
				console.log(res);
				$notificationsStore = [
					...$notificationsStore,
					getNotification('Something wrong happened. Please try again in a bit.', 'error')
				];
			}
		} catch (err) {
			$notificationsStore = [...$notificationsStore, getNotification(err as string, 'error')];
		}
	}

	function saveDraft() {
		saveLocalDraft('article', $articleRequest);
	}

	function loadDrafts() {
		const drafts = loadLocalDrafts('article');

		if (drafts) {
			console.log(drafts);
		}
	}
</script>

<Head {pageTitle} />

<section class="relative mx-auto w-11/12 py-8">
	<Breadcrumb routes={breadcrumbRoutes} />
	<PageHeader title={pageTitle} description={pageDescription} image={PageHeaderImage} />
</section>

<section class="mx-auto grid w-11/12 grid-cols-3 gap-x-8 gap-y-4 pt-8 pb-36">
	<div class="col-start-1 h-fit flex-col space-y-6">
		<div class="inline-flex w-full items-center">
			<label for="title" class="mr-4 block text-sm font-medium text-white">Title</label>
			<input
				type="text"
				name="title"
				id="title"
				bind:value={$articleRequest.title}
				class="block w-full rounded-md border-white bg-dark-3 text-white shadow-sm"
				placeholder="My Secret Article..."
			/>
		</div>

		<label for="description" class="block text-sm font-medium text-white">Description</label>
		<div>
			<textarea
				name="description"
				id="description"
				bind:value={$articleRequest.description}
				class="block h-36 w-full resize-none rounded-md border-white bg-dark-3 text-white shadow-sm"
				placeholder="Enter a brief introduction of your article..."
			/>
		</div>

		<TagInput
			artifact={'article'}
			on:update={(e) => ($articleRequest.tags = [...$articleRequest.tags, ...e.detail.tags])}
		/>

		<p class="mb-4 text-sm italic text-gray">
			Before submitting, be sure you have read the standards and practices for writing Articles on
			Secret University. Standards for all university contributions can be found in the public
			Secret University notion.
		</p>
		<div class="flex space-x-2">
			<button on:click={submit} class="rounded-md bg-dark-blue px-6 py-2 text-white">Submit</button>
			<button on:click={saveDraft} class="rounded-md bg-dark-4 px-6 py-2 text-white"
				>Save Draft</button
			>
			<button on:click={loadDrafts} class="rounded-md bg-dark-4 px-6 py-2 text-white"
				>Load Draft</button
			>
		</div>
	</div>

	<div class="col-span-full col-start-2">
		<div
			class="h-[800px] max-h-[800px] overflow-hidden rounded-md border border-solid border-white text-white"
		>
			<TipTap
				value={getLessonBaseContent()}
				on:update={(e) => ($articleRequest.content = e.detail.content)}
			/>
		</div>
	</div>
</section>
