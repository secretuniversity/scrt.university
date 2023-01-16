<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import Breadcrumb from '$lib/components/page/Breadcrumb.svelte';
	import Modal from '$lib/components/page/Modal.svelte';
	import PageHeader from '$lib/components/page/PageHeader.svelte';
	import TagInput from '$lib/components/forms/TagInput.svelte';
	import TipTap from '$lib/components/forms/TipTap.svelte';
	import PageHeaderImage from '$lib/assets/illustrations/writing.svg';
	import { articleRequest, notes, user } from '$lib/stores';
	import { articleRequestSchema } from '$lib/types/schemas/articles';
	import { getBaseAPIUrl, getNotification, loadJWT } from '$lib/helpers';
	import { goto } from '$app/navigation';
	import type { ValidationError } from 'yup';

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

	interface ArticleDraft {
		val: Contributions.Article.ArticleRequest;
		iso: string;
	}

	let draftModal = false;
	let drafts: ArticleDraft[] = [];
	let selectedDraft: ArticleDraft | null = null;

	let hasTitleError = false;
	let hasDescriptionError = false;
	let hasContentError = false;

	async function submit() {
		let token = loadJWT('user');

		if (!token || !$user) {
			$notes = [...$notes, getNotification('You must be logged in to submit an article.', 'error')];
			return;
		}

		$articleRequest.contributor = $user.val.id;

		try {
			await articleRequestSchema.validate($articleRequest, { abortEarly: false, strict: true });
		} catch (err) {
			const e = err as ValidationError;

			$notes = [...$notes, getNotification('Your article has some errors.', 'error')];

			for (const error of e.inner) {
				switch (error.path) {
					case 'title':
						hasTitleError = true;
						break;
					case 'description':
						hasDescriptionError = true;
						break;
					case 'content':
						hasContentError = true;
						break;
				}
			}

			return;
		}

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
				$notes = [...$notes, getNotification('Article submitted successfully!', 'success')];

				goto('/dashboard');
			} else {
				$notes = [
					...$notes,
					getNotification('Something wrong happened. Please try again in a bit.', 'error')
				];
			}
		} catch (err) {
			$notes = [...$notes, getNotification(err as string, 'error')];
		}
	}

	function loadDraft() {
		draftModal = true;

		const draftString = localStorage.getItem('article_drafts');
		drafts = draftString ? JSON.parse(draftString) : [];
	}

	function saveDraft() {
		const draftString = localStorage.getItem('article_drafts');
		const d = draftString ? JSON.parse(draftString) : [];

		let clean = d.filter((d: ArticleDraft) => d.val.title !== $articleRequest.title);
		let data = {
			val: $articleRequest,
			iso: new Date().toISOString()
		};
		clean = [data, ...clean];

		localStorage.setItem('article_drafts', JSON.stringify(clean));

		$notes = [...$notes, getNotification('Article draft saved successfully!', 'success')];
	}
</script>

<Head {pageTitle} />

<Modal active={draftModal} on:hide={() => (draftModal = false)}>
	<div class="grid min-h-[600px] w-[800px] auto-rows-max px-4 pt-6 text-white">
		<h2 class="mb-8 text-2xl font-bold">Your Pathway Drafts</h2>
		<div class="h-[28rem] overflow-auto">
			<div class="grid w-full grid-cols-12 rounded-md p-2 font-bold">
				<p class="col-span-3">Title</p>
				<p class="col-span-3 col-start-4">Description</p>
				<p class="col-start-8">Timestamp</p>
				<p />
			</div>

			{#if drafts.length > 0}
				<div class="grow flex-col space-y-2 rounded-md">
					{#each drafts as d}
						<div
							on:click={() => (selectedDraft = d)}
							class="grid w-full cursor-pointer grid-cols-12 rounded-md bg-dark-5 p-2"
						>
							<p class="col-span-3">{d.val.title}</p>
							<p class="col-span-3 col-start-4 capitalize">{d.val.description}</p>
							<p class="col-span-full col-start-8 capitalize">{d.iso}</p>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		{#if !selectedDraft}
			<button disabled class="justify-self-end rounded-md bg-gray px-6 py-4 text-dark-4">
				Select a Draft
			</button>
		{:else}
			<div class="flex items-center justify-self-end">
				<p class="mr-4 max-w-xl italic text-gray">
					Warning: This will overwrite any existing changes to your current article.
				</p>
				<button
					on:click={() => {
						if (selectedDraft) {
							$articleRequest = selectedDraft.val;
							selectedDraft = null;
							draftModal = false;
							$notes = [...$notes, getNotification('Draft loaded successfully.', 'success')];
						}
					}}
					class="rounded-md bg-dark-blue px-6 py-4 hover:bg-darker-blue"
				>
					<p>Load Draft</p>
				</button>
			</div>
		{/if}
	</div>
</Modal>

<section class="relative mx-auto w-11/12 py-8">
	<Breadcrumb routes={breadcrumbRoutes} />
</section>

<section class="relative mx-auto w-11/12 pb-8">
	<PageHeader title={pageTitle} description={pageDescription} image={PageHeaderImage} />
</section>

<section class="mx-auto grid w-11/12 grid-cols-3 gap-x-8 gap-y-4 pt-8 pb-36">
	<div class="sticky top-5 col-start-1 h-fit flex-col space-y-6">
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
				bind:value={$articleRequest.title}
				class="block w-full rounded-md border-white bg-dark-3 text-white shadow-sm"
				placeholder="My Secret Article..."
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
				bind:value={$articleRequest.description}
				class="block h-36 w-full resize-none rounded-md border-white bg-dark-3 text-white shadow-sm"
				placeholder="Enter a brief introduction of your article..."
			/>
		</div>

		<TagInput
			artifact={'article'}
			tags={$articleRequest.tags}
			on:update={(e) => ($articleRequest.tags = e.detail.tags)}
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
			<button on:click={loadDraft} class="rounded-md bg-dark-4 px-6 py-2 text-white"
				>Load Draft</button
			>
		</div>
	</div>

	<div class="col-span-full col-start-2">
		{#if hasContentError}
			<p class="mb-2 italic text-dark-red">Content is required</p>
		{/if}

		<div
			on:click={() => (hasContentError = false)}
			class="min-h-[800px] rounded-md border border-solid border-white text-white"
		>
			<TipTap
				value={$articleRequest.content}
				on:update={(e) => {
					$articleRequest.content = e.detail.content;
				}}
			/>
		</div>
	</div>
</section>
