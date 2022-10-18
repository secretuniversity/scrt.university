<script lang="ts">
	export let title = 'Title';
	export let description = 'Description';
	export let image = '';
</script>

<div class="mt-8 rounded-2xl bg-dark-4 shadow-lg">
	<div class="mx-auto flex max-h-fit max-w-7xl justify-between py-12">
		<div class="grid h-full w-full grid-cols-2 grid-rows-2">
			<h2
				class="col-start-1 row-start-1 self-end text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl"
			>
				{title}
			</h2>
			<p class="col-start-1 row-start-2 mt-5 text-xl text-gray max-w-xl">
				{@html description}
			</p>
			{#if image}
				<div class="col-start-2 row-span-full max-h-full w-full">
					<img src={image} alt="some banner illustration" />
				</div>
			{/if}
		</div>
	</div>
</div>
