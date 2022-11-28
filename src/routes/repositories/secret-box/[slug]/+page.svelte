<script>
	import Head from '$lib/components/Head.svelte';
	import SecretBoxImage from '$lib/assets/illustrations/hello_box.svg';
	import { selectedSecretBox } from '$lib/stores';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let pageTitle = $page.params.slug + ' | Secret Box';
	let bgImage = '';
	$: bgStyles = `bg-[url('${bgImage}')] bg-cover bg-center`;

	onMount(() => {
		if (!$selectedSecretBox) return goto('/repositories');

		const urlSafeTitle = $selectedSecretBox.title.replace(/ /g, '%20');
		pageTitle = $selectedSecretBox.title + ' | Secret Box';

		bgImage = `https://storage.googleapis.com/celadon/${process.env.APP_ENV}/secret-box/${$selectedSecretBox.id}/${urlSafeTitle}.jpg`;
	});
</script>

<Head {pageTitle} />

{#if $selectedSecretBox}
	<section class="relative min-h-[650px] pb-32">
		<div class="h-72 w-full overflow-hidden">
			<img class="h-auto w-full" src={bgImage} alt="Learn with Secret Boxes" />
		</div>

		<div
			class="h-full rounded-md bg-gradient-to-r from-dark-blue to-dark-orange p-[0.125rem] shadow-lg"
		>
			<div
				class="container absolute top-0 left-0 right-0 z-10 mx-auto mt-32 grid grid-cols-2 justify-items-center rounded-lg bg-dark-4 px-12 py-32 shadow-lg"
			>
				<div class="col-start-1">
					<h2 class="text-3xl font-semibold uppercase tracking-wide text-white">
						{$selectedSecretBox.title}
					</h2>
					<p class="mt-4 max-w-2xl text-base text-gray">
						{$selectedSecretBox.description}
					</p>

					<div class="mt-4 flex gap-x-3 self-start">
						<a
							href={$selectedSecretBox.repo_url}
							class="mt-3 w-max cursor-pointer rounded-md bg-dark-3 px-6 py-3 text-base font-medium text-white hover:bg-dark-2"
							>View on Github</a
						>

						{#if $selectedSecretBox.dev_env}
							<a
								href={$selectedSecretBox.dev_env}
								class="bg-[] mt-3 w-max cursor-pointer rounded-md bg-[#FFAE33] px-6 py-3 text-base font-medium text-dark-2 hover:bg-[#ffa319]"
								>Launch Gitpod</a
							>
						{/if}
					</div>
				</div>

				<img
					class="h-full w-auto"
					src={SecretBoxImage}
					alt="Support development on Secret by using Secret Boxes"
				/>
			</div>
		</div>
	</section>
{/if}
