<script lang="ts">
	export let tags: string[] = ['tag1', 'tag2'];
	export let title = 'Title';
	export let description = 'Description';
	export let author = '0xabc...xyz';
</script>

<div class="overflow-hidden rounded-lg bg-dark-4 px-4 py-6 shadow lg:px-8 lg:py-8">
	<div class="grid auto-rows-auto">
		<div class="">
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
			<p class="text-2xl font-semibold text-white">{title}</p>
			<p class="mt-3 max-w-md text-base text-gray">
				{description}
			</p>
		</a>

		<button
			type="button"
			class="mt-4 inline-flex items-center self-end justify-self-end rounded-md border border-transparent bg-dark-blue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>Learn more</button
		>
	</div>
</div>
