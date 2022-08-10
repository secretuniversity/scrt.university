<script lang="ts">
	import { page } from '$app/stores';

	import Head from '$lib/components/Head.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import LeftArrowIcon from '$lib/assets/left_arrow.svg';
	import RightArrowIcon from '$lib/assets/right_arrow.svg';

	let pageTitle = toPageTitle($page.params.slug) + ' | Pathways';

	function toPageTitle(slug: string) {
		const noHypens = slug.replace(/-/g, ' ');
		const words = noHypens.split(' ');

		return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
	}
</script>

<Head {pageTitle} />

<section class="min-h-screen pb-36">
	<div class="mx-4 mt-8 grid grid-cols-8 gap-x-4">
		<div class="col-span-2">
			<h2 class="rounded-t-xl bg-dark-4 px-8 py-4 text-lg font-bold text-white">Pathway Map</h2>
			<div class="min-h-22 mt-1 grid grid-cols-5 grid-rows-2 bg-dark-4 p-4">
				<div
					class="col-span-1 row-span-full mt-0.5 h-5 w-5 self-center justify-self-center rounded-full bg-gray"
				/>
				<p class="col-span-full col-start-2 row-span-1 self-center italic text-off-white">Lesson</p>
				<p class="col-span-full col-start-2 self-center font-semibold text-white">
					Welcome to the Network
				</p>
			</div>
			<div class="min-h-22 mt-1 grid grid-cols-5 grid-rows-2 bg-dark-4 p-4">
				<div
					class="col-span-1 row-span-full mt-0.5 h-5 w-5 self-center justify-self-center rounded-full bg-gray"
				/>
				<p class="col-span-full col-start-2 row-span-1 self-center italic text-off-white">Quiz</p>
				<p class="col-span-full col-start-2 self-center font-semibold text-white">
					Your First Quiz
				</p>
			</div>
		</div>

		<div class="col-span-full col-start-3">
			<Breadcrumb />

			<div class="mt-4 grid grid-cols-10 rounded-lg bg-dark-4 pb-4 shadow-xl">
				<img
					class="h-auto w-8 self-center justify-self-center"
					src={LeftArrowIcon}
					alt="Left reading arrow"
				/>
				<div class="col-span-8 col-start-2">
					<h1 class="p-4 text-3xl font-bold text-white">Lesson Title</h1>

					<p class="px-4 text-gray">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer est nisi, porta ac
						lorem a, ultrices euismod purus. Suspendisse potenti. Quisque at interdum justo. Donec
						quis neque condimentum, tempus orci sit amet, ultrices arcu. Vestibulum maximus porta
						ipsum et fermentum. Maecenas aliquam hendrerit sapien, ac consequat odio iaculis vitae.
						Integer hendrerit nec ligula vel sagittis. In hac habitasse platea dictumst.
					</p>

					<p class="px-4 pt-4 text-gray">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer est nisi, porta ac
						lorem a, ultrices euismod purus. Suspendisse potenti. Quisque at interdum justo. Donec
						quis neque condimentum, tempus orci sit amet, ultrices arcu. Vestibulum maximus porta
						ipsum et fermentum. Maecenas aliquam hendrerit sapien, ac consequat odio iaculis vitae.
						Integer hendrerit nec ligula vel sagittis. In hac habitasse platea dictumst.
					</p>
				</div>

				<img
					class="h-auto w-8 self-center justify-self-center"
					src={RightArrowIcon}
					alt="Right reading arrow"
				/>
			</div>
		</div>
	</div>
</section>
