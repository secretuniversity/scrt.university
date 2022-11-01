<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import DraftModal from '$lib/components/ModalDrafts.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import TagInput from '$lib/components/TagInput.svelte';
	import TipTap from '$lib/components/TipTap.svelte';
	import PageHeaderImage from '$lib/assets/illustrations/developer.svg';
	import { articleRequest, contributor, notification } from '$lib/stores';
	import { getLessonBaseContent, loadJWT, loadLocalDrafts, saveLocalDraft } from '$lib/helpers';
	import { onMount } from 'svelte';
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

	let draftModalActive = false;

	onMount(() => {
		if ($contributor && loadJWT('contributor')) {
			$articleRequest.contributor = $contributor.val.id;
			$articleRequest.content = getLessonBaseContent();
		} else {
			goto('/');
		}
	});

	function submit() {
		let token = loadJWT('contributor');

		if (!token || !$contributor) {
			return;
		}

		fetch('/api/v1/article', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Token: token
			},
			body: JSON.stringify($articleRequest)
		})
			.then((res) => {
				$notification = {
					msg: 'Article submitted successfully',
					hasError: false,
					loading: false
				};
			})
			.catch((err) => {
				$notification = {
					msg: 'Failed to submit article',
					hasError: true,
					loading: false
				};
			});
	}

	function saveDraft() {
		saveLocalDraft('article', $articleRequest);
	}

	function loadDrafts() {
		const drafts = loadLocalDrafts('article');

		draftModalActive = true;

		if (drafts) {
			console.log(drafts);
		}
	}
</script>

<Head {pageTitle} />

{#if draftModalActive}
	<DraftModal />
{/if}

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
