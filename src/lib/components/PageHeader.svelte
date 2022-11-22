<script lang="ts">
	export let title = 'Title';
	export let description = 'Description';
	export let image = '';
</script>

<div class="rounded-3xl bg-dark-4 shadow-lg">
	<div class="mx-auto h-[36rem] max-w-6xl py-20 md:px-16">
		<div class="grid h-full w-full grid-cols-2 grid-rows-2 items-center">
			<h2
				class="col-start-1 row-start-1 self-end text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl"
			>
				{title}
			</h2>
			<p class="col-start-1 row-start-2 mt-5 max-w-xl self-start text-xl text-gray">
				{@html description}
			</p>
			{#if image}
				<div class="col-start-2 row-span-full h-auto w-full">
					<img src={image} alt="some banner illustration" />
				</div>
			{/if}
		</div>
	</div>
</div>
