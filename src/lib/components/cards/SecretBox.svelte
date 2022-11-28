<script lang="ts">
	import Tag from '$lib/components/Tag.svelte';
	import { slugify } from '$lib/helpers';
	import type { SecretBox } from '$lib/models';
	import { selectedSecretBox } from '$lib/stores';

	export let secretBox: SecretBox;
</script>

<a
	class="block h-56"
	href={'/repositories/secret-box/' + slugify(secretBox.title)}
	on:click={() => selectedSecretBox.set(secretBox)}
>
	<div
		class="h-full rounded-md bg-gradient-to-r from-dark-blue to-dark-orange p-[0.125rem] shadow-lg"
	>
		<div class="mx-auto grid h-full flex-col rounded-md bg-dark-4 p-6 text-white">
			<div class="mb-4 flex h-fit w-full items-center">
				<h3 class="grow text-2xl font-bold">
					{secretBox.title}
				</h3>

				<p id="label" class="h-fit w-fit shrink rounded-sm py-1 px-3 text-sm font-semibold ">
					SECRET BOX
				</p>
			</div>

			<p class="description">
				{secretBox.description}
			</p>

			<div class="mt-8 flex space-x-2 self-end">
				{#if secretBox.tags}
					<!-- content here -->
					{#each secretBox.tags as tag, i}
						{#if i < 3}
							<Tag {tag} />
						{/if}
					{/each}
					{#if secretBox.tags.length > 3}
						<p class="ml-2 self-end text-gray">+ more</p>
					{/if}
				{/if}
			</div>
		</div>
	</div>
</a>

<style>
	#label {
		background: -webkit-linear-gradient(left, #60a0dc, #eb8045);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
