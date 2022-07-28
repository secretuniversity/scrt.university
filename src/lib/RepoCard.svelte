<script lang="ts">
	export let tags: string[] = ['tag1', 'tag2'];
	export let title = 'Title';
	export let description = 'Description';
	export let author = '0xabc...xyz';
	export let timestamp = '2020-01-01';
</script>

<div class="overflow-hidden rounded-lg bg-white px-4 py-6 shadow lg:px-8 lg:py-4">
	<div>
		{#each tags as tag}
			<!-- content here -->
			<a href="#" class="mr-2 inline-block">
				<span
					class="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800"
				>
					{tag}
				</span>
			</a>
		{/each}
	</div>

	<!-- Title and Description -->
	<a href="#" class="mt-4 block">
		<p class="text-xl font-semibold text-gray-900">{title}</p>
		<p class="mt-3 text-base text-gray-500">
			{description}
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
			<p class="text-sm font-medium text-gray-900">
				<a href="#"> {author} </a>
			</p>
			<div class="flex space-x-1 text-sm text-gray-500">
				<time datetime="2020-03-16"> {timestamp} </time>
				<span aria-hidden="true"> &middot; </span>
				<span> 6 min read </span>
			</div>
		</div>
	</div>
</div>
