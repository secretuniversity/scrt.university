<script lang="ts">
	import { onMount } from 'svelte';
	import Breadcrumb from '$lib/components/page/Breadcrumb.svelte';
	import Head from '$lib/components/Head.svelte';
	import type { Pathway } from '$lib/models/index';
	import { notificationsStore, selectedPathway } from '$lib/stores';
	import { getNotification, getBaseAPIUrl, slugify } from '$lib/helpers';
	import { goto } from '$app/navigation';
	import BGImage from '$lib/assets/illustrations/space_bg.svg';

	const pageTitle = 'Pathways';

	const breadcrumbRoutes = [
		{
			name: 'Learn',
			path: '/learn'
		},
		{
			name: 'Secret Pathways',
			path: '/pathways'
		}
	];

	let placeholderIndex = 0;

	let pathways: Pathway[] = [];
	const detailsMap = {} as Record<string, boolean>;

	onMount(async () => {
		try {
			const url = getBaseAPIUrl() + '/v1/pathways';
			const res = await fetch(url);
			const json = await res.json();

			pathways = json;
			placeholderIndex = pathways.length;

			for (const pathway of pathways) {
				detailsMap[pathway.id] = false;
			}

			if (res.status !== 200) {
				$notificationsStore = [
					...$notificationsStore,
					getNotification('Error fetching pathways', 'error')
				];
			}
		} catch (err) {
			$notificationsStore = [...$notificationsStore, getNotification(err as string, 'error')];
		}
	});

	function toggleDetailsFor(index: number) {
		detailsMap[index] = !detailsMap[index];
	}
</script>

<Head {pageTitle} />

<div class="mx-24 py-8">
	<Breadcrumb routes={breadcrumbRoutes} />
</div>

<div class="relative">
	<div class="z-1 absolute top-0 left-0 right-0 mx-auto h-auto w-11/12">
		<img class="h-full w-full" src={BGImage} alt="Explore Secret Pathways" />
	</div>

	<section class="relative mx-24 min-h-home-hero">
		<div class="my-20 max-w-3xl">
			<p class="mb-4 text-5xl font-bold text-white">Secret Pathways</p>
			<p class="mb-16 text-base text-gray">
				Secret Pathways are self-contained lessons designed to help you build on Secret. Gain
				insight into building on Secret Network by reading through the lessons of a pathway, and
				answer questions to earn <span class="font-bold">secret badges</span>
				and
				<span class="font-bold">certifications</span>.
			</p>
		</div>

		<!-- {#if pathways.length === 0}
			<div class="mt-24 text-center text-dark-5">
				Secret University could not find any pathways.
			</div>
		{/if} -->

		<div class="w-full flex-col space-y-36 pb-36">
			{#each pathways as p, i}
				<div class="flex w-full {i % 2 === 0 ? 'justify-start' : 'justify-end'}">
					<div class="w-[65%]">
						<div class="mb-4 rounded-md bg-dark-4 p-6 px-8 text-white shadow-lg">
							<div class="grid grid-cols-2 items-center">
								<h2 class="pt-4 text-2xl font-semibold">{p.title}</h2>
								<p class="justify-self-end capitalize">{p.difficulty}</p>
							</div>
							<p class="mt-2 max-w-xl">{p.description}</p>

							<div class="grid w-full grid-cols-2">
								<p
									on:click={() => toggleDetailsFor(i)}
									class="mt-2 cursor-pointer text-light-blue underline"
								>
									{detailsMap[i] ? 'View Less' : 'View More'}
								</p>

								<button
									on:click={() => {
										selectedPathway.set(p);
										goto(`/pathways/${slugify(p.id)}/${slugify(p.title)}`);
									}}
									class="justify-self-end rounded-md bg-dark-blue px-6 py-2 text-white hover:bg-darker-blue"
									>Start</button
								>
							</div>

							{#if detailsMap[i]}
								<!-- content here -->
								<p class="mt-4 text-gray">Pathway Map</p>
								<div class="mt-4">
									{#each p.lessons as l}
										<p class="ml-8">{l.name}</p>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/each}

			<div class="flex w-full {placeholderIndex % 2 === 0 ? 'justify-start' : 'justify-end'}">
				<div class="w-[65%]">
					<div
						class="mb-4 rounded-md border-2 border-dark-4 bg-dark-3 p-6 px-8 text-white shadow-lg"
					>
						<div class="grid grid-cols-2 items-center">
							<h2 class="pt-4 text-2xl font-semibold">
								Leveling Up Your Front End with Secret University
							</h2>
							<p class="justify-self-end capitalize">Intermediate</p>
						</div>
						<p class="mt-2 max-w-xl">
							In this pathway you'll learn how to develop efficient, lightweight web interfaces for
							secret smart contracts. Using TypeScript we'll make a working front end for our dice
							rolling smart contract and learn the ins and outs of interfacing with Secret Network.
						</p>

						<div class="grid w-full grid-cols-2 pb-4">
							<p class="mt-2 cursor-pointer text-light-blue">Coming Soon</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
