<script lang="ts">
	import { page } from '$app/stores';
	import Head from '$lib/components/Head.svelte';

	const pageTitle = ' | Repositories';
</script>

<Head {pageTitle} />

<section class="mx-4 pb-32">
	<div class="px-24">
		<div class="mt-16 grid grid-cols-2 grid-rows-2 border-b-2 border-white pb-4">
			<h1 class="self-center text-4xl font-bold leading-6 text-white">Repo Title</h1>
			<p class="col-start-1 row-start-2 mt-2 self-center text-lg font-medium text-off-white">
				This is a description of the repository
			</p>

			<div class="col-start-2 row-span-full self-center justify-self-end">
				<button
					type="button"
					class="hover:bg-gray-900 mt-3 w-full rounded-md border border-transparent bg-dark-blue px-6 py-3 text-base font-medium text-white shadow-sm shadow-dark-blue/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:inline-flex sm:w-auto sm:flex-shrink-0 sm:items-center"
					>View on Github</button
				>
			</div>
		</div>

		<h2 class="mt-8 text-3xl font-semibold leading-6 text-white">Section Title</h2>
		<p class="mt-4 text-base font-normal text-gray">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec dapibus mauris. Cras sed
			hendrerit mauris. Morbi euismod dui quis fermentum faucibus. Sed fringilla felis eget accumsan
			volutpat. Sed molestie eget quam id bibendum. Integer et nibh sodales, posuere arcu id,
			rhoncus nibh. Suspendisse finibus augue mattis purus consequat, euismod fringilla arcu
			viverra. Integer aliquet diam mauris, et vestibulum nisi cursus a. Maecenas dapibus, ante sed
			aliquet fermentum, lacus ipsum laoreet neque, a fringilla massa orci eu metus.
		</p>
		<p class="mt-2 text-base font-normal text-gray">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec dapibus mauris. Cras sed
			hendrerit mauris. Morbi euismod dui quis fermentum faucibus. Sed fringilla felis eget accumsan
			volutpat. Sed molestie eget quam id bibendum. Integer et nibh sodales, posuere arcu id,
			rhoncus nibh. Suspendisse finibus augue mattis purus consequat, euismod fringilla arcu
			viverra. Integer aliquet diam mauris, et vestibulum nisi cursus a. Maecenas dapibus, ante sed
			aliquet fermentum, lacus ipsum laoreet neque, a fringilla massa orci eu metus.
		</p>
		<p class="mt-2 text-base font-normal text-gray">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec dapibus mauris. Cras sed
			hendrerit mauris. Morbi euismod dui quis fermentum faucibus. Sed fringilla felis eget accumsan
			volutpat. Sed molestie eget quam id bibendum. Integer et nibh sodales, posuere arcu id,
			rhoncus nibh. Suspendisse finibus augue mattis purus consequat, euismod fringilla arcu
			viverra. Integer aliquet diam mauris, et vestibulum nisi cursus a. Maecenas dapibus, ante sed
			aliquet fermentum, lacus ipsum laoreet neque, a fringilla massa orci eu metus.
		</p>
		<p class="mt-2 text-base font-normal text-gray">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec dapibus mauris. Cras sed
			hendrerit mauris. Morbi euismod dui quis fermentum faucibus. Sed fringilla felis eget accumsan
			volutpat. Sed molestie eget quam id bibendum. Integer et nibh sodales, posuere arcu id,
			rhoncus nibh. Suspendisse finibus augue mattis purus consequat, euismod fringilla arcu
			viverra. Integer aliquet diam mauris, et vestibulum nisi cursus a. Maecenas dapibus, ante sed
			aliquet fermentum, lacus ipsum laoreet neque, a fringilla massa orci eu metus.
		</p>
	</div>
</section>
