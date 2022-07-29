<script lang="ts">
	export let title = 'Title';
	export let subtitle = 'Subtitle';
	export let description = 'Description';
</script>

<div class="bg-white">
	<div class="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:py-12">
		<div class="text-center">
			<h2 class="text-base font-semibold uppercase tracking-wide text-indigo-600">{title}</h2>
			<p
				class="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
			>
				{subtitle}
			</p>
			<p class="mx-auto mt-5 max-w-2xl text-xl text-gray-500">
				{description}
			</p>
		</div>
	</div>
</div>
