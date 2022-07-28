<script lang="ts">
	export let title = 'Title';
	export let description = 'Description';
</script>

<div class="bg-gray-800 lg:mx-16 lg:mt-8 lg:rounded-2xl">
	<div class="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:flex lg:justify-between lg:px-8">
		<div class="max-w-xl">
			<h2 class="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
				{title}
			</h2>
			<p class="mt-5 text-xl text-gray-400">
				{description}
			</p>
		</div>
	</div>
</div>
