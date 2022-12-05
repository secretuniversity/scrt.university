<script lang="ts">
	import Tag from '$lib/components/Tag.svelte';
	import GithubLogo from '$lib/assets/github_logo_gray.svg';
	import type { Repo } from '$lib/models/index';

	export let repo: Repo;
</script>

<a class="block h-56" href={repo.github_repo}>
	<div class="h-full overflow-hidden rounded-md bg-dark-4 px-4 py-6 shadow lg:px-8 lg:py-8">
		<div class="grid h-full auto-rows-auto">
			<p class="grow text-2xl font-semibold text-white">{repo.title}</p>
			<div class="mb-3 mt-1 flex items-center space-x-2">
				<img
					class="h-6 w-6 self-center"
					src={GithubLogo}
					alt="Learn more about the author of this Secret Box on Github"
				/>
				<a
					href={`https://github.com/${repo.github_username}`}
					class="mt-2 block font-semibold text-white">{repo.github_username}</a
				>
			</div>
			<p class="mb-2 max-w-md text-base text-gray">
				{repo.description}
			</p>

			<div class="mb-1">
				{#if repo.tags}
					<div class="flex space-x-2">
						{#each repo.tags as tag}
							<Tag {tag} />
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</a>
