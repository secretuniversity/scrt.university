<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import TipTap from '$lib/components/TipTap.svelte';
	import TagComponent from '$lib/components/Tag.svelte';
	import type { Lesson } from '$lib/models/index';

	const pageTitle = 'Submit A Pathway';
	const pageDescription = 'Pathways are courses that teach the technicals of development on Secret';

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
			name: 'Pathway',
			path: '/submit/pathway'
		}
	];

	let content = { html: '', text: '' };

	let name = '';
	let description = '';
	let difficulty = '';
	let tag = '';
	let tags: string[] = [];
	let lessons: Lesson[] = [];

	let commonTags: string[] = ['gaming', 'defi'];

	function tryAddTag(e: KeyboardEvent) {
		if (e.key === 'Space') {
			tags.push(tag);
		}
	}

	function addTag(e: MouseEvent) {
		tags.push(tag);
	}
</script>

<Head {pageTitle} />

<section class="mx-auto w-11/12 py-8">
	<Breadcrumb routes={breadcrumbRoutes} />
	<PageHeader title={pageTitle} description={pageDescription} />
</section>

<section class="mx-auto grid w-11/12 grid-cols-3 gap-x-4 gap-y-4 py-8">
	<div class="h-fit flex-col space-y-2">
		<label for="name" class="block text-base font-medium text-white"
			>Name <span class="italic text-sm font-thin">(e.g. Designing Private Smart Contracts)</span
			></label
		>
		<div>
			<input
				type="text"
				name="name"
				id="name"
				value={name}
				class="block w-full rounded-md border-white bg-dark-3 shadow-sm"
				placeholder="Enter the name of your pathway..."
			/>
		</div>

		<label for="description" class="block text-base font-medium text-white">Description</label>
		<div>
			<textarea
				name="description"
				id="description"
				value={description}
				class="block h-28 w-full resize-none rounded-md border-white bg-dark-3 shadow-sm"
				placeholder="Enter a description of your pathway"
			/>
		</div>

		<label for="difficulty" class="block text-base font-medium text-white">Difficulty</label>
		<select value={difficulty} name="difficulty" id="difficulty">
			<option value="introductory">Introductory</option>
			<option value="intermediate">Intermediate</option>
			<option value="Advanced">Advanced</option>
		</select>

		<label for="lessons" class="block text-base font-medium text-white">Lessons</label>
		{#if lessons.length === 0}
			Your pathway current has no lessons.
		{/if}

		{#each lessons as lesson}
			<div />
		{/each}

		<button>Add a New Lesson +</button>

		<label for="tags">Tags</label>
		<input
			value={tag}
			on:keydown={tryAddTag}
			id="tags"
			type="text"
			placeholder="Type tag name and hit [space] to enter."
		/>

		<p>Common Tags (click to add)</p>
		{#each commonTags as tag, i}
			<div on:click={addTag}>
				<TagComponent tag={{ id: i, name: tag }} />
			</div>
		{/each}
	</div>
</section>
