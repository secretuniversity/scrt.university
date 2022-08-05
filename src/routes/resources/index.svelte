<script lang="ts">
	import PageHeader from '$lib/PageHeader.svelte';
	import Dropdown from '$lib/Dropdown.svelte';
</script>

<section class="mx-24">
	<PageHeader
		title={'Community Resources'}
		description={'Learn from the community. Find guides, courses, videos, and more— each made by developers on Secret Network.'}
	/>

	<div class="my-12 grid grid-cols-2">
		<!-- Search Input -->
		<div class="lg:max-w-2xl">
			<label for="search" class="sr-only">Search</label>
			<input
				type="search"
				name="search"
				id="search"
				class="border-gray-300 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				placeholder="Search [by #tag]"
			/>
		</div>

		<div class="self-center justify-self-end">
			<Dropdown />
		</div>
	</div>

	<!-- Repo Cards -->
	<div class="bg-white px-4 pt-6 pb-20 sm:px-6 lg:px-8 lg:pt-8 lg:pb-28">
		<div class="divide-gray-200 relative mx-auto max-w-lg divide-y-2 lg:mx-16 lg:max-w-full">
			<div class="grid gap-16 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
				<div class="overflow-hidden rounded-lg bg-white px-4 py-6 shadow lg:px-8 lg:py-4">
					<div>
						<!-- Tags -->
						<a href="#" class="inline-block">
							<span
								class="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800"
							>
								Article
							</span>
						</a>
					</div>

					<!-- Title and Description -->
					<a href="#" class="mt-4 block">
						<p class="text-gray-900 text-xl font-semibold">Boost your conversion rate</p>
						<p class="text-gray-500 mt-3 text-base">
							Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet.
							Sapien tortor lacus arcu.
						</p>
					</a>
					<div class="mt-6 flex items-center">
						<div class="flex-shrink-0">
							<a href="#">
								<span class="sr-only">Paul York</span>
								<img
									class="h-10 w-10 rounded-full"
									src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
									alt=""
								/>
							</a>
						</div>
						<div class="ml-3">
							<p class="text-gray-900 text-sm font-medium">
								<a href="#"> Paul York </a>
							</p>
							<div class="text-gray-500 flex space-x-1 text-sm">
								<time datetime="2020-03-16"> Mar 16, 2020 </time>
								<span aria-hidden="true"> &middot; </span>
								<span> 6 min read </span>
							</div>
						</div>
					</div>
				</div>

				<div class="overflow-hidden rounded-lg bg-white px-4 py-6 shadow lg:px-8 lg:py-4">
					<div>
						<a href="#" class="inline-block">
							<span
								class="inline-flex items-center rounded-full bg-pink-100 px-3 py-0.5 text-sm font-medium text-pink-800"
							>
								Video
							</span>
						</a>
					</div>
					<a href="#" class="mt-4 block">
						<p class="text-gray-900 text-xl font-semibold">
							How to use search engine optimization to drive sales
						</p>
						<p class="text-gray-500 mt-3 text-base">
							Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet.
							Sapien tortor lacus arcu.
						</p>
					</a>
					<div class="mt-6 flex items-center">
						<div class="flex-shrink-0">
							<a href="#">
								<span class="sr-only">Dessie Ryan</span>
								<img
									class="h-10 w-10 rounded-full"
									src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
									alt=""
								/>
							</a>
						</div>
						<div class="ml-3">
							<p class="text-gray-900 text-sm font-medium">
								<a href="#"> Dessie Ryan </a>
							</p>
							<div class="text-gray-500 flex space-x-1 text-sm">
								<time datetime="2020-03-10"> Mar 10, 2020 </time>
								<span aria-hidden="true"> &middot; </span>
								<span> 4 min read </span>
							</div>
						</div>
					</div>
				</div>

				<div class="overflow-hidden rounded-lg bg-white px-4 py-6 shadow lg:px-8 lg:py-4">
					<div>
						<a href="#" class="inline-block">
							<span
								class="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800"
							>
								Case Study
							</span>
						</a>
					</div>
					<a href="#" class="mt-4 block">
						<p class="text-gray-900 text-xl font-semibold">Improve your customer experience</p>
						<p class="text-gray-500 mt-3 text-base">
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab iure iusto fugiat commodi
							sequi.
						</p>
					</a>
					<div class="mt-6 flex items-center">
						<div class="flex-shrink-0">
							<a href="#">
								<span class="sr-only">Easer Collins</span>
								<img
									class="h-10 w-10 rounded-full"
									src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
									alt=""
								/>
							</a>
						</div>
						<div class="ml-3">
							<p class="text-gray-900 text-sm font-medium">
								<a href="#"> Easer Collins </a>
							</p>
							<div class="text-gray-500 flex space-x-1 text-sm">
								<time datetime="2020-02-12"> Feb 12, 2020 </time>
								<span aria-hidden="true"> &middot; </span>
								<span> 11 min read </span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
