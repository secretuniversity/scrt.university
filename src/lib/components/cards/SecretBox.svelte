<script lang="ts">
	import Tag from '$lib/components/Tag.svelte';
	import GithubLogo from '$lib/assets/github_logo_white.svg';
	import TagComponent from '$lib/components/Tag.svelte';
	import { slugify } from '$lib/helpers';
	import type { SecretBox } from '$lib/models';
	import { selectedSecretBox } from '$lib/stores';

	export let secretBox: SecretBox;
</script>

<a
	class=" h-58 flex"
	href={'/resources/secret-box/' + slugify(secretBox.title)}
	on:click={() => selectedSecretBox.set(secretBox)}
>
	<div class="rounded-md bg-gradient-to-r from-dark-blue to-dark-orange p-[0.125rem] shadow-lg">
		<div class="mx-auto grid flex-col rounded-md bg-dark-4 p-6 text-white">
			<div class="mb-4 grid h-fit w-full grid-cols-2">
				<h3 class="text-2xl font-bold">
					{secretBox.title}
				</h3>

				<p
					id="label"
					class="h-fit w-fit self-start justify-self-end rounded-sm py-1 px-3 text-sm font-semibold "
				>
					SECRET BOX
				</p>
			</div>

			<p class="description">
				{secretBox.description}
			</p>

			<div class="mt-8 flex space-x-2 self-end">
				{#each secretBox.tags as tag, i}
					{#if i < 3}
						<Tag {tag} />
					{/if}
				{/each}
				{#if secretBox.tags.length > 3}
					<p class="ml-2 self-end text-gray">+ more</p>
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
