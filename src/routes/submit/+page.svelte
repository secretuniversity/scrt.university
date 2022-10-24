<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Head from '$lib/components/Head.svelte';
	import DevImage from '$lib/assets/illustrations/dev.svg';
	import WriterImage from '$lib/assets/illustrations/writing.svg';
	import ProfessorImage from '$lib/assets/illustrations/professor.svg';
	import ContentCreatorImage from '$lib/assets/illustrations/content_creator.svg';

	const pageTitle = 'Submit';
	const pageDescription =
		'Are you ready to join Secret University? Select one of the types of contributions listed below to get started.';
</script>

<Head {pageTitle} />

<section class="pt-36 text-white">
	<div class="mx-auto max-w-5xl">
		<h1 class="mb-4 text-center text-6xl font-bold">Submit Your Contribution</h1>
		<p class="mx-auto text-center text-lg max-w-2xl">
			{pageDescription}
		</p>
	</div>
</section>

<section class="min-h-screen">
	<div class="grid grid-cols-3 items-center justify-items-center py-32 text-white">
		<div class="col-span-2 grid gap-y-4">
			<p class="text-base font-semibold text-dark-turquoise-b">ARTICLES & GUIDES</p>
			<p class="text-4xl font-bold">For the Writer</p>
			<p class="max-w-3xl">
				Secret University is accepting technical articles that highlight what it's like to build on
				Secret Network. If you've got a project you've been working on and don't mind writing,
				consider submitting your write-up to the university.
			</p>

			<div class="flex justify-start">
				<a
					href="/submit/article"
					type="button"
					class="inline-flex items-center rounded-md border border-transparent bg-dark-blue px-6 py-3 text-base font-medium shadow-sm"
					>Submit an Article</a
				>
			</div>
		</div>

		<img class="h-72 w-72 justify-self-start" src={WriterImage} alt="Submit an article" />
	</div>

	<div class="grid grid-cols-3 items-center justify-items-center py-32 text-white">
		<img class="h-72 w-72 justify-self-end" src={ContentCreatorImage} alt="Submit a video" />

		<div class="col-span-2 grid gap-y-4">
			<p class="text-base font-semibold text-dark-turquoise-b">VIDEOS & SCREENCASTS</p>
			<p class="text-4xl font-bold">For the Content Creator</p>
			<p class="max-w-3xl">
				Do you have a knack for making videos and the technical skills to develop on Secret Network?
				If so, your videos could help teach the next generation of developers on Secret Network what
				it means to build with privacy.
			</p>

			<div class="flex justify-start">
				<a
					href="/submit/video"
					type="button"
					class="inline-flex items-center rounded-md border border-transparent bg-dark-blue px-6 py-3 text-base font-medium shadow-sm"
					>Submit a Video</a
				>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-3 items-center justify-items-center py-32 text-white">
		<div class="col-span-2 grid gap-y-4">
			<p class="text-base font-semibold text-dark-turquoise-b">SECRET BOXES</p>
			<p class="text-4xl font-bold">For the Developer</p>
			<p class="max-w-3xl">
				Secret Boxes are pre-packaged projects build on Secret. They come equipped with everything a
				developer needs to compile their work and further their education as developers. If you have
				a project that you think could fit into a Secret Secret Secret Box, consider this submitting
				your work with Secret University.
			</p>

			<div class="flex justify-start">
				<a
					href="/submit/secret-box"
					type="button"
					class="inline-flex items-center rounded-md border border-transparent bg-dark-blue px-6 py-3 text-base font-medium shadow-sm"
					>Submit a Secret Box</a
				>
			</div>
		</div>

		<img class="h-72 w-72 justify-self-start" src={DevImage} alt="Submit a secret box" />
	</div>

	<div class="grid grid-cols-3 items-center justify-items-center py-32 text-white">
		<img class="h-72 w-72 justify-self-end" src={ProfessorImage} alt="Submit a pathway" />
		<div class="col-span-2 grid gap-y-4">
			<p class="text-base font-semibold text-dark-turquoise-b">SECRET PATHWAYS</p>
			<p class="text-4xl font-bold">For the Professor</p>
			<p class="max-w-3xl">
				Pathways are courses, and you can make your own here at Secret University. If you feel you
				can carry a topic across multiple lessons and can come up with questions to ask your
				students, consider creating a pathway for the Secret community, and showcase your expertise.
			</p>

			<div class="flex justify-start">
				<a
					href="/submit/pathway"
					type="button"
					class="inline-flex items-center rounded-md border border-transparent bg-dark-blue px-6 py-3 text-base font-medium shadow-sm"
					>Submit a Pathway</a
				>
			</div>
		</div>
	</div>
</section>

<section class="bg-dark-2 py-36 text-white">
	<div class="mx-auto grid max-w-3xl gap-y-4">
		<h2 class="text-center text-4xl font-bold">Ready to Contribute?</h2>
		<p class="text-center">
			If you're unsure of whether or not you're ready to contribute to Secret University. Reach out
			to us on Discord. We are here to help you figure out how you can contribute to the network and
			to the university. You can find us in the <span
				class="m-1 rounded-md bg-dark-4 py-0.5 px-1 font-bold">#secret-university</span
			>channel.
		</p>
		<div class="mx-auto w-min">
			<a
				href="/submit/pathway"
				type="button"
				class="inline-flex w-max items-center rounded-md border border-transparent bg-light-cream px-6 py-3 text-base font-medium text-black shadow-sm"
				>Reach Out</a
			>
		</div>
	</div>
</section>
