<script lang="ts">
	import GithubLogo from '$lib/assets/github_logo_white.svg';

	export let tags: string[] = ['tag1', 'tag2'];
	export let title = 'Title';
	export let description = 'Description';
	export let author = '0xabc...xyz';
</script>

<a href="/repositories/secret-box/slug">
	<div
		class="overflow-hidden rounded-xl bg-gradient-to-r from-dark-purple to-dark-yellow p-[5px] shadow lg:p-1"
	>
		<div class="h-full w-full rounded-xl bg-dark-2 lg:p-7">
			<div class="grid h-full auto-rows-auto grid-cols-2">
				<div class="col-span-2 mb-1">
					{#each tags as tag}
						<!-- content here -->
						<a href="#" class="mr-2 mb-1 inline-block">
							<span
								class="inline-flex items-center rounded-full bg-gray px-3 py-0.5 text-sm font-medium text-dark-4"
							>
								{tag}
							</span>
						</a>
					{/each}
				</div>

				<!-- Title and Description -->
				<p class="col-span-2 text-2xl font-semibold text-white">{title}</p>
				<p class="col-span-2 mt-3 max-w-md text-base text-gray">
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

				<button
					type="button"
					class="col-start-2 mt-4 inline-flex items-center self-end justify-self-end rounded-md border border-transparent bg-dark-blue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>Launch</button
				>
			</div>
		</div>
	</div>
</a>
