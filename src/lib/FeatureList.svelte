<script lang="ts">
	interface Feature {
		img: string;
		alt: string;
		title: string;
		description: string;
	}

	import FeatureComponent from '$lib/Feature.svelte';

	export let features: Feature[] = [];
	export let srText = '';
</script>

<div class="border-1 border-solid bg-dark-2 pt-6 pb-36">
	<div class="mx-auto max-w-xl px-4 lg:max-w-7xl lg:px-8 ">
		<h2 class="sr-only">{srText}</h2>
		<dl class="space-y-10 lg:grid lg:grid-cols-3 lg:gap-12 lg:space-y-0">
			{#each features as feature}
				<FeatureComponent title={feature.title} description={feature.description} />
			{/each}
		</dl>
	</div>
</div>
