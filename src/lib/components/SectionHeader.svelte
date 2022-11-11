<script lang="ts">
	export let title = 'Title';
	export let subtitle = 'Subtitle';
	export let description = 'Description';
</script>

<div class="my-16 bg-dark-2">
	<div class="mx-auto max-w-7xl">
		<div class="text-center">
			<h2 class="my-4 text-base font-semibold uppercase tracking-wide text-dark-turquoise-g">
				{title}
			</h2>
			<p class="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
				{subtitle}
			</p>
			<p class="mx-auto my-4 max-w-2xl text-base text-gray">
				{description}
			</p>
		</div>
	</div>
</div>
