<script lang="ts">
	import Breadcrumb from '$lib/Breadcrumb.svelte';
	import LeftArrowIcon from '$lib/assets/left_arrow.svg';
	import RightArrowIcon from '$lib/assets/right_arrow.svg';
</script>

<section class="min-h-screen pb-36">
	<div class="grid grid-cols-8 mt-8 mx-4 gap-x-4">
		<div class="col-span-2">
			<h2 class="text-white bg-dark-4 font-bold text-lg px-8 py-4 rounded-t-xl">Pathway Map</h2>
			<div class="min-h-22 bg-dark-4 grid grid-cols-5 grid-rows-2 p-4 mt-1">
				<div
					class="col-span-1 row-span-full w-5 h-5 mt-0.5 bg-gray rounded-full justify-self-center self-center"
				/>
				<p class="italic col-start-2 col-span-full row-span-1 self-center text-off-white">Lesson</p>
				<p class="col-start-2 col-span-full text-white font-semibold self-center">
					Welcome to the Network
				</p>
			</div>
			<div class="min-h-22 bg-dark-4 grid grid-cols-5 grid-rows-2 p-4 mt-1">
				<div
					class="col-span-1 row-span-full w-5 h-5 mt-0.5 bg-gray rounded-full justify-self-center self-center"
				/>
				<p class="italic col-start-2 col-span-full row-span-1 self-center text-off-white">Quiz</p>
				<p class="col-start-2 col-span-full text-white font-semibold self-center">
					Your First Quiz
				</p>
			</div>
		</div>

		<div class="col-start-3 col-span-full">
			<Breadcrumb />

			<div class="grid grid-cols-10 bg-dark-4 rounded-lg shadow-xl mt-4 pb-4">
				<img
					class="w-8 h-auto self-center justify-self-center"
					src={LeftArrowIcon}
					alt="Left reading arrow"
				/>
				<div class="col-start-2 col-span-8">
					<h1 class="text-3xl font-bold text-white p-4">Lesson Title</h1>

					<p class="text-gray px-4">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer est nisi, porta ac
						lorem a, ultrices euismod purus. Suspendisse potenti. Quisque at interdum justo. Donec
						quis neque condimentum, tempus orci sit amet, ultrices arcu. Vestibulum maximus porta
						ipsum et fermentum. Maecenas aliquam hendrerit sapien, ac consequat odio iaculis vitae.
						Integer hendrerit nec ligula vel sagittis. In hac habitasse platea dictumst.
					</p>

					<p class="text-gray px-4 pt-4">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer est nisi, porta ac
						lorem a, ultrices euismod purus. Suspendisse potenti. Quisque at interdum justo. Donec
						quis neque condimentum, tempus orci sit amet, ultrices arcu. Vestibulum maximus porta
						ipsum et fermentum. Maecenas aliquam hendrerit sapien, ac consequat odio iaculis vitae.
						Integer hendrerit nec ligula vel sagittis. In hac habitasse platea dictumst.
					</p>
				</div>

				<img
					class="w-8 h-auto self-center justify-self-center"
					src={RightArrowIcon}
					alt="Right reading arrow"
				/>
			</div>
		</div>
	</div>
</section>
