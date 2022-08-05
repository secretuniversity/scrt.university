<script>
	export let img = '';
	export let alt = '';
	export let title = '';
	export let description = '';
</script>

<div class="rounded-3xl border-4 border-solid border-dark-3 bg-dark-1 px-12 py-12">
	<dt>
		<div class="flex h-12 w-12 items-center justify-center rounded-md bg-dark-turquoise-g">
			<img src={img} {alt} />
		</div>
		<p class="mt-5 text-lg font-medium leading-6 text-white">{title}</p>
	</dt>
	<dd class="mt-2 text-base text-gray">
		{description}
	</dd>
</div>
