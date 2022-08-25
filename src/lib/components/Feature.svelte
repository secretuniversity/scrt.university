<script lang="ts">
	export let img = '';
	export let alt = '';
	export let title = '';
	export let description = '';
	export let tag: string | null = '';
</script>

{#if tag}
	<div
		class="grid auto-rows-min grid-cols-3 rounded-2xl border-4 border-solid border-dark-3 bg-dark-1 lg:py-16 lg:px-20"
	>
		<dt class="col-span-1 self-center">
			<div class="flex h-12 w-12 rounded-full bg-dark-turquoise-g">
				<img src={img} {alt} />
			</div>
		</dt>

		<span
			class="col-span-2 col-start-2 row-start-1 inline-block self-start justify-self-end rounded-full bg-light-cream px-4 py-1 text-black"
			>{tag}</span
		>

		<p class="col-span-full row-start-2 mt-5 text-lg font-bold leading-6 text-white">{title}</p>
		<dd class="col-span-full mt-2 text-base text-gray">
			{description}
		</dd>
	</div>
{:else}
	<div
		class="grid auto-rows-min grid-cols-3 rounded-2xl border-4 border-solid border-dark-3 bg-dark-1 lg:py-16 lg:px-20"
	>
		<dt class="col-span-full self-center">
			<div class="flex h-12 w-12 rounded-full bg-dark-turquoise-g">
				<img src={img} {alt} />
			</div>
		</dt>

		<p class="col-span-full row-start-2 mt-5 text-lg font-bold leading-6 text-white">{title}</p>
		<dd class="col-span-full mt-2 text-base text-gray">
			{description}
		</dd>
	</div>
{/if}
