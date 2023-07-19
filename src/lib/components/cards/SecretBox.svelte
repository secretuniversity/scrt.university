<script lang="ts">
	import Tag from '$lib/components/page/Tag.svelte';
	import { slugify } from '$lib/helpers';
	import { boxCursor } from '$lib/stores';

	export let secretBox: Contributions.SecretBox.Self;
</script>

<a
	class="block h-[364px]"
	href={'/repositories/secret-box/' + secretBox.id + '/' + slugify(secretBox.title)}
	on:click={() => boxCursor.set(secretBox)}
>
	<div
		class="h-full rounded-md bg-gradient-to-r from-dark-blue to-dark-orange p-[0.125rem] shadow-lg"
	>
		<div class="mx-auto grid h-full flex-col rounded-md bg-dark-4 p-6 text-white">
			<div class="mb-4 flex h-fit w-full items-center">
				<h3 class="grow text-2xl font-bold">
					{secretBox.title}
				</h3>

				<div class="flex items-center space-x-2">
					<img src="/images/icons/secret_box_icon.png" alt="Learn today with Secret Boxes" />
				</div>
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
</style>
