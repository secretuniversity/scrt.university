<script>
	export let img = '';
	export let alt = '';
	export let title = '';
	export let description = '';
</script>

<div class="grid grid-rows-2 rounded-3xl border-4 border-solid border-dark-3 bg-dark-1 py-16 px-12">
	<dt class="self-center">
		<div class="flex h-12 w-12 rounded-full bg-dark-turquoise-g">
			<img src={img} {alt} />
		</div>
		<p class="mt-5 text-lg font-bold leading-6 text-white">{title}</p>
	</dt>
	<dd class="self-sstart mt-2 text-base text-gray">
		{description}
	</dd>
</div>
