<script lang="ts">
	import { onMount } from 'svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import Head from '$lib/components/Head.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import type { Pathway } from '$lib/models/index';

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

	let pathways: Array<Pathway> = [];
	let errVisible = false;
	let errMsg = '';

	onMount(() => {
		try {
			fetch('/api/v1/pathways/0')
				.then((res) => res.json())
				.then((some) => {
					if (some.data) {
						pathways = some.data as Pathway[];
					}
				});
		} catch (err) {
			errVisible = true;
			errMsg = String(err);
		}
	});
</script>

<Head {pageTitle} />

{#if errVisible}
	<Toast msg={errMsg} kind="fail" />
{/if}

<section class="min-h-home-hero mx-24 py-8">
	<Breadcrumb routes={breadcrumbRoutes} />
	<div class="mt-8 max-w-3xl">
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
