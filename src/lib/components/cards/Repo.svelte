<script lang="ts">
	import GithubLogo from '$lib/assets/github_logo_gray.svg';
	import type { Tag } from '$lib/models/index';

	export let tags: Tag[] = [];
	export let title = 'Title';
	export let description = 'Description';
</script>

<a class="block h-56" href="/repositories/repo/some-slug">
	<div class="h-full overflow-hidden rounded-xl bg-dark-4 px-4 py-6 shadow lg:px-8 lg:py-8">
		<div class="grid h-full auto-rows-auto">
			<div class="mb-1">
				{#each tags as tag}
					<!-- content here -->
					<a href="#" class="mr-2 mb-1 inline-block">
						<span
							class="inline-flex items-center rounded-full bg-gray px-3 py-0.5 text-sm font-medium text-dark-4"
						>
							{tag.name}
						</span>
					</a>
				{/each}
			</div>

			<!-- Title and Description -->
			<p class="text-2xl font-semibold text-white">{title}</p>
			<p class="mt-3 max-w-md text-base text-gray">
				{description}
			</p>

			<!-- Author -->
			<div class="col-span-1 mt-2 flex gap-x-2 self-end">
				<img
					class="h-6 w-6 self-center"
					src={GithubLogo}
					alt="Learn more about the author of this Secret Box on Github"
				/>
				<p class="self-center text-white">Secret University</p>
			</div>
		</div>
	</div>
</a>
