<script lang="ts">
	import { selectedPathway } from '$lib/stores';
	import { slugify } from '$lib/helpers';
	import type { Pathway } from '$lib/models';
	export let pathway: Pathway;
</script>

<a
	class=" block h-56 w-full"
	href={'/pathways/' + slugify(pathway.title)}
	on:click={() => selectedPathway.set(pathway)}
>
	<div class="grid h-full rounded-md bg-dark-4 p-6 text-white shadow-lg">
		<div class="mb-4 flex h-fit w-full space-x-4">
			<h3 class="grow text-2xl font-bold">
				{pathway.title}
			</h3>

			<p
				class="h-fit w-fit shrink self-start justify-self-end rounded-sm bg-dark-turquoise-g py-1 px-3 text-sm font-semibold"
			>
				Pathway
			</p>
		</div>

		<p class="description">
			{pathway.description}
		</p>
	</div>
</a>

<style>
	.description {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
