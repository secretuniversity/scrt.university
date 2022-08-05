<script lang="ts">
	export let title = 'Title';
	export let description = 'Description';
	export let language = 'JavaScript';
	export let image = '';
</script>

<div class="overflow-hidden rounded-lg bg-white shadow">
	<div class="flex-col px-4 py-5 sm:p-6 lg:w-48">
		<p class="inline-block rounded-xl bg-yellow-100 px-4 py-1.5 text-xs">
			{language}
		</p>
		<img src={image} alt="" />
		<h2 class="text-gray-900 mt-5 text-center text-lg font-medium leading-6">{title}</h2>
		<p class="text-gray-500 mt-2 text-center text-sm">{description}</p>
		<button
			type="button"
			class="border-gray-300 text-gray-700 hover:bg-gray-50 mt-2 justify-self-center rounded-md border bg-white px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>View</button
		>
	</div>
</div>
