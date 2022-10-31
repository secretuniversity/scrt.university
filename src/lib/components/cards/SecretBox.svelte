<script lang="ts">
	import GithubLogo from '$lib/assets/github_logo_white.svg';
	import TagComponent from '$lib/components/Tag.svelte';
	import type { Tag } from '$lib/models/index';

	export let tags: Tag[] = [];
	export let title = 'Title';
	export let description = 'Description';
	export let contributorName = '';
	export let devEnv = '';
</script>

<a href="/repositories/secret-box/slug">
	<div
		class="overflow-hidden rounded-xl bg-gradient-to-r from-dark-purple to-dark-yellow p-[5px] shadow lg:p-1"
	>
		<div class="h-full w-full rounded-xl bg-dark-2 lg:p-7">
			<div class="grid h-full auto-rows-auto grid-cols-2">
				<div class="col-span-2 mb-1">
					{#each tags as tag}
						<TagComponent tag={tag.name} />
					{/each}
				</div>

				<p class="col-span-2 text-2xl font-semibold text-white">{title}</p>
				<p class="col-span-2 mt-3 max-w-md text-base text-gray">
					{description}
				</p>

				<div class="col-span-1 mt-2 flex gap-x-2 self-end">
					<img
						class="h-6 w-6 self-center"
						src={GithubLogo}
						alt="Learn more about the author of this Secret Box on Github"
					/>
					<p class="self-center text-white">{contributorName}</p>
				</div>

				<a
					class="col-start-2 mt-4 inline-flex items-center self-end justify-self-end rounded-md border border-transparent bg-dark-blue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					href={devEnv}
				>
					Launch
				</a>
			</div>
		</div>
	</div>
</a>
