<script>
	import { page } from '$app/stores';
	import { toPageTitle } from '$lib/helpers/index';
	import Head from '$lib/components/Head.svelte';

	const pageTitle = toPageTitle($page.params.slug) + ' | Secret Box';

	const box = {
		title: 'Secret Counter',
		subtitle: 'A quick introduction to building private smart contracts on Secret Network',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec dapibus mauris. Cras sed hendrerit mauris. Morbi euismod dui quis fermentum faucibus. Sed fringilla felis eget accumsan volutpat. Sed molestie eget quam id bibendum. Integer et nibh sodales, posuere arcu id, rhoncus nibh. Suspendisse finibus augue mattis purus consequat, euismod fringilla arcu viverra. Integer aliquet diam mauris, et vestibulum nisi cursus a. Maecenas dapibus, ante sed aliquet fermentum, lacus ipsum laoreet neque, a fringilla massa orci eu metus.',
		tags: ['tag1', 'tag2']
	};
</script>

<Head {pageTitle} />

<section class="min-h-content pb-32">
	<!-- <h1 class="text-3xl font-bold text-white my-8">Secret Boxes</h1> -->

	<div class="container mx-auto mt-16 rounded-lg bg-dark-4 px-12 py-16">
		<div class="">
			<h2 class="text-3xl font-semibold uppercase tracking-wide text-white">
				{box.title}
			</h2>
			<p class="mt-1 text-lg font-bold text-gray sm:tracking-tight">
				{box.subtitle}
			</p>
			<p class="mt-4 max-w-2xl text-base text-gray">
				{box.description}
			</p>
		</div>

		<div class="mt-4 flex gap-x-3 self-start">
			<button
				type="button"
				class="hover:bg-gray-900 mt-3 w-full rounded-md border border-transparent bg-dark-blue px-6 py-3 text-base font-medium text-white shadow-sm shadow-dark-blue/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:inline-flex sm:w-auto sm:flex-shrink-0 sm:items-center"
				>View on Github</button
			>

			<button
				type="button"
				class="hover:bg-gray-900 mt-3 w-full rounded-md border border-transparent bg-dark-blue px-6 py-3 text-base font-medium text-white shadow-sm shadow-dark-blue/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:inline-flex sm:w-auto sm:flex-shrink-0 sm:items-center"
				>Launch</button
			>
		</div>
	</div>
</section>
