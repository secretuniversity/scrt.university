<script lang="ts">
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import Head from '$lib/components/Head.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import ToolCard from '$lib/components/cards/Tool.svelte';
	import Features from '$lib/components/FeatureList.svelte';
	import HeaderImage from '$lib/assets/illustrations/teacher_student.svg';

	const pageTitle = 'Learn';

	const breadcrumbRoutes = [
		{
			name: 'Learn',
			path: '/learn'
		}
	];
</script>

<Head {pageTitle} />

<div class="lg:mx-24">
	<div class="mt-8">
		<Breadcrumb routes={breadcrumbRoutes} />
	</div>

	<PageHeader
		title={'Learn'}
		description={'Learn to build on Secret Network using our courses Secret Pathways or dive deep into code with Secret Boxes'}
		image={HeaderImage}
	/>

	<div class="mt-20 text-4xl font-bold leading-6 text-white">Core Learning Materials</div>

	<div class="mt-8 flex gap-x-8">
		<a href="/pathways" class="inline-block lg:w-7/12">
			<div class="h-52 overflow-hidden rounded-xl bg-dark-2 shadow-lg">
				<div class="grid h-4/5 w-4/5 grid-rows-2 items-center p-6">
					<h2 class="text-2xl font-semibold text-white">Secret Pathways</h2>
					<p class="text-base text-gray lg:max-w-lg">
						Secret Pathways are a series of courses that teach you how to build on Secret Network.
						Follow each lesson and answer quiz question to earn <span
							class="bg-transparent bg-gradient-to-r from-light-blue to-dark-blue bg-clip-text font-bold"
							>badges</span
						>
						and
						<span
							class="bg-transparent bg-gradient-to-r from-light-blue to-dark-blue bg-clip-text font-bold"
							>certifications.</span
						>
					</p>
				</div>
			</div>
		</a>

		<a href="/repositories" class="inline-block lg:grow">
			<div class="h-52 overflow-hidden rounded-xl bg-dark-2 shadow-lg">
				<div class="grid h-4/5 w-4/5 grid-rows-2 items-center p-6">
					<h2 class="text-2xl font-semibold text-white">Repositories</h2>
					<p class="text-base text-gray lg:max-w-lg">
						Learn directly from the source. Find many of the most helpful open source repositories
						on Secret Network.
					</p>
				</div>
			</div>
		</a>
	</div>

	<div class="mt-8 flex gap-x-8 pb-24">
		<a href="/repositories" class="inline-block lg:shrink">
			<div class="h-52 overflow-hidden rounded-xl bg-dark-2 shadow-lg">
				<div class="grid h-4/5 w-4/5 grid-rows-2 items-center p-6">
					<h2 class="text-2xl font-semibold text-white">Official Docs</h2>
					<p class="text-base text-gray lg:max-w-lg">
						The official documentation for Secret Network. Use this to find the most up-to-date
						infromation regarding development, node running, and network infrastructure.
					</p>
				</div>
			</div>
		</a>

		<a href="/resources" class="inline-block lg:grow">
			<div class="h-52 overflow-hidden rounded-xl bg-dark-2 shadow-lg">
				<div class="grid h-4/5 w-4/5 grid-rows-2 items-center p-6">
					<h2 class="text-2xl font-semibold text-white">Community Resources</h2>
					<p class="text-base text-gray lg:max-w-lg">
						Need even more material? Learn by reading technical guides or by watching developer
						screencasts— all made by contributors of Secret University.
					</p>
				</div>
			</div>
		</a>
	</div>
</div>

<div class="bg-dark-2 py-64">
	<SectionHeader
		title={"Builder's Toolkit"}
		subtitle={'Pick your tools'}
		description={'Jumpstart your development with native tools built for Secret Network.'}
	/>

	<div class="mt-12 bg-dark-2">
		<div class="mx-auto grid h-72 w-fit grid-cols-5 gap-x-8">
			<ToolCard
				title={'Secret.js'}
				description={'The JavaScript SDK for Secret Network'}
				langs={['JavaScript']}
				url={'https://secretjs.scrt.network/'}
			/>
			<ToolCard
				title={'Griptape.js'}
				description={'A JavaScript framework for building dApps on Secret Network'}
				langs={['JavaScript']}
				url={'https://griptapejs.com/'}
			/>
			<ToolCard
				title={'Fadroma'}
				description={'A dApp development platform for Typescript and Rust'}
				langs={['Rust', 'Typescript']}
				url={'https://github.com/hackbg/fadroma'}
			/>
			<ToolCard
				title={'Polar'}
				description={'A framework for building secret smart contracts'}
				langs={['Rust']}
				url={'https://docs.arufaresearch.com/'}
			/>
			<ToolCard
				title={'Secret Py'}
				description={'The Python SDK for Secret Network'}
				langs={['Python']}
				url={'https://github.com/secretanalytics/secret-sdk-python'}
			/>
		</div>
	</div>
</div>
