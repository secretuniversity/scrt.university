<script lang="ts">
	export let title = 'Title';
	export let description = 'Description';
</script>

<div class="bg-dark-4 shadow-lg lg:mt-8 lg:rounded-2xl">
	<div class="mx-auto max-w-7xl py-40 sm:px-6 lg:flex lg:justify-between">
		<div class="max-w-xl">
			<h2 class="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
				{title}
			</h2>
			<p class="mt-5 text-xl text-gray">
				{description}
			</p>
		</div>
	</div>
</div>
