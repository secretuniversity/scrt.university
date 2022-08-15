<script lang="ts">
	interface Feature {
		img: string;
		alt: string;
		title: string;
		description: string;
		tag: string | null;
	}

	import FeatureComponent from '$lib/components/Feature.svelte';

	export let features: Feature[] = [];
	export let srText = '';
</script>

<div class="border-1 border-solid bg-dark-2 pt-6 pb-36">
	<div class="mx-32 max-w-full">
		<h2 class="sr-only">{srText}</h2>
		<dl class="space-y-10 lg:grid lg:grid-cols-3 lg:gap-12 lg:space-y-0">
			{#each features as feature}
				<FeatureComponent
					title={feature.title}
					description={feature.description}
					tag={feature.tag}
				/>
			{/each}
		</dl>
	</div>
</div>
