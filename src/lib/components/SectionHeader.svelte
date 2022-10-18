<script lang="ts">
	export let title = 'Title';
	export let subtitle = 'Subtitle';
	export let description = 'Description';
</script>

<div class="bg-dark-2">
	<div class="mx-auto max-w-7xl">
		<div class="text-center">
			<h2 class="text-base font-semibold uppercase tracking-wide text-dark-turquoise-g">{title}</h2>
			<p class="mt-1 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
				{subtitle}
			</p>
			<p class="mx-auto mt-5 max-w-2xl text-xl text-gray">
				{description}
			</p>
		</div>
	</div>
</div>
