<script lang="ts">
	import { onMount } from 'svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import Head from '$lib/components/Head.svelte';
	import type { Pathway } from '$lib/models/index';
	import { notificationsStore, selectedPathway } from '$lib/stores';
	import { getNotification, getBaseAPIUrl, slugify } from '$lib/helpers';

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

	let pathways: Pathway[] = [];

	onMount(async () => {
		try {
			const url = getBaseAPIUrl() + '/v1/pathways';
			const res = await fetch(url);
			const json = await res.json();

			if (res.status === 200) {
				$notificationsStore = [
					...$notificationsStore,
					getNotification('Pathways fetched successfully', 'success')
				];

				console.log(json);
				pathways = json;
			} else {
				$notificationsStore = [
					...$notificationsStore,
					getNotification('Error fetching pathways', 'error')
				];
			}
		} catch (err) {
			$notificationsStore = [...$notificationsStore, getNotification(err as string, 'error')];
		}
	});
</script>

<Head {pageTitle} />

<div class="mx-24 py-8">
	<Breadcrumb routes={breadcrumbRoutes} />
</div>

<section class="mx-24 min-h-home-hero">
	<div class="my-20 max-w-3xl">
		<p class="mb-4 text-5xl font-bold text-white">Secret Pathways</p>
		<p class="mb-16 text-base text-gray">
			Secret Pathways are self-contained lessons designed to help you build on Secret. Gain insight
			into building on Secret Network by reading through the lessons of a pathway, and answer
			questions to earn <span class="font-bold">secret badges</span>
			and
			<span class="font-bold">certifications</span>.
		</p>
	</div>

	{#if pathways.length === 0}
		<div class="mt-20 text-center text-dark-5">Secret University could not find any pathways.</div>
	{/if}

	{#each pathways as p}
		<a href={'/pathways/' + slugify(p.title)} on:click={() => selectedPathway.set(p)}>
			<div class="mb-4 rounded-md bg-dark-4 p-6 text-white shadow-xl">
				<div class="grid grid-cols-2 items-center">
					<h2 class="text-2xl font-semibold">{p.title}</h2>
					<p class="justify-self-end capitalize">{p.difficulty}</p>
				</div>
				<p>{p.description}</p>
			</div>
		</a>
	{/each}
</section>
