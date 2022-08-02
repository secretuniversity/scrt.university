<script>
	export let img = '';
	export let alt = '';
	export let title = '';
	export let description = '';
</script>

<div>
	<dt>
		<div class="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
			<img src={img} {alt} />
		</div>
		<p class="mt-5 text-lg font-medium leading-6 text-gray-900">{title}</p>
	</dt>
	<dd class="mt-2 text-base text-gray-500">
		{description}
	</dd>
</div>
