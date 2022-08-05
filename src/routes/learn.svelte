<script lang="ts">
	import Head from '$lib/Head.svelte';
	import PageHeader from '$lib/PageHeader.svelte';
	import SectionHeader from '$lib/SectionHeader.svelte';
	import ToolCard from '$lib/ToolCard.svelte';
	import Features from '$lib/FeatureList.svelte';

	const pageTitle = 'Learn';
</script>

<Head {pageTitle} />

<div class="lg:mx-24">
	<PageHeader
		title={'Learn'}
		description={'Learn to build on Secret Network using our courses Secret Pathways or dive deep into code with Secret Boxes'}
	/>

	<div class="mt-16 flex gap-x-8">
		<a href="/pathways" class="inline-block lg:w-7/12">
			<div class="h-48 overflow-hidden rounded-lg bg-white shadow">
				<div class="px-4 py-5 sm:p-6">
					<h2 class="text-gray-800 text-2xl font-semibold">Secret Pathways</h2>
					<p class="text-gray-600 mt-2 text-base lg:max-w-lg">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim nunc erat.
						Praesent elementum, lorem nec vehicula tincidunt, justo magna pellentesque urna, sit
					</p>
				</div>
			</div>
		</a>

		<a href="/repos" class="inline-block lg:grow">
			<div class="h-48 overflow-hidden rounded-lg bg-white shadow">
				<div class="px-4 py-5 sm:p-6">
					<h2 class="text-gray-800 text-2xl font-semibold">Repos</h2>
					<p class="text-gray-600 mt-2 text-base lg:max-w-lg">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim nunc erat.
						Praesent elementum, lorem nec vehicula tincidunt, justo magna pellentesque urna, sit
					</p>
				</div>
			</div>
		</a>
	</div>

	<div class="mt-16 flex justify-center gap-x-8">
		<a href="https://docs.scrt.network" class="inline-block lg:shrink">
			<div class="h-48 overflow-hidden rounded-lg bg-white shadow">
				<div class="px-4 py-5 sm:p-6">
					<h2 class="text-gray-800 text-2xl font-semibold">Official Docs</h2>
					<p class="text-gray-600 mt-2 text-base lg:max-w-lg">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim nunc erat.
						Praesent elementum, lorem nec vehicula tincidunt, justo magna pellentesque urna, sit
					</p>
				</div>
			</div>
		</a>

		<a href="/resources" class="inline-block lg:grow">
			<div class="h-48 overflow-hidden rounded-lg bg-white shadow">
				<div class="grid px-4 py-5 sm:p-6">
					<h2 class="text-gray-800 text-2xl font-semibold">Community Resources</h2>
					<p class="text-gray-600 mt-2 text-base lg:max-w-lg">
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

<div class="flex justify-center gap-x-8">
	<ToolCard title={'Secret.js'} description={'Lorem ipsum'} language={'JavaScript'} image={''} />
	<ToolCard title={'Griptape.js'} description={'Lorem ipsum'} language={'JavaScript'} image={''} />
	<ToolCard title={'Fadroma'} description={'Lorem ipsum'} language={'Rust'} image={''} />
	<ToolCard title={'Polar'} description={'Lorem ipsum'} language={'Rust'} image={''} />
	<ToolCard title={'Secret Py'} description={'Lorem ipsum'} language={'Python'} image={''} />
</div>

<SectionHeader
	title={'Community Showcase'}
	subtitle={'Learn from devs like you'}
	description={'Cover valuable lessons from the secret Network community.'}
/>

<div class="mb-36">
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
