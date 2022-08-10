<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import GenericDarkCard from '$lib/components/cards/GenericDark.svelte';
	import Features from '$lib/components/FeatureList.svelte';

	const pageTitle = 'Learn';
</script>

<Head {pageTitle} />

<div class="lg:mx-24">
	<PageHeader
		title={'Learn'}
		description={'Learn to build on Secret Network using our courses Secret Pathways or dive deep into code with Secret Boxes'}
	/>

	<div class="mt-20 text-4xl font-bold leading-6 text-white">Core Learning Materials</div>

	<div class="mt-8 flex gap-x-8">
		<a href="/pathways" class="inline-block lg:w-7/12">
			<div class="h-52 overflow-hidden rounded-xl bg-dark-2 shadow-lg">
				<div class="grid h-4/5 w-4/5 grid-rows-2 items-center p-6">
					<h2 class="text-2xl font-semibold text-white">Secret Pathways</h2>
					<p class="text-base text-gray lg:max-w-lg">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim nunc erat.
						Praesent elementum, lorem nec vehicula tincidunt, justo magna pellentesque urna, sit
					</p>
				</div>
			</div>
		</a>

		<a href="/repositories" class="inline-block lg:grow">
			<div class="h-52 overflow-hidden rounded-xl bg-dark-2 shadow-lg">
				<div class="grid h-4/5 w-4/5 grid-rows-2 items-center p-6">
					<h2 class="text-2xl font-semibold text-white">Repositories</h2>
					<p class="text-base text-gray lg:max-w-lg">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim nunc erat.
						Praesent elementum, lorem nec vehicula tincidunt, justo magna pellentesque urna, sit
					</p>
				</div>
			</div>
		</a>
	</div>

	<div class="mt-8 flex gap-x-8 pb-24">
		<a href="https://docs.scrt.network" class="inline-block lg:shrink">
			<div class="h-52 overflow-hidden rounded-xl bg-dark-2 shadow-lg">
				<div class="grid h-4/5 w-4/5 grid-rows-2 items-center p-6">
					<h2 class="text-2xl font-semibold text-white">Official Docs</h2>
					<p class="text-base text-gray lg:max-w-lg">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim nunc erat.
						Praesent elementum, lorem nec vehicula tincidunt, justo magna pellentesque urna, sit
					</p>
				</div>
			</div>
		</a>

		<a href="/resources" class="inline-block lg:grow">
			<div class="h-52 overflow-hidden rounded-xl bg-dark-2 shadow-lg">
				<div class="grid h-4/5 w-4/5 grid-rows-2 items-center p-6">
					<h2 class="text-2xl font-semibold text-white">Community Resources</h2>
					<p class="text-base text-gray lg:max-w-lg">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim nunc erat.
						Praesent elementum, lorem nec vehicula tincidunt, justo magna pellentesque urna, sit
					</p>
				</div>
			</div>
		</a>
	</div>
</div>

<SectionHeader
	title={"Builder's Toolkit"}
	subtitle={'Pick your tools'}
	description={'Jumpstart your development with native tools built for Secret Network.'}
/>

<div class="flex justify-center gap-x-8 bg-dark-2 pb-8">
	<GenericDarkCard
		title={'Secret.js'}
		description={'Lorem ipsum'}
		language={'JavaScript'}
		image={''}
	/>
	<GenericDarkCard
		title={'Griptape.js'}
		description={'Lorem ipsum'}
		language={'JavaScript'}
		image={''}
	/>
	<GenericDarkCard title={'Fadroma'} description={'Lorem ipsum'} language={'Rust'} image={''} />
	<GenericDarkCard title={'Polar'} description={'Lorem ipsum'} language={'Rust'} image={''} />
	<GenericDarkCard title={'Secret Py'} description={'Lorem ipsum'} language={'Python'} image={''} />
</div>

<SectionHeader
	title={'Community Showcase'}
	subtitle={'Learn from devs like you'}
	description={'Cover valuable lessons from the secret Network community.'}
/>

<div class="bg-dark-2 pb-28">
	<Features
		features={[
			{
				title: 'Secret.js',
				description: 'Lorem ipsum',
				img: '',
				alt: ''
			},
			{
				title: 'Griptape.js',
				description: 'Lorem ipsum',
				img: '',
				alt: ''
			},
			{
				title: 'Fadroma',
				description: 'Lorem ipsum',
				img: '',
				alt: ''
			},
			{
				title: 'Polar',
				description: 'Lorem ipsum',
				img: '',
				alt: ''
			},
			{
				title: 'Secret Py',
				description: 'Lorem ipsum',
				img: '',
				alt: ''
			}
		]}
	/>
</div>
