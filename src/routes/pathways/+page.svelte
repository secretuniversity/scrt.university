<script lang="ts">
	import { onMount } from 'svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import Head from '$lib/components/Head.svelte';
	import type { Pathway } from '$lib/models/index';
	import { notificationsStore } from '$lib/stores';
	import { getNotification, getBaseAPIUrl } from '$lib/helpers';

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

	async function fetchPathways(): Promise<Pathway[]> {
		try {
			const url = getBaseAPIUrl() + '/v1/pathways';
			const res = await fetch(url);
			const json = await res.json();

			if (res.status === 200) {
				$notificationsStore = [
					...$notificationsStore,
					getNotification('Pathways fetched successfully', 'success')
				];

				return Promise.resolve(json);
			} else {
				$notificationsStore = [
					...$notificationsStore,
					getNotification('Error fetching pathways', 'error')
				];
			}
		} catch (err) {
			$notificationsStore = [...$notificationsStore, getNotification(err as string, 'error')];
		}

		return Promise.reject();
	}

	onMount(async () => {
		const p = await fetchPathways();
		pathways = p;
	});
</script>

<Head {pageTitle} />

<div class="mx-24 py-8">
	<Breadcrumb routes={breadcrumbRoutes} />
</div>

<section class="mx-24 min-h-home-hero">
	<div class="mb-28 max-w-3xl">
		<h1 class="mb-4 text-5xl font-bold text-white">Secret Pathways</h1>
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
		<div>Some data</div>
	{/each}
</section>
