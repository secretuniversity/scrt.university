<script lang="ts">
	import ContributionUpdateButton from '$lib/components/page/ContributionUpdateButton.svelte';
	import Tag from '$lib/components/page/Tag.svelte';
	import { boxCursor } from '$lib/stores';
	import { onMount } from 'svelte';

	export let data: Page.SecretBox;

	let bgImage = '';
	$: bgStyles = `bg-[url('${bgImage}')] bg-cover bg-center`;

	onMount(() => {
		$boxCursor = data.box;
		const urlSafeTitle = data.box.title.replace(/ /g, '%20');

		bgImage = `https://storage.googleapis.com/celadon/${process.env.APP_ENV}/secret-box/${data.box.id}/${urlSafeTitle}.jpg`;
	});
</script>

{#if $boxCursor}
	<section class="relative min-h-[650px] pb-32">
		<div class="my-6 mx-32 flex justify-end">
			<ContributionUpdateButton contribution={data.box} />
		</div>
		<!-- <div class="h-72 w-full overflow-hidden">
			<img class="h-auto w-full" src={bgImage} alt="Learn with Secret Boxes" />
		</div>
 -->
		<div
			class="h-64 rounded-b-lg bg-gradient-to-r from-dark-blue to-dark-orange p-[0.125rem] shadow-lg"
		>
			<div
				class="container absolute top-0 left-0 right-0 z-10 mx-auto mt-32 grid grid-cols-2 justify-items-center rounded-lg bg-dark-4 px-12 py-32 shadow-lg"
			>
				<div class="col-start-1">
					<p id="label" class="h-fit w-fit shrink rounded-sm py-2 text-sm font-semibold ">
						SECRET BOX
					</p>

					<h2 class="text-4xl font-bold uppercase tracking-wide text-white">
						{$boxCursor.title}
					</h2>
					<p class="mt-4 max-w-2xl text-base text-gray">
						{$boxCursor.description}
					</p>

					<div class="my-4 flex space-x-2">
						{#if $boxCursor.tags}
							{#each $boxCursor.tags as tag}
								<Tag {tag} />
							{/each}
						{/if}
					</div>

					<div class="mt-4 flex gap-x-3 self-start">
						<a
							target="_blank"
							rel="noopener noreferrer"
							href={$boxCursor.repo_url}
							class="mt-3 w-max cursor-pointer rounded-md bg-dark-3 px-6 py-3 text-base font-medium text-white hover:bg-dark-2"
							>View on Github</a
						>

						{#if $boxCursor.dev_env}
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={$boxCursor.dev_env}
								class="bg-[] mt-3 w-max cursor-pointer rounded-md bg-[#FFAE33] px-6 py-3 text-base font-medium text-dark-2 hover:bg-[#ffa319]"
								>Launch Sandbox</a
							>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="min-h-[500px] px-48 text-white">
		<p class="mt-24 text-3xl font-semibold">What is a Secret Box?</p>
		<div class="grid grid-cols-2 items-center gap-x-6">
			<div>
				<p class="mt-6">
					Secret Boxes are pre-built, pre-configured dApp templates built on Secret. From NFTs to
					privacy-enabled tokens, Secret Boxes aim to break down the barriers of entry for devs to
					start building on Secret today. Each Secret Box runs in its own sandbox developer
					environment and runs, and to get developers off on the right foot, we've provided a simple
					UI kit. This way devs can test and build without worrying about UI, but when they're ready
					the it's easy to customize a secret box to fit their needs.
				</p>

				<p class="mt-6">
					Are you building something on Secret? Chances are you can to turn your project into a
					learning opportunity for the community.
				</p>

				<a
					href="/build"
					type="button"
					class="mt-4 inline-flex w-fit items-center justify-self-center rounded-md border border-transparent bg-dark-blue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>Learn More</a
				>
			</div>

			<img
				class="h-full w-auto justify-self-center"
				src="/images/illustrations/hello_box.svg"
				alt="Support development on Secret by using Secret Boxes"
			/>
		</div>
	</section>
{/if}

<style>
	#label {
		background: -webkit-linear-gradient(left, #60a0dc, #eb8045);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
