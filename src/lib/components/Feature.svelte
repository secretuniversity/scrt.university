<script lang="ts">
	export let img = '';
	export let alt = '';
	export let title = '';
	export let description = '';
	export let tag: String | null = '';
</script>

{#if tag}
	<!-- content here -->
	<div
		class="grid grid-cols-3 grid-rows-feature-inner-tag rounded-2xl border-4 border-solid border-dark-3 bg-dark-1 lg:py-12 lg:px-20"
	>
		<dt class="col-start-1 self-end">
			<div class="flex h-12 w-12 rounded-full bg-dark-turquoise-g">
				<img src={img} {alt} />
			</div>
		</dt>
		<span
			class="col-span-2 col-start-2 row-start-1 inline-block self-start justify-self-end rounded-full bg-light-cream px-4 py-1 text-black"
			>{tag}</span
		>

		<p class="col-span-full mt-5 text-lg font-bold leading-6 text-white">{title}</p>
		<dd class="col-span-3 mt-2 self-start text-base text-gray">
			{description}
		</dd>
	</div>
{:else}
	<!-- else content here -->
	<div
		class="grid grid-rows-feature-inner-tag rounded-2xl border-4 border-solid border-dark-3 bg-dark-1 lg:py-16 lg:px-20"
	>
		<dt class="col-span-full self-center">
			<div class="flex h-12 w-12 rounded-full bg-dark-turquoise-g">
				<img src={img} {alt} />
			</div>
		</dt>

		<p class="row-start-2 mt-5 text-lg font-bold leading-6 text-white">{title}</p>
		<dd class="col-span-2 mt-2 text-base text-gray">
			{description}
		</dd>
	</div>
{/if}
